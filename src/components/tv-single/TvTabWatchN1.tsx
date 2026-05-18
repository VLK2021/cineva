"use client";

import { useMemo, useState } from "react";
import type { TvSeasonDetails } from "@/src/types/tv.types";

type TvTabWatchN1Props = {
    tmdbId: number | string;
    title: string;
    seasons: TvSeasonDetails[];
};

const STREAM_MAFIA_BASE_URL = "https://embed.streammafia.to";

const TvTabWatchN1 = ({ tmdbId, title, seasons }: TvTabWatchN1Props) => {
    const availableSeasons = useMemo(() => {
        return seasons
            .filter((season) => season.season_number > 0)
            .filter((season) => season.episodes?.length > 0)
            .sort((a, b) => a.season_number - b.season_number);
    }, [seasons]);

    const firstSeason = availableSeasons[0];

    const [selectedSeason, setSelectedSeason] = useState(
        firstSeason?.season_number ?? 1
    );

    const selectedSeasonData = useMemo(() => {
        return (
            availableSeasons.find(
                (season) => season.season_number === selectedSeason
            ) ?? firstSeason
        );
    }, [availableSeasons, firstSeason, selectedSeason]);

    const firstEpisode = selectedSeasonData?.episodes?.[0];

    const [selectedEpisode, setSelectedEpisode] = useState(
        firstEpisode?.episode_number ?? 1
    );

    const episodes = selectedSeasonData?.episodes ?? [];

    const playerUrl = useMemo(() => {
        return `${STREAM_MAFIA_BASE_URL}/embed/tv/${tmdbId}/${selectedSeason}/${selectedEpisode}`;
    }, [tmdbId, selectedSeason, selectedEpisode]);

    if (!availableSeasons.length) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-black px-6 text-center text-sm font-semibold text-white/70">
                Немає доступних сезонів або серій для цього серіалу.
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col bg-black">
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-black p-3">
                <select
                    value={selectedSeason}
                    onChange={(event) => {
                        const nextSeasonNumber = Number(event.target.value);

                        const nextSeason = availableSeasons.find(
                            (season) => season.season_number === nextSeasonNumber
                        );

                        setSelectedSeason(nextSeasonNumber);
                        setSelectedEpisode(
                            nextSeason?.episodes?.[0]?.episode_number ?? 1
                        );
                    }}
                    className="h-10 rounded-xl border border-white/20 bg-neutral-950 px-3 text-sm font-bold text-white outline-none"
                >
                    {availableSeasons.map((season) => (
                        <option
                            key={season.id ?? season.season_number}
                            value={season.season_number}
                        >
                            Сезон {season.season_number}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedEpisode}
                    onChange={(event) =>
                        setSelectedEpisode(Number(event.target.value))
                    }
                    className="h-10 rounded-xl border border-white/20 bg-neutral-950 px-3 text-sm font-bold text-white outline-none"
                >
                    {episodes.map((episode) => (
                        <option
                            key={episode.id ?? episode.episode_number}
                            value={episode.episode_number}
                        >
                            Серія {episode.episode_number}
                        </option>
                    ))}
                </select>

                <div className="min-w-0 flex-1 text-xs font-semibold text-white/50">
                    {title} · S{selectedSeason} E{selectedEpisode}
                </div>
            </div>

            <iframe
                key={`${selectedSeason}-${selectedEpisode}`}
                src={playerUrl}
                title={`${title} S${selectedSeason}E${selectedEpisode}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="origin"
                className="h-full w-full flex-1 border-0"
            />
        </div>
    );
};

export { TvTabWatchN1 };