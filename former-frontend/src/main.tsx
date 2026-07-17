import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
