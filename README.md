# Photography Portfolio

Personal photography website built with React + TypeScript + Vite.

## Adding Photos

1. Add your photos to `public/photos/`
2. Update `src/data/photos.json` with metadata:

```json
[
  {
    "filename": "your-photo.jpg",
    "title": "Photo Title",
    "tags": ["landscape", "nature"],
    "description": "Optional description"
  }
]
```

3. Push to GitHub - the site deploys automatically

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
