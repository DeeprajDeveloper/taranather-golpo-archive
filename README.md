# Taranath Golpo Archive

**তারানাথের গল্প** — a fan-built, read-only index of [Taranath Tantrik](https://en.wikipedia.org/wiki/Taranath_Tantrik) stories. Browse original works from the Bandyopadhyay lineage and fan fiction from later writers and narrators, then jump straight to YouTube to listen.

This site is maintained by readers, not a publisher. It links to publicly available audio and video rather than hosting story text.

## What's in the collection

| | |
|---|---|
| **132** stories catalogued | **129** with YouTube links |
| **32** original lineage | **100** fan fiction |
| **24** authors | |

Stories can be searched, filtered by author, story type, and lineage, and sorted by title or date.

## Project structure

```
taranather-golpo-archive/
├── app/          React + Vite web application
├── design/       Interactive design system & style guide
├── data/         Master story catalog (master_data.json)
└── _archive/     Source datasets used to build the catalog (gitignored)
```

## Getting started

### Run the app

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### View the design system

Open [`design/index.html`](design/index.html) in a browser, or serve the `design/` folder with any static file server. The app footer also links to the design system page — during `npm run dev`, Vite serves it at `/design/index.html`.

### Build for production

```bash
cd app
npm run build
npm run preview
```

When deploying, serve both `app/dist` (the app) and `design/` from the same site root so the footer design-system link resolves correctly.

## Features

- **Search & filter** — full-text search with debouncing; filter by author, story type, and lineage
- **YouTube integration** — each story card links to its audio/video on YouTube
- **Light / dark theme** — persisted in local storage
- **About modal** — background on the character, collection stats, and further reading
- **Story suggestions** — feedback form for recommending missing stories

## License

MIT — see [LICENSE](LICENSE). Created by Deepraj Adhikary.

For architecture, data schema, and development details, see [TECHNICAL.md](TECHNICAL.md).
