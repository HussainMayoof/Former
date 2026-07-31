import { Link, NavLink } from 'react-router';
import * as React from 'react';

type Props = {
    to: string;
    navLink?: boolean;
    children: React.ReactNode;
};

const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
};

const UnderlinedLink = ({ to, navLink = false, children }: Props) => {
    if (navLink) {
        return (
            <NavLink
                to={to}
                className="group inline-block w-fit"
                onClick={handleClick}
            >
                {' '}
                {children}
                <span
                    className={`block max-w-0 group-hover:max-w-full duration-200 h-px bg-gray-400`}
                ></span>{' '}
            </NavLink>
        );
    }

    return (
        <Link
            to={to}
            className="group inline-block w-fit"
            onClick={handleClick}
        >
            {children}
            <span
                className={`block max-w-0 group-hover:max-w-full duration-200 h-px bg-gray-400`}
            ></span>
        </Link>
    );
};

export default UnderlinedLink;
