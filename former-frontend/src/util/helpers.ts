import useUserStore from '../stores/useUserStore.ts';
import useAlertStore from '../stores/useAlertStore.ts';

const apiURL = import.meta.env.VITE_API_URL;

export const authorisedRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'DELETE',
    allowUnauthorised: boolean = false,
    body?: object,
) => {
    const token = useUserStore.getState().user?.token;
    const { logout } = useUserStore.getState().actions;
    const { setAlert } = useAlertStore.getState().actions;

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

    const response = await fetch(`${apiURL}/${url}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
        const data = await response.json();
        const code = data?.code;
        if (code === 'USER_NOT_FOUND') {
            logout();
            setAlert(
                'Error',
                'Authentication error, logged out, please refresh',
                5000,
            );
        }
    }

    return response;
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
