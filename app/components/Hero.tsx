'use client';
import React from 'react';
import Image from 'next/image';
import {MouseParallaxContainer, MouseParallaxChild} from 'react-parallax-mouse';
import {motion} from 'framer-motion';
import {TypeAnimation} from 'react-type-animation';
import {fadeIn} from '@/public/assets/variants';

interface Props {
    className?: string;
}

const locationSequence = [
    ' "In the end, it doesn’t even matter." ', 3000,
    ' "I tried so hard and got so far, but in the end, it doesn’t even matter." ', 3000,
    ' "I’m so tired of being here, suppressed by all my childish fears." ', 3000,
    ' "Crawling in my skin, these wounds they will not heal." ', 3000,
    ' "Somewhere I belong." ', 3000
];

const Hero: React.FC<Props> = () => {
    return (
        <section id="home" className="h-screen md:h-[90vh] xl:h-[850px] 2xl:h-[900px] relative overflow-hidden">
            <div className="container mx-auto h-full flex flex-col justify-center items-center xl:justify-start xl:items-start xl:flex-row relative px-4 sm:px-6">
                <div className="h-full flex flex-col justify-center items-center xl:items-start z-20 pt-8 md:pt-12">
                    <MouseParallaxContainer
                        globalFactorX={0.1}
                        globalFactorY={0.2}
                        resetOnLeave
                        className="relative flex items-center h-[100px] sm:h-[120px] xl:h-max xl:w-[980px]"
                    >
                        <MouseParallaxChild factorX={0.2} factorY={0.4} className="relative">
                            <motion.div
                                variants={fadeIn('up', 0.4)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{once: false, amount: 0.6}}
                                className="w-[200px] h-[80px] sm:w-[250px] sm:h-[90px] md:w-[300px] md:h-[101.37px] xl:w-[625px] xl:h-[344.97px]"
                            >
                                <Image src="/assets/hero/LP_logo.png" fill alt="LP Logo" className="object-contain"/>
                            </motion.div>
                        </MouseParallaxChild>
                        <MouseParallaxChild factorX={0.2} factorY={0.4} className="relative">
                            <motion.div
                                variants={fadeIn('down', 0.4)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{once: false, amount: 0.3}}
                                className="w-[100px] h-[80px] sm:w-[120px] sm:h-[90px] md:w-[150px] md:h-[100px] xl:w-[348px] xl:h-[300px] mix-blend-luminosity"
                            >
                                <Image src="/assets/hero/Guitar.png" fill alt="Guitar" className="object-contain"/>
                            </motion.div>
                        </MouseParallaxChild>
                    </MouseParallaxContainer>
                    <motion.div
                        variants={fadeIn('right', 0.4)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: false, amount: 0.3}}
                        className="text-sm sm:text-base md:text-lg xl:text-xl italic mt-4 sm:mt-6 text-center xl:text-leftsm:max-w-[80%] md:max-w-[70%]">
                        <TypeAnimation
                            sequence={locationSequence}
                            wrapper="div"
                            speed={10}
                            deletionSpeed={35}
                            repeat={Infinity}
                            cursor={false}
                        />
                    </motion.div>
                </div>

                {/* Mobile Emily image */}
                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: false, amount: 0.7}}
                    className="w-full mt-8 flex justify-center xl:hidden"
                >
                    <Image
                        src="/assets/hero/Emily.png"
                        width={350}
                        height={500}
                        quality={90}
                        priority
                        alt="Emily"
                        className="object-contain max-h-[50vh] md:max-h-[60vh]"
                    />
                </motion.div>
            </div>

            {/* Desktop Emily image - aligned to the right side of screen */}
            <motion.div
                variants={fadeIn('left', 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{once: false, amount: 0.7}}
                className="hidden xl:block absolute right-0 top-0 h-full"
            >
                <div className="relative h-full">
                    <Image
                        src="/assets/hero/Emily.png"
                        width={617}
                        height={893}
                        quality={100}
                        priority
                        alt="Emily"
                        className="h-full w-auto object-contain object-right"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;