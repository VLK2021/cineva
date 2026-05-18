import Image from "next/image";
import Link from "next/link";
import { Film, Star, Tv, User } from "lucide-react";
import type { SearchResult } from "@/src/types/search.types";

type SearchResultCardProps = {
    item: SearchResult;
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getData = (item: SearchResult) => {
    if (item.media_type === "movie") {
        return {
            title: item.title,
            image: item.poster_path,
            href: `/movies/${item.id}`,
            typeLabel: "Фільм",
            meta: item.release_date?.slice(0, 4) || "—",
            rating: item.vote_average,
            icon: Film,
        };
    }

    if (item.media_type === "tv") {
        return {
            title: item.name,
            image: item.poster_path,
            href: `/tv/${item.id}`,
            typeLabel: "Серіал",
            meta: item.first_air_date?.slice(0, 4) || "—",
            rating: item.vote_average,
            icon: Tv,
        };
    }

    return {
        title: item.name,
        image: item.profile_path,
        href: `/actors/${item.id}`,
        typeLabel: "Актор",
        meta: item.known_for_department || "Acting",
        rating: item.popularity,
        icon: User,
    };
};

const SearchResultCard = ({ item }: SearchResultCardProps) => {
    const data = getData(item);
    const Icon = data.icon;

    return (
        <Link
            href={data.href}
            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-[var(--color-border)]">
                {data.image ? (
                    <Image
                        src={`${IMAGE_BASE_URL}/w500${data.image}`}
                        alt={data.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Icon className="h-10 w-10 text-[var(--color-text-muted)]" />
                    </div>
                )}

                <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-black text-white backdrop-blur">
                    {data.typeLabel}
                </div>

                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                    {item.media_type === "person"
                        ? Math.round(data.rating)
                        : data.rating.toFixed(1)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-[var(--color-text)]">
                    {data.title}
                </h3>

                <p className="mt-3 text-xs font-bold text-[var(--color-text-muted)]">
                    {data.meta}
                </p>
            </div>
        </Link>
    );
};

export { SearchResultCard };