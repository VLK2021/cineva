import { tmdbFetch } from "./tmdbClient";

type SearchMultiParams = {
    query: string;
    page?: string;
    language?: string;
};

export const searchMulti = async ({
                                      query,
                                      page = "1",
                                      language = "uk-UA",
                                  }: SearchMultiParams) => {
    const params = new URLSearchParams({
        query,
        page,
        language,
        include_adult: "false",
    });

    return tmdbFetch(`/search/multi?${params.toString()}`, {
        cache: "no-store",
    });
};