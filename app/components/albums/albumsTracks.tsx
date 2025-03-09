'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion'
import SpotifyClient, { SpotifyAlbum } from '@/app/components/api/spotifyApi';
import { fadeIn } from "@/public/assets/variants";

interface AlbumTracksProps {
    albumId: string;
}

const AlbumTracks: React.FC<AlbumTracksProps> = ({ albumId }) => {
    const [album, setAlbum] = useState<SpotifyAlbum | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchAlbumData = async () => {
            try {
                setLoading(true);
                const client = new SpotifyClient();
                const albumData = await client.getAlbumTracks(albumId);

                if (isMounted) {
                    setAlbum(albumData);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Помилка при завантаженні даних альбому');
                    setLoading(false);
                    console.error(err);
                }
            }
        };

        fetchAlbumData();

        return () => {
            isMounted = false;
        };
    }, [albumId]);

    const formatDuration = useMemo(() => {
        return (ms: number): string => {
            const minutes = Math.floor(ms / 60000);
            const seconds = Math.floor((ms % 60000) / 1000);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };
    }, []);

    if (loading) {
        return <div className="flex justify-center p-4 md:p-6">Завантаження...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4 md:p-6">{error}</div>;
    }

    if (!album) {
        return <div className="p-4 md:p-6">Альбом не знайдено</div>;
    }

    return (
        <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{once: false, amount: 0.3}}
            className="p-4 md:p-6 rounded-lg"
        >
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
                <div className="w-full lg:w-1/3">
                    <div className="rounded-lg p-4 md:p-6">
                        {album.images && album.images[0] && (
                            <img
                                src={album.images[0].url}
                                alt={`${album.name} обкладинка альбому`}
                                className="w-full h-auto object-cover rounded-md shadow-lg mb-4"
                                loading="lazy" // Додано ледаче завантаження зображення
                            />
                        )}
                        <h1 className="text-xl md:text-2xl font-bold">{album.name}</h1>
                        <h2 className="text-lg md:text-xl mt-2">
                            {album.artists.map(artist => artist.name).join(', ')}
                        </h2>
                        <div className="mt-4 space-y-2 text-sm md:text-base">
                            <p>Дата випуску: <span className="font-medium">{album.release_date}</span></p>
                            <p>Кількість треків: <span className="font-medium">{album.total_tracks}</span></p>
                        </div>
                        <a
                            href={`https://open.spotify.com/album/${album.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full transition-colors text-sm md:text-base"
                            aria-label="Слухати на Spotify"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                            <span>Слухати на Spotify</span>
                        </a>
                    </div>
                </div>

                <div className="w-full lg:w-2/3">
                    <div className="rounded-lg p-4 md:p-6 shadow-sm">
                        <div className="lg:hidden space-y-3">
                            {album.tracks.items.map((track) => (
                                <div
                                    key={track.id}
                                    className="border-b pb-3 hover:bg-red-800 hover:bg-opacity-30 transition-colors rounded p-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm mr-2">{track.track_number}.</span>
                                        <div className="flex-1">
                                            <p className="font-medium truncate">{track.name}</p>
                                            <p className="text-sm">{formatDuration(track.duration_ms)}</p>
                                        </div>
                                        <a
                                            href={`https://open.spotify.com/track/${track.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                                            aria-label="Слухати на Spotify"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Назва</th>
                                    <th className="p-3 text-left">Тривалість</th>
                                    <th className="p-3 text-left">Spotify</th>
                                </tr>
                                </thead>
                                <tbody>
                                {album.tracks.items.map((track) => (
                                    <tr key={track.id} className="border-b hover:bg-red-800 hover:bg-opacity-30 transition-colors">
                                        <td className="p-3">{track.track_number}</td>
                                        <td className="p-3 font-medium">{track.name}</td>
                                        <td className="p-3">{formatDuration(track.duration_ms)}</td>
                                        <td className="p-3">
                                            <a
                                                href={`https://open.spotify.com/track/${track.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                                                aria-label="Слухати на Spotify"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AlbumTracks;