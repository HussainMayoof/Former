import { useEffect, useState } from 'react';
import { useUserActions } from '../store.ts';
import { useNavigate } from 'react-router';
import type { SubmitEvent } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>();

    const navigate = useNavigate();
    const { login } = useUserActions();

    useEffect(() => {
        document.title = 'Former - Log In';
    }, []);

    const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/', { viewTransition: true });
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center gap-4 p-12 m-6 border-2 rounded-4xl"
        >
            {error && <p>{error.message}</p>}

            <div className="flex flex-col gap-4 w-64">
                <label className="flex flex-col gap-1">
                    Username:{' '}
                    <input
                        type="text"
                        className="input w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    Password:{' '}
                    <input
                        type="password"
                        className="input w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button className="btn btn-primary" type="submit">
                    Log In
                </button>
            </div>
        </form>
    );
};

export default Login;
