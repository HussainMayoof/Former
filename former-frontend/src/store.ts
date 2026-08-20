import { useShallow } from 'zustand/react/shallow';
import useUserStore from './stores/useUserStore.ts';
import usePostsStore from './stores/usePostsStore.ts';
import usePostStore from './stores/usePostStore.ts';
import useAlertStore from './stores/useAlertStore.ts';

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);

export const usePosts = () =>
    usePostsStore(
        useShallow((state) => ({
            posts: state.posts,
            loading: state.loading,
        })),
    );
export const usePostsActions = () => usePostsStore((state) => state.actions);

export const usePost = () =>
    usePostStore(
        useShallow((state) => ({
            post: state.post,
            loading: state.loading,
        })),
    );
export const usePostActions = () => usePostStore((state) => state.actions);

export const useAlert = () => useAlertStore((state) => state.alert);
export const useAlertActions = () => useAlertStore((state) => state.actions);
