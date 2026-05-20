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

            <TvAdvancedInfoSection tv={tv} />

            <TvExternalSection tv={tv} />

            <TvMetaSections tv={tv} />

            <TvMediaSection
                trailer={trailer}
                imdbId={tv.external_ids?.imdb_id}
                tvTitle={tv.name || tv.original_name}
                tmdbId={tv.id}
                posterPath={tv.poster_path}
                seasons={validSeasonDetails}
            />

            <TvCastSection cast={cast} />

            <TvCrewSection crew={crew} />

            <TvSeasonsSection seasons={tv.seasons} />

            <TvEpisodesSection seasons={validSeasonDetails} />

            <TvReviewsSection reviews={reviews} />

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