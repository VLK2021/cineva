import type { ActorListItem } from "@/src/types/actor.types";
import { ActorCard } from "@/src/components/actors/ActorCard";

type ActorsGridProps = {
    actors: ActorListItem[];
};

const ActorsGrid = ({ actors }: ActorsGridProps) => {
    if (!actors.length) {
        return (
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-[var(--color-text-muted)]">
                Акторів не знайдено.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {actors.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
            ))}
        </div>
    );
};

export { ActorsGrid };