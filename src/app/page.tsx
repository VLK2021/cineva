import {getPopularMovies} from "@/src/services";
import {HeroSlider} from "@/src/components/home";

export default async function Home() {
    const popular = await getPopularMovies();

    return (
        <main className="p-6">
            <HeroSlider movies={popular.results.slice(0, 8)} />
        </main>
    );
}