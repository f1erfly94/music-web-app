import React, { useContext } from 'react';
import { NavContext } from "@/app/context/NavContext";
import { RiCloseLine } from 'react-icons/ri';
import Nav from "@/app/components/Nav";

const NavMobile: React.FC = () => {
    const { isOpen, setIsOpen } = useContext(NavContext);

    return (
        <nav className={`${isOpen ? 'right-0' : 'right-full'} 
            xl:hidden bg-[#1c060b] fixed w-full top-0 z-20 bottom-0 transition-all duration-500`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='absolute right-4 top-5 cursor-pointer '>
                <RiCloseLine className='text-5xl' />
            </div>
            <Nav containerStyles="flex flex-col text-[30px] ppercase font-bold bg-[#4d0919 h-full items-center justify-center gap-y-8"/>
        </nav>
    );
};

export default NavMobile;
