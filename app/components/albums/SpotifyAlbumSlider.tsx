'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SpotifyEmbed from './SpotifyEmbed';

import "../../globals.css";

const SpotifyAlbumSlider: React.FC<{ albumIds: string[] }> = ({ albumIds }) => {
    const uniqueAlbumIds = [...new Set(albumIds)];

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <div className="album-slider-container" style={{ paddingBottom: "40px" }}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    pagination={{ clickable: true, el: '.album-pagination' }}
                    className="py-8"
                >
                    {uniqueAlbumIds.map((id) => (
                        <SwiperSlide key={id}>
                            <SpotifyEmbed albumId={id} compact className="rounded-xl shadow-lg" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="album-pagination" style={{ marginTop: "20px" }}></div>
            </div>
        </div>
    );
};

export default SpotifyAlbumSlider;
