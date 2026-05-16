import type { MovieVideo } from "@/src/types";

const getUniqueVideos = (videos: MovieVideo[]) => {
    const map = new Map<string, MovieVideo>();

    videos.forEach((video) => {
        if (video.site === "YouTube" && video.key) {
            map.set(video.key, video);
        }
    });

    return Array.from(map.values());
};

const getBestTrailer = (videos: MovieVideo[]) => {
    const youtubeVideos = getUniqueVideos(videos);

    return (
        youtubeVideos.find(
            (video) =>
                video.iso_639_1 === "uk" &&
                video.type === "Trailer" &&
                video.official
        ) ??
        youtubeVideos.find(
            (video) =>
                video.iso_639_1 === "uk" &&
                video.type === "Trailer"
        ) ??
        youtubeVideos.find(
            (video) =>
                video.iso_639_1 === "ru" &&
                video.type === "Trailer" &&
                video.official
        ) ??
        youtubeVideos.find(
            (video) =>
                video.iso_639_1 === "ru" &&
                video.type === "Trailer"
        ) ??
        youtubeVideos.find(
            (video) =>
                video.iso_639_1 === "en" &&
                video.type === "Trailer" &&
                video.official
        ) ??
        youtubeVideos.find(
            (video) =>
                video.iso_639_1 === "en" &&
                video.type === "Trailer"
        ) ??
        youtubeVideos.find((video) => video.type === "Trailer") ??
        youtubeVideos.find((video) => video.type === "Teaser") ??
        youtubeVideos.find((video) => video.type === "Clip") ??
        youtubeVideos[0]
    );
};

export { getUniqueVideos, getBestTrailer };