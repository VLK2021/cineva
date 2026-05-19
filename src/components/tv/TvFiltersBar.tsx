"use client";

import Link from "next/link";
import { useLanguage } from "@/src/context";
import uk from "@/src/locales/uk";
import en from "@/src/locales/en";

type TvFiltersBarProps = {
    genre?: string;
    sort?: string;
    year?: string;
};

const TvFiltersBar = ({ genre, sort, year }: TvFiltersBarProps) => {
    const { lang } = useLanguage();
    const t = lang === "uk" ? uk : en;

    const sortOptions = [
        { label: t.popular, value: "popularity.desc" },
        { label: t.newest, value: "first_air_date.desc" },
        { label: t.oldest, value: "first_air_date.asc" },
        { label: t.highestRating, value: "vote_average.desc" },
        { label: t.mostVotes, value: "vote_count.desc" },
    ];

    const currentYear = new Date().getFullYear();

    const yearOptions = Array.from({ length: 30 }, (_, index) =>
        String(currentYear - index)
    );

    return (
        <form
            action="/tv"
            className="
                mt-6 grid gap-3 rounded-3xl border border-[var(--color-border)]
                bg-[var(--color-card)] p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]
            "
        >
            {genre && (
                <input
                    type="hidden"
                    name="genre"
                    value={genre}
                />
            )}

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
                <option value="">{t.allYears}</option>

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
                    {t.apply}
                </button>

                <Link
                    href={genre ? `/tv?genre=${genre}` : "/tv"}
                    className="inline-flex h-11 items-center rounded-2xl border border-[var(--color-border)] px-5 text-sm font-bold text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                    {t.reset}
                </Link>
            </div>
        </form>
    );
};

export { TvFiltersBar };