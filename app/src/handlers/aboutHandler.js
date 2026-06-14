import masterData from '@data/master_data.json';

const DEFAULT_STATS_LABELS = {
  totalStories: 'Stories catalogued',
  withYouTube: 'With YouTube links',
  original: 'Original lineage',
  fanFiction: 'Fan fiction',
};

function normalizeSource(item) {
  if (typeof item === 'string') {
    const isUrl = /^https?:\/\//i.test(item);
    return { label: item, url: isUrl ? item : null };
  }

  return {
    label: item.label,
    url: item.url ?? null,
  };
}

export function getAboutContent() {
  const { meta, authors, filters } = masterData;
  const about = meta.about ?? {};
  const originalAuthors = authors.filter((author) => author.role === 'original');
  const sourceItems = about.sources?.items ?? meta.sources ?? [];

  return {
    eyebrow: about.eyebrow ?? '',
    title: about.title ?? 'About',
    introParagraphs: about.intro?.paragraphs ?? [],
    characterHeading: about.character?.heading ?? '',
    characterParagraphs: about.character?.paragraphs ?? [],
    collectionHeading: about.collection?.heading ?? '',
    statsLabels: { ...DEFAULT_STATS_LABELS, ...about.collection?.statsLabels },
    sourcesHeading: about.sources?.heading ?? 'Sources & further reading',
    sources: sourceItems.map(normalizeSource),
    stats: meta.stats,
    originalAuthors,
    lineages: filters.lineages ?? [],
  };
}
