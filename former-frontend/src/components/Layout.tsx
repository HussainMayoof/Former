import Header from './Header.tsx';
import { Outlet } from 'react-router';

const Layout = () => (
    <div className="flex flex-col gap-4 bg-base-100 p-4 min-h-screen">
        <Header />
        <Outlet />
    </div>
);

export default Layout;
