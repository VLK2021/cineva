import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import type { TvAggregateCastMember } from "@/src/types/tv.types";

type TvCastSectionProps = {
    cast: TvAggregateCastMember[];
    title: string;
    noPhotoLabel: string;
    episodesLabel: string;
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TvCastSection = ({
                           cast,
                           title,
                           noPhotoLabel,
                           episodesLabel,
                       }: TvCastSectionProps) => {
    if (!cast.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Users className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">{title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {cast.map((actor) => {
                    const role = actor.roles?.[0];

                    return (
                        <div
                            key={`${actor.id}-${role?.credit_id ?? actor.total_episode_count}`}
                            className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
                        >
                            <Link
                                href={`/actors/${actor.id}`}
                                className="group block overflow-hidden"
                            >
                                <div className="relative aspect-[2/3] bg-[var(--color-border)]">
                                    {actor.profile_path ? (
                                        <Image
                                            src={`${IMAGE_BASE_URL}/w300${actor.profile_path}`}
                                            alt={actor.name}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                            className="object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                            {noPhotoLabel}
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="p-3">
                                <p className="line-clamp-1 text-sm font-black">
                                    {actor.name}
                                </p>

                                <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                                    {role?.character || "—"}
                                </p>

                                <p className="mt-2 text-xs font-bold text-[var(--color-brand)]">
                                    {actor.total_episode_count} {episodesLabel}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export { TvCastSection };