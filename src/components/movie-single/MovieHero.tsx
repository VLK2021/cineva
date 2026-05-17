import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Film, Star } from "lucide-react";
import type { MovieDetailsWithAppend, MovieVideo } from "@/src/types";
import { formatRuntime, getYear, IMAGE_BASE_URL } from "./movieSingle.helpers";

type MovieHeroProps = {
    movie: MovieDetailsWithAppend;
    trailer?: MovieVideo;
};

const MovieHero = ({ movie, trailer }: MovieHeroProps) => {
    return (
        <section className="relative min-h-[700px] overflow-hidden">
            {movie.backdrop_path && (
                <Image
                    src={`${IMAGE_BASE_URL}/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-black/20" />

            <div className="relative z-10 grid min-h-[700px] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-10">
                <div className="mx-auto w-full max-w-[300px] lg:max-w-none">
                    {movie.poster_path && (
                        <Image
                            src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={320}
                            height={480}
                            className="rounded-3xl object-cover shadow-2xl"
                        />
                    )}
                </div>

                <div className="max-w-4xl text-white">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-4 py-2 text-xs font-bold uppercase tracking-wide">
                        <Film className="h-4 w-4" />
                        Фільм
                    </div>

                    <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {movie.title}
                    </h1>

                    {movie.original_title && movie.original_title !== movie.title && (
                        <p className="mt-2 text-lg text-white/60">
                            Оригінальна назва: {movie.original_title}
                        </p>
                    )}

                    {movie.tagline && (
                        <p className="mt-4 text-xl font-medium text-white/75">
                            “{movie.tagline}”
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/85">
                        <Badge icon={<Star />} value={`${movie.vote_average.toFixed(1)} / 10`} />
                        <Badge icon={<Calendar />} value={getYear(movie.release_date)} />
                        <Badge icon={<Clock />} value={formatRuntime(movie.runtime)} />
                        <Badge value={movie.status || "Невідомо"} />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/movies?genre=${genre.id}`}
                                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-[var(--color-brand)]"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>

                    <p className="mt-7 max-w-3xl text-base leading-8 text-white/80">
                        {movie.overview || "Опис для цього фільму поки відсутній."}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="rounded-full bg-[var(--color-brand)] px-7 py-3 text-sm font-bold text-white transition hover:scale-[1.03] active:scale-95"
                        >
                            Дивитись фільм
                        </button>

                        {trailer && (
                            <a
                                href="#trailer"
                                className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
                            >
                                Дивитись трейлер
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Badge = ({
                   icon,
                   value,
               }: {
    icon?: React.ReactNode;
    value: string;
}) => {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
            {icon && <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
            {value}
        </span>
    );
};

export { MovieHero };