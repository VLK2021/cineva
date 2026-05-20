const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

type TmdbFetchOptions = {
    revalidate?: number;
    cache?: RequestCache;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RETRY_STATUSES = [502, 503, 504];

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

    const url = `${TMDB_BASE_URL}${endpoint}`;

    let lastError: unknown = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch(url, {
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

            if (response.ok) {
                return response.json();
            }

            if (RETRY_STATUSES.includes(response.status) && attempt < 3) {
                await sleep(500 * attempt);
                continue;
            }

            throw new Error(`TMDB request failed: ${response.status}`);
        } catch (error) {
            lastError = error;

            if (attempt < 3) {
                await sleep(500 * attempt);
                continue;
            }
        }
    }

    throw lastError;
};

export { tmdbFetch };