import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import TextField from '../components/forms/TextField.tsx';
import SubmitButton from '../components/forms/SubmitButton.tsx';

export const { fieldContext, formContext, useFieldContext } =
    createFormHookContexts();

const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubmitButton,
    },
    fieldContext,
    formContext,
});

export default useAppForm;
