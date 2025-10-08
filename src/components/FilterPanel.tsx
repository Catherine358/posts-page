import { useRef } from 'react';
import { useStorePosts } from '../store/useStorePosts.ts';
import Popup from './Popup.tsx';
import type { Post } from '../types/post.ts';
import { useStoreFilters } from '../store/useStoreFilters.ts';

interface FilterPanelProps {
  posts: Post[];
}

export default function FilterPanel({ posts }: FilterPanelProps) {
  const { favPosts, clearFavPosts, temporaryFavPosts } = useStorePosts();
  const { filterByUserId, toggleFavPosts, selectedUserId, showOnlyFavPosts } =
    useStoreFilters();

  const showAllBtnRef = useRef<HTMLButtonElement>(null);

  const showPopup = temporaryFavPosts.length > 0;

  const dismissPopup = () => {
    if (showAllBtnRef.current) {
      showAllBtnRef.current.focus();
    }
  };

  return (
    <div className="flex gap-4 align-items-center">
      {selectedUserId && posts.length > 0 && (
        <button
          onClick={() => filterByUserId('')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          User Filter entfernen
        </button>
      )}
      {(favPosts.length > 0 || showOnlyFavPosts) && (
        <button
          ref={showAllBtnRef}
          onClick={toggleFavPosts}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {showOnlyFavPosts ? 'Alle anzeigen' : 'Favoriten anzeigen'}
        </button>
      )}
      {showOnlyFavPosts && posts.length > 0 && (
        <button
          onClick={() => clearFavPosts({ onDismiss: dismissPopup })}
          className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Alle Favoriten entfernen
        </button>
      )}
      {showPopup && <Popup />}
    </div>
  );
}
