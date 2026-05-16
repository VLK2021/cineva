import Image from "next/image";
import Link from "next/link";
import type { MovieCastMember } from "@/src/types";
import { IMAGE_BASE_URL } from "./movieSingle.helpers";

type MovieCastSectionProps = {
    cast: MovieCastMember[];
};

const MovieCastSection = ({ cast }: MovieCastSectionProps) => {
    if (!cast.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="text-2xl font-black">Актори</h2>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9">
                {cast.map((actor) => (
                    <Link
                        key={actor.credit_id}
                        href={`/actors/${actor.id}`}
                        className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative aspect-[2/3] bg-[var(--color-border)]">
                            {actor.profile_path && (
                                <Image
                                    src={`${IMAGE_BASE_URL}/w342${actor.profile_path}`}
                                    alt={actor.name}
                                    fill
                                    sizes="180px"
                                    className="object-cover transition duration-300 group-hover:scale-105"
                                />
                            )}
                        </div>

                        <div className="p-3">
                            <h3 className="line-clamp-1 text-sm font-bold">
                                {actor.name}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                                {actor.character}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export { MovieCastSection };