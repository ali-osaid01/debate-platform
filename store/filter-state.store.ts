import { create } from 'zustand'

interface EventFilterState {
  selectedTopic: string | null
  searchUsername: string | null
  setSelectedTopic: (topic: string | null) => void
  setSearchUsername: (username: string | null) => void
  clearTopic: () => void
  clearUsername: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useEventFilterStore = create<EventFilterState>((set) => ({
  selectedTopic: null,
  searchUsername: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setSearchUsername: (username) => set({ searchUsername: username }),
  clearTopic: () => set({ selectedTopic: null }),
  clearUsername: () => set({ searchUsername: null }),
}))