import { Link } from 'react-router';
import UnderlinedLink from '../shared/UnderlinedLink.tsx';
import { useUser, useUserActions } from '../../store.ts';
import ThemeToggle from './ThemeToggle.tsx';
import { BsBoxArrowRight } from 'react-icons/bs';

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

                        <div className="dropdown">
                            <div
                                className="avatar cursor-pointer avatar-placeholder"
                                tabIndex={0}
                                role="button"
                            >
                                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                    <span className="text-md">
                                        {user.username[0].toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <ul
                                tabIndex={-1}
                                className="dropdown-content menu bg-base-200 rounded-box z-1 w-40 mt-0.5 shadow-xl right-0 duration-200"
                            >
                                <li>
                                    <a href={`/users/${user.username}`}>
                                        View Profile
                                    </a>
                                </li>
                                <li onClick={logout}>
                                    <p className="text-error">
                                        Log Out <BsBoxArrowRight />
                                    </p>
                                </li>
                            </ul>
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
