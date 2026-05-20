import Image from "next/image";
import Link from "next/link";
import { Calendar, Play, Star, Tv } from "lucide-react";
import type { TvDetailsWithAppend, TvVideo } from "@/src/types/tv.types";

type TvHeroProps = {
    tv: TvDetailsWithAppend;
    trailer?: TvVideo;
    labels: {
        noPoster: string;
        tvSeries: string;
        seasons: string;
        episodes: string;
        noDescription: string;
        watchTrailer: string;
    };
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getYear = (date?: string) => {
    if (!date) return "—";
    return date.slice(0, 4);
};

const TvHero = ({
                    tv,
                    trailer,
                    labels,
                }: TvHeroProps) => {
    const backdrop = tv.backdrop_path
        ? `${IMAGE_BASE_URL}/original${tv.backdrop_path}`
        : null;

    const poster = tv.poster_path
        ? `${IMAGE_BASE_URL}/w500${tv.poster_path}`
        : null;

    return (
        <section className="relative min-h-[620px] overflow-hidden">
            {backdrop && (
                <Image
                    src={backdrop}
                    alt={tv.name}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

            <div className="relative z-10 grid min-h-[620px] gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-10">
                <div className="hidden overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl lg:block">
                    {poster ? (
                        <Image
                            src={poster}
                            alt={tv.name}
                            width={500}
                            height={750}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full min-h-[480px] items-center justify-center text-white/60">
                            {labels.noPoster}
                        </div>
                    )}
                </div>

                <div className="flex max-w-4xl flex-col justify-center text-white">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide backdrop-blur">
                        <Tv className="h-4 w-4" />
                        {labels.tvSeries}
                    </div>

                    <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {tv.name}
                    </h1>

                    {tv.original_name && tv.original_name !== tv.name && (
                        <p className="mt-3 text-lg font-semibold text-white/70">
                            {tv.original_name}
                        </p>
                    )}

                    {tv.tagline && (
                        <p className="mt-4 text-xl font-bold text-[var(--color-brand)]">
                            {tv.tagline}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                            <Star className="h-4 w-4 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                            {tv.vote_average.toFixed(1)}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                            <Calendar className="h-4 w-4" />
                            {getYear(tv.first_air_date)}
                        </span>

                        <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                            {tv.number_of_seasons} {labels.seasons}
                        </span>

                        <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                            {tv.number_of_episodes} {labels.episodes}
                        </span>

                        <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                            {tv.status}
                        </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {tv.genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/tv?genre=${genre.id}`}
                                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-[var(--color-brand)]"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>

                    <p className="mt-7 max-w-3xl text-base leading-8 text-white/80">
                        {tv.overview || labels.noDescription}
                    </p>

                    {trailer && (
                        <a
                            href="#tv-trailer"
                            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-black text-white transition hover:opacity-90"
                        >
                            <Play className="h-4 w-4" />
                            {labels.watchTrailer}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export { TvHero };