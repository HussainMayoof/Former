import { Link } from 'react-router';
import UnderlinedLink from './shared/UnderlinedLink';
import { useUser, useUserActions } from '../store.ts';

const Header = () => {
    const user = useUser();
    const { logout } = useUserActions();

    return (
        <nav className="grid grid-cols-3 items-center px-4">
            <div />

            <Link
                to="/"
                className="text-2xl font-semibold text-center"
                viewTransition
            >
                Former
            </Link>

            <div className="flex justify-end gap-4">
                {user && (
                    <>
                        <UnderlinedLink to="/posts/new" navLink>
                            <p className="hover:text-gray-400 duration-200">
                                New Post
                            </p>
                        </UnderlinedLink>

                        <button
                            className="hover:text-gray-400 duration-200 cursor-pointer"
                            onClick={() => {
                                logout();
                            }}
                        >
                            Log Out
                        </button>
                    </>
                )}

                {!user && (
                    <>
                        <UnderlinedLink to="/login" navLink>
                            <p className="hover:text-gray-400 duration-200">
                                Log In
                            </p>
                        </UnderlinedLink>

                        <UnderlinedLink to="/register" navLink>
                            <p className="hover:text-gray-400 duration-200">
                                Register
                            </p>
                        </UnderlinedLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
