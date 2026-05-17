import { TvFiltersBar } from "@/src/components/tv/TvFiltersBar";

type TvPageHeaderProps = {
    genre?: string;
    sort?: string;
    year?: string;
};

const TvPageHeader = ({ genre, sort, year }: TvPageHeaderProps) => {
    return (
        <div className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                Каталог
            </p>

            <TvFiltersBar genre={genre} sort={sort} year={year} />
        </div>
    );
};

export { TvPageHeader };