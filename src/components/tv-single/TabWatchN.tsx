"use client";

import { useMemo, useState } from "react";
import type { TvSeasonDetails } from "@/src/types/tv.types";

type TabWatchNProps = {
    tmdbId: number | string;
    title?: string;
    posterPath?: string | null;
    seasons: TvSeasonDetails[];
};

const VIDFAST_BASE_URL = "https://vidfast.pro";

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TabWatchN = ({
                       tmdbId,
                       title,
                       posterPath,
                       seasons,
                   }: TabWatchNProps) => {
    const availableSeasons = useMemo(() => {
        return seasons.filter((season) => season.episodes?.length);
    }, [seasons]);

    const [selectedSeason, setSelectedSeason] = useState(
        availableSeasons[0]?.season_number ?? 1
    );

    const selectedSeasonData = useMemo(() => {
        return availableSeasons.find(
            (season) => season.season_number === selectedSeason
        );
    }, [availableSeasons, selectedSeason]);

    const [selectedEpisode, setSelectedEpisode] = useState(
        selectedSeasonData?.episodes?.[0]?.episode_number ?? 1
    );

    const episodes = selectedSeasonData?.episodes ?? [];

    const iframeSrc = useMemo(() => {
        const params = new URLSearchParams({
            autoPlay: "false",
        });

        if (title) {
            params.set("title", title);
        }

        if (posterPath) {
            params.set("poster", `${IMAGE_BASE_URL}/w500${posterPath}`);
        }

        return `${VIDFAST_BASE_URL}/tv/${tmdbId}/${selectedSeason}/${selectedEpisode}?${params.toString()}`;
    }, [tmdbId, selectedSeason, selectedEpisode, title, posterPath]);

    return (
        <div className="flex h-full w-full flex-col bg-black">
            <div className="flex flex-wrap gap-3 border-b border-white/10 p-4">
                <select
                    value={selectedSeason}
                    onChange={(e) => {
                        const seasonNumber = Number(e.target.value);
                        setSelectedSeason(seasonNumber);

                        const nextSeason = availableSeasons.find(
                            (season) => season.season_number === seasonNumber
                        );

                        setSelectedEpisode(
                            nextSeason?.episodes?.[0]?.episode_number ?? 1
                        );
                    }}
                    className="rounded-xl border border-white/20 bg-black px-4 py-2 text-white"
                >
                    {availableSeasons.map((season) => (
                        <option
                            key={season.season_number}
                            value={season.season_number}
                        >
                            Season {season.season_number}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedEpisode}
                    onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                    className="rounded-xl border border-white/20 bg-black px-4 py-2 text-white"
                >
                    {episodes.map((episode) => (
                        <option
                            key={episode.id}
                            value={episode.episode_number}
                        >
                            Episode {episode.episode_number}
                        </option>
                    ))}
                </select>
            </div>

            <iframe
                key={`${selectedSeason}-${selectedEpisode}`}
                src={iframeSrc}
                title={title || "Watch TV"}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="origin"
                className="h-full w-full border-0"
            />
        </div>
    );
};

export { TabWatchN };