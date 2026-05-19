"use client"
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { ActorListItem } from "@/src/types/actor.types";
import {useLanguage} from "@/src/context";
import uk from "@/src/locales/uk";
import en from "@/src/locales/en";

type HomeActorsSectionProps = {
    title: string;
    actors: ActorListItem[];
    href?: string;
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const HomeActorsSection = ({
                               title,
                               actors,
                               href = "/actors",
                           }: HomeActorsSectionProps) => {
    const {lang} = useLanguage();
    const t = lang === "uk" ? uk : en;

    if (!actors.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-[var(--color-text)]">
                    {title}
                </h2>

                <Link
                    href={href}
                    className="text-sm font-bold text-[var(--color-brand)] transition hover:opacity-80"
                >
                    {t.viewAll}
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {actors.slice(0, 6).map((actor) => (
                    <Link
                        key={actor.id}
                        href={`/actors/${actor.id}`}
                        className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative aspect-[2/3] overflow-hidden bg-[var(--color-border)]">
                            {actor.profile_path ? (
                                <Image
                                    src={`${IMAGE_BASE_URL}/w500${actor.profile_path}`}
                                    alt={actor.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
                                    {t.noPhoto}
                                </div>
                            )}

                            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                                <Star className="h-3.5 w-3.5 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                                {Math.round(actor.popularity)}
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-[var(--color-text)]">
                                {actor.name}
                            </h3>

                            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                {actor.known_for_department || "Acting"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export { HomeActorsSection };