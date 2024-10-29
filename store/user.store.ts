import { IUser } from '@/types/interface/user.interface';
import { create } from 'zustand';

interface UserStore {
    user: IUser | null;
    getUser: () => IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    getUser: () => get().user,
    setUser: (user: IUser) => set({ user }),
    clearUser: () => set({ user: null }),
}));

