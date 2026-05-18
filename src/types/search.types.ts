export type SearchMediaType = "movie" | "tv" | "person";

export type SearchListResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type SearchMovieResult = {
    id: number;
    media_type: "movie";
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    popularity: number;
};

export type SearchTvResult = {
    id: number;
    media_type: "tv";
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    popularity: number;
};

export type SearchPersonResult = {
    id: number;
    media_type: "person";
    name: string;
    original_name: string;
    profile_path: string | null;
    known_for_department: string;
    popularity: number;
};

export type SearchResult =
    | SearchMovieResult
    | SearchTvResult
    | SearchPersonResult;

export type SearchMultiResponse = SearchListResponse<SearchResult>;