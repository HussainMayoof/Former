import { create } from 'zustand';
import type { AlertState } from '../types.ts';

const useAlertStore = create<AlertState>((set) => ({
    alert: { show: false, type: 'Error', message: '' },
    actions: {
        setAlert: (type, message, duration = 2000) => {
            set({ alert: { show: true, type, message } });
            setTimeout(
                () =>
                    set((state) => ({
                        alert: { ...state.alert, show: false },
                    })),
                duration,
            );
        },
    },
}));

export default useAlertStore;
