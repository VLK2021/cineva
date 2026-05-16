import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { MovieListItem } from "@/src/types";
import { getYear, IMAGE_BASE_URL } from "./movieSingle.helpers";

type MovieRelatedSectionProps = {
    title: string;
    movies: MovieListItem[];
};

const MovieRelatedSection = ({ title, movies }: MovieRelatedSectionProps) => {
    if (!movies.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="text-2xl font-black">{title}</h2>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                {movies.map((movie) => (
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
                                    sizes="200px"
                                    className="object-cover transition duration-300 group-hover:scale-105"
                                />
                            )}
                        </div>

                        <div className="p-3">
                            <h3 className="line-clamp-2 text-sm font-bold">
                                {movie.title}
                            </h3>

                            <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                                <span>{getYear(movie.release_date)}</span>

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

export { MovieRelatedSection };