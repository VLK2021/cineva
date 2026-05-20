"use client";

import { ReactNode, useMemo, useState } from "react";
import { Globe2, Video } from "lucide-react";
import type { TvSeasonDetails, TvVideo } from "@/src/types/tv.types";
import { useLanguage } from "@/src/context";
import uk from "@/src/locales/uk";
import en from "@/src/locales/en";
import { TvTrailerPlayerTab } from "@/src/components/tv-single/TvTrailerPlayerTab";
import { TvTabWatchN1 } from "@/src/components/tv-single/TvTabWatchN1";

type TvMediaSectionProps = {
    trailer?: TvVideo;
    imdbId?: string | null;
    tvTitle: string;
    tmdbId: number | string;
    posterPath?: string | null;
    seasons: TvSeasonDetails[];
};

type MediaTab = {
    id: string;
    title: string;
    icon: ReactNode;
    content: ReactNode;
};

const TvMediaSection = ({
                            trailer,
                            tvTitle,
                            tmdbId,
                            seasons,
                        }: TvMediaSectionProps) => {
    const { lang } = useLanguage();
    const t = lang === "uk" ? uk : en;

    const tabs = useMemo<MediaTab[]>(() => {
        return [
            ...(trailer
                ? [
                    {
                        id: "trailer",
                        title: t.trailer,
                        icon: <Video className="h-4 w-4" />,
                        content: <TvTrailerPlayerTab trailer={trailer} />,
                    },
                ]
                : []),

            {
                id: "watchn1",
                title: "Watch N1",
                icon: <Globe2 className="h-4 w-4" />,
                content: (
                    <TvTabWatchN1
                        tmdbId={tmdbId}
                        title={tvTitle}
                        seasons={seasons}
                    />
                ),
            },
        ];
    }, [trailer, tvTitle, tmdbId, seasons, t.trailer]);

    const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");

    if (!tabs.length) return null;

    const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

    return (
        <section id="tv-media" className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-black">{t.media}</h2>

                <div className="flex flex-wrap rounded-full border border-[var(--color-border)] bg-[var(--color-card)] p-1 shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTabId(tab.id)}
                            className={`
                                inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition
                                ${
                                activeTab.id === tab.id
                                    ? "bg-[var(--color-brand)] text-white"
                                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                            }
                            `}
                        >
                            {tab.icon}
                            {tab.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
                <div className="aspect-video w-full bg-black">
                    {activeTab.content}
                </div>
            </div>
        </section>
    );
};

export { TvMediaSection };