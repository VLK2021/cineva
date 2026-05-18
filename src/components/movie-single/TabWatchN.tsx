type TabWatchNProps = {
    tmdbId: number | string;
    title?: string;
    posterPath?: string | null;
};

const VIDFAST_BASE_URL = "https://vidfast.pro";

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const TabWatchN = ({ tmdbId, title, posterPath }: TabWatchNProps) => {
    const params = new URLSearchParams({
        autoPlay: "false",
    });

    if (title) {
        params.set("title", title);
    }

    if (posterPath) {
        params.set("poster", `${IMAGE_BASE_URL}/w500${posterPath}`);
    }

    return (
        <iframe
            src={`${VIDFAST_BASE_URL}/movie/${tmdbId}?${params.toString()}`}
            title={title || "Watch movie"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="origin"
            className="h-full w-full border-0"
        />
    );
};

export { TabWatchN };