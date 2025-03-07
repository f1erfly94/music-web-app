'use client'
import React from 'react';
import AudioPlayer from 'react-audio-player'
import Image from 'next/image';
import {motion} from 'framer-motion';
import {fadeIn} from "@/public/assets/variants";

interface Props {
    className?: string;
}

const Player: React.FC<Props> = () => {
    return (
        <>
            <motion.div
                variants={fadeIn('up', 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{once: false, amount: 0.3}}
                className="h-[112px] flex items-center relative z-40">
                <div className="container mx-auto flex flex-col justify-between items-center xl:flex-row">
                    <div className="w-[300px] flex items-center gap-4-x">
                        <div className="relative w-15 h-15">
                            <Image src={'/assets/photo/From_zero.png'} fill priority alt='image'/>
                        </div>
                        <div className="leading-none mx-5 text-white flex flex-col justify-between h-[50px] text-[16px]">
                            <div className="text-lg font-medium">Linkin Park</div>
                            <div className="text-lg font-light">Emptiness Machine</div>
                        </div>
                    </div>

                    <div className="w-full">
                        <AudioPlayer
                            controls
                            loop
                            preload="none"
                            src="./assets/music/LP-emptiness-mashine.mp3"
                            className="custom-audio w-full"
                        />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Player;
