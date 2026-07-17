import { NavLink } from 'react-router';

const Header = () => {
    return (
        <nav className="grid grid-cols-3 items-center px-4">
            <div />
            <NavLink to="/" className="text-2xl text-center">
                Former
            </NavLink>
            <div className="flex justify-end gap-4">
                <NavLink to="/users">Users</NavLink>
            </div>
        </nav>
    );
};

export default Header;
