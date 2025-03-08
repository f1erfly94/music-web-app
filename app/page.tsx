import Events from "@/app/components/events/Events";
import Hero from "@/app/components/Hero";
import Player from "@/app/components/Player";
import MainAlbums from "@/app/components/albums/MainAlbums";
export default function Home() {
  return (
        <main>
            <Hero/>
            <Player />
            <Events/>
            <MainAlbums/>
        </main>
  );
}
