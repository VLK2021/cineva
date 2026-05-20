import Image from "next/image";
import { Images } from "lucide-react";
import type { ActorImage } from "@/src/types/actor.types";

type ActorImagesSectionProps = {
    images: ActorImage[];
    labels: {
        title: string;
        alt: string;
    };
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const ActorImagesSection = ({
                                images,
                                labels,
                            }: ActorImagesSectionProps) => {
    if (!images.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Images className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">{labels.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {images.slice(0, 12).map((image) => (
                    <div
                        key={image.file_path}
                        className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
                    >
                        <Image
                            src={`${IMAGE_BASE_URL}/w500${image.file_path}`}
                            alt={labels.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 16vw"
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export { ActorImagesSection };