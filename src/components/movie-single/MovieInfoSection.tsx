import type { ReactNode } from "react";
import {
    Calendar,
    Clock,
    DollarSign,
    Film,
    Globe,
    Languages,
    LinkIcon,
    Star,
    Users,
} from "lucide-react";
import type { MovieDetailsWithAppend } from "@/src/types";
import { formatMoney, formatRuntime } from "./movieSingle.helpers";

type MovieInfoSectionProps = {
    movie: MovieDetailsWithAppend;
    labels: {
        mainInfo: string;
        additional: string;
        budget: string;
        revenue: string;
        originalLanguage: string;
        voteCount: string;
        releaseDate: string;
        runtime: string;
        popularity: string;
        productionCountries: string;
        languages: string;
        companies: string;
        officialSite: string;
        unknown: string;
    };
};

const MovieInfoSection = ({
                              movie,
                              labels,
                          }: MovieInfoSectionProps) => {
    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <InfoPanel title={labels.mainInfo}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoItem
                            icon={<DollarSign />}
                            label={labels.budget}
                            value={formatMoney(movie.budget)}
                        />

                        <InfoItem
                            icon={<DollarSign />}
                            label={labels.revenue}
                            value={formatMoney(movie.revenue)}
                        />

                        <InfoItem
                            icon={<Globe />}
                            label={labels.originalLanguage}
                            value={movie.original_language.toUpperCase()}
                        />

                        <InfoItem
                            icon={<Users />}
                            label={labels.voteCount}
                            value={String(movie.vote_count)}
                        />

                        <InfoItem
                            icon={<Calendar />}
                            label={labels.releaseDate}
                            value={movie.release_date || labels.unknown}
                        />

                        <InfoItem
                            icon={<Clock />}
                            label={labels.runtime}
                            value={formatRuntime(movie.runtime)}
                        />

                        <InfoItem
                            icon={<Film />}
                            label="IMDB ID"
                            value={movie.imdb_id || labels.unknown}
                        />

                        <InfoItem
                            icon={<Star />}
                            label={labels.popularity}
                            value={String(Math.round(movie.popularity))}
                        />
                    </div>
                </InfoPanel>

                <InfoPanel title={labels.additional}>
                    <InfoBlock
                        title={labels.productionCountries}
                        values={movie.production_countries.map((item) => item.name)}
                        unknown={labels.unknown}
                    />

                    <InfoBlock
                        title={labels.languages}
                        values={movie.spoken_languages.map(
                            (item) => item.name || item.english_name
                        )}
                        unknown={labels.unknown}
                    />

                    <InfoBlock
                        title={labels.companies}
                        values={movie.production_companies.map((item) => item.name)}
                        unknown={labels.unknown}
                    />

                    {movie.homepage && (
                        <a
                            href={movie.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
                        >
                            <LinkIcon className="h-4 w-4" />
                            {labels.officialSite}
                        </a>
                    )}
                </InfoPanel>
            </div>
        </section>
    );
};

const InfoPanel = ({
                       title,
                       children,
                   }: {
    title: string;
    children: ReactNode;
}) => {
    return (
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm sm:p-6">
            <h2 className="mb-6 text-2xl font-black">{title}</h2>
            {children}
        </div>
    );
};

const InfoItem = ({
                      icon,
                      label,
                      value,
                  }: {
    icon: ReactNode;
    label: string;
    value: string;
}) => {
    return (
        <div className="rounded-2xl bg-[var(--color-background)] p-4">
            <div className="mb-2 flex items-center gap-2 text-[var(--color-brand)]">
                <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>
                <span className="text-xs font-bold uppercase tracking-wide">
                    {label}
                </span>
            </div>

            <p className="text-sm font-semibold">{value}</p>
        </div>
    );
};

const InfoBlock = ({
                       title,
                       values,
                       unknown,
                   }: {
    title: string;
    values: string[];
    unknown: string;
}) => {
    const uniqueValues = Array.from(
        new Set(values.filter((value) => value.trim().length > 0))
    );

    return (
        <div className="mb-5">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                <Languages className="h-4 w-4" />
                {title}
            </p>

            <div className="flex flex-wrap gap-2">
                {uniqueValues.length > 0 ? (
                    uniqueValues.map((value) => (
                        <span
                            key={value}
                            className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs font-semibold"
                        >
                            {value}
                        </span>
                    ))
                ) : (
                    <span className="text-sm text-[var(--color-text-muted)]">
                        {unknown}
                    </span>
                )}
            </div>
        </div>
    );
};

export { MovieInfoSection };