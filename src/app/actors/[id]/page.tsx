import { BackButton } from "@/src/components/common/BackButton";
import {
    ActorCreditsSection,
    ActorExternalLinks,
    ActorHero,
    ActorImagesSection,
} from "@/src/components/actor-single";
import { getActorDetailsWithAppend } from "@/src/services";

type ActorPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ActorPage({ params }: ActorPageProps) {
    const { id } = await params;

    const actor = await getActorDetailsWithAppend(id, "uk-UA");

    const movieCredits = actor.movie_credits?.cast ?? [];
    const tvCredits = actor.tv_credits?.cast ?? [];
    const images = actor.images?.profiles ?? [];

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="relative">
                <div className="absolute left-4 top-4 z-20 sm:left-6 lg:left-10">
                    <BackButton fallbackHref="/actors" />
                </div>

                <ActorHero actor={actor} />
            </div>

            <ActorExternalLinks actor={actor} />

            <ActorCreditsSection
                movieCredits={movieCredits}
                tvCredits={tvCredits}
            />

            <ActorImagesSection images={images} />
        </main>
    );
}