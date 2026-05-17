import Link from "next/link";

type TvFiltersBarProps = {
    genre?: string;
    sort?: string;
    year?: string;
};

const sortOptions = [
    { label: "Популярні", value: "popularity.desc" },
    { label: "Новіші", value: "first_air_date.desc" },
    { label: "Старіші", value: "first_air_date.asc" },
    { label: "Вищий рейтинг", value: "vote_average.desc" },
    { label: "Більше голосів", value: "vote_count.desc" },
];

const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 30 }, (_, index) =>
    String(currentYear - index)
);

const TvFiltersBar = ({ genre, sort, year }: TvFiltersBarProps) => {
    return (
        <form
            action="/tv"
            className="
                mt-6 grid gap-3 rounded-3xl border border-[var(--color-border)]
                bg-[var(--color-card)] p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]
            "
        >
            {genre && <input type="hidden" name="genre" value={genre} />}

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

            <select
                name="year"
                defaultValue={year ?? ""}
                className="h-11 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm font-semibold text-[var(--color-text)] outline-none"
            >
                <option value="">Усі роки</option>

                {yearOptions.map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                        {yearOption}
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
                    href={genre ? `/tv?genre=${genre}` : "/tv"}
                    className="inline-flex h-11 items-center rounded-2xl border border-[var(--color-border)] px-5 text-sm font-bold text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                    Скинути
                </Link>
            </div>
        </form>
    );
};

export { TvFiltersBar };