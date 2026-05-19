import { MoviesFiltersBar } from "@/src/components/movies/MoviesFiltersBar";

type MoviesPageHeaderProps = {
    genre?: string;
    sort?: string;
    year?: string;
};

const MoviesPageHeader = ({ genre, sort, year }: MoviesPageHeaderProps) => {
    return (
        <div className="mb-8">
            <MoviesFiltersBar
                genre={genre}
                sort={sort}
                year={year}
            />
        </div>
    );
};

export { MoviesPageHeader };