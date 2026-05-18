import { tmdbFetch } from "@/src/services/tmdbClient";
import type {
    SearchMultiResponse,
    SearchResult,
} from "@/src/types/search.types";

type SearchMultiParams = {
    query: string;
    page?: number;
    language?: string;
};

type SearchMultiLanguagesParams = {
    query: string;
    page?: number;
    languages?: string[];
};

const searchMulti = ({
                         query,
                         page = 1,
                         language = "uk-UA",
                     }: SearchMultiParams): Promise<SearchMultiResponse> => {
    const params = new URLSearchParams({
        query,
        page: String(page),
        language,
        include_adult: "false",
    });

    return tmdbFetch<SearchMultiResponse>(
        `/search/multi?${params.toString()}`,
        {
            revalidate: 300,
        }
    );
};

const dedupeSearchResults = (results: SearchResult[]) => {
    const map = new Map<string, SearchResult>();

    results.forEach((item) => {
        if (!["movie", "tv", "person"].includes(item.media_type)) return;

        const key = `${item.media_type}-${item.id}`;

        if (!map.has(key)) {
            map.set(key, item);
        }
    });

    return Array.from(map.values()).sort(
        (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
    );
};

const searchMultiLanguages = async ({
                                        query,
                                        page = 1,
                                        languages = ["uk-UA", "en-US", "ru-RU"],
                                    }: SearchMultiLanguagesParams): Promise<SearchMultiResponse> => {
    const responses = await Promise.all(
        languages.map((language) =>
            searchMulti({
                query,
                page,
                language,
            }).catch(() => null)
        )
    );

    const validResponses = responses.filter(
        (response): response is SearchMultiResponse => response !== null
    );

    const mergedResults = dedupeSearchResults(
        validResponses.flatMap((response) => response.results)
    );

    const maxTotalPages = Math.max(
        ...validResponses.map((response) => response.total_pages),
        0
    );

    const totalResults = mergedResults.length;

    return {
        page,
        results: mergedResults,
        total_pages: maxTotalPages,
        total_results: totalResults,
    };
};

export { searchMulti, searchMultiLanguages };