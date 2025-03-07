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
        <header className={`fixed z-50 w-full transition-all ${active ? 'bg-[#4d0919] py-6' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto flex flex-col xl:flex-row items-center justify-between">
                <Link href="/"
                      className="relative flex w-[100px] h-[100px] transition-all mb-4 xl:mb-0"
                >
                    <Image
                        src="/assets/photo/lp_logo2.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </Link>
                <Nav containerStyles="hidden xl:flex items-center gap-x-8"/>
                <NavMobile/>
                <div className="absolute right-7 top-9 z-10 xl:hidden">
                    <MenuBtn/>
                </div>
                <Socials containerStyles="flex text-[24px] gap-x-4" iconStyles="hover:text-red-800 transition-all" />
            </div>
        </header>
    );
};

export default Header;
