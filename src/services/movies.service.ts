import { tmdbFetch } from "@/src/services/tmdbClient";
import type {
    MovieCreditsResponse,
    MovieDetails,
    MovieDetailsWithAppend,
    MovieGenresResponse,
    MovieImagesResponse,
    MovieListItem,
    MovieVideosResponse,
    TmdbListResponse,
} from "@/src/types";

type CommonMovieParams = {
    page?: number;
    language?: string;
    region?: string;
};

type DiscoverMoviesParams = CommonMovieParams & {
    genre?: string;
    year?: string;
    sort?: string;
};

const getTodayDate = () => {
    return new Date().toISOString().slice(0, 10);
};

const getPopularMovies = ({
                              page = 1,
                              language = "uk-UA",
                              region = "UA",
                          }: CommonMovieParams = {}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
        region,
    });

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/movie/popular?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getNowPlayingMovies = ({
                                 page = 1,
                                 language = "uk-UA",
                                 region = "UA",
                             }: CommonMovieParams = {}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
        region,
    });

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/movie/now_playing?${params.toString()}`,
        { revalidate: 1800 }
    );
};

const getTopRatedMovies = ({
                               page = 1,
                               language = "uk-UA",
                               region = "UA",
                           }: CommonMovieParams = {}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
        region,
    });

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/movie/top_rated?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getUpcomingMovies = ({
                               page = 1,
                               language = "uk-UA",
                               region = "UA",
                           }: CommonMovieParams = {}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
        region,
    });

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/movie/upcoming?${params.toString()}`,
        { revalidate: 1800 }
    );
};

const discoverMovies = ({
                            page = 1,
                            language = "uk-UA",
                            region = "UA",
                            genre,
                            year,
                            sort = "popularity.desc",
                        }: DiscoverMoviesParams = {}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
        region,
        sort_by: sort,
        include_adult: "false",
        include_video: "false",
        "primary_release_date.lte": getTodayDate(),
    });

    if (genre) params.set("with_genres", genre);
    if (year) params.set("primary_release_year", year);

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/discover/movie?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getMovieDetails = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieDetails> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieDetails>(
        `/movie/${movieId}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getMovieDetailsWithAppend = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieDetailsWithAppend> => {
    const params = new URLSearchParams({
        language,
        append_to_response:
            "credits,videos,images,similar,recommendations,release_dates",
    });

    return tmdbFetch<MovieDetailsWithAppend>(
        `/movie/${movieId}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getMovieCredits = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieCreditsResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieCreditsResponse>(
        `/movie/${movieId}/credits?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getMovieVideos = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieVideosResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieVideosResponse>(
        `/movie/${movieId}/videos?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getMovieImages = (
    movieId: number | string
): Promise<MovieImagesResponse> => {
    return tmdbFetch<MovieImagesResponse>(
        `/movie/${movieId}/images`,
        { revalidate: 86400 }
    );
};

const getSimilarMovies = ({
                              movieId,
                              page = 1,
                              language = "uk-UA",
                          }: {
    movieId: number | string;
    page?: number;
    language?: string;
}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/movie/${movieId}/similar?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getMovieRecommendations = ({
                                     movieId,
                                     page = 1,
                                     language = "uk-UA",
                                 }: {
    movieId: number | string;
    page?: number;
    language?: string;
}): Promise<TmdbListResponse<MovieListItem>> => {
    const params = new URLSearchParams({
        language,
        page: String(page),
    });

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/movie/${movieId}/recommendations?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getMovieGenres = (
    language = "uk-UA"
): Promise<MovieGenresResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieGenresResponse>(
        `/genre/movie/list?${params.toString()}`,
        { revalidate: 86400 }
    );
};

export {
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    discoverMovies,
    getMovieDetails,
    getMovieDetailsWithAppend,
    getMovieCredits,
    getMovieVideos,
    getMovieImages,
    getSimilarMovies,
    getMovieRecommendations,
    getMovieGenres,
};