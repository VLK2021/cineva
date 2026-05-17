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

export type TvEpisode = {
    air_date: string | null;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
};

export type TvSeasonDetails = {
    id: number;
    air_date: string | null;
    episodes: TvEpisode[];
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
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
    episode_run_time: number[];
    genres: TvGenre[];
    created_by: TvCreatedBy[];
    networks: TvNetwork[];
    production_companies: TvProductionCompany[];
    production_countries: TvProductionCountry[];
    spoken_languages: TvSpokenLanguage[];
    seasons: TvSeason[];
    last_episode_to_air: TvEpisode | null;
    next_episode_to_air: TvEpisode | null;
};

export type TvAggregateRole = {
    credit_id: string;
    character: string;
    episode_count: number;
};

export type TvAggregateJob = {
    credit_id: string;
    job: string;
    episode_count: number;
};

export type TvAggregateCastMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    roles: TvAggregateRole[];
    total_episode_count: number;
};

export type TvAggregateCrewMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    jobs: TvAggregateJob[];
    department: string;
    total_episode_count: number;
};

export type TvAggregateCreditsResponse = {
    cast: TvAggregateCastMember[];
    crew: TvAggregateCrewMember[];
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

export type TvExternalIds = {
    id: number;
    imdb_id: string | null;
    freebase_mid: string | null;
    freebase_id: string | null;
    tvdb_id: number | null;
    tvrage_id: number | null;
    wikidata_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
};

export type TvContentRating = {
    descriptors: string[];
    iso_3166_1: string;
    rating: string;
};

export type TvContentRatingsResponse = {
    results: TvContentRating[];
};

export type TvKeyword = {
    id: number;
    name: string;
};

export type TvKeywordsResponse = {
    id: number;
    results: TvKeyword[];
};

export type TvReviewAuthorDetails = {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
};

export type TvReview = {
    author: string;
    author_details: TvReviewAuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
};

export type TvReviewsResponse = TvListResponse<TvReview>;

export type TvAlternativeTitle = {
    iso_3166_1: string;
    title: string;
    type: string;
};

export type TvAlternativeTitlesResponse = {
    id: number;
    results: TvAlternativeTitle[];
};

export type TvTranslation = {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
        name: string;
        overview: string;
        homepage: string;
        tagline: string;
    };
};

export type TvTranslationsResponse = {
    id: number;
    translations: TvTranslation[];
};

export type TvWatchProvider = {
    logo_path: string | null;
    provider_id: number;
    provider_name: string;
    display_priority: number;
};

export type TvWatchProviderCountry = {
    link?: string;
    flatrate?: TvWatchProvider[];
    rent?: TvWatchProvider[];
    buy?: TvWatchProvider[];
    ads?: TvWatchProvider[];
    free?: TvWatchProvider[];
};

export type TvWatchProvidersResponse = {
    id: number;
    results: Record<string, TvWatchProviderCountry>;
};

export type TvDetailsWithAppend = TvDetails & {
    aggregate_credits?: TvAggregateCreditsResponse;
    videos?: TvVideosResponse;
    images?: TvImagesResponse;
    similar?: TvListResponse<TvListItem>;
    recommendations?: TvListResponse<TvListItem>;
    external_ids?: TvExternalIds;
    content_ratings?: TvContentRatingsResponse;
    "watch/providers"?: TvWatchProvidersResponse;
    keywords?: TvKeywordsResponse;
    reviews?: TvReviewsResponse;
    alternative_titles?: TvAlternativeTitlesResponse;
    translations?: TvTranslationsResponse;
};