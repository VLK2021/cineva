"use client";

import { ReactNode, useMemo, useState } from "react";
import { Film, Globe2, Video } from "lucide-react";
import type { MovieVideo } from "@/src/types";
import { TrailerPlayerTab } from "@/src/components/movie-single/TrailerPlayerTab";
import { KinoBdPlayerTab } from "@/src/components/movie-single/KinoBdPlayerTab";
import { TabWatchN } from "@/src/components/movie-single/TabWatchN";

type MovieMediaSectionProps = {
    trailer?: MovieVideo;
    kinopoiskId?: string | null;
    movieTitle: string;
    tmdbId: number | string;
    posterPath?: string | null;
};

type MediaTab = {
    id: string;
    title: string;
    icon: ReactNode;
    content: ReactNode;
};

const MovieMediaSection = ({
                               trailer,
                               kinopoiskId,
                               movieTitle,
                               tmdbId,
                               posterPath,
                           }: MovieMediaSectionProps) => {
    const tabs = useMemo<MediaTab[]>(() => {
        return [
            ...(trailer
                ? [
                    {
                        id: "trailer",
                        title: "Трейлер",
                        icon: <Video className="h-4 w-4" />,
                        content: <TrailerPlayerTab trailer={trailer} />,
                    },
                ]
                : []),

            {
                id: "kinobd",
                title: "Дивитися фільм",
                icon: <Film className="h-4 w-4" />,
                content: (
                    <KinoBdPlayerTab
                        kinopoiskId={kinopoiskId}
                        movieTitle={movieTitle}
                    />
                ),
            },

            {
                id: "watchn",
                title: "Watch EN",
                icon: <Globe2 className="h-4 w-4" />,
                content: (
                    <TabWatchN
                        tmdbId={tmdbId}
                        title={movieTitle}
                        posterPath={posterPath}
                    />
                ),
            },
        ];
    }, [trailer, kinopoiskId, movieTitle, tmdbId, posterPath]);

    const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");

    if (tabs.length === 0) return null;

    const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

    return (
        <section id="media" className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-black">Медіа</h2>

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

export { MovieMediaSection };