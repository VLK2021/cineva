import {MoviesFiltersBar} from "@/src/components/movies/MoviesFiltersBar";

type MoviesPageHeaderProps = {
    sort?: string;
    year?: string;
};

const MoviesPageHeader = ({sort, year}: MoviesPageHeaderProps) => {
    return (
        <div className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                Каталог
            </p>

            <MoviesFiltersBar sort={sort} year={year}/>
        </div>
    );
};

export {MoviesPageHeader};