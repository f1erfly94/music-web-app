import React from 'react';
import SpotifyAlbumSlider from "@/app/components/albums/SpotifyAlbumSlider";

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
        <div className="container h-2000    mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-bold mb-8 text-center">Discography</h1>
            <SpotifyAlbumSlider albumIds={albumIds} />
        </div>
        </section>
    );
}