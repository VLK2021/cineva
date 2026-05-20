import { cookies } from "next/headers";

import { Pagination } from "@/src/components/common/Pagination";
import { SearchResultsGrid } from "@/src/components/search";
import { searchMultiLanguages } from "@/src/services";

type SearchPageProps = {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
};

const getSafePage = (page?: string) => {
    const value = Number(page);

    if (!Number.isFinite(value) || value < 1) {
        return 1;
    }

    return Math.floor(value);
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;

    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value;
    const isEn = lang === "en";

    const query = params.query?.trim() || "";
    const page = getSafePage(params.page);

    const data =
        query.length >= 2
            ? await searchMultiLanguages({
                query,
                page,
            })
            : null;

    const results =
        data?.results.filter((item) =>
            ["movie", "tv", "person"].includes(item.media_type)
        ) ?? [];

    return (
        <main className="min-h-screen bg-[var(--color-background)] px-4 py-10 text-[var(--color-text)] sm:px-6 lg:px-10">
            <div className="mb-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                    {isEn ? "Search" : "Пошук"}
                </p>

                <h1 className="text-3xl font-black sm:text-4xl">
                    {isEn ? "Search results" : "Результати пошуку"}
                </h1>

                <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    {query
                        ? `${isEn ? "Query" : "Запит"}: "${query}"`
                        : isEn
                            ? "Enter a query in the search field."
                            : "Введи запит у пошуковому полі."}
                </p>
            </div>

            {query.length < 2 ? (
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-[var(--color-text-muted)]">
                    {isEn
                        ? "Search requires at least 2 characters."
                        : "Для пошуку потрібно мінімум 2 символи."}
                </div>
            ) : (
                <SearchResultsGrid results={results} />
            )}

            {data && data.total_pages > 1 && (
                <Pagination
                    currentPage={data.page}
                    totalPages={data.total_pages}
                    basePath="/search"
                    searchParams={{
                        query,
                    }}
                />
            )}
        </main>
    );
}