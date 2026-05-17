import type { TvVideo } from "@/src/types/tv.types";

type TvTrailerPlayerTabProps = {
    trailer: TvVideo;
};

const TvTrailerPlayerTab = ({ trailer }: TvTrailerPlayerTabProps) => {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
        />
    );
};

export { TvTrailerPlayerTab };