import React, { useEffect, useState } from 'react';
import { Link, Events, scrollSpy } from 'react-scroll';

interface Props {
    containerStyles?: string;
    linkStyles?: string;
}

const links = [
    { path: 'home', name: 'Home' },
    { path: 'about', name: 'About' },
    { path: 'discography', name: 'Discography' },
    { path: 'contact', name: 'Contact' },
];

const Nav: React.FC<Props> = ({ containerStyles = '', linkStyles = '' }) => {
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
                        smooth={true}
                        spy={true}
                        offset={-50}
                        duration={500}
                        activeClass="active"
                        onSetActive={handleSetActive}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Nav;