import React, {useContext} from 'react';
import {NavContext} from "@/app/context/NavContext";


const NavMobile: React.FC = () => {
    const {isOpen, setIsOpen} = useContext(NavContext);
    return (
        <nav className={`${isOpen ? 'right-0' : 'right-full'}
         xl:hidden bg-red-800 fixed w-full top-0 z-20 bottom-0 transition-all duration-500`}
        >
            NavMobile
        </nav>
    );
};

export default NavMobile;