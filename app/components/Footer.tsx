'use client';
import React from 'react';
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Socials from "@/app/components/Socials";
import Image from "next/image";
import { motion } from 'framer-motion';
import { fadeIn } from "@/app/helpers/variants";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#4d0919] h-[380px]">
            <motion.div
                variants={fadeIn('down', 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className="container mx-auto flex flex-col items-center gap-8"
            >
                <div>
                    <Link href="#">
                        <h2 className="text-[24px] lg:text-[38px] font-semibold leading-tight">
                            f1erfly@outlook.com
                        </h2>
                    </Link>
                </div>
                <div>
                    <Nav
                        containerStyles="flex flex-col xl:flex-row justify-center items-center gap-y-4 xl:gap-x-8 text-sm uppercase font-semibold"
                        linkStyles="hover:text-gray-200 transition-all"
                    />
                </div>
                <div>
                    <Socials
                        containerStyles="flex text-[24px] gap-x-8"
                        iconStyles="hover:text-red-800 transition-all justify-center"
                    />
                </div>
                <div>
                    <Link href="#" className="relative w-[150px] h-[150px] flex transition-all mb-4 xl:mb-0">
                        <Image
                            src="/assets/photo/lp_logo2.png"
                            fill
                            alt="logo"
                        />
                    </Link>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;