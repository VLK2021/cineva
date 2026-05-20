import type { Metadata } from "next";
import { cookies } from "next/headers";

import {
    getMovieDetails,
    getMovieDetailsWithAppend,
    getMovieVideos,
} from "@/src/services";
import {
    MovieCastSection,
    MovieCrewSection,
    MovieHero,
    MovieInfoSection,
    MovieMediaSection,
    MovieRelatedSection,
} from "@/src/components/movie-single";
import { BackButton } from "@/src/components/common";
import { getBestTrailer } from "@/src/helpers/movieVideo.helpers";
import { getTmdbLanguage } from "@/src/helpers";

type MoviePageProps = {
    params: Promise<{
        id: string;
    }>;
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

export async function generateMetadata({
                                           params,
                                       }: MoviePageProps): Promise<Metadata> {
    const { id } = await params;

    const movie = await getMovieDetails(id, "en-US");

    const title = movie.title || movie.original_title || "Movie";
    const description =
        movie.overview ||
        `Watch ${title}, trailers, cast, ratings and full movie information on CINEVA.`;

    return {
        title,
        description,
        openGraph: {
            title: `${title} | CINEVA`,
            description,
            type: "video.movie",
            images: movie.poster_path
                ? [
                    {
                        url: `${IMAGE_BASE_URL}/w780${movie.poster_path}`,
                        width: 780,
                        height: 1170,
                        alt: title,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | CINEVA`,
            description,
            images: movie.poster_path
                ? [`${IMAGE_BASE_URL}/w780${movie.poster_path}`]
                : [],
        },
    };
}

export default async function MoviePage({ params }: MoviePageProps) {
    const { id } = await params;

    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value;
    const tmdbLanguage = getTmdbLanguage(lang);

    const [movie, ruMovie, ukVideos, ruVideos, enVideos] = await Promise.all([
        getMovieDetailsWithAppend(id, tmdbLanguage),
        getMovieDetails(id, "ru-RU"),
        getMovieVideos(id, "uk-UA"),
        getMovieVideos(id, "ru-RU"),
        getMovieVideos(id, "en-US"),
    ]);

    const allVideos = [
        ...(movie.videos?.results ?? []),
        ...(ukVideos.results ?? []),
        ...(ruVideos.results ?? []),
        ...(enVideos.results ?? []),
    ];

    const trailer = getBestTrailer(allVideos);

    const cast = movie.credits?.cast.slice(0, 18) ?? [];
    const crew = movie.credits?.crew.slice(0, 12) ?? [];
    const similarMovies = movie.similar?.results.slice(0, 8) ?? [];
    const recommendations = movie.recommendations?.results.slice(0, 8) ?? [];

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="relative">
                <div className="absolute left-4 top-4 z-20 sm:left-6 lg:left-10">
                    <BackButton fallbackHref="/movies" />
                </div>

                <MovieHero
                    movie={movie}
                    trailer={trailer}
                    labels={{
                        movie: lang === "en" ? "Movie" : "Фільм",
                        originalTitle:
                            lang === "en"
                                ? "Original title:"
                                : "Оригінальна назва:",
                        unknown: lang === "en" ? "Unknown" : "Невідомо",
                        noDescription:
                            lang === "en"
                                ? "Description for this movie is not available yet."
                                : "Опис для цього фільму поки відсутній.",
                        watchMovie:
                            lang === "en" ? "Watch movie" : "Дивитись фільм",
                        watchTrailer:
                            lang === "en" ? "Watch trailer" : "Дивитись трейлер",
                    }}
                />
            </div>

            <MovieInfoSection
                movie={movie}
                labels={{
                    mainInfo:
                        lang === "en" ? "Main information" : "Основна інформація",
                    additional: lang === "en" ? "Additional" : "Додатково",
                    budget: lang === "en" ? "Budget" : "Бюджет",
                    revenue: lang === "en" ? "Revenue" : "Збори",
                    originalLanguage:
                        lang === "en" ? "Original language" : "Мова оригіналу",
                    voteCount:
                        lang === "en" ? "Vote count" : "Кількість голосів",
                    releaseDate:
                        lang === "en" ? "Release date" : "Дата релізу",
                    runtime: lang === "en" ? "Runtime" : "Тривалість",
                    popularity:
                        lang === "en" ? "Popularity" : "Популярність",
                    productionCountries:
                        lang === "en"
                            ? "Production countries"
                            : "Країни виробництва",
                    languages: lang === "en" ? "Languages" : "Мови",
                    companies: lang === "en" ? "Companies" : "Компанії",
                    officialSite:
                        lang === "en" ? "Official website" : "Офіційний сайт",
                    unknown: lang === "en" ? "Unknown" : "Невідомо",
                }}
            />

            <MovieMediaSection
                trailer={trailer}
                kinopoiskId={movie.imdb_id}
                movieTitle={ruMovie.title || movie.title || movie.original_title}
                tmdbId={movie.id}
                posterPath={movie.poster_path}
            />

            <MovieCastSection
                cast={cast}
                title={lang === "en" ? "Actors" : "Актори"}
            />

            <MovieCrewSection
                crew={crew}
                title={lang === "en" ? "Crew" : "Команда"}
            />

            <MovieRelatedSection
                title={lang === "en" ? "Similar movies" : "Схожі фільми"}
                movies={similarMovies}
            />

            <MovieRelatedSection
                title={lang === "en" ? "Recommendations" : "Рекомендації"}
                movies={recommendations}
            />
        </main>
    );
}