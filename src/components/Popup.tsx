import {useStorePosts} from "../store/useStorePosts.ts";

export default function Popup() {
const { undoClearFavPosts } = useStorePosts();

    return (
        <div role="alert" aria-live="assertive" tabIndex={-1} className="absolute bottom-4 right-4 bg-gray-900 text-white rounded-lg shadow-lg px-6 py-4 flex items-center gap-4 animate-fade-in">
            <span>Alle Favoriten wurden entfernt.</span>
            <button
                className="text-black bg-white font-semibold px-3 py-1 rounded hover:bg-gray-400"
                onClick={undoClearFavPosts}
            >
                Rückgängig machen
            </button>
        </div>
    );
};