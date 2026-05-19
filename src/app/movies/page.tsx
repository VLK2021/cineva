import { cookies } from "next/headers";

import { discoverMovies } from "@/src/services";

import { MoviesGrid } from "@/src/components/movies/MoviesGrid";
import { MoviesPageHeader } from "@/src/components/movies/MoviesPageHeader";
import { Pagination } from "@/src/components/common/Pagination";

type MoviesPageProps = {
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

const getTmdbLanguage = (lang?: string) => {
    return lang === "en" ? "en-US" : "uk-UA";
};

export default async function MoviesPage({
                                             searchParams,
                                         }: MoviesPageProps) {
    const params = await searchParams;

    const cookieStore = await cookies();

    const lang = cookieStore.get("lang")?.value;

    const tmdbLanguage = getTmdbLanguage(lang);

    const page = getSafePage(params.page);

    const movies = await discoverMovies({
        page,
        genre: params.genre,
        year: params.year,
        sort: params.sort,
        language: tmdbLanguage,
    });

    return (
        <main className="min-h-screen bg-[var(--color-background)] px-4 py-10 text-[var(--color-text)] sm:px-6 lg:px-10">
            <MoviesPageHeader
                genre={params.genre}
                sort={params.sort}
                year={params.year}
            />

            <MoviesGrid movies={movies.results} />

            <Pagination
                currentPage={movies.page}
                totalPages={movies.total_pages}
                basePath="/movies"
                searchParams={{
                    genre: params.genre,
                    year: params.year,
                    sort: params.sort,
                }}
            />
        </main>
    );
}