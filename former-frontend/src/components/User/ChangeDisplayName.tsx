import {
    type Dispatch,
    type SetStateAction,
    type SubmitEvent,
    useRef,
    useState,
} from 'react';
import type { User } from '../../types';
import { changeDisplayName } from '../../services/UserService.ts';
import { useAlertActions } from '../../store.ts';

type Props = {
    setUser: Dispatch<SetStateAction<User | null>>;
};

const ChangeDisplayName = ({ setUser }: Props) => {
    const [displayName, setDisplayName] = useState('');
    const modalRef = useRef<HTMLDialogElement>(null);
    const { setAlert } = useAlertActions();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = await changeDisplayName(displayName);
        setUser(newUser.user);
        setAlert('Success', 'Display name changed successfully');
        modalRef.current?.close();
    };

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() => modalRef.current?.showModal()}
            >
                Change Display Name
            </button>

            <dialog
                className="modal"
                ref={modalRef}
                onClose={() => setDisplayName('')}
            >
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Change Display Name</h3>

                    <form
                        className="flex flex-col gap-4 mt-6"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="New display name"
                            className="input w-full"
                            value={displayName}
                            onChange={({ target }) =>
                                setDisplayName(target.value)
                            }
                        />

                        <button
                            className="btn btn-primary w-fit self-end"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ChangeDisplayName;
