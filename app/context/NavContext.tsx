'use client';
import React, { createContext, useState, ReactNode } from 'react';

interface NavContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavContext = createContext<NavContextType | null>(null);

interface NavContextProviderProps {
    children: ReactNode;
}

const NavContextProvider: React.FC<NavContextProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </NavContext.Provider>
    );
};

export default NavContextProvider;
