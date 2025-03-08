'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SpotifyClient, {SpotifyAlbum} from "@/app/components/api/spotifyApi";

interface AlbumWithId {
    id: string;
    album: SpotifyAlbum;
}

const SpotifyAlbumSlider: React.FC<{ albumIds: string[] }> = ({ albumIds }) => {
    const [albums, setAlbums] = useState<AlbumWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
    const [isTrackListOpen, setIsTrackListOpen] = useState<boolean>(false);
    const trackListRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                trackListRef.current &&
                !trackListRef.current.contains(event.target as Node) &&
                isTrackListOpen
            ) {
                setIsTrackListOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTrackListOpen]);

    const handleAlbumMouseEnter = (albumId: string) => {
        setHoveredAlbum(albumId);
    };

    const handleAlbumMouseLeave = () => {
        if (!isTrackListOpen) {
            setHoveredAlbum(null);
        }
    };

    const toggleTrackList = () => {
        setIsTrackListOpen(!isTrackListOpen);
    };

    const formatDuration = (ms: number): string => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                pagination={{ clickable: true }}
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
                                <p className="text-sm text-gray-600 truncate">
                                    {album.artists.map(artist => artist.name).join(', ')}
                                </p>
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

                                    <button
                                        onClick={toggleTrackList}
                                        className="mt-2 bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        {isTrackListOpen ? 'Сховати треки' : 'Показати треки'}
                                    </button>

                                    {isTrackListOpen && hoveredAlbum === id && (
                                        <div
                                            ref={trackListRef}
                                            className="absolute z-10 left-0 right-0 top-full mt-2 bg-white text-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto"
                                        >
                                            <div className="p-2">
                                                <h4 className="font-semibold text-lg mb-2 border-b pb-1">Треки</h4>
                                                <ul>
                                                    {album.tracks.items.map((track) => (
                                                        <li
                                                            key={track.id}
                                                            className="py-1 px-2 hover:bg-gray-100 rounded-md flex justify-between items-center text-sm"
                                                        >
                                                            <div className="flex-1">
                                                                <span className="mr-2">{track.track_number}.</span>
                                                                <span className="font-medium">{track.name}</span>
                                                                {track.explicit && (
                                                                    <span className="ml-2 bg-gray-500 text-white text-xs px-1 rounded">E</span>
                                                                )}
                                                            </div>
                                                            <span className="text-gray-500">
                                {formatDuration(track.duration_ms)}
                              </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SpotifyAlbumSlider;