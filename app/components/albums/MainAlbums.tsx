'use client'
import React from 'react';
import { motion } from 'framer-motion';
import SpotifyAlbumSlider from "@/app/components/albums/SpotifyAlbumSlider";

const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
        opacity: 0,
        y: direction === 'up' ? 30 : -30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: { delay, type: 'spring', stiffness: 100, damping: 25 },
    },
});

export default function MainAlbums() {
    const albumIds = [
        '4R6FV9NSzhPihHR0h4pI93',
        '5Eevxp2BCbWq25ZdiXRwYd',
        '3XB2yloP7l00tEUmaODtVi',
        '4XHIjbhjRmqWlosjj5rqSI',
        '5uvXx5ZQswNRFCdHR521YZ',
        '7pgs38iLfEqUtwgCRgvbND',
        '0f7R0jf0pcTb6K6IVVPcMD',
        '6hPkbAV3ZXpGZBGUvL6jVM',
    ];

    return (
        <section className='section' id="discography">
            <div className="mx-auto px-10 py-10 ">
                <motion.h3
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-3xl font-bold mb-8 text-center"
                >
                    Discography
                </motion.h3>

                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <SpotifyAlbumSlider albumIds={albumIds} />
                </motion.div>
            </div>
        </section>
    );
}
