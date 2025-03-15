import { create } from 'zustand';

interface PaginationState {
    pagination: Record<string, { page: number; limit: number }>;
    setPage: (tableKey: string, page: number) => void;
    setLimit: (tableKey: string, limit: number) => void;
}

const usePaginationStore = create<PaginationState>((set) => ({
    pagination: {},

    setPage: (tableKey, page) =>
        set((state) => ({
            pagination: { 
                ...state.pagination, 
                [tableKey]: { ...state.pagination[tableKey], page } 
            }
        })),

    setLimit: (tableKey, limit) =>
        set((state) => ({
            pagination: { 
                ...state.pagination, 
                [tableKey]: { page: 1, limit }  
            }
        })),
}));

export default usePaginationStore;