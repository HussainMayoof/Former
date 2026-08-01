import { useState } from 'react';
import { useUserActions } from '../../store.ts';
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error>();

    const navigate = useNavigate();
    const { login } = useUserActions();

    const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-stretch gap-4 p-12 m-6 border-2 rounded-4xl"
        >
            {error && <p>{error.message}</p>}

            <label className="flex flex-col gap-1">
                Username:{' '}
                <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1">
                Password:{' '}
                <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button className="submit-button" type="submit">
                Log In
            </button>
        </form>
    );
};

export default Login;
