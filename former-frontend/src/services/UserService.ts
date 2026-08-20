import { unauthorisedPost } from '../util/helpers.ts';

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
