'use client'
import React, {useEffect, useState, useContext} from 'react';
import {Link, Events, scrollSpy} from 'react-scroll';
import {useMediaQuery} from 'react-responsive';
import { NavContext } from "@/app/context/NavContext";

interface Props {
    containerStyles?: string;
    linkStyles?: string;
}

const links = [
    {path: 'home', name: 'Home'},
    {path: 'fromZero', name: 'FromZero'},
    {path: 'discography', name: 'Discography'},
    {path: 'contact', name: 'Contact'},
];

const Nav: React.FC<Props> = ({containerStyles = '', linkStyles = ''}) => {
    // Access NavContext directly in the Nav component
    const navContext = useContext(NavContext);

    const isDesktop = useMediaQuery({
        query: '(min-width: 1310px)'
    });

    const [activeLink, setActiveLink] = useState<string>('name');

    useEffect(() => {
        Events.scrollEvent.register('begin', () => {
        });

        Events.scrollEvent.register('end', () => {
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    const handleSetActive = (to: string) => {
        setActiveLink(to);
    };

    const handleLinkClick = () => {
        if (!isDesktop && navContext && navContext.setIsOpen) {
            navContext.setIsOpen(false);
        }
    };

    return (
        <nav className={`${containerStyles}`}>
            {links.map((link, index) => {
                const isActive = activeLink === link.path;

                return (
                    <Link
                        to={link.path}
                        className={`${linkStyles} cursor-pointer border-b-2 ${
                            isActive ? 'border-red-500' : 'border-transparent'
                        } hover:border-gray-300 transition-colors duration-300`}
                        key={index}
                        smooth={isDesktop}
                        spy={true}
                        offset={-50}
                        duration={500}
                        activeClass="active"
                        onSetActive={handleSetActive}
                        onClick={handleLinkClick}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Nav;