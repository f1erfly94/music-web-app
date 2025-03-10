import Events from "@/app/components/events/Events";
import Hero from "@/app/components/Hero";
import Player from "@/app/components/Player";
import MainAlbums from "@/app/components/albums/MainAlbums";
import SignUp from "@/app/components/SignUp";
import Footer from "@/app/components/Footer";

export default function Home() {
    return (
        <main>
            <Hero/>
            <Player />
            <Events/>
            <MainAlbums/>
            <SignUp/>
        </main>
    );
}