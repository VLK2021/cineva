import Image from "next/image";
import { Calendar, MapPin, Star, User } from "lucide-react";
import type { ActorDetailsWithAppend } from "@/src/types/actor.types";

type ActorHeroProps = {
    actor: ActorDetailsWithAppend;
    labels: {
        noPhoto: string;
        actor: string;
        unknownDate: string;
        biographyMissing: string;
        genderFemale: string;
        genderMale: string;
        genderNonBinary: string;
        genderUnknown: string;
    };
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getGender = (
    gender: number,
    labels: ActorHeroProps["labels"]
) => {
    if (gender === 1) return labels.genderFemale;
    if (gender === 2) return labels.genderMale;
    if (gender === 3) return labels.genderNonBinary;

    return labels.genderUnknown;
};

const ActorHero = ({ actor, labels }: ActorHeroProps) => {
    const profile = actor.profile_path
        ? `${IMAGE_BASE_URL}/w500${actor.profile_path}`
        : null;

    return (
        <section className="relative overflow-hidden bg-[var(--color-card)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-card)] to-[var(--color-background)]" />

            <div className="relative z-10 grid gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-10">
                <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl">
                    <div className="relative aspect-[2/3]">
                        {profile ? (
                            <Image
                                src={profile}
                                alt={actor.name}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 320px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">
                                {labels.noPhoto}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex max-w-4xl flex-col justify-center">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-xs font-black uppercase tracking-wide text-[var(--color-brand)]">
                        <User className="h-4 w-4" />
                        {labels.actor}
                    </div>

                    <h1 className="text-4xl font-black leading-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
                        {actor.name}
                    </h1>

                    <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-background)] px-4 py-2">
                            <Star className="h-4 w-4 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                            {Math.round(actor.popularity)}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-background)] px-4 py-2">
                            <Calendar className="h-4 w-4" />
                            {actor.birthday || labels.unknownDate}
                        </span>

                        {actor.place_of_birth && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-background)] px-4 py-2">
                                <MapPin className="h-4 w-4" />
                                {actor.place_of_birth}
                            </span>
                        )}

                        <span className="rounded-full bg-[var(--color-background)] px-4 py-2">
                            {getGender(actor.gender, labels)}
                        </span>
                    </div>

                    {actor.also_known_as.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {actor.also_known_as.slice(0, 10).map((name) => (
                                <span
                                    key={name}
                                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-muted)]"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
                        {actor.biography || labels.biographyMissing}
                    </p>
                </div>
            </div>
        </section>
    );
};

export { ActorHero };