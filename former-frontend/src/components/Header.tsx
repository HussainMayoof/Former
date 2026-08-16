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

                <div>
                    <label className="swap swap-rotate">
                        <input
                            type="checkbox"
                            data-toggle-theme="light,dark"
                            data-act-class="swap-active"
                        />

                        {/*Sun Icon*/}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-brightness-high swap-off"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                        </svg>

                        {/*Moon Icon*/}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-moon swap-on"
                            viewBox="0 0 16 16"
                        >
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                        </svg>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Header;
