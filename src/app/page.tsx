import { cookies } from "next/headers";

import { HeroSlider } from "@/src/components/home/HeroSlider";
import { HomeMovieSection } from "@/src/components/home/HomeMovieSection";
import { HomeTvSection } from "@/src/components/home/HomeTvSection";
import { HomeActorsSection } from "@/src/components/home/HomeActorsSection";
import {
    getPopularActors,
    getPopularMovies,
    getPopularTv,
    getTopRatedMovies,
    getTopRatedTv,
} from "@/src/services";
import { getTmdbLanguage } from "@/src/helpers";

export default async function Home() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value;
    const tmdbLanguage = getTmdbLanguage(lang);

    const [popularMovies, topRatedMovies, popularTv, topRatedTv, popularActors] =
        await Promise.all([
            getPopularMovies({ language: tmdbLanguage }),
            getTopRatedMovies({ language: tmdbLanguage }),
            getPopularTv({ language: tmdbLanguage }),
            getTopRatedTv({ language: tmdbLanguage }),
            getPopularActors({ language: tmdbLanguage }),
        ]);

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300">
            <HeroSlider movies={popularMovies.results.slice(0, 8)} />

            <HomeMovieSection
                title={lang === "en" ? "Popular movies" : "Популярні фільми"}
                movies={popularMovies.results}
            />

            <HomeMovieSection
                title={lang === "en" ? "Top rated movies" : "Топ рейтинг фільмів"}
                movies={topRatedMovies.results}
            />

            <HomeTvSection
                title={lang === "en" ? "Popular TV shows" : "Популярні серіали"}
                tvShows={popularTv.results}
                href="/tv"
            />

            <HomeTvSection
                title={lang === "en" ? "Top rated TV shows" : "Топ рейтинг серіалів"}
                tvShows={topRatedTv.results}
                href="/tv?sort=vote_average.desc"
            />

            <HomeActorsSection
                title={lang === "en" ? "Popular actors" : "Популярні актори"}
                actors={popularActors.results}
            />
        </main>
    );
}