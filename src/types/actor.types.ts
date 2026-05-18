export type ActorListResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type ActorKnownForMovie = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type: "movie";
    release_date: string;
    vote_average: number;
};

export type ActorKnownForTv = {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type: "tv";
    first_air_date: string;
    vote_average: number;
};

export type ActorKnownFor = ActorKnownForMovie | ActorKnownForTv;

export type ActorListItem = {
    id: number;
    name: string;
    original_name: string;
    adult: boolean;
    gender: number;
    known_for_department: string;
    popularity: number;
    profile_path: string | null;
    known_for: ActorKnownFor[];
};

export type ActorDetails = {
    id: number;
    name: string;
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    imdb_id: string | null;
    known_for_department: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
    adult: boolean;
};

export type ActorMovieCredit = {
    id: number;
    title: string;
    original_title: string;
    character: string;
    credit_id: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    popularity: number;
    overview: string;
    job?: string;
    department?: string;
};

export type ActorTvCredit = {
    id: number;
    name: string;
    original_name: string;
    character: string;
    credit_id: string;
    first_air_date: string;
    episode_count: number;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    popularity: number;
    overview: string;
    job?: string;
    department?: string;
};

export type ActorMovieCreditsResponse = {
    cast: ActorMovieCredit[];
    crew: ActorMovieCredit[];
};

export type ActorTvCreditsResponse = {
    cast: ActorTvCredit[];
    crew: ActorTvCredit[];
};

export type ActorCombinedCreditsResponse = {
    cast: Array<(ActorMovieCredit & { media_type: "movie" }) | (ActorTvCredit & { media_type: "tv" })>;
    crew: Array<(ActorMovieCredit & { media_type: "movie" }) | (ActorTvCredit & { media_type: "tv" })>;
};

export type ActorImage = {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number;
    vote_average: number;
    vote_count: number;
};

export type ActorImagesResponse = {
    id: number;
    profiles: ActorImage[];
};

export type ActorExternalIds = {
    id: number;
    freebase_mid: string | null;
    freebase_id: string | null;
    imdb_id: string | null;
    tvrage_id: number | null;
    wikidata_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    tiktok_id: string | null;
    twitter_id: string | null;
    youtube_id: string | null;
};

export type ActorDetailsWithAppend = ActorDetails & {
    movie_credits?: ActorMovieCreditsResponse;
    tv_credits?: ActorTvCreditsResponse;
    combined_credits?: ActorCombinedCreditsResponse;
    images?: ActorImagesResponse;
    external_ids?: ActorExternalIds;
};