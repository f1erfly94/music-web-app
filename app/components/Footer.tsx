'use client';
import React from 'react';
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Socials from "@/app/components/Socials";
import Image from "next/image";
import {motion} from 'framer-motion';
import {fadeIn} from "@/app/helpers/variants";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#4d0919] py-12 sm:py-14">
            <motion.div
                variants={fadeIn('down', 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{once: false, amount: 0.3}}
                className="container mx-auto flex flex-col items-center gap-8 px-4 text-center sm:px-6"
            >
                <Nav
                    containerStyles="flex flex-col xl:flex-row justify-center items-center gap-y-4 xl:gap-x-8 text-sm uppercase font-semibold"
                    linkStyles="hover:text-gray-200 transition-all"
                />
                <Socials
                    containerStyles="flex text-[24px] gap-x-8"
                    iconStyles="hover:text-red-800 transition-all justify-center"
                />
                <div>
                    <Link href="/" className="relative mx-auto mb-4 flex h-[100px] w-[100px] transition-all sm:h-[120px] sm:w-[120px]">
                        <Image
                            src="/assets/photo/lp_logo2.png"
                            fill
                            alt="Linkin Park"
                            className="object-contain"
                        />
                    </Link>
                    <p className="text-sm text-white/70">© 2025 · All rights reserved</p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
