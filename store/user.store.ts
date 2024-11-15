"use client";

import { IUser } from '@/types/interface/user.interface';
import { create } from 'zustand';

import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';

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
            set({ user: null });
            toast("Logout Successfully")
            deleteCookie("accessToken");
            localStorage.removeItem("accessToken")
        },
    };
});
