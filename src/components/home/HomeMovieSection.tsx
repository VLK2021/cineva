import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { MovieListItem } from "@/src/types";

type HomeMovieSectionProps = {
    title: string;
    movies: MovieListItem[];
};

const IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const HomeMovieSection = ({ title, movies }: HomeMovieSectionProps) => {
    if (!movies.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-[var(--color-text)]">
                    {title}
                </h2>

                <Link
                    href="/movies"
                    className="text-sm font-semibold text-[var(--color-brand)] hover:underline"
                >
                    Дивитись всі
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {movies.slice(0, 6).map((movie) => (
                    <Link
                        key={movie.id}
                        href={`/movies/${movie.id}`}
                        className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative aspect-[2/3] bg-[var(--color-border)]">
                            {movie.poster_path && (
                                <Image
                                    src={`${IMAGE_BASE_URL}/w342${movie.poster_path}`}
                                    alt={movie.title}
                                    fill
                                    sizes="220px"
                                    className="object-cover transition duration-300 group-hover:scale-105"
                                />
                            )}
                        </div>

                        <div className="p-3">
                            <h3 className="line-clamp-2 text-sm font-bold text-[var(--color-text)]">
                                {movie.title}
                            </h3>

                            <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                                <span>{movie.release_date?.slice(0, 4) || "—"}</span>

                                <span className="inline-flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export { HomeMovieSection };