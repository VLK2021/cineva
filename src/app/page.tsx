import { HeroSlider } from "@/src/components/home/HeroSlider";
import { HomeMovieSection } from "@/src/components/home/HomeMovieSection";
import { getPopularMovies, getTopRatedMovies } from "@/src/services";

export default async function Home() {
    const [popularMovies, topRatedMovies] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
    ]);

    return (
        <main>
            <HeroSlider movies={popularMovies.results.slice(0, 8)} />

            <HomeMovieSection
                title="Популярні фільми"
                movies={popularMovies.results}
            />

            <HomeMovieSection
                title="Топ рейтинг"
                movies={topRatedMovies.results}
            />
        </main>
    );
}