type TabWatchN1Props = {
    tmdbId: number | string;
    title?: string;
};

const STREAM_MAFIA_BASE_URL = "https://embed.streammafia.to";

const TabWatchN1 = ({ tmdbId, title }: TabWatchN1Props) => {
    return (
        <iframe
            src={`${STREAM_MAFIA_BASE_URL}/embed/movie/${tmdbId}`}
            title={title || "Watch movie"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="origin"
            className="h-full w-full border-0"
        />
    );
};

export { TabWatchN1 };