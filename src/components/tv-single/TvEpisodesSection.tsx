"use client";

import Image from "next/image";
import { ChevronDown, ListVideo } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/src/context";
import uk from "@/src/locales/uk";
import en from "@/src/locales/en";
import type { TvSeasonDetails } from "@/src/types/tv.types";

type TvEpisodesSectionProps = {
    seasons: TvSeasonDetails[];
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TvEpisodesSection = ({ seasons }: TvEpisodesSectionProps) => {
    const { lang } = useLanguage();
    const t = lang === "uk" ? uk : en;

    const [openedSeasonId, setOpenedSeasonId] = useState<number | null>(
        seasons[0]?.id ?? null
    );

    if (!seasons.length) return null;

    const toggleSeason = (seasonId: number) => {
        setOpenedSeasonId((prev) => (prev === seasonId ? null : seasonId));
    };

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <ListVideo className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">{t.seasonsEpisodes}</h2>
            </div>

            <div className="space-y-4">
                {seasons.map((season) => {
                    const isOpen = openedSeasonId === season.id;

                    return (
                        <div
                            key={season.id}
                            className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
                        >
                            <button
                                type="button"
                                onClick={() => toggleSeason(season.id)}
                                className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[var(--color-background)]"
                            >
                                <div>
                                    <h3 className="text-lg font-black text-[var(--color-text)]">
                                        {season.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                        {season.episodes.length} {t.episodes} ·{" "}
                                        {season.air_date || t.unknownDate}
                                    </p>
                                </div>

                                <ChevronDown
                                    className={`
                                        h-5 w-5 shrink-0 text-[var(--color-text-muted)] transition-transform
                                        ${isOpen ? "rotate-180" : ""}
                                    `}
                                />
                            </button>

                            {isOpen && (
                                <div className="border-t border-[var(--color-border)] p-5">
                                    {season.overview && (
                                        <p className="mb-5 rounded-2xl bg-[var(--color-background)] p-4 text-sm leading-6 text-[var(--color-text-muted)]">
                                            {season.overview}
                                        </p>
                                    )}

                                    <div className="grid gap-4">
                                        {season.episodes.map((episode) => (
                                            <div
                                                key={episode.id}
                                                className="
                                                    grid gap-4 rounded-2xl
                                                    border border-[var(--color-border)]
                                                    bg-[var(--color-background)]
                                                    p-3
                                                    md:grid-cols-[220px_1fr]
                                                "
                                            >
                                                <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--color-border)]">
                                                    {episode.still_path ? (
                                                        <Image
                                                            src={`${IMAGE_BASE_URL}/w500${episode.still_path}`}
                                                            alt={episode.name}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 220px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                                            {t.noFrame}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-black text-white">
                                                            S{episode.season_number}E{episode.episode_number}
                                                        </span>

                                                        <span className="text-xs font-bold text-[var(--color-text-muted)]">
                                                            {episode.air_date || t.unknownDate}
                                                        </span>

                                                        {episode.runtime && (
                                                            <span className="text-xs font-bold text-[var(--color-text-muted)]">
                                                                {episode.runtime} {t.minutes}
                                                            </span>
                                                        )}

                                                        <span className="text-xs font-bold text-[var(--color-text-muted)]">
                                                            ⭐ {episode.vote_average.toFixed(1)}
                                                        </span>
                                                    </div>

                                                    <h4 className="mt-3 text-base font-black">
                                                        {episode.name}
                                                    </h4>

                                                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                                                        {episode.overview || t.noEpisodeDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export { TvEpisodesSection };