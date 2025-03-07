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
        <section id="home" className="h-[80vh] xl:h-[850px] 2xl:h-[900px]">
            <div className="container mx-auto h-full flex justify-center items-center xl:justify-start">
                <div className="h-full flex flex-col justify-center items-center xl:items-start z-20 pt-12">
                    <MouseParallaxContainer
                        globalFactorX={0.1}
                        globalFactorY={0.2}
                        resetOnLeave
                        className="relative flex items-center h-[120px] xl:h-max xl:w xl:w-[980px]"
                    >
                        <MouseParallaxChild factorX={0.2} factorY={0.4} className="relative">
                            <motion.div
                                variants={fadeIn('up', 0.4)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{once: false, amount: 0.6}}
                                className="w-[300px] h-[101.37px] xl:w-[625px] xl:h-[344.97px]"
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
                                className="w-[150px] h-[100px] xl:w-[348px] xl:h-[300px] mix-blend-luminosity"
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
                        className="ml-30 text-xl italic">
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
                <motion.div
                    variants={fadeIn('left', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: false, amount: 0.7}}
                    className="hidden xl:flex absolute right-0 top-0 w-full max-w-[784px]"
                >
                    <Image src="/assets/hero/Emily.png" width={617} height={893} quality={100} priority alt="Emily"/>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
