import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { TvListItem } from "@/src/types/tv.types";

type TvRelatedSectionProps = {
    title: string;
    tvShows: TvListItem[];
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getYear = (date?: string) => {
    if (!date) return "—";
    return date.slice(0, 4);
};

const TvRelatedSection = ({ title, tvShows }: TvRelatedSectionProps) => {
    if (!tvShows.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="mb-5 text-2xl font-black">{title}</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {tvShows.map((tv) => (
                    <Link
                        key={tv.id}
                        href={`/tv/${tv.id}`}
                        className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative aspect-[2/3] bg-[var(--color-border)]">
                            {tv.poster_path ? (
                                <Image
                                    src={`${IMAGE_BASE_URL}/w500${tv.poster_path}`}
                                    alt={tv.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 16vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                    Немає постера
                                </div>
                            )}

                            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white">
                                <Star className="h-3.5 w-3.5 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                                {tv.vote_average.toFixed(1)}
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="line-clamp-2 text-sm font-black">{tv.name}</h3>
                            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                {getYear(tv.first_air_date)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export { TvRelatedSection };