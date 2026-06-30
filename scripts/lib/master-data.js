import fs from 'fs';
import path from 'path';
import { extractVideoId } from './youtube.js';

export function loadMasterData(filePath) {
  const absolute = path.resolve(filePath);
  const raw = fs.readFileSync(absolute, 'utf8');
  return { data: JSON.parse(raw), absolute };
}

export function saveMasterData(absolutePath, data) {
  const json = `${JSON.stringify(data, null, 2)}\n`;
  fs.writeFileSync(absolutePath, json, 'utf8');
}

export function indexStoriesByVideoId(stories) {
  const byVideoId = new Map();

  for (const story of stories) {
    for (const media of story.media ?? []) {
      if (media.platform !== 'youtube') continue;
      const videoId = extractVideoId(media.url);
      if (videoId) {
        byVideoId.set(videoId, story);
      }
    }
  }

  return byVideoId;
}

export function indexStoriesByPlaylistIndex(stories, playlistMetaId) {
  const byIndex = new Map();

  for (const story of stories) {
    if (story.playlist?.id !== playlistMetaId) continue;
    if (story.playlist.index == null) continue;
    byIndex.set(story.playlist.index, story);
  }

  return byIndex;
}

export function recomputeStats(data) {
  const stories = data.stories ?? [];
  const authorIds = new Set(stories.map((story) => story.authorId).filter(Boolean));

  const withYouTube = stories.filter((story) =>
    (story.media ?? []).some((item) => item.platform === 'youtube' && item.url),
  ).length;

  data.meta.stats = {
    totalStories: stories.length,
    original: stories.filter((story) => story.lineage === 'original').length,
    fanFiction: stories.filter((story) => story.lineage === 'fan_fiction').length,
    withYouTube,
    withoutYouTube: stories.length - withYouTube,
    authors: authorIds.size,
  };

  data.meta.updatedAt = new Date().toISOString().slice(0, 10);
}

export function buildStoryFromPlaylistItem({
  storyId,
  playlistMeta,
  playlistConfig,
  playlistItem,
  playlistRecord,
  authorId,
}) {
  const parsedTitle = playlistConfig.parseTitle(playlistItem);
  const series = playlistConfig.inferSeries(playlistItem.title, playlistItem.description);
  const tags = playlistConfig.inferTags(playlistItem.title, playlistItem.description);

  return {
    id: storyId,
    slug: playlistConfig.slugify(parsedTitle.display, storyId),
    title: {
      en: parsedTitle.en,
      bn: parsedTitle.bn,
    },
    authorId,
    lineage: playlistConfig.lineage,
    storyType: playlistConfig.storyType,
    series,
    parentStoryId: null,
    media: [
      {
        platform: 'youtube',
        channel: playlistRecord.channel ?? playlistConfig.channel,
        url: playlistConfig.watchUrl(playlistItem.videoId),
        format: playlistConfig.format,
      },
    ],
    playlist: {
      id: playlistMeta.id,
      index: playlistItem.position + 1,
      url: playlistMeta.url,
    },
    tags,
    notes: 'Auto-added by scripts/sync-youtube-stories.js — review author and title.',
  };
}
