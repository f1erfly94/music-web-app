import React, { useContext } from 'react';
import { NavContext } from "@/app/context/NavContext";

const useNavContext = () => {
    const context = useContext(NavContext);
    if (context === undefined) {
        throw new Error('useNavContext must be used within a NavContextProvider');
    }
    return context;
};

const MenuBtn: React.FC = () => {
    const { setIsOpen } = useNavContext();

    return (
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Відкрити меню"
            className='group flex flex-col items-end gap-y-2 xl:hidden'
        >
            <div className='h-[2px] w-7 bg-white transition-all'></div>
            <div className='h-[2px] w-4 bg-white transition-all group-hover:w-7'></div>
            <div className='h-[2px] w-7 bg-white transition-all'></div>
        </button>
    );
};

export default MenuBtn;