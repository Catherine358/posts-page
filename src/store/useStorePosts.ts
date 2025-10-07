import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostsStore {
    favPosts: string[];
    toggleFavPosts: (postId: string) => void;
    clearFavPosts: () => void;
}

export const useStorePosts = create<PostsStore>()(persist((set) => ({
    favPosts: [],
    toggleFavPosts: (postId) => set((state) => ({ favPosts: state.favPosts.includes(postId) ? state.favPosts.filter((prevPostId) => prevPostId !== postId) : [...state.favPosts, postId] })),
    clearFavPosts: () => set({ favPosts: [] }),
}),
    { name: 'favPosts' },
    ));