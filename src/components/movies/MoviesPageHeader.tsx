import { MoviesFiltersBar } from "@/src/components/movies/MoviesFiltersBar";

type MoviesPageHeaderProps = {
    genre?: string;
    sort?: string;
    year?: string;
};

const MoviesPageHeader = ({ genre, sort, year }: MoviesPageHeaderProps) => {
    return (
        <div className="mb-8">
            <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                    Каталог
                </p>
            </div>

            <MoviesFiltersBar
                genre={genre}
                sort={sort}
                year={year}
            />
        </div>
    );
};

export { MoviesPageHeader };