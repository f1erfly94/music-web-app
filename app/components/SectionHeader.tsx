'use client'
import React from 'react';
import {motion} from 'framer-motion'
import {fadeIn} from '../../public/assets/variants'

interface Props {
    pretitle: string;
    title: string;
}


const SectionHeader: React.FC<Props> = ({pretitle, title}) => {
    return (
        <header className="">
            <motion.h3
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={'show'}
                viewport={{once: false, amount: 0.3}}
                className='pretitle text-center'
            >
                {pretitle}
            </motion.h3>
            <motion.h2
                variants={fadeIn('up', 0.4)}
                initial="hidden"
                whileInView={'show'}
                viewport={{once: false, amount: 0.3}}
                className="h2 text-center md-8">
                {title}</motion.h2>
        </header>


    );
};

export default SectionHeader;