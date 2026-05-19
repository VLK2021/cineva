import { cookies } from "next/headers";

import { Pagination } from "@/src/components/common/Pagination";
import { ActorsGrid, ActorsPageHeader } from "@/src/components/actors";
import { getPopularActors } from "@/src/services";
import { getTmdbLanguage } from "@/src/helpers";

import type { ActorListItem } from "@/src/types/actor.types";

type ActorsPageProps = {
    searchParams: Promise<{
        page?: string;
        sort?: string;
    }>;
};

const getSafePage = (page?: string) => {
    const value = Number(page);

    if (!Number.isFinite(value) || value < 1) {
        return 1;
    }

    return Math.floor(value);
};

const sortActors = (
    actors: ActorListItem[],
    sort = "popularity.desc"
) => {
    const sorted = [...actors];

    if (sort === "popularity.asc") {
        return sorted.sort((a, b) => a.popularity - b.popularity);
    }

    if (sort === "name.asc") {
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "name.desc") {
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    return sorted.sort((a, b) => b.popularity - a.popularity);
};

export default async function ActorsPage({
                                             searchParams,
                                         }: ActorsPageProps) {
    const params = await searchParams;

    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value;
    const tmdbLanguage = getTmdbLanguage(lang);

    const page = getSafePage(params.page);

    const actors = await getPopularActors({
        page,
        language: tmdbLanguage,
    });

    const sortedActors = sortActors(actors.results, params.sort);

    return (
        <main className="min-h-screen bg-[var(--color-background)] px-4 py-10 text-[var(--color-text)] sm:px-6 lg:px-10">
            <ActorsPageHeader sort={params.sort} />

            <ActorsGrid actors={sortedActors} />

            <Pagination
                currentPage={actors.page}
                totalPages={actors.total_pages}
                basePath="/actors"
                searchParams={{
                    sort: params.sort,
                }}
            />
        </main>
    );
}