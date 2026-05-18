import Image from "next/image";
import Link from "next/link";
import { Film, Tv, User } from "lucide-react";
import type { SearchResult } from "@/src/types/search.types";

type SearchResultItemProps = {
    item: SearchResult;
    onClick?: () => void;
};

const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

const getItemData = (item: SearchResult) => {
    if (item.media_type === "movie") {
        return {
            title: item.title,
            subtitle: item.release_date?.slice(0, 4) || "Фільм",
            image: item.poster_path,
            href: `/movies/${item.id}`,
            icon: Film,
        };
    }

    if (item.media_type === "tv") {
        return {
            title: item.name,
            subtitle: item.first_air_date?.slice(0, 4) || "Серіал",
            image: item.poster_path,
            href: `/tv/${item.id}`,
            icon: Tv,
        };
    }

    return {
        title: item.name,
        subtitle: item.known_for_department || "Актор",
        image: item.profile_path,
        href: `/actors/${item.id}`,
        icon: User,
    };
};

const SearchResultItem = ({ item, onClick }: SearchResultItemProps) => {
    const data = getItemData(item);
    const Icon = data.icon;

    return (
        <Link
            href={data.href}
            onClick={onClick}
            className="flex gap-3 rounded-2xl p-2 transition hover:bg-[var(--color-background)]"
        >
            <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-xl bg-[var(--color-border)]">
                {data.image ? (
                    <Image
                        src={`${IMAGE_BASE_URL}/w185${data.image}`}
                        alt={data.title}
                        fill
                        sizes="44px"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Icon className="h-5 w-5 text-[var(--color-text-muted)]" />
                    </div>
                )}
            </div>

            <div className="min-w-0 py-1">
                <p className="line-clamp-1 text-sm font-black text-[var(--color-text)]">
                    {data.title}
                </p>

                <p className="mt-1 text-xs font-semibold text-[var(--color-text-muted)]">
                    {data.subtitle}
                </p>

                <p className="mt-1 text-xs uppercase tracking-wide text-[var(--color-brand)]">
                    {item.media_type === "movie"
                        ? "Фільм"
                        : item.media_type === "tv"
                            ? "Серіал"
                            : "Актор"}
                </p>
            </div>
        </Link>
    );
};

export { SearchResultItem };