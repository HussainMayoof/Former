import { useRef } from 'react';
import { changePassword } from '../../services/UserService.ts';
import { useAlertActions } from '../../store.ts';
import {
    UserChangePasswordParams,
    type UserChangePasswordParamsType,
} from '@former/shared/schemas';
import useAppForm from '../../hooks/useAppForm.tsx';

const ChangePassword = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const { setAlert } = useAlertActions();

    const onSubmit = async (value: UserChangePasswordParamsType) => {
        try {
            const response = await changePassword(
                value.oldPassword,
                value.password,
            );
            if (response) {
                modalRef.current?.close();
                setAlert('Success', 'Password changed successfully');
            }
        } catch (e) {
            if (e instanceof Error) {
                setAlert('Error', e.message, 5000);
            }
        }
    };

    const form = useAppForm({
        defaultValues: {
            oldPassword: '',
            password: '',
            passwordConfirmation: '',
        },
        validators: {
            onChange: UserChangePasswordParams,
            onSubmit: UserChangePasswordParams,
        },
        onSubmit: ({ value }) => {
            void onSubmit(value);
        },
    });

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() => modalRef.current?.showModal()}
            >
                Change Password
            </button>

            <dialog
                className="modal"
                ref={modalRef}
                onClose={() => form.reset()}
            >
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Change Password</h3>

                    <form
                        className="flex flex-col items-center gap-4 mt-6 mb-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            void form.handleSubmit();
                        }}
                    >
                        <div className="flex flex-col gap-4 w-3/4">
                            <form.AppField
                                name="oldPassword"
                                children={(field) => (
                                    <field.TextField
                                        label="Old Password"
                                        type="password"
                                    />
                                )}
                            />

                            <form.AppField
                                name="password"
                                children={(field) => (
                                    <field.TextField
                                        label="New Password"
                                        type="password"
                                    />
                                )}
                            />

                            <form.AppField
                                name="passwordConfirmation"
                                children={(field) => (
                                    <field.TextField
                                        label="New Password Confirmation"
                                        type="password"
                                    />
                                )}
                            />

                            <form.AppForm>
                                <form.SubmitButton label="Submit" />
                            </form.AppForm>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ChangePassword;
