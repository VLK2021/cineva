import { ActorsFiltersBar } from "@/src/components/actors/ActorsFiltersBar";

type ActorsPageHeaderProps = {
    sort?: string;
};

const ActorsPageHeader = ({ sort }: ActorsPageHeaderProps) => {
    return (
        <div className="mb-8">
            <ActorsFiltersBar sort={sort} />
        </div>
    );
};

export { ActorsPageHeader };