import { tmdbFetch } from "@/src/services/tmdbClient";
import type { SearchMultiResponse } from "@/src/types/search.types";

type SearchMultiParams = {
    query: string;
    page?: number;
    language?: string;
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

export { searchMulti };