"use client";

import { IUser } from '@/types/interface/user.interface';
import { create } from 'zustand';
import { deleteCookie } from 'cookies-next';

interface UserStore {
    user: IUser | null;
    getUser: () => IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => {
    
    return {
        user: null,
        getUser: () => get().user,
        setUser: (user: IUser) => set({ user }),

        clearUser: () => {
            deleteCookie('accessToken', { path: '/', maxAge: 0 });            
            localStorage.removeItem("accessToken")
            set({ user: null });
        },
    };
});
