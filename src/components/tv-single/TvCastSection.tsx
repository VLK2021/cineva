import Image from "next/image";
import { Users } from "lucide-react";
import type { TvCastMember } from "@/src/types/tv.types";

type TvCastSectionProps = {
    cast: TvCastMember[];
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TvCastSection = ({ cast }: TvCastSectionProps) => {
    if (!cast.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Users className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Актори</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {cast.map((actor) => (
                    <div
                        key={actor.credit_id}
                        className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
                    >
                        <div className="relative aspect-[2/3] bg-[var(--color-border)]">
                            {actor.profile_path ? (
                                <Image
                                    src={`${IMAGE_BASE_URL}/w300${actor.profile_path}`}
                                    alt={actor.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                    Немає фото
                                </div>
                            )}
                        </div>

                        <div className="p-3">
                            <p className="line-clamp-1 text-sm font-black">{actor.name}</p>
                            <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                                {actor.character || "—"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { TvCastSection };