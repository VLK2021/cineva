import { HeroSlider } from "@/src/components/home/HeroSlider";
import { HomeMovieSection } from "@/src/components/home/HomeMovieSection";
import { HomeTvSection } from "@/src/components/home/HomeTvSection";
import {
    getPopularMovies,
    getTopRatedMovies,
    getPopularTv,
    getTopRatedTv,
} from "@/src/services";
import { HomeActorsSection } from "@/src/components/home/HomeActorsSection";
import { getPopularActors } from "@/src/services";

export default async function Home() {
    const [popularMovies, topRatedMovies, popularTv, topRatedTv, popularActors] =
        await Promise.all([
            getPopularMovies(),
            getTopRatedMovies(),
            getPopularTv(),
            getTopRatedTv(),
            getPopularActors(),
        ]);

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300">
            <HeroSlider movies={popularMovies.results.slice(0, 8)} />

            <HomeMovieSection
                title="Популярні фільми"
                movies={popularMovies.results}
            />

            <HomeMovieSection
                title="Топ рейтинг фільмів"
                movies={topRatedMovies.results}
            />

            <HomeTvSection
                title="Популярні серіали"
                tvShows={popularTv.results}
                href="/tv"
            />

            <HomeTvSection
                title="Топ рейтинг серіалів"
                tvShows={topRatedTv.results}
                href="/tv?sort=vote_average.desc"
            />

            <HomeActorsSection
                title="Популярні актори"
                actors={popularActors.results}
            />
        </main>
    );
}