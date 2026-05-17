import Image from "next/image";
import { ListVideo } from "lucide-react";
import type { TvSeasonDetails } from "@/src/types/tv.types";

type TvEpisodesSectionProps = {
    seasons: TvSeasonDetails[];
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TvEpisodesSection = ({ seasons }: TvEpisodesSectionProps) => {
    if (!seasons.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <ListVideo className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Сезони та серії</h2>
            </div>

            <div className="space-y-6">
                {seasons.map((season) => (
                    <div
                        key={season.id}
                        className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm"
                    >
                        <div className="mb-4">
                            <h3 className="text-xl font-black">
                                {season.name}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                                {season.overview || "Опис сезону відсутній."}
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {season.episodes.map((episode) => (
                                <div
                                    key={episode.id}
                                    className="grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 md:grid-cols-[220px_1fr]"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--color-border)]">
                                        {episode.still_path ? (
                                            <Image
                                                src={`${IMAGE_BASE_URL}/w500${episode.still_path}`}
                                                alt={episode.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                                Немає кадру
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-black text-white">
                                                S{episode.season_number}E{episode.episode_number}
                                            </span>

                                            <span className="text-xs font-bold text-[var(--color-text-muted)]">
                                                {episode.air_date || "Дата невідома"}
                                            </span>

                                            {episode.runtime && (
                                                <span className="text-xs font-bold text-[var(--color-text-muted)]">
                                                    {episode.runtime} хв
                                                </span>
                                            )}

                                            <span className="text-xs font-bold text-[var(--color-text-muted)]">
                                                ⭐ {episode.vote_average.toFixed(1)}
                                            </span>
                                        </div>

                                        <h4 className="mt-3 text-base font-black">
                                            {episode.name}
                                        </h4>

                                        <p className="mt-2 line-clamp-4 text-sm leading-6 text-[var(--color-text-muted)]">
                                            {episode.overview || "Опис серії відсутній."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { TvEpisodesSection };