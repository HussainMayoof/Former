import type { ReactNode } from 'react';
import { BsXCircle } from 'react-icons/bs';

interface Props {
    children: ReactNode;
}

const ErrorAlert = ({ children }: Props) => {
    return (
        <div role="alert" className="alert alert-error flex">
            <BsXCircle />
            <p className="flex-1 text-center">{children}</p>
        </div>
    );
};

export default ErrorAlert;
