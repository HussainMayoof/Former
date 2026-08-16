import { Link } from 'react-router';
import UnderlinedLink from '../shared/UnderlinedLink.tsx';
import { useUser, useUserActions } from '../../store.ts';
import ThemeToggle from './ThemeToggle.tsx';

const Header = () => {
    const user = useUser();
    const { logout } = useUserActions();

    return (
        <nav className="grid grid-cols-3 items-center px-4">
            <div />

            <h1 className="text-2xl font-semibold text-center">
                <Link to="/" viewTransition>
                    Former
                </Link>
            </h1>

            <div className="flex justify-end gap-4 items-center">
                <ThemeToggle />

                {user && (
                    <>
                        <UnderlinedLink to="/posts/new" navLink>
                            New Post
                        </UnderlinedLink>

                        <div
                            className="avatar cursor-pointer avatar-placeholder"
                            onClick={logout}
                        >
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                <span className="text-md">
                                    {user.username[0].toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {!user && (
                    <>
                        <UnderlinedLink to="/login" navLink>
                            Log In
                        </UnderlinedLink>

                        <UnderlinedLink to="/register" navLink>
                            Register
                        </UnderlinedLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
