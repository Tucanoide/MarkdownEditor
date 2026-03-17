# Architecture & Project Objective

## Project Objective
The Markdown Editor is designed to provide a premium, native-feeling document editing experience directly in the web browser. It focuses on speed, elegance, and direct integration with the local file system.

### Key Goals
- **Native Experience**: Use the modern Web File System Access API to allow users to work directly with local files.
- **Visual Excellence**: Maintain a clean, premium Zinc-themed aesthetic with seamless transition between light and dark modes.
- **Rich Rendering**: Support full GitHub Flavored Markdown (GFM), including specialized callouts/alerts and raw HTML when needed.
- **Developer-Centric**: Built with TypeScript for robustness and Vite for a lightning-fast development cycle.

## Tech Stack
- **Frontend**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown Processing**: 
  - `react-markdown` (rendering)
  - `remark-gfm` (GitHub Flavored Markdown)
  - `remark-github-blockquote-alert` (GitHub callouts)
  - `rehype-raw` (HTML support)
  - `@tailwindcss/typography` (prose styling)

## Architecture Overview
The application follows a modular component-based architecture:

### 1. Core State & App Shell (`App.tsx`)
Manages the global state for the current markdown content, theme (dark/light), and integrates the file system hooks.

### 2. File System Bridge (`useFileSystem.ts`)
A custom hook that abstracts the complexity of the browser's File System Access API. It tracks the "dirty" state of the document and manages file handles.

### 3. Editor Component (`EditorPane.tsx`)
A high-performance textarea-based editor with a custom Toolbar for quick formatting. It handles keyboard shortcuts like Tab indentation.

### 4. Preview Component (`PreviewPane.tsx`)
A reactive component that transforms the markdown string into stylized HTML using the `remark`/`rehype` ecosystem.

## Design System
- **Palette**: Zinc (Grayscale) for a neutral, professional look.
- **Typography**: Mono for editing, Sans (Inter/System) for the interface.
- **Aesthetics**: Glassmorphism touches on the navbar, subtle borders, and smooth transitions.

## Performance & Optimization
- **Hostinger Awareness**: Optimized for low resource usage. Minimal server-side processes are used, with most logic handled on the client.
- **Server Components**: Future refactoring will prioritize Next.js Server Components where applicable, although currently strictly a Vite SPA.
