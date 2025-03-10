import React, { useContext } from 'react';
import { NavContext } from '@/app/context/NavContext';

const MenuBtn: React.FC = () => {
    const navContext = useContext(NavContext);

    if (!navContext) {
        return null;
    }

    const { setIsOpen } = navContext;

    return (
        <div onClick={() => setIsOpen(true)}
             className='group flex flex-col gap-y-2 cursor-pointer xl:hidden group items-end'>
            <div className='w-7 h-[2px] bg-white transition-all'></div>
            <div className='w-4 group-hover:w-7 h-[2px] bg-white transition-all'></div>
            <div className='w-7 h-[2px] bg-white transition-all'></div>
        </div>
    );
};

export default MenuBtn;
