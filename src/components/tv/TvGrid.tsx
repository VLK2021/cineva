import type { TvListItem } from "@/src/types/tv.types";
import { TvCard } from "@/src/components/tv/TvCard";

type TvGridProps = {
    tvShows: TvListItem[];
};

const TvGrid = ({ tvShows }: TvGridProps) => {
    if (!tvShows.length) {
        return (
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-[var(--color-text-muted)]">
                Серіали не знайдено.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {tvShows.map((tv) => (
                <TvCard key={tv.id} tv={tv} />
            ))}
        </div>
    );
};

export { TvGrid };