"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Clapperboard } from "lucide-react";
import { useState } from "react";
import type { ActorMovieCredit, ActorTvCredit } from "@/src/types/actor.types";

type ActorCreditsSectionProps = {
    movieCredits: ActorMovieCredit[];
    tvCredits: ActorTvCredit[];
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getYear = (date?: string) => {
    if (!date) return "—";
    return date.slice(0, 4);
};

const sortByDate = <T extends { release_date?: string; first_air_date?: string }>(
    items: T[]
) => {
    return [...items].sort((a, b) => {
        const dateA = a.release_date || a.first_air_date || "";
        const dateB = b.release_date || b.first_air_date || "";
        return dateB.localeCompare(dateA);
    });
};

const ActorCreditsSection = ({
                                 movieCredits,
                                 tvCredits,
                             }: ActorCreditsSectionProps) => {
    const [opened, setOpened] = useState<"movies" | "tv" | null>("movies");

    const movies = sortByDate(movieCredits).slice(0, 60);
    const tv = sortByDate(tvCredits).slice(0, 60);

    const toggle = (section: "movies" | "tv") => {
        setOpened((prev) => (prev === section ? null : section));
    };

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Clapperboard className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Фільмографія</h2>
            </div>

            <div className="space-y-4">
                <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
                    <button
                        type="button"
                        onClick={() => toggle("movies")}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[var(--color-background)]"
                    >
                        <div>
                            <h3 className="text-lg font-black">Фільми</h3>
                            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                {movies.length} робіт
                            </p>
                        </div>

                        <ChevronDown
                            className={`h-5 w-5 transition ${opened === "movies" ? "rotate-180" : ""}`}
                        />
                    </button>

                    {opened === "movies" && (
                        <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] p-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                            {movies.map((movie) => (
                                <Link
                                    key={`${movie.id}-${movie.credit_id}`}
                                    href={`/movies/${movie.id}`}
                                    className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]"
                                >
                                    <div className="relative aspect-[2/3]">
                                        {movie.poster_path ? (
                                            <Image
                                                src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 16vw"
                                                className="object-cover transition group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                                Немає постера
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-3">
                                        <p className="line-clamp-2 text-sm font-black">
                                            {movie.title}
                                        </p>
                                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                            {getYear(movie.release_date)}
                                        </p>
                                        <p className="mt-1 line-clamp-1 text-xs text-[var(--color-brand)]">
                                            {movie.character || movie.job || "—"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
                    <button
                        type="button"
                        onClick={() => toggle("tv")}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[var(--color-background)]"
                    >
                        <div>
                            <h3 className="text-lg font-black">Серіали</h3>
                            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                {tv.length} робіт
                            </p>
                        </div>

                        <ChevronDown
                            className={`h-5 w-5 transition ${opened === "tv" ? "rotate-180" : ""}`}
                        />
                    </button>

                    {opened === "tv" && (
                        <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] p-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                            {tv.map((item) => (
                                <Link
                                    key={`${item.id}-${item.credit_id}`}
                                    href={`/tv/${item.id}`}
                                    className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]"
                                >
                                    <div className="relative aspect-[2/3]">
                                        {item.poster_path ? (
                                            <Image
                                                src={`${IMAGE_BASE_URL}/w500${item.poster_path}`}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 16vw"
                                                className="object-cover transition group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                                Немає постера
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-3">
                                        <p className="line-clamp-2 text-sm font-black">
                                            {item.name}
                                        </p>
                                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                            {getYear(item.first_air_date)}
                                        </p>
                                        <p className="mt-1 line-clamp-1 text-xs text-[var(--color-brand)]">
                                            {item.character || item.job || "—"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export { ActorCreditsSection };