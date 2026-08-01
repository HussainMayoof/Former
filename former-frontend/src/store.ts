import { create } from 'zustand';
import type { UserState } from './types.ts';
import {
    login as loginRequest,
    register as registerRequest,
} from './services/UserService.ts';
import { persist } from 'zustand/middleware';

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: undefined,
            actions: {
                login: async (username, password) => {
                    const response = await loginRequest(username, password);
                    if (!response.error) {
                        set({ user: response });
                    } else {
                        throw new Error(response.error);
                    }
                },
                register: async (username, password) => {
                    const response = await registerRequest(username, password);
                    if (!response.error) {
                        set({ user: response });
                    } else {
                        throw new Error(response.error);
                    }
                },
                logout: () => {
                    set({ user: undefined });
                },
            },
        }),
        { name: 'user-storage', partialize: (state) => ({ user: state.user }) },
    ),
);

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
