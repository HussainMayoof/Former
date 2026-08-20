import { useEffect } from 'react';
import { useAlertActions, useUserActions } from '../store.ts';
import { useNavigate } from 'react-router';
import useAppForm from '../hooks/useAppForm.tsx';
import {
    UserLoginParams,
    type UserLoginParamsType,
} from '@former/shared/schemas';

const Login = () => {
    const { setAlert } = useAlertActions();

    const navigate = useNavigate();
    const { login } = useUserActions();

    useEffect(() => {
        document.title = 'Former - Login';
    }, []);

    const onSubmit = async (value: UserLoginParamsType) => {
        try {
            await login(value.username, value.password);
            navigate('/', { viewTransition: true });
        } catch (e) {
            if (e instanceof Error) {
                setAlert('Error', e.message, 5000);
            }
        }
    };

    const form = useAppForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validators: {
            onChange: UserLoginParams,
            onSubmit: UserLoginParams,
        },
        onSubmit: ({ value }) => {
            void onSubmit(value);
        },
    });

    return (
        <form
            className="flex flex-col items-center gap-4 p-12 m-6 border-2 rounded-4xl"
            onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit();
            }}
        >
            <h2 className="text-2xl">Log In</h2>
            <hr className="w-3/4" />

            <div className="flex flex-col gap-4 w-64">
                <form.AppField
                    name="username"
                    children={(field) => <field.TextField label="Username" />}
                />

                <form.AppField
                    name="password"
                    children={(field) => (
                        <field.TextField label="Password" type="password" />
                    )}
                />

                <form.AppForm>
                    <form.SubmitButton label="Log In" />
                </form.AppForm>
            </div>
        </form>
    );
};

export default Login;
