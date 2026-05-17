import { MoviesFiltersBar } from "@/src/components/movies/MoviesFiltersBar";

type MoviesPageHeaderProps = {
    sort?: string;
    year?: string;
};

const MoviesPageHeader = ({ sort, year }: MoviesPageHeaderProps) => {
    return (
        <div className="mb-8">
            <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                    Каталог
                </p>

                <h1 className="text-3xl font-black text-[var(--color-text)] sm:text-4xl">
                    Усі фільми
                </h1>
            </div>

            <MoviesFiltersBar sort={sort} year={year} />
        </div>
    );
};

export { MoviesPageHeader };