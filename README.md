# Posts-Page: React + TypeScript + Vite

React application for managing and displaying posts with filtering by user and favorites functionality.

Features:

- Posts display: Browse posts fetched from https://jsonplaceholder.typicode.com API
- Filtering by user: Filter posts by author clicking on author name
- Favorites: Add/ remove posts to / from favorites with persistent storage
- Removing all favorites: Unmark all posts with one click
- Undo removing all favorites: Restore cleared favorites within 10 seconds
- Responsiveness: Tailwind Css
- Accessibility: Basic ARIA attributes and keyboard navigation support

## Tech Stack

### Technologies used

- React 19: Suspense
- Typescript: Type-safe development
- Vite
- Tailwind Css: Faster mobile-first approach
- ESLint, Prettier: Code quality

### State management

- Zustand: Best for small application with localStorage support, used for favorite posts and filters

## Installation

- Node.js 18+
- npm

## Setup

1. Clone repository:

- git clone https://github.com/Catherine358/posts-page.git
- cd posts-page

2. Install dependencies

- npm install

3. Start server

- npm run dev

4. Open localhost

## Design decisions

### State management

- Zustand over Redux: Better for small app, has built-in persistence
- Separate stores: Separation between posts and UI (filters)
- Suspense with ErrorBoundary: To handle error in a modern way

### Performance

- Map over Object for user lookup: O(1), can become meaningful when there are 10000 data entries
- Tailwind Css: Minimal Css bundle
- Promise.all: Everything or nothing, no point to fetch data separately
- Conditional rendering: Components are rendered when needed
- No caching with useMemo: Better to fight with backend developers to implement difficult calculations on server side and leave frontend to be a princess

### Accessibility

- List of posts over table: Clear structure for blog posts, no need to change to list in mobile view
- ARIA: Role alert on Popup to inform user, arial-labels on buttons that do not have informative texts
- Semantic HTML: As much as possible
- Keyboard navigation: Thanks to semantic HTML
- Focus management using callbacks in store: To provide auto-focus

### Future improvements

- Add unit and integration tests
- Implement pagination for larger lists
- Search functionality
