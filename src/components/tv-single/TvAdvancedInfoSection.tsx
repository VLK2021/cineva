import {
    BadgeInfo,
    CalendarDays,
    Clock,
    Globe2,
    RadioTower,
} from "lucide-react";
import type { TvDetailsWithAppend } from "@/src/types/tv.types";

type TvAdvancedInfoSectionProps = {
    tv: TvDetailsWithAppend;
    labels: {
        fullInfo: string;
        status: string;
        type: string;
        inProduction: string;
        yes: string;
        no: string;
        episodeRuntime: string;
        firstAirDate: string;
        lastAirDate: string;
        seasons: string;
        episodes: string;
        tmdbRating: string;
        votes: string;
        popularity: string;
        originalLanguage: string;
        networks: string;
        countries: string;
        dates: string;
        noData: string;
        minutes: string;
    };
};

const InfoBox = ({
                     label,
                     value,
                 }: {
    label: string;
    value: string | number;
}) => {
    return (
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-2 text-base font-black text-[var(--color-text)]">
                {value || "—"}
            </p>
        </div>
    );
};

const TvAdvancedInfoSection = ({
                                   tv,
                                   labels,
                               }: TvAdvancedInfoSectionProps) => {
    const episodeRuntime = tv.episode_run_time?.length
        ? `${tv.episode_run_time.join(", ")} ${labels.minutes}`
        : "—";

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <BadgeInfo className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">{labels.fullInfo}</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoBox label={labels.status} value={tv.status} />
                <InfoBox label={labels.type} value={tv.type} />
                <InfoBox
                    label={labels.inProduction}
                    value={tv.in_production ? labels.yes : labels.no}
                />
                <InfoBox
                    label={labels.episodeRuntime}
                    value={episodeRuntime}
                />
                <InfoBox
                    label={labels.firstAirDate}
                    value={tv.first_air_date || "—"}
                />
                <InfoBox
                    label={labels.lastAirDate}
                    value={tv.last_air_date || "—"}
                />
                <InfoBox
                    label={labels.seasons}
                    value={tv.number_of_seasons}
                />
                <InfoBox
                    label={labels.episodes}
                    value={tv.number_of_episodes}
                />
                <InfoBox
                    label={labels.tmdbRating}
                    value={tv.vote_average.toFixed(1)}
                />
                <InfoBox
                    label={labels.votes}
                    value={tv.vote_count}
                />
                <InfoBox
                    label={labels.popularity}
                    value={Math.round(tv.popularity)}
                />
                <InfoBox
                    label={labels.originalLanguage}
                    value={tv.original_language.toUpperCase()}
                />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <RadioTower className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">{labels.networks}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tv.networks.length ? (
                            tv.networks.map((network) => (
                                <span
                                    key={network.id}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {network.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">
                                {labels.noData}
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <Globe2 className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">{labels.countries}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tv.production_countries.length ? (
                            tv.production_countries.map((country) => (
                                <span
                                    key={country.iso_3166_1}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {country.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">
                                {labels.noData}
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">{labels.dates}</h3>
                    </div>

                    <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {labels.firstAirDate}: {tv.first_air_date || "—"}
                        </p>

                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {labels.lastAirDate}: {tv.last_air_date || "—"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { TvAdvancedInfoSection };