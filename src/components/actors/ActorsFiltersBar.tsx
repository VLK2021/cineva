import Link from "next/link";

type ActorsFiltersBarProps = {
    sort?: string;
};

const sortOptions = [
    { label: "Популярні", value: "popularity.desc" },
    { label: "Менш популярні", value: "popularity.asc" },
    { label: "Імʼя A-Z", value: "name.asc" },
    { label: "Імʼя Z-A", value: "name.desc" },
];

const ActorsFiltersBar = ({ sort }: ActorsFiltersBarProps) => {
    return (
        <form
            action="/actors"
            className="mt-6 grid gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm sm:grid-cols-[1fr_auto]"
        >
            <select
                name="sort"
                defaultValue={sort ?? "popularity.desc"}
                className="h-11 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm font-semibold text-[var(--color-text)] outline-none"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="h-11 rounded-2xl bg-[var(--color-brand)] px-5 text-sm font-bold text-white transition hover:opacity-90 active:scale-95"
                >
                    Застосувати
                </button>

                <Link
                    href="/actors"
                    className="inline-flex h-11 items-center rounded-2xl border border-[var(--color-border)] px-5 text-sm font-bold text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                    Скинути
                </Link>
            </div>
        </form>
    );
};

export { ActorsFiltersBar };