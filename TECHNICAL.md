# Technical Reference

Architecture and development guide for the Taranath Golpo Archive.

## Stack

| Layer | Choice |
|---|---|
| UI framework | React 19 |
| Build tool | Vite 8 |
| Styling | SCSS with CSS custom properties (design tokens) |
| Data | Static JSON bundled at build time |
| Design system | Standalone HTML/CSS/JS in `design/` |

No backend, router, or state management library. All filtering and search run client-side in memory.

## Repository layout

```
app/
  src/
    components/     Presentational React components
    handlers/       Pure functions — business logic, no React
    hooks/          React hooks that compose handlers + local state
    styles/         Global SCSS: tokens, mixins, base styles
  public/           Static assets (favicons, icons)
  vite.config.js    Path aliases: @ → src, @data → ../data

design/
  index.html        Interactive style guide (plain HTML)
  styles/           Component and token CSS files
  scripts/          Theme toggle, scroll reveal, showcase interactivity

data/
  master_data.json  Single source of truth for the catalog UI
```

The app and design system share visual language (colors, typography, spacing) but maintain **separate token files**:

- App: `app/src/styles/_tokens.scss`
- Design system: `design/styles/tokens.css`

Tokens are intentionally duplicated, not imported across folders, so each surface can evolve independently.

## Architecture

The app follows a thin **handlers + hooks + components** split:

```
master_data.json
      │
      ▼
storyDataHandler.js ──► useStories.js ──► App.jsx ──► components/
searchFilterHandler.js ──┘
themeHandler.js ──► useTheme.js
feedbackHandler.js ──► useFeedbackModal.js
aboutHandler.js ──► useAboutModal.js
headerScrollHandler.js ──► useHeaderScroll.js
scrollRevealHandler.js ──► useScrollReveal.js
```

### Handlers (`app/src/handlers/`)

Pure functions with no React dependencies. Responsible for:

- **`storyDataHandler.js`** — loads `master_data.json`, builds author/type maps, constructs story card view models, resolves YouTube URLs and thumbnails
- **`searchFilterHandler.js`** — filter state defaults, text search, multi-select filters, sort order, empty-state messages, results labels
- **`themeHandler.js`** — read/write `tt-theme` in `localStorage`, apply `data-theme` on `<html>`
- **`feedbackHandler.js`** — form state, validation, mailto URL construction (`VITE_FEEDBACK_EMAIL` env var)
- **`aboutHandler.js`** — extracts about-modal content from `master_data.json` meta
- **`headerScrollHandler.js`** — scroll position thresholds for header shrink and back-to-top visibility
- **`scrollRevealHandler.js`** — `IntersectionObserver` setup for staggered card reveal

### Hooks (`app/src/hooks/`)

Bridge handlers to React lifecycle:

- **`useStories`** — loads data once, debounces search (300 ms), derives filtered/sorted story cards and UI labels
- **`useTheme`** — theme state synced with `localStorage`
- **`useFeedbackModal` / `useAboutModal`** — open/close state and form handling
- **`useHeaderScroll`** — scroll listener with passive events
- **`useScrollReveal`** — attaches observer when story list changes

### Components (`app/src/components/`)

Mostly stateless. Key groups:

| Component | Role |
|---|---|
| `Header`, `Hero`, `Footer` | Page chrome |
| `FilterSidebar`, `FilterStrip`, `FilterPill` | Filter UI |
| `SearchBar` | Sticky search input |
| `StoryGrid`, `StoryCard`, `Tag` | Story listing |
| `EmptyState` | No-results state |
| `AboutModal`, `FeedbackModal` | Overlays |
| `ThemeToggle`, `BackToTop`, `FeedbackTrigger` | Utility controls |

## Data model

All catalog data lives in `data/master_data.json`.

### Top-level shape

```json
{
  "meta": { "version", "updatedAt", "stats", "about", "filters" },
  "authors": [ { "id", "name", "nameBn", ... } ],
  "stories": [ { "id", "title", "authors", "storyType", "lineage", "media", ... } ]
}
```

### Story fields used by the UI

| Field | Purpose |
|---|---|
| `title.en` / `title.bn` | Display and search |
| `authors[]` | Author filter and card attribution |
| `storyType` | Original vs fan fiction filter |
| `lineage` | Bandyopadhyay lineage filter |
| `media[].platform === "youtube"` | External listen link and thumbnail |
| `publishedYear` | Sort and display |

Only stories with a YouTube URL are shown in the grid (`getStoriesWithYouTube`).

### Filter state

Managed in `useStories` as a plain object:

```js
{
  searchQuery: '',
  authors: [],       // author IDs
  storyTypes: [],    // e.g. 'original', 'fanFiction'
  lineages: [],      // lineage values
  sortBy: 'title',   // 'title' | 'year'
  sortOrder: 'asc',  // 'asc' | 'desc'
}
```

Search matches against English title, Bengali title, and author names (case-insensitive substring).

## Styling

### Design tokens

Defined as CSS custom properties in `_tokens.scss`. Key groups:

- **Colors** — dark-first palette with ember-red accent (`--color-accent`)
- **Typography** — Cormorant Garamond (display), Inter (body), JetBrains Mono (UI labels)
- **Spacing** — `--space-1` through `--space-32`
- **Layout** — `--layout-max-width`, `--footer-height`, responsive breakpoints

Theme switching toggles `[data-theme='light']` overrides on `<html>`.

### SCSS structure

```
styles/
  _tokens.scss    CSS variables (light + dark)
  _mixins.scss    focus rings, media queries
  _base.scss      reset, typography defaults
  main.scss       entry point
```

Component styles live alongside components (`ComponentName.scss`).

## Design system (`design/`)

A self-contained interactive style guide documenting philosophy, colors, typography, spacing, shadows, and component patterns. Built with plain CSS and vanilla JS — no build step.

Sections: Philosophy, Colors, Typography, Spacing, Shadows, Tags, Header, Story Card, Filters, Loading, Footer.

Run locally by opening `design/index.html` or serving the folder:

```bash
npx serve design
```

The app footer links to `/design/index.html`. When deploying, place the `design/` folder at the site root alongside the built app. During local development, the Vite dev server serves `design/` automatically.

## Environment variables

| Variable | Used by | Purpose |
|---|---|---|
| `VITE_FEEDBACK_EMAIL` | `feedbackHandler.js` | Recipient for story suggestion mailto links |

Create `app/.env.local`:

```
VITE_FEEDBACK_EMAIL=your@email.com
```

If unset, the feedback form still validates but cannot generate a mailto URL.

## Scripts

From `app/`:

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `app/dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## Path aliases

Configured in `vite.config.js`:

```js
'@'      → app/src/
'@data'  → data/
```

Example: `import masterData from '@data/master_data.json'`

## Deployment notes

1. Build the app: `cd app && npm run build`
2. Deploy `app/dist/` as the site root (or subpath)
3. Copy or co-deploy `design/` at `/design/` relative to the host root
4. Ensure `data/master_data.json` is bundled — it is imported statically and included in the build output

No server-side rendering or API routes are required.

## Extending the catalog

1. Edit `data/master_data.json` — add authors, stories, or update `meta.stats`
2. Rebuild the app
3. Verify filters in `meta.filters` include any new filter option values

Source datasets in `_archive/` (gitignored) were used to compile the master catalog and are kept for reference only.
