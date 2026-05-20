import type { SearchResult } from "@/src/types/search.types";
import { SearchResultCard } from "@/src/components/search/SearchResultCard";

type SearchResultsGridProps = {
    results: SearchResult[];
    labels: {
        nothingFound: string;
    };
};

const SearchResultsGrid = ({
                               results,
                               labels,
                           }: SearchResultsGridProps) => {
    if (!results.length) {
        return (
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-[var(--color-text-muted)]">
                {labels.nothingFound}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {results.map((item) => (
                <SearchResultCard
                    key={`${item.media_type}-${item.id}`}
                    item={item}
                />
            ))}
        </div>
    );
};

export { SearchResultsGrid };