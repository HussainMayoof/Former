import Header from './Header';
import { Outlet } from 'react-router';
import { themeChange } from 'theme-change';
import { useEffect } from 'react';
import Alert from './Alert.tsx';

const Layout = () => {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <div className="flex flex-col gap-4 bg-base-100 p-4 min-h-screen">
            <Alert />
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;
