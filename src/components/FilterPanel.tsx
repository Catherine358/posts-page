import {useStorePosts} from "../store/useStorePosts.ts";
import Popup from "./Popup.tsx";
import type {Post} from "../types/post.ts";

interface FilterPanelProps {
    posts: Post[];
    filters: {
        selectedUserId: string;
        showOnlyFavPosts: boolean;
    }
    actions: {
        resetFilterByUser: () => void;
        toggleOnlyFavPosts: () => void;
    }
}

export default function FilterPanel({ posts, filters, actions }: FilterPanelProps) {
    const { selectedUserId, showOnlyFavPosts } = filters;
    const { resetFilterByUser, toggleOnlyFavPosts } = actions;
    const { favPosts, clearFavPosts, temporaryFavPosts } = useStorePosts();

    const showPopup = temporaryFavPosts.length > 0;

    return (
        <div className="flex gap-4 align-items-center">
            {selectedUserId && posts.length > 0 && (
                <button
                    onClick={resetFilterByUser}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    User Filter entfernen
                </button>
            )}
            {(favPosts.length > 0 || showOnlyFavPosts) && (
                <button
                    onClick={toggleOnlyFavPosts}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {showOnlyFavPosts ? 'Alle anzeigen' : 'Favoriten anzeigen'}
                </button>
            )}
            {showOnlyFavPosts && posts.length > 0 && (
                <button
                    onClick={clearFavPosts}
                    className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Alle Favoriten entfernen
                </button>
            )}
            {showPopup && (
                <Popup />
            )}
        </div>
    );
};