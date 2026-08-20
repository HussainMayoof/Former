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
                className="group inline-block w-fit hover:text-tertiary-content duration-200"
                onClick={handleClick}
                viewTransition
            >
                {children}
                <span
                    className={`block max-w-0 -mt-0.5 group-hover:max-w-full duration-200 h-px bg-tertiary-content`}
                ></span>
            </NavLink>
        );
    }

    return (
        <Link
            to={to}
            className="group inline-block w-fit hover:text-tertiary-content duration-200"
            onClick={handleClick}
            viewTransition
        >
            {children}
            <span
                className={`block max-w-0 -mt-0.5 group-hover:max-w-full duration-200 h-px bg-tertiary-content`}
            ></span>
        </Link>
    );
};

export default UnderlinedLink;
