import { tmdbFetch } from "@/src/services/tmdbClient";
import type {
    TvAggregateCreditsResponse,
    TvDetails,
    TvDetailsWithAppend,
    TvGenresResponse,
    TvImagesResponse,
    TvListItem,
    TvListResponse,
    TvSeasonDetails,
    TvVideosResponse,
} from "@/src/types/tv.types";

type CommonTvParams = {
    page?: number;
    language?: string;
};

type DiscoverTvParams = CommonTvParams & {
    genre?: string;
    year?: string;
    sort?: string;
};

const getTodayDate = () => {
    return new Date().toISOString().slice(0, 10);
};

const getPopularTv = ({
                          page = 1,
                          language = "uk-UA",
                      }: CommonTvParams = {}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/tv/popular?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getTopRatedTv = ({
                           page = 1,
                           language = "uk-UA",
                       }: CommonTvParams = {}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/tv/top_rated?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getOnTheAirTv = ({
                           page = 1,
                           language = "uk-UA",
                       }: CommonTvParams = {}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/tv/on_the_air?${params.toString()}`,
        { revalidate: 1800 }
    );
};

const getAiringTodayTv = ({
                              page = 1,
                              language = "uk-UA",
                          }: CommonTvParams = {}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/tv/airing_today?${params.toString()}`,
        { revalidate: 1800 }
    );
};

const discoverTv = ({
                        page = 1,
                        language = "uk-UA",
                        genre,
                        year,
                        sort = "popularity.desc",
                    }: DiscoverTvParams = {}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
        sort_by: sort,
        include_adult: "false",
        include_null_first_air_dates: "false",
        "first_air_date.lte": getTodayDate(),
    });

    if (genre) params.set("with_genres", genre);
    if (year) params.set("first_air_date_year", year);

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/discover/tv?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getTvDetails = (
    tvId: number | string,
    language = "uk-UA"
): Promise<TvDetails> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<TvDetails>(
        `/tv/${tvId}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getTvDetailsWithAppend = (
    tvId: number | string,
    language = "uk-UA"
): Promise<TvDetailsWithAppend> => {
    const params = new URLSearchParams({
        language,
        append_to_response:
            "aggregate_credits,videos,images,similar,recommendations,external_ids,content_ratings,watch/providers,keywords,reviews,alternative_titles,translations",
    });

    return tmdbFetch<TvDetailsWithAppend>(
        `/tv/${tvId}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getTvAggregateCredits = (
    tvId: number | string,
    language = "uk-UA"
): Promise<TvAggregateCreditsResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<TvAggregateCreditsResponse>(
        `/tv/${tvId}/aggregate_credits?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getTvVideos = (
    tvId: number | string,
    language = "uk-UA"
): Promise<TvVideosResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<TvVideosResponse>(
        `/tv/${tvId}/videos?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getTvImages = (
    tvId: number | string
): Promise<TvImagesResponse> => {
    return tmdbFetch<TvImagesResponse>(
        `/tv/${tvId}/images`,
        { revalidate: 86400 }
    );
};

const getTvSeasonDetails = ({
                                tvId,
                                seasonNumber,
                                language = "uk-UA",
                            }: {
    tvId: number | string;
    seasonNumber: number | string;
    language?: string;
}): Promise<TvSeasonDetails> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<TvSeasonDetails>(
        `/tv/${tvId}/season/${seasonNumber}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getSimilarTv = ({
                          tvId,
                          page = 1,
                          language = "uk-UA",
                      }: {
    tvId: number | string;
    page?: number;
    language?: string;
}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/tv/${tvId}/similar?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getTvRecommendations = ({
                                  tvId,
                                  page = 1,
                                  language = "uk-UA",
                              }: {
    tvId: number | string;
    page?: number;
    language?: string;
}): Promise<TvListResponse<TvListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TvListResponse<TvListItem>>(
        `/tv/${tvId}/recommendations?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getTvGenres = (
    language = "uk-UA"
): Promise<TvGenresResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<TvGenresResponse>(
        `/genre/tv/list?${params.toString()}`,
        { revalidate: 86400 }
    );
};

export {
    getPopularTv,
    getTopRatedTv,
    getOnTheAirTv,
    getAiringTodayTv,
    discoverTv,
    getTvDetails,
    getTvDetailsWithAppend,
    getTvAggregateCredits,
    getTvVideos,
    getTvImages,
    getTvSeasonDetails,
    getSimilarTv,
    getTvRecommendations,
    getTvGenres,
};