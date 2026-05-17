export type TvListResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type TvGenre = {
    id: number;
    name: string;
};

export type TvGenresResponse = {
    genres: TvGenre[];
};

export type TvListItem = {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type?: "tv";
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
};

export type TvCreatedBy = {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
};

export type TvNetwork = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

export type TvProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

export type TvProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export type TvSpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type TvSeason = {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
};

export type TvLastEpisodeToAir = {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
};

export type TvDetails = {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    adult: boolean;
    homepage: string;
    in_production: boolean;
    languages: string[];
    original_language: string;
    origin_country: string[];
    popularity: number;
    first_air_date: string;
    last_air_date: string;
    number_of_episodes: number;
    number_of_seasons: number;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    genres: TvGenre[];
    created_by: TvCreatedBy[];
    networks: TvNetwork[];
    production_companies: TvProductionCompany[];
    production_countries: TvProductionCountry[];
    spoken_languages: TvSpokenLanguage[];
    seasons: TvSeason[];
    last_episode_to_air: TvLastEpisodeToAir | null;
    next_episode_to_air: TvLastEpisodeToAir | null;
};

export type TvCastMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    character: string;
    credit_id: string;
    order: number;
};

export type TvCrewMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
};

export type TvCreditsResponse = {
    cast: TvCastMember[];
    crew: TvCrewMember[];
};

export type TvVideo = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type TvVideosResponse = {
    id: number;
    results: TvVideo[];
};

export type TvImage = {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
};

export type TvImagesResponse = {
    id: number;
    backdrops: TvImage[];
    logos: TvImage[];
    posters: TvImage[];
};

export type TvDetailsWithAppend = TvDetails & {
    aggregate_credits?: TvCreditsResponse;
    credits?: TvCreditsResponse;
    videos?: TvVideosResponse;
    images?: TvImagesResponse;
    similar?: TvListResponse<TvListItem>;
    recommendations?: TvListResponse<TvListItem>;
};