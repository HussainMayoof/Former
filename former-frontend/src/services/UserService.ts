import { unauthorisedPost } from '../util/helpers.ts';

const apiURL = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string) => {
    const response = await unauthorisedPost('login', { username, password });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};

export const register = async (username: string, password: string) => {
    const response = await unauthorisedPost('users', { username, password });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};

export const getUser = async (username: string) => {
    const response = await fetch(`${apiURL}/users/${username}`);

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};
