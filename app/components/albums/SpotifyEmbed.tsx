import React from 'react';

interface SpotifyEmbedProps {
    albumId: string;
    compact?: boolean;
    className?: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ albumId, compact = false, className = '' }) => {
    return (
        <iframe
            src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
            width="100%"
            height={compact ? 152 : 352}
            style={{ borderRadius: 12 }}
            className={`w-full border-0 ${className}`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify player"
        />
    );
};

export default SpotifyEmbed;
