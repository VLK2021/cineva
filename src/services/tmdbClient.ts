const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

type TmdbFetchOptions = {
    revalidate?: number;
    cache?: RequestCache;
};

const tmdbFetch = async <T>(
    endpoint: string,
    options: TmdbFetchOptions = {}
): Promise<T> => {
    if (!TMDB_BASE_URL) {
        throw new Error("TMDB_BASE_URL is missing");
    }

    if (!TMDB_ACCESS_TOKEN) {
        throw new Error("TMDB_ACCESS_TOKEN is missing");
    }

    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
        },
        cache: options.cache,
        next:
            options.revalidate !== undefined
                ? { revalidate: options.revalidate }
                : undefined,
    });

    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
    }

    return response.json();
};

export { tmdbFetch };