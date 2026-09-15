'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { fadeIn } from "@/app/helpers/variants";

const formatTime = (seconds: number): string => {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const Player: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration || 0);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setIsMuted(audio.muted);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const time = Number(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <motion.div
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="relative z-40 w-full py-6"
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-5">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? 'Пауза' : 'Відтворити'}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-700 text-white transition-all hover:bg-red-600 hover:scale-105 active:scale-95"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                        </button>

                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                            <Image src="/assets/photo/From_zero.png" fill sizes="44px" priority alt="Обкладинка треку" className="object-cover" />
                        </div>

                        <div className="min-w-0 leading-tight text-white sm:hidden">
                            <p className="truncate text-sm font-medium">Linkin Park</p>
                            <p className="truncate text-xs font-light text-white/70">Emptiness Machine</p>
                        </div>
                    </div>

                    <div className="hidden min-w-0 leading-tight text-white sm:block sm:w-[170px]">
                        <p className="truncate text-base font-medium">Linkin Park</p>
                        <p className="truncate text-sm font-light text-white/70">Emptiness Machine</p>
                    </div>

                    <div className="flex flex-1 items-center gap-3">
                        <span className="w-9 shrink-0 text-right text-xs tabular-nums text-white/60">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            aria-label="Позиція відтворення"
                            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-red-600"
                            style={{
                                background: `linear-gradient(to right, #dc2626 ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
                            }}
                        />
                        <span className="w-9 shrink-0 text-xs tabular-nums text-white/60">{formatTime(duration)}</span>
                    </div>

                    <button
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
                        className="hidden shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white sm:flex"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    <audio ref={audioRef} loop preload="none" src="/assets/music/LP-emptiness-mashine.mp3" />
                </div>
            </div>
        </motion.div>
    );
};

export default Player;
