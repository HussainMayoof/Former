import { useEffect, useState } from 'react';
import { useUserActions } from '../../store.ts';
import { useNavigate } from 'react-router';

const Register = () => {
    const [username, setUsername] = useState('');
    const [usernameTouched, setUsernameTouched] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationTouched, setPasswordConfirmationTouched] =
        useState(false);

    const { register } = useUserActions();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Former - Register';
    }, []);

    const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsernameTouched(true);
        if (password === passwordConfirmation) {
            try {
                await register(username, password);
                navigate('/');
            } catch (e) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-stretch gap-4 p-12 m-6 border-2 rounded-4xl"
            noValidate
        >
            <div>
                <label className="flex flex-col gap-1">
                    Username:{' '}
                    <input
                        type="text"
                        className="input peer"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => setUsernameTouched(true)}
                        required
                        minLength={4}
                        maxLength={20}
                    />
                    <p
                        className={`text-red-500 text-sm hidden ${usernameTouched ? 'peer-invalid:block' : ''}`}
                    >
                        Username must be between 4 and 20 characters long
                    </p>
                </label>
            </div>

            <div>
                <label className="flex flex-col gap-1">
                    Password:{' '}
                    <input
                        type="password"
                        className="input peer"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setPasswordTouched(true)}
                        required
                        minLength={6}
                        maxLength={40}
                    />
                    <p
                        className={`text-red-500 text-sm hidden ${passwordTouched ? 'peer-invalid:block' : ''}`}
                    >
                        Password must be between 6 and 40 characters long
                    </p>
                </label>
            </div>

            <div>
                <label className="flex flex-col gap-1">
                    Confirm Password:{' '}
                    <input
                        type="password"
                        className="input peer"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        onBlur={() => setPasswordConfirmationTouched(true)}
                    />
                    <p
                        className={`text-red-500 text-sm ${passwordConfirmationTouched && password !== passwordConfirmation ? 'block' : 'hidden'}`}
                    >
                        Passwords must match
                    </p>
                </label>
            </div>

            <button className="submit-button" type="submit">
                Register
            </button>
        </form>
    );
};

export default Register;
