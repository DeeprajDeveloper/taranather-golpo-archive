#!/usr/bin/env node

/**
 * Sync new YouTube playlist videos into data/master_data.json.
 *
 * Usage:
 *   cp .env.example .env          # add YOUTUBE_API_KEY
 *   npm run sync:youtube:dry-run  # preview changes
 *   npm run sync:youtube -- --write
 *
 * Options:
 *   --dry-run           Report changes without writing (default)
 *   --write             Persist updates to master_data.json
 *   --playlist <id>     Sync one playlist meta id (default: all configured)
 *   --help              Show help
 *
 * Requires Node 18+ and a YouTube Data API v3 key in YOUTUBE_API_KEY.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  buildStoryFromPlaylistItem,
  indexStoriesByPlaylistIndex,
  indexStoriesByVideoId,
  loadMasterData,
  recomputeStats,
  saveMasterData,
} from './lib/master-data.js';
import {
  inferExtraTags,
  inferSeries,
  matchAuthorId,
  nextStoryId,
  parseYouTubeTitle,
  slugify,
} from './lib/parse-youtube-title.js';
import { buildWatchUrl, extractPlaylistId, extractVideoId, fetchPlaylistItems } from './lib/youtube.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const syncConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'sync.config.json'), 'utf8'),
);

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function printHelp() {
  console.log(`Sync YouTube playlist videos into data/master_data.json

Usage:
  node scripts/sync-youtube-stories.js [--dry-run|--write] [--playlist <id>]

Environment:
  YOUTUBE_API_KEY     YouTube Data API v3 key (or set in .env at repo root)

Examples:
  npm run sync:youtube:dry-run
  npm run sync:youtube -- --write
  npm run sync:youtube -- --dry-run --playlist pl-golper-jonyo
`);
}

function parseArgs(argv) {
  const options = {
    dryRun: true,
    playlistIds: [],
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--write') {
      options.dryRun = false;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--playlist') {
      const value = argv[i + 1];
      if (!value) throw new Error('--playlist requires an id');
      options.playlistIds.push(value);
      i += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function resolvePlaylistConfig(playlistMetaId) {
  const config = syncConfig.playlists[playlistMetaId];
  if (!config) {
    throw new Error(
      `No sync config for playlist "${playlistMetaId}". Add it to scripts/sync.config.json`,
    );
  }

  return {
    ...config,
    parseTitle: (item) => parseYouTubeTitle(item.title),
    inferSeries: (title, description) => inferSeries(title, description),
    inferTags: (title, description) => inferExtraTags(title, description, config.tags ?? []),
    slugify,
    watchUrl: buildWatchUrl,
  };
}

function syncPlaylist({ data, playlistMeta, playlistConfig, apiKey }) {
  const playlistId = extractPlaylistId(playlistMeta.url);
  if (!playlistId) {
    throw new Error(`Could not parse playlist id from URL: ${playlistMeta.url}`);
  }

  const report = {
    playlistId: playlistMeta.id,
    youtubePlaylistId: playlistId,
    added: [],
    indexUpdates: [],
    warnings: [],
  };

  const byVideoId = indexStoriesByVideoId(data.stories);
  const byIndex = indexStoriesByPlaylistIndex(data.stories, playlistMeta.id);

  return fetchPlaylistItems(playlistId, apiKey).then((items) => {
    const storyIdsForPlaylist = new Array(items.length);

    for (const item of items) {
      const index = item.position + 1;

      const existingByVideo = byVideoId.get(item.videoId);
      if (existingByVideo) {
        storyIdsForPlaylist[item.position] = existingByVideo.id;

        if (existingByVideo.playlist?.id === playlistMeta.id && existingByVideo.playlist.index !== index) {
          report.indexUpdates.push({
            id: existingByVideo.id,
            from: existingByVideo.playlist.index,
            to: index,
          });
          existingByVideo.playlist.index = index;
        }

        continue;
      }

      const existingByIndex = byIndex.get(index);
      if (existingByIndex) {
        const currentVideoId = extractVideoId(
          existingByIndex.media?.find((entry) => entry.platform === 'youtube')?.url,
        );

        if (currentVideoId && currentVideoId !== item.videoId) {
          report.warnings.push(
            `Index ${index}: "${existingByIndex.id}" points to ${currentVideoId}, but playlist has ${item.videoId} ("${item.title}"). Manual review needed.`,
          );
          storyIdsForPlaylist[item.position] = existingByIndex.id;
          continue;
        }
      }

      const storyId = nextStoryId(playlistConfig.idPrefix, data.stories);
      const authorId =
        matchAuthorId({
          title: item.title,
          description: item.description,
          authors: data.authors,
        }) ?? playlistConfig.defaultAuthorId;

      const story = buildStoryFromPlaylistItem({
        storyId,
        playlistMeta,
        playlistConfig,
        playlistItem: item,
        playlistRecord: playlistMeta,
        authorId,
      });

      data.stories.push(story);
      byVideoId.set(item.videoId, story);
      byIndex.set(index, story);
      storyIdsForPlaylist[item.position] = storyId;

      report.added.push({
        id: storyId,
        index,
        videoId: item.videoId,
        title: item.title,
        authorId,
      });
    }

    const playlistRecord = data.playlists?.find((entry) => entry.id === playlistMeta.id);
    if (playlistRecord) {
      playlistRecord.storyIds = storyIdsForPlaylist.filter(Boolean);
    }

    report.youtubeCount = items.length;
    return report;
  });
}

async function main() {
  loadEnvFile(path.join(REPO_ROOT, '.env'));

  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing YOUTUBE_API_KEY. Copy .env.example to .env and add your YouTube Data API key.',
    );
  }

  const dataPath = path.join(REPO_ROOT, syncConfig.dataPath ?? 'data/master_data.json');
  const { data, absolute } = loadMasterData(dataPath);

  const playlists = (data.playlists ?? []).filter((playlist) => {
    if (!options.playlistIds.length) return syncConfig.playlists[playlist.id];
    return options.playlistIds.includes(playlist.id);
  });

  if (!playlists.length) {
    throw new Error('No playlists matched. Check scripts/sync.config.json and --playlist ids.');
  }

  console.log(`${options.dryRun ? 'Dry run' : 'Writing'} — ${playlists.length} playlist(s)\n`);

  const reports = [];
  for (const playlistMeta of playlists) {
    const playlistConfig = resolvePlaylistConfig(playlistMeta.id);
    console.log(`Fetching ${playlistMeta.id} (${playlistMeta.title})…`);
    const report = await syncPlaylist({
      data,
      playlistMeta,
      playlistConfig,
      apiKey,
    });
    reports.push(report);
  }

  const totalAdded = reports.reduce((sum, report) => sum + report.added.length, 0);
  const totalIndexUpdates = reports.reduce((sum, report) => sum + report.indexUpdates.length, 0);
  const totalWarnings = reports.reduce((sum, report) => sum + report.warnings.length, 0);

  for (const report of reports) {
    console.log(`\n${report.playlistId}: ${report.youtubeCount} videos on YouTube`);

    if (report.added.length) {
      console.log(`  New stories (${report.added.length}):`);
      for (const entry of report.added) {
        console.log(`    + ${entry.id} [#${entry.index}] ${entry.title} (${entry.videoId})`);
      }
    } else {
      console.log('  No new stories.');
    }

    if (report.indexUpdates.length) {
      console.log(`  Playlist index updates (${report.indexUpdates.length}):`);
      for (const entry of report.indexUpdates) {
        console.log(`    ~ ${entry.id}: index ${entry.from} → ${entry.to}`);
      }
    }

    if (report.warnings.length) {
      console.log(`  Warnings (${report.warnings.length}):`);
      for (const warning of report.warnings) {
        console.log(`    ! ${warning}`);
      }
    }
  }

  console.log(
    `\nSummary: ${totalAdded} added, ${totalIndexUpdates} index updates, ${totalWarnings} warnings`,
  );

  if (!totalAdded && !totalIndexUpdates) {
    console.log('Nothing to write.');
    return;
  }

  if (options.dryRun) {
    console.log('\nDry run complete. Re-run with --write to update master_data.json.');
    return;
  }

  recomputeStats(data);
  saveMasterData(absolute, data);
  console.log(`\nUpdated ${path.relative(REPO_ROOT, absolute)} (stats refreshed).`);
  console.log('Review new entries (especially author/title), then commit when ready.');
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exit(1);
});
