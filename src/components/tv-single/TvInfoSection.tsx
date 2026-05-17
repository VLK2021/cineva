import { Building2, Globe2, Info, Languages } from "lucide-react";
import type { TvDetailsWithAppend } from "@/src/types/tv.types";

type TvInfoSectionProps = {
    tv: TvDetailsWithAppend;
};

const InfoCard = ({
                      label,
                      value,
                  }: {
    label: string;
    value: string | number;
}) => (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-2 text-base font-black text-[var(--color-text)]">
            {value || "—"}
        </p>
    </div>
);

const TvInfoSection = ({ tv }: TvInfoSectionProps) => {
    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Info className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Інформація про серіал</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard label="Статус" value={tv.status} />
                <InfoCard label="Тип" value={tv.type} />
                <InfoCard label="Перший ефір" value={tv.first_air_date || "—"} />
                <InfoCard label="Останній ефір" value={tv.last_air_date || "—"} />
                <InfoCard label="Сезонів" value={tv.number_of_seasons} />
                <InfoCard label="Серій" value={tv.number_of_episodes} />
                <InfoCard label="Рейтинг" value={tv.vote_average.toFixed(1)} />
                <InfoCard label="Голосів" value={tv.vote_count} />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">Мережі</h3>
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
                                <span
                                    key={country.iso_3166_1}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
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
                        <Languages className="h-5 w-5 text-[var(--color-brand)]" />
                        <h3 className="font-black">Мови</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tv.spoken_languages.length ? (
                            tv.spoken_languages.map((language) => (
                                <span
                                    key={language.iso_639_1}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {language.name || language.english_name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">Немає даних</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { TvInfoSection };