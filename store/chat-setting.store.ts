import { create } from 'zustand'

interface ChatSettingsStore {
    isMobile: boolean
    showMessage: boolean
    setIsMobile: (value: boolean) => void
    setShowMessage: (value: boolean) => void
}

export const useChatSettings = create<ChatSettingsStore>((set) => ({
    isMobile: false,
    showMessage: true,
    setIsMobile: (value: boolean) => set({ isMobile: value }),
    setShowMessage: (value: boolean) => set({ showMessage: value }),
}))