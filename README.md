# Art Institute Collection - Artworks Application

A beautiful React + TypeScript application for browsing artworks from the Art Institute of Chicago, built with Vite and PrimeReact.

## Features

- 🎨 Server-side pagination with PrimeReact DataTable
- ✅ ID-based row selection that persists across pages
- 🎯 Custom selection overlay panel
- 📊 Real-time selected count badge
- 🖼️ Beautiful gallery background image
- 📱 Responsive design with modern UI

## Tech Stack

- **React** 18.2.0
- **TypeScript** 5.2.0
- **Vite** 5.0.0
- **PrimeReact** 10.0.0
- **Fetch API** for data fetching

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
 ├─ api/
 │   └─ artworksApi.ts          # API service for fetching artworks
 ├─ components/
 │   ├─ ArtworkTable.tsx        # Main data table component
 │   ├─ SelectionOverlay.tsx    # Custom selection overlay panel
 │   └─ SelectedCountBadge.tsx  # Selected count display
 ├─ types/
 │   └─ artwork.ts              # TypeScript type definitions
 ├─ App.tsx                     # Main app component
 ├─ main.tsx                    # Entry point
 └─ index.css                   # Global styles
```

## API

The application uses the Art Institute of Chicago API:

```
https://api.artic.edu/api/v1/artworks?page=<pageNumber>
```

## Deployment

This project is configured for deployment on Netlify. The build settings are defined in `netlify.toml`.

## License

MIT
