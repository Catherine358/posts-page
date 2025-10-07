import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostsStore {
    favPosts: string[];
    temporaryFavPosts: string[];
    timeoutId: number | null;
    toggleFavPosts: (postId: string) => void;
    clearFavPosts: () => void;
    undoClearFavPosts: () => void;
}

export const useStorePosts = create<PostsStore>()(persist((set, get) => ({
    favPosts: [],
    temporaryFavPosts: [],
    timeoutId: null,
    toggleFavPosts: (postId) => set((state) => ({ favPosts: state.favPosts.includes(postId) ? state.favPosts.filter((prevPostId) => prevPostId !== postId) : [...state.favPosts, postId] })),
    clearFavPosts: () => {
        const { favPosts, timeoutId } = get();
        if (timeoutId) clearTimeout(timeoutId);
        if (favPosts.length === 0) return;
        set({
            temporaryFavPosts: favPosts,
            favPosts: [],
        });
        const newTimeoutId = setTimeout(() => {
            set({
                favPosts: [],
                temporaryFavPosts: [],
                timeoutId: null,
            });
        }, 10000);
        set({ timeoutId: newTimeoutId });
    },
    undoClearFavPosts: () => {
        const { timeoutId, temporaryFavPosts } = get();
        if (timeoutId) clearTimeout(timeoutId);
        set({
            favPosts: temporaryFavPosts,
            temporaryFavPosts: [],
            timeoutId: null,
        });
    }
}),
    { name: 'favPosts' },
    ));