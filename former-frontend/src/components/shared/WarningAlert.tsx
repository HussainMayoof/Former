import { AnimatePresence, motion } from 'framer-motion';
import { BsExclamationTriangle } from 'react-icons/bs';

interface Props {
    show: boolean;
    message: string;
}

const WarningAlert = ({ show, message }: Props) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    role="alert"
                    className="alert alert-warning fixed bottom-12 left-1/2 z-99 p-4"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ x: '-50%' }}
                >
                    <BsExclamationTriangle />
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WarningAlert;
