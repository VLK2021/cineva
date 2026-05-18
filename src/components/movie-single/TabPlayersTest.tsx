"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

type TabPlayersTestProps = {
    tmdbId: number | string;
    title?: string;
};

type TestPlayer = {
    id: string;
    name: string;
    url: string;
    note?: string;
};

const TabPlayersTest = ({ tmdbId, title }: TabPlayersTestProps) => {
    const players = useMemo<TestPlayer[]>(() => {
        return [
            {
                id: "multiembed",
                name: "MultiEmbed",
                url: `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`,
                note: "Працює частково",
            },
            {
                id: "2embed",
                name: "2Embed",
                url: `https://www.2embed.cc/embed/${tmdbId}`,
                note: "Працює частково",
            },

            {
                id: "videasy",
                name: "VidEasy",
                url: `https://player.videasy.net/movie/${tmdbId}`,
                note: "Новий тест",
            },
            {
                id: "vidbinge",
                name: "VidBinge",
                url: `https://vidbinge.to/movie/${tmdbId}`,
                note: "MoviesAPI / TMDB embed",
            },
            {
                id: "moviesapi",
                name: "MoviesAPI",
                url: `https://moviesapi.to/movie/${tmdbId}`,
                note: "TMDB embed",
            },
            {
                id: "xprime",
                name: "XPrime",
                url: `https://xprime.tv/movie/${tmdbId}`,
                note: "Новий тест",
            }
        ];
    }, [tmdbId]);

    const [activePlayer, setActivePlayer] = useState<TestPlayer | null>(null);

    return (
        <div className="flex h-full w-full flex-col bg-black">
            <div className="border-b border-white/10 bg-neutral-950 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-black text-white">
                            Test Players
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                            {title ? `${title} · ` : ""}TMDB ID: {tmdbId}
                        </p>
                    </div>

                    {activePlayer && (
                        <a
                            href={activePlayer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white/70 transition hover:text-white"
                        >
                            Відкрити окремо
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {players.map((player) => (
                        <button
                            key={player.id}
                            type="button"
                            onClick={() => setActivePlayer(player)}
                            className={`
                                inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition
                                ${
                                activePlayer?.id === player.id
                                    ? "bg-[var(--color-brand)] text-white"
                                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                            }
                            `}
                            title={player.note}
                        >
                            <Play className="h-3.5 w-3.5" />
                            {player.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
                {activePlayer ? (
                    <iframe
                        key={activePlayer.id}
                        src={activePlayer.url}
                        title={activePlayer.name}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="origin"
                        className="h-full w-full border-0"
                    />
                ) : (
                    <div className="px-6 text-center">
                        <p className="text-lg font-black text-white">
                            Обери провайдера
                        </p>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                            Натисни кнопку зверху, щоб протестувати конкретний
                            плеєр для цього TMDB ID. Основні робочі плеєри
                            VidFast, StreamMafia і KinoBD тут спеціально не
                            дублюються.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { TabPlayersTest };