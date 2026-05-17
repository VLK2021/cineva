import { BackButton } from "@/src/components/common/BackButton";
import {
    TvCastSection,
    TvCrewSection,
    TvHero,
    TvInfoSection,
    TvRelatedSection,
    TvSeasonsSection,
    TvTrailerSection,
} from "@/src/components/tv-single";
import {
    getTvDetailsWithAppend,
    getTvVideos,
} from "@/src/services";
import { getBestTvTrailer } from "@/src/helpers/tvVideo.helpers";

type TvPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function TvPage({ params }: TvPageProps) {
    const { id } = await params;

    const [tv, ukVideos, ruVideos, enVideos] = await Promise.all([
        getTvDetailsWithAppend(id, "uk-UA"),
        getTvVideos(id, "uk-UA"),
        getTvVideos(id, "ru-RU"),
        getTvVideos(id, "en-US"),
    ]);

    const allVideos = [
        ...(tv.videos?.results ?? []),
        ...(ukVideos.results ?? []),
        ...(ruVideos.results ?? []),
        ...(enVideos.results ?? []),
    ];

    const trailer = getBestTvTrailer(allVideos);

    const cast = tv.credits?.cast.slice(0, 18) ?? [];
    const crew = tv.credits?.crew.slice(0, 12) ?? [];
    const similarTv = tv.similar?.results.slice(0, 12) ?? [];
    const recommendations = tv.recommendations?.results.slice(0, 12) ?? [];

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="relative">
                <div className="absolute left-4 top-4 z-20 sm:left-6 lg:left-10">
                    <BackButton fallbackHref="/tv" />
                </div>

                <TvHero tv={tv} trailer={trailer} />
            </div>

            <TvInfoSection tv={tv} />

            <TvTrailerSection trailer={trailer} />

            <TvCastSection cast={cast} />

            <TvCrewSection crew={crew} />

            <TvSeasonsSection seasons={tv.seasons} />

            <TvRelatedSection
                title="Схожі серіали"
                tvShows={similarTv}
            />

            <TvRelatedSection
                title="Рекомендації"
                tvShows={recommendations}
            />
        </main>
    );
}