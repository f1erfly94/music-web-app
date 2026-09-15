import React from 'react';
import SpotifyEmbed from "@/app/components/albums/SpotifyEmbed";

const EventBox: React.FC = () => {
    const linkinParkAlbumId = '4R6FV9NSzhPihHR0h4pI93';
    return (
        <div className="bg-red-900/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 xl:p-12 relative w-full max-w-3xl mx-auto shadow-xl">
            <SpotifyEmbed albumId={linkinParkAlbumId} />
        </div>
    );
};

export default EventBox;
