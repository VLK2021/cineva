import type { TvVideo } from "@/src/types/tv.types";

const getBestTvTrailer = (videos: TvVideo[]) => {
    return (
        videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official
        ) ??
        videos.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
        ) ??
        videos.find((video) => video.site === "YouTube")
    );
};

export { getBestTvTrailer };