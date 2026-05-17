"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Film, Video } from "lucide-react";
import type { MovieVideo } from "@/src/types";

type MovieMediaSectionProps = {
    trailer?: MovieVideo;
    kinopoiskId?: string | null;
    movieTitle: string;
};

const KINOBD_SCRIPT_SRC = "https://kinobd.net/js/player_.js";

const MovieMediaSection = ({ trailer, kinopoiskId, movieTitle }: MovieMediaSectionProps) => {
    const kinoBdRootRef = useRef<HTMLDivElement | null>(null);

    const [activeTab, setActiveTab] = useState<"trailer" | "movie">(
        trailer ? "trailer" : "movie"
    );

    const preparedKinopoiskId = useMemo(() => {
        return kinopoiskId?.replace(/^tt/i, "").trim() || "";
    }, [kinopoiskId]);

    const preparedTitle = useMemo(() => {
        return movieTitle.trim();
    }, [movieTitle]);

    const playerKey = `${preparedKinopoiskId}-${preparedTitle}`;

    useEffect(() => {
        if (activeTab !== "movie") return;
        if (!kinoBdRootRef.current) return;
        if (!preparedKinopoiskId && !preparedTitle) return;

        const root = kinoBdRootRef.current;

        root.replaceChildren();

        const playerDiv = document.createElement("div");
        playerDiv.id = "kinobd";
        playerDiv.className = "h-full w-full";

        if (preparedKinopoiskId) {
            playerDiv.dataset.kinopoisk = preparedKinopoiskId;
        }

        if (preparedTitle) {
            playerDiv.dataset.title = preparedTitle;
        }

        const script = document.createElement("script");
        script.src = KINOBD_SCRIPT_SRC;
        script.async = true;

        root.appendChild(playerDiv);
        root.appendChild(script);

        return () => {
            script.remove();
            root.replaceChildren();
        };
    }, [activeTab, playerKey, preparedKinopoiskId, preparedTitle]);

    if (!trailer && !preparedKinopoiskId && !preparedTitle) return null;

    return (
        <section id="media" className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-black">Медіа</h2>

                <div className="flex rounded-full border border-[var(--color-border)] bg-[var(--color-card)] p-1 shadow-sm">
                    {trailer && (
                        <button
                            type="button"
                            onClick={() => setActiveTab("trailer")}
                            className={`
                                inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition
                                ${
                                activeTab === "trailer"
                                    ? "bg-[var(--color-brand)] text-white"
                                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                            }
                            `}
                        >
                            <Video className="h-4 w-4" />
                            Трейлер
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setActiveTab("movie")}
                        className={`
                            inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition
                            ${
                            activeTab === "movie"
                                ? "bg-[var(--color-brand)] text-white"
                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        }
                        `}
                    >
                        <Film className="h-4 w-4" />
                        Дивитися фільм
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
                <div className="aspect-video w-full bg-black">
                    {activeTab === "trailer" && trailer && (
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                        />
                    )}

                    {activeTab === "movie" && (
                        <div
                            ref={kinoBdRootRef}
                            className="h-full w-full"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export { MovieMediaSection };