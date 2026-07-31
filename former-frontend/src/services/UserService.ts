const apiURL = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string) => {
    const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        return { error: (await response.json()).error };
    }

    return await response.json();
};
