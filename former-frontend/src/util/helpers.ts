import useUserStore from '../stores/useUserStore.ts';

const apiURL = import.meta.env.VITE_API_URL;

export const authorisedRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'DELETE',
    allowUnauthorised: boolean = false,
    body?: object,
) => {
    const token = useUserStore.getState().user?.token;

    if (!token) {
        if (allowUnauthorised) {
            return await fetch(`${apiURL}/${url}`, {
                method,
                body: body ? JSON.stringify(body) : undefined,
            });
        } else {
            throw new Error('Unauthorised');
        }
    }

    return await fetch(`${apiURL}/${url}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
};

export const unauthorisedPost = async (url: string, body?: object) => {
    return await fetch(`${apiURL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
};
