import { Pagination } from "@/src/components/common/Pagination";
import { TvGrid, TvPageHeader } from "@/src/components/tv";
import { discoverTv } from "@/src/services";

type TvPageProps = {
    searchParams: Promise<{
        page?: string;
        genre?: string;
        year?: string;
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

export default async function TvPage({ searchParams }: TvPageProps) {
    const params = await searchParams;

    const page = getSafePage(params.page);

    const tvShows = await discoverTv({
        page,
        genre: params.genre,
        year: params.year,
        sort: params.sort,
    });

    return (
        <main className="min-h-screen bg-[var(--color-background)] px-4 py-10 text-[var(--color-text)] sm:px-6 lg:px-10">
            <TvPageHeader
                genre={params.genre}
                sort={params.sort}
                year={params.year}
            />

            <TvGrid tvShows={tvShows.results} />

            <Pagination
                currentPage={tvShows.page}
                totalPages={tvShows.total_pages}
                basePath="/tv"
                searchParams={{
                    genre: params.genre,
                    year: params.year,
                    sort: params.sort,
                }}
            />
        </main>
    );
}