const BENGALI_RE = /[\u0980-\u09FF]/;
const NOISE_PATTERNS = [
  /golper jonyo/gi,
  /sunday suspense/gi,
  /mirchi bangla/gi,
  /taranath tantrik er golpo/gi,
  /taranath tantrik/gi,
  /brahmokal tantrik/gi,
  /official/gi,
  /podcast/gi,
];

function hasBengali(text) {
  return BENGALI_RE.test(text ?? '');
}

function cleanSegment(segment) {
  let value = segment.trim();
  for (const pattern of NOISE_PATTERNS) {
    value = value.replace(pattern, ' ');
  }
  return value.replace(/\s+/g, ' ').trim();
}

function splitTitle(title) {
  return title
    .split(/\||｜|·|•|–|—|-/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function inferSeries(title, description = '') {
  const haystack = `${title} ${description}`.toLowerCase();
  if (haystack.includes('brahmokal')) {
    return 'Brahmokal Tantrik';
  }
  return 'Taranath Tantrik';
}

export function inferExtraTags(title, description = '', baseTags = []) {
  const tags = new Set(baseTags);
  const haystack = `${title} ${description}`.toLowerCase();

  if (haystack.includes('brahmokal') && !tags.has('brahmokal-tantrik')) {
    tags.add('brahmokal-tantrik');
  }

  return [...tags];
}

export function parseYouTubeTitle(rawTitle) {
  const segments = splitTitle(rawTitle).map(cleanSegment).filter(Boolean);
  const bnCandidate = segments.find(hasBengali);
  const enCandidate = segments.find((segment) => !hasBengali(segment) && segment.length > 2);

  const bn = bnCandidate || (hasBengali(rawTitle) ? cleanSegment(rawTitle) : null);
  const en = enCandidate || (!hasBengali(rawTitle) ? cleanSegment(rawTitle) : null);

  return {
    bn: bn || null,
    en: en || null,
    display: bn || en || rawTitle.trim(),
  };
}

export function matchAuthorId({ title, description, authors }) {
  const haystack = `${title}\n${description}`.toLowerCase();
  const sorted = [...authors].sort((a, b) => b.name.length - a.name.length);

  for (const author of sorted) {
    if (haystack.includes(author.name.toLowerCase())) {
      return author.id;
    }
  }

  return null;
}

export function slugify(text, storyId) {
  const ascii = (text ?? 'untitled')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 72);

  const suffix = storyId.toLowerCase();
  const base = ascii || 'story';
  return `${base}-${suffix}`.replace(/-+/g, '-');
}

export function nextStoryId(prefix, stories) {
  let max = 0;

  for (const story of stories) {
    const match = story.id?.match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
    if (match) {
      max = Math.max(max, Number(match[1]));
    }
  }

  const next = max + 1;
  return `${prefix}-${String(next).padStart(3, '0')}`;
}
