'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import NavMobile from "@/app/components/NavMobile";
import Nav from "@/app/components/Nav";
import MenuBtn from "@/app/components/MenuBtn";
import Socials from "@/app/components/Socials";

const Header: React.FC = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setActive(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                active ? 'bg-[#1c060b]/80 py-4 shadow-lg shadow-black/30 backdrop-blur-md' : 'bg-transparent py-6 sm:py-8'
            }`}
        >
            <div className="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-6">
                <Link href="/" className="relative h-10 w-[90px] shrink-0 transition-all sm:h-12 sm:w-[110px]">
                    <Image
                        src="/assets/photo/lp_logo2.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </Link>

                <Nav containerStyles="hidden xl:flex items-center gap-x-8"/>

                <div className="flex items-center gap-x-5 sm:gap-x-6">
                    <Socials containerStyles="hidden sm:flex text-[20px] gap-x-4" iconStyles="hover:text-red-500 transition-all"/>
                    <MenuBtn/>
                </div>
            </div>
            <NavMobile/>
        </header>
    );
};

export default Header;
