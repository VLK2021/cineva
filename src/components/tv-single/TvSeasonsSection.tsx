import Image from "next/image";
import { Layers } from "lucide-react";
import type { TvSeason } from "@/src/types/tv.types";

type TvSeasonsSectionProps = {
    seasons: TvSeason[];
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TvSeasonsSection = ({ seasons }: TvSeasonsSectionProps) => {
    if (!seasons.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Layers className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Сезони</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {seasons.map((season) => (
                    <div
                        key={season.id}
                        className="grid grid-cols-[110px_1fr] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
                    >
                        <div className="relative min-h-[165px] bg-[var(--color-border)]">
                            {season.poster_path ? (
                                <Image
                                    src={`${IMAGE_BASE_URL}/w300${season.poster_path}`}
                                    alt={season.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-xs text-[var(--color-text-muted)]">
                                    Немає постера
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-black">{season.name}</h3>

                            <p className="mt-2 text-sm font-bold text-[var(--color-brand)]">
                                {season.episode_count} серій
                            </p>

                            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                Дата виходу: {season.air_date || "—"}
                            </p>

                            <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--color-text-muted)]">
                                {season.overview || "Опис відсутній."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { TvSeasonsSection };