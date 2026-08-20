import { AnimatePresence, motion } from 'framer-motion';
import { BsExclamationTriangle, BsXCircle } from 'react-icons/bs';
import { useAlert } from '../store.ts';

const Alert = () => {
    const { show, type, message } = useAlert();

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    role="alert"
                    className={`alert ${type === 'Error' && 'alert-error'} ${type === 'Warning' && 'alert-warning'} fixed bottom-12 left-1/2 z-99 p-4`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ x: '-50%' }}
                >
                    {type === 'Error' && <BsXCircle />}
                    {type === 'Warning' && <BsExclamationTriangle />}
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
