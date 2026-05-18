import { ActorsFiltersBar } from "@/src/components/actors/ActorsFiltersBar";

type ActorsPageHeaderProps = {
    sort?: string;
};

const ActorsPageHeader = ({ sort }: ActorsPageHeaderProps) => {
    return (
        <div className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                Каталог
            </p>

            <ActorsFiltersBar sort={sort} />
        </div>
    );
};

export { ActorsPageHeader };