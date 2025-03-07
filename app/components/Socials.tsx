import React from 'react';
import { RiInstagramFill, RiSpotifyFill, RiTwitterFill, RiYoutubeFill } from 'react-icons/ri';

const socials = [
    {
        path: 'https://www.youtube.com/user/linkinpark',
        icon: <RiYoutubeFill />
    },
    {
        path: 'https://www.instagram.com/linkinpark/',
        icon: <RiInstagramFill />
    },
    {
        path: 'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz',
        icon: <RiSpotifyFill />
    },
    {
        path: 'https://twitter.com/linkinpark',
        icon: <RiTwitterFill />
    }
];

const Socials: React.FC<{ containerStyles?: string, iconStyles?: string }> = ({ containerStyles, iconStyles }) => {
    return (
        <div className={`${containerStyles}`}>
            {socials.map((item, index) => (
                <a href={item.path} key={index} target="_blank" rel="noopener noreferrer">
                    <div className={`${iconStyles}`}>
                        {item.icon}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default Socials;
