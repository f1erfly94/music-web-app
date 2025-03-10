import React from 'react';
import AlbumTracks from "@/app/components/albums/albumsTracks";



const EventBox: React.FC = () => {
    const linkinParkAlbumId = '4R6FV9NSzhPihHR0h4pI93';
    return (
        <div className="bg-red-900 rounded-[10px] p-4 xl:p-12 relative w-full">
            <div className="flex flex-col xl:flex-row justify-between gap-x-4 w-full h-full">
                <AlbumTracks albumId={linkinParkAlbumId}/>
            </div>
        </div>

    );
};

export default EventBox;