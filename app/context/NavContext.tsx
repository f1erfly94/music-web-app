'use client'
import React, { createContext, useState, ReactNode } from 'react';

export const NavContext = createContext<any>(null);

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
