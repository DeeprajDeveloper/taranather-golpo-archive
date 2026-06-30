const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';

export function extractPlaylistId(urlOrId) {
  if (!urlOrId) return null;
  if (!urlOrId.includes('youtube') && !urlOrId.includes('=')) {
    return urlOrId;
  }

  try {
    const parsed = new URL(urlOrId);
    return parsed.searchParams.get('list');
  } catch {
    const match = urlOrId.match(/list=([^&]+)/);
    return match?.[1] ?? null;
  }
}

export function extractVideoId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1).split('/')[0] || null;
    }
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

export function buildWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export async function fetchPlaylistItems(playlistId, apiKey) {
  const items = [];
  let pageToken;

  do {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: '50',
      key: apiKey,
    });

    if (pageToken) {
      params.set('pageToken', pageToken);
    }

    const response = await fetch(`${YOUTUBE_API}/playlistItems?${params}`);

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`YouTube API error (${response.status}): ${body}`);
    }

    const payload = await response.json();

    for (const entry of payload.items ?? []) {
      const videoId = entry.contentDetails?.videoId;
      if (!videoId || entry.snippet?.title === 'Private video' || entry.snippet?.title === 'Deleted video') {
        continue;
      }

      items.push({
        videoId,
        position: entry.snippet?.position ?? items.length,
        title: entry.snippet?.title ?? '',
        description: entry.snippet?.description ?? '',
        publishedAt: entry.contentDetails?.videoPublishedAt ?? entry.snippet?.publishedAt ?? null,
      });
    }

    pageToken = payload.nextPageToken;
  } while (pageToken);

  return items.sort((a, b) => a.position - b.position);
}
