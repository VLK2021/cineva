"use client";

import { useEffect, useState } from "react";
import { Film, Video } from "lucide-react";
import type { MovieVideo } from "@/src/types";

type MovieMediaSectionProps = {
    trailer?: MovieVideo;
    movieTitles: string[];
};

const KINOBD_SCRIPT_SRC = "https://kinobd.net/js/player_.js";

const MovieMediaSection = ({ trailer, movieTitles }: MovieMediaSectionProps) => {
    const titles = Array.from(
        new Set(
            movieTitles
                .map((title) => title.trim())
                .filter((title) => title.length > 0)
        )
    );

    const [activeTab, setActiveTab] = useState<"trailer" | "movie">(
        trailer ? "trailer" : "movie"
    );

    const [activeTitle, setActiveTitle] = useState(titles[0] ?? "");

    useEffect(() => {
        if (activeTab !== "movie" || !activeTitle) return;

        const oldScript = document.querySelector(
            `script[src="${KINOBD_SCRIPT_SRC}"]`
        );

        oldScript?.remove();

        const script = document.createElement("script");
        script.src = KINOBD_SCRIPT_SRC;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [activeTab, activeTitle]);

    if (!trailer && titles.length === 0) return null;

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

                    {titles.length > 0 && (
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
                    )}
                </div>
            </div>

            {activeTab === "movie" && titles.length > 1 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {titles.map((title) => (
                        <button
                            key={title}
                            type="button"
                            onClick={() => setActiveTitle(title)}
                            className={`
                                rounded-full border px-3 py-1.5 text-xs font-semibold transition
                                ${
                                activeTitle === title
                                    ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                                    : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                            }
                            `}
                        >
                            {title}
                        </button>
                    ))}
                </div>
            )}

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

                    {activeTab === "movie" && activeTitle && (
                        <div
                            key={activeTitle}
                            id="kinobd"
                            data-title={activeTitle}
                            className="h-full w-full"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export { MovieMediaSection };