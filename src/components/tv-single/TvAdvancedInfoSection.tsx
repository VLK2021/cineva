import { BadgeInfo, CalendarDays, Clock, Globe2, RadioTower } from "lucide-react";
import type { TvDetailsWithAppend } from "@/src/types/tv.types";

type TvAdvancedInfoSectionProps = {
    tv: TvDetailsWithAppend;
};

const InfoBox = ({ label, value }: { label: string; value: string | number }) => {
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

const TvAdvancedInfoSection = ({ tv }: TvAdvancedInfoSectionProps) => {
    const episodeRuntime = tv.episode_run_time?.length
        ? `${tv.episode_run_time.join(", ")} хв`
        : "—";

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <BadgeInfo className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Повна інформація</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoBox label="Статус" value={tv.status} />
                <InfoBox label="Тип" value={tv.type} />
                <InfoBox label="У виробництві" value={tv.in_production ? "Так" : "Ні"} />
                <InfoBox label="Тривалість серії" value={episodeRuntime} />
                <InfoBox label="Перший ефір" value={tv.first_air_date || "—"} />
                <InfoBox label="Останній ефір" value={tv.last_air_date || "—"} />
                <InfoBox label="Сезонів" value={tv.number_of_seasons} />
                <InfoBox label="Серій" value={tv.number_of_episodes} />
                <InfoBox label="Рейтинг TMDB" value={tv.vote_average.toFixed(1)} />
                <InfoBox label="Голосів" value={tv.vote_count} />
                <InfoBox label="Популярність" value={Math.round(tv.popularity)} />
                <InfoBox label="Оригінальна мова" value={tv.original_language.toUpperCase()} />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <RadioTower className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">Мережі</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tv.networks.length ? (
                            tv.networks.map((network) => (
                                <span key={network.id} className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold">
                                    {network.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">Немає даних</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <Globe2 className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">Країни</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tv.production_countries.length ? (
                            tv.production_countries.map((country) => (
                                <span key={country.iso_3166_1} className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold">
                                    {country.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">Немає даних</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">Дати</h3>
                    </div>

                    <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            Перший ефір: {tv.first_air_date || "—"}
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            Останній ефір: {tv.last_air_date || "—"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { TvAdvancedInfoSection };