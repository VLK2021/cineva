import type { MovieVideo } from "@/src/types";

type TrailerPlayerTabProps = {
    trailer: MovieVideo;
};

const TrailerPlayerTab = ({ trailer }: TrailerPlayerTabProps) => {
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

export { TrailerPlayerTab };