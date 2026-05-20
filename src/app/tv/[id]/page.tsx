import type { Metadata } from "next";
import { cookies } from "next/headers";

import { BackButton } from "@/src/components/common/BackButton";
import {
    TvAdvancedInfoSection,
    TvCastSection,
    TvCrewSection,
    TvEpisodesSection,
    TvExternalSection,
    TvHero,
    TvMetaSections,
    TvRelatedSection,
    TvReviewsSection,
    TvSeasonsSection,
    TvMediaSection,
} from "@/src/components/tv-single";
import {
    getTvDetails,
    getTvDetailsWithAppend,
    getTvSeasonDetails,
    getTvVideos,
} from "@/src/services";
import { getBestTvTrailer } from "@/src/helpers/tvVideo.helpers";
import { getTmdbLanguage } from "@/src/helpers";

type TvPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

export async function generateMetadata({
                                           params,
                                       }: TvPageProps): Promise<Metadata> {
    const { id } = await params;

    const tv = await getTvDetails(id, "en-US");

    const title = tv.name || tv.original_name || "TV Series";

    const description =
        tv.overview ||
        `Watch ${title}, episodes, cast, ratings and full TV series information on CINEVA.`;

    return {
        title: `${title} | CINEVA`,
        description,

        openGraph: {
            title: `${title} | CINEVA`,
            description,
            type: "video.tv_show",
            images: tv.poster_path
                ? [
                    {
                        url: `${IMAGE_BASE_URL}/w780${tv.poster_path}`,
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
            images: tv.poster_path
                ? [`${IMAGE_BASE_URL}/w780${tv.poster_path}`]
                : [],
        },
    };
}

export default async function TvPage({ params }: TvPageProps) {
    const { id } = await params;

    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value;
    const tmdbLanguage = getTmdbLanguage(lang);

    const [tv, ukVideos, ruVideos, enVideos] = await Promise.all([
        getTvDetailsWithAppend(id, tmdbLanguage),
        getTvVideos(id, "uk-UA"),
        getTvVideos(id, "ru-RU"),
        getTvVideos(id, "en-US"),
    ]);

    const seasonDetails = await Promise.all(
        tv.seasons.map((season) =>
            getTvSeasonDetails({
                tvId: id,
                seasonNumber: season.season_number,
                language: tmdbLanguage,
            }).catch(() => null)
        )
    );

    const allVideos = [
        ...(tv.videos?.results ?? []),
        ...(ukVideos.results ?? []),
        ...(ruVideos.results ?? []),
        ...(enVideos.results ?? []),
    ];

    const trailer = getBestTvTrailer(allVideos);

    const cast = tv.aggregate_credits?.cast.slice(0, 18) ?? [];
    const crew = tv.aggregate_credits?.crew.slice(0, 12) ?? [];
    const similarTv = tv.similar?.results.slice(0, 12) ?? [];
    const recommendations = tv.recommendations?.results.slice(0, 12) ?? [];
    const reviews = tv.reviews?.results ?? [];
    const validSeasonDetails = seasonDetails.filter((season) => season !== null);

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="relative">
                <div className="absolute left-4 top-4 z-20 sm:left-6 lg:left-10">
                    <BackButton fallbackHref="/tv" />
                </div>

                <TvHero
                    tv={tv}
                    trailer={trailer}
                    labels={{
                        noPoster: lang === "en" ? "No poster" : "Немає постера",
                        tvSeries: lang === "en" ? "TV Series" : "Серіал",
                        seasons: lang === "en" ? "seasons" : "сезонів",
                        episodes: lang === "en" ? "episodes" : "серій",
                        noDescription:
                            lang === "en"
                                ? "Description is not available."
                                : "Опис відсутній.",
                        watchTrailer:
                            lang === "en"
                                ? "Watch trailer"
                                : "Дивитися трейлер",
                    }}
                />
            </div>

            <TvAdvancedInfoSection
                tv={tv}
                labels={{
                    fullInfo: lang === "en" ? "Full information" : "Повна інформація",
                    status: lang === "en" ? "Status" : "Статус",
                    type: lang === "en" ? "Type" : "Тип",
                    inProduction: lang === "en" ? "In production" : "У виробництві",
                    yes: lang === "en" ? "Yes" : "Так",
                    no: lang === "en" ? "No" : "Ні",
                    episodeRuntime:
                        lang === "en"
                            ? "Episode runtime"
                            : "Тривалість серії",
                    firstAirDate:
                        lang === "en"
                            ? "First air date"
                            : "Перший ефір",
                    lastAirDate:
                        lang === "en"
                            ? "Last air date"
                            : "Останній ефір",
                    seasons: lang === "en" ? "Seasons" : "Сезонів",
                    episodes: lang === "en" ? "Episodes" : "Серій",
                    tmdbRating:
                        lang === "en"
                            ? "TMDB rating"
                            : "Рейтинг TMDB",
                    votes: lang === "en" ? "Votes" : "Голосів",
                    popularity: lang === "en" ? "Popularity" : "Популярність",
                    originalLanguage:
                        lang === "en"
                            ? "Original language"
                            : "Оригінальна мова",
                    networks: lang === "en" ? "Networks" : "Мережі",
                    countries: lang === "en" ? "Countries" : "Країни",
                    dates: lang === "en" ? "Dates" : "Дати",
                    noData: lang === "en" ? "No data" : "Немає даних",
                    minutes: lang === "en" ? "min" : "хв",
                }}
            />

            <TvExternalSection
                tv={tv}
                labels={{
                    title: lang === "en"
                        ? "External links"
                        : "Зовнішні посилання",
                    officialSite: lang === "en"
                        ? "Official website"
                        : "Офіційний сайт",
                }}
            />

            <TvMetaSections
                tv={tv}
                labels={{
                    ageRatings: lang === "en" ? "Age ratings" : "Вікові рейтинги",
                    keywords: lang === "en" ? "Keywords" : "Ключові слова",
                    alternativeTitles:
                        lang === "en"
                            ? "Alternative titles"
                            : "Альтернативні назви",
                    translations: lang === "en" ? "Translations" : "Переклади",
                    noData: lang === "en" ? "No data" : "Немає даних",
                }}
            />

            <TvMediaSection
                trailer={trailer}
                imdbId={tv.external_ids?.imdb_id}
                tvTitle={tv.name || tv.original_name}
                tmdbId={tv.id}
                posterPath={tv.poster_path}
                seasons={validSeasonDetails}
            />

            <TvCastSection
                cast={cast}
                title={lang === "en" ? "Actors" : "Актори"}
                noPhotoLabel={lang === "en" ? "No photo" : "Немає фото"}
                episodesLabel={lang === "en" ? "episodes" : "серій"}
            />

            <TvCrewSection
                crew={crew}
                title={lang === "en" ? "Crew" : "Команда"}
                episodesLabel={lang === "en" ? "episodes" : "серій"}
            />

            <TvSeasonsSection
                seasons={tv.seasons}
                labels={{
                    title: lang === "en" ? "Seasons" : "Сезони",
                    noPoster: lang === "en" ? "No poster" : "Немає постера",
                    episodes: lang === "en" ? "episodes" : "серій",
                    releaseDate: lang === "en" ? "Release date" : "Дата виходу",
                    noDescription:
                        lang === "en"
                            ? "Description is not available."
                            : "Опис відсутній.",
                }}
            />

            <TvEpisodesSection seasons={validSeasonDetails} />

            <TvReviewsSection
                reviews={reviews}
                lang={lang === "en" ? "en" : "uk"}
                labels={{
                    title: lang === "en" ? "Reviews" : "Відгуки",
                    readFull: lang === "en" ? "Read full review" : "Читати повністю",
                }}
            />

            <TvRelatedSection
                title={lang === "en" ? "Similar TV shows" : "Схожі серіали"}
                tvShows={similarTv}
            />

            <TvRelatedSection
                title={lang === "en" ? "Recommendations" : "Рекомендації"}
                tvShows={recommendations}
            />
        </main>
    );
}