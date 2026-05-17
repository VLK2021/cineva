import { Video } from "lucide-react";
import type { TvVideo } from "@/src/types/tv.types";

type TvTrailerSectionProps = {
    trailer?: TvVideo;
};

const TvTrailerSection = ({ trailer }: TvTrailerSectionProps) => {
    if (!trailer) return null;

    return (
        <section id="tv-trailer" className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Video className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Трейлер</h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
                <div className="aspect-video w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={trailer.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export { TvTrailerSection };