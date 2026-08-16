import { useFieldContext } from '../../hooks/useAppForm.tsx';
import { BsExclamationCircle } from 'react-icons/bs';
import { useSelector } from '@tanstack/react-form';

interface Props {
    label: string;
    type?: 'text' | 'password';
}

const TextField = ({ label, type = 'text' }: Props) => {
    const field = useFieldContext<string>();

    const hasSubmitted = useSelector(
        field.form.store,
        (state) => state.submissionAttempts > 0,
    );
    const showError =
        !field.state.meta.isValid &&
        (field.state.meta.isBlurred || hasSubmitted);

    return (
        <label className="flex flex-col gap-1">
            <span>{label}</span>

            <input
                type={type}
                className={`input ${showError ? 'border-error!' : ''}`}
                value={field.state.value}
                onChange={({ target }) => field.handleChange(target.value)}
                onBlur={field.handleBlur}
            />

            {showError && (
                <span className="text-error text-sm inline-flex items-center gap-2">
                    <BsExclamationCircle className="text-error" />
                    {field.state.meta.errors[0].message}
                </span>
            )}
        </label>
    );
};

export default TextField;
