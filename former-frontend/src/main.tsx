import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <meta name="robots" content="noindex, nofollow" />
        <RouterProvider router={router} />
    </StrictMode>,
);
