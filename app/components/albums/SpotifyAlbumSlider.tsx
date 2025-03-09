'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SpotifyClient, {SpotifyAlbum} from "@/app/components/api/spotifyApi";

import "../../globals.css";

interface AlbumWithId {
    id: string;
    album: SpotifyAlbum;
}

const SpotifyAlbumSlider: React.FC<{ albumIds: string[] }> = ({ albumIds }) => {
    const [albums, setAlbums] = useState<AlbumWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                setLoading(true);
                const spotifyClient = new SpotifyClient();

                const uniqueAlbumIds = [...new Set(albumIds)];

                const albumPromises = uniqueAlbumIds.map(async (id) => {
                    const albumData = await spotifyClient.getAlbumTracks(id);
                    return { id, album: albumData };
                });

                const fetchedAlbums = await Promise.all(albumPromises);
                setAlbums(fetchedAlbums);
            } catch (err) {
                setError('Помилка завантаження альбомів');
                console.error('Помилка завантаження альбомів:', err);
            } finally {
                setLoading(false);
            }
        };

        if (albumIds.length > 0) {
            fetchAlbums();
        }
    }, [albumIds]);

    const handleAlbumMouseEnter = (albumId: string) => {
        setHoveredAlbum(albumId);
    };

    const handleAlbumMouseLeave = () => {
        setHoveredAlbum(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <div className="album-slider-container" style={{ paddingBottom: "40px" }}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    navigation
                    pagination={{ clickable: true, el: '.album-pagination' }}
                    className="py-8"
                >
                    {albums.map(({ id, album }) => (
                        <SwiperSlide key={id}>
                            <div
                                className="relative group cursor-pointer transition-all duration-300 h-80"
                                onMouseEnter={() => handleAlbumMouseEnter(id)}
                                onMouseLeave={handleAlbumMouseLeave}
                            >
                                <div className="h-64 w-full overflow-hidden rounded-lg shadow-md">
                                    {album.images && album.images.length > 0 ? (
                                        <Image
                                            src={album.images[0].url}
                                            alt={album.name}
                                            width={album.images[0].width}
                                            height={album.images[0].height}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                            <span>Немає зображення</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center mt-2">
                                    <h3 className="font-semibold text-lg truncate">{album.name}</h3>
                                </div>

                                {hoveredAlbum === id && (
                                    <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex flex-col justify-between p-4 text-white transition-opacity duration-300">
                                        <div>
                                            <h3 className="font-bold text-xl mb-1">{album.name}</h3>
                                            <p className="text-sm mb-1">
                                                Виконавці: {album.artists.map(artist => artist.name).join(', ')}
                                            </p>
                                            <p className="text-sm mb-1">
                                                Дата випуску: {new Date(album.release_date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm">
                                                Кількість треків: {album.total_tracks}
                                            </p>
                                        </div>

                                        <a
                                            href={`https://open.spotify.com/album/${id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 text-center flex items-center justify-center"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                            Слухати на Spotify
                                        </a>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="album-pagination" style={{ marginTop: "20px" }}></div>
            </div>
        </div>
    );
};

export default SpotifyAlbumSlider;