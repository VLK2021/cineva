import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { MovieListItem } from "@/src/types";

type MovieCardProps = {
    movie: MovieListItem;
};

const IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getYear = (date?: string) => {
    if (!date) return "—";
    return date.slice(0, 4);
};

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link
            href={`/movies/${movie.id}`}
            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-[var(--color-border)]">
                {movie.poster_path ? (
                    <Image
                        src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-[var(--color-text-muted)]">
                        Немає постера
                    </div>
                )}

                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-[var(--color-text)]">
                    {movie.title}
                </h3>

                <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                    <span>{getYear(movie.release_date)}</span>
                    <span>{movie.original_language?.toUpperCase()}</span>
                </div>
            </div>
        </Link>
    );
};

export { MovieCard };