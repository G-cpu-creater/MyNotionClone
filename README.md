# MyCloneNotion

A standalone Notion-like notebook web application built with Next.js, TypeScript, and Yoopta Editor.

## Features

- ✅ Notion-like sidebar with page navigation
- ✅ Create and manage multiple pages
- ✅ Rich text editing with Yoopta Editor
- ✅ Auto-save functionality (2-second debounce)
- ✅ Local persistence using localStorage
- ✅ Clean, minimal UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS
- **Editor**: Yoopta Editor
- **State Management**: Zustand
- **Persistence**: localStorage

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
 ├─ app/
 │   ├─ layout.tsx           # Root layout
 │   ├─ page.tsx             # Home page
 │   └─ page/[id]/page.tsx   # Individual page view
 │
 ├─ components/
 │   ├─ Sidebar.tsx          # Sidebar with page list
 │   ├─ PageHeader.tsx       # Editable page title
 │   └─ EditorContainer.tsx  # Editor wrapper component
 │
 ├─ editor/
 │   └─ YooptaEditorWrapper.tsx  # Yoopta editor integration
 │
 ├─ store/
 │   └─ pageStore.ts         # Zustand store for page management
 │
 ├─ types/
 │   └─ page.ts              # TypeScript type definitions
 │
 └─ utils/
     └─ storage.ts           # localStorage utilities
```

## How It Works

1. **Pages**: Each page has a unique ID, title, and content (stored as JSON)
2. **Sidebar**: Lists all pages, allows creation of new pages
3. **Editor**: Uses Yoopta Editor for rich text editing with autosave
4. **Persistence**: All data is stored in localStorage (no backend required)

## Future Enhancements

This standalone app is designed to be modular and can be extended with:
- Backend API integration
- User authentication
- Real-time collaboration
- Cloud storage
- Page sharing and permissions

## License

MIT (adapted from MIT-licensed source repositories)
