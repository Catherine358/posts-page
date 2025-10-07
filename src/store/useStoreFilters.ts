import { create } from 'zustand';

interface FiltersStore {
    selectedUserId: string;
    showOnlyFavPosts: boolean;
    filterByUserId: (userId: string) => void;
    toggleFavPosts: () => void;
}

export const useStoreFilters = create<FiltersStore>((set, get) => ({
    selectedUserId: '',
    showOnlyFavPosts: false,
    filterByUserId: (userId: string) => {
        const { selectedUserId } = get();
        if (userId === selectedUserId) return;
        set({ selectedUserId: userId });
    },
    toggleFavPosts: () => {
        const { showOnlyFavPosts } = get();
        set({ showOnlyFavPosts: !showOnlyFavPosts });
    },
}));