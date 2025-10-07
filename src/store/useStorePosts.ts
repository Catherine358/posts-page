import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostsStore {
    favPosts: string[];
    temporaryFavPosts: string[];
    timeoutId: number | null;
    toggleFavPosts: (postId: string) => void;
    clearFavPosts: (options: { onDismiss: () => void }) => void;
    undoClearFavPosts: () => void;
    dismissCallback: (() => void) | null;
}

export const useStorePosts = create<PostsStore>()(persist((set, get) => ({
    favPosts: [],
    temporaryFavPosts: [],
    timeoutId: null,
    dismissCallback: null,
    toggleFavPosts: (postId) => set((state) => ({ favPosts: state.favPosts.includes(postId) ? state.favPosts.filter((prevPostId) => prevPostId !== postId) : [...state.favPosts, postId] })),
    clearFavPosts: ({ onDismiss }) => {
        const { favPosts, timeoutId } = get();
        if (timeoutId) clearTimeout(timeoutId);
        if (favPosts.length === 0) return;
        set({
            temporaryFavPosts: favPosts,
            favPosts: [],
            dismissCallback: onDismiss,
        });
        const newTimeoutId = setTimeout(() => {
            set({
                favPosts: [],
                temporaryFavPosts: [],
                timeoutId: null,
            });
            onDismiss();
        }, 10000);
        set({ timeoutId: newTimeoutId });
    },
    undoClearFavPosts: () => {
        const { timeoutId, temporaryFavPosts, dismissCallback } = get();
        if (timeoutId) clearTimeout(timeoutId);
        dismissCallback?.();
        set({
            favPosts: temporaryFavPosts,
            temporaryFavPosts: [],
            timeoutId: null,
            dismissCallback: null
        });
    },
}),
    { name: 'favPosts' },
    ));