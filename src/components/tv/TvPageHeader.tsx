import { TvFiltersBar } from "@/src/components/tv/TvFiltersBar";

type TvPageHeaderProps = {
    genre?: string;
    sort?: string;
    year?: string;
};

const TvPageHeader = ({ genre, sort, year }: TvPageHeaderProps) => {
    return (
        <div className="mb-8">
            <TvFiltersBar genre={genre} sort={sort} year={year} />
        </div>
    );
};

export { TvPageHeader };