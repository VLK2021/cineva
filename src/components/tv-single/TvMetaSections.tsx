import { BadgeCheck, Languages, Tags } from "lucide-react";
import type { TvDetailsWithAppend } from "@/src/types/tv.types";

type TvMetaSectionsProps = {
    tv: TvDetailsWithAppend;
};

const TvMetaSections = ({ tv }: TvMetaSectionsProps) => {
    const ratings = tv.content_ratings?.results ?? [];
    const keywords = tv.keywords?.results ?? [];
    const alternativeTitles = tv.alternative_titles?.results ?? [];
    const translations = tv.translations?.translations ?? [];

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-[var(--color-brand)]" />
                        <h2 className="text-xl font-black">Вікові рейтинги</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {ratings.length ? (
                            ratings.slice(0, 20).map((rating) => (
                                <span
                                    key={`${rating.iso_3166_1}-${rating.rating}`}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {rating.iso_3166_1}: {rating.rating || "—"}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">Немає даних</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <Tags className="h-5 w-5 text-[var(--color-brand)]" />
                        <h2 className="text-xl font-black">Ключові слова</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {keywords.length ? (
                            keywords.slice(0, 30).map((keyword) => (
                                <span
                                    key={keyword.id}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {keyword.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">Немає даних</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <Languages className="h-5 w-5 text-[var(--color-brand)]" />
                        <h2 className="text-xl font-black">Альтернативні назви</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {alternativeTitles.length ? (
                            alternativeTitles.slice(0, 25).map((title, index) => (
                                <span
                                    key={`${title.iso_3166_1}-${title.title}-${index}`}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {title.iso_3166_1}: {title.title}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">Немає даних</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <Languages className="h-5 w-5 text-[var(--color-brand)]" />
                        <h2 className="text-xl font-black">Переклади</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {translations.length ? (
                            translations.slice(0, 30).map((translation) => (
                                <span
                                    key={`${translation.iso_639_1}-${translation.iso_3166_1}`}
                                    className="rounded-full bg-[var(--color-background)] px-3 py-1.5 text-sm font-bold"
                                >
                                    {translation.english_name}
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

export { TvMetaSections };