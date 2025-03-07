import React from 'react';
import Image from 'next/image';
import AlbumTracks from "@/app/components/albums/albumsTracks";



const EventBox: React.FC = () => {
    const linkinParkAlbumId = '4R6FV9NSzhPihHR0h4pI93';
    return (
        <div className="bg-red-900 rounded-[10px] p-4 xl:p-12 reletive">
            <div className="flex flex col xl:flex-row justify-between h-[420px] xl:h-full gap-x-4">
                <AlbumTracks albumId={linkinParkAlbumId}/>
            </div>
        </div>

    );
};

export default EventBox;