export type TmdbListResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type MovieListItem = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    release_date: string;
    popularity: number;
    adult: boolean;
    genre_ids: number[];
    original_language: string;
    video: boolean;
};

export type MovieGenre = {
    id: number;
    name: string;
};

export type MovieGenresResponse = {
    genres: MovieGenre[];
};

export type MovieProductionCompany = {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
};

export type MovieProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export type MovieSpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type MovieCollection = {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
};

export type MovieCastMember = {
    id: number;
    name: string;
    original_name: string;
    character: string;
    profile_path: string | null;
    order: number;
    adult: boolean;
    gender: number | null;
    known_for_department: string;
    popularity: number;
    cast_id: number;
    credit_id: string;
};

export type MovieCrewMember = {
    id: number;
    name: string;
    original_name: string;
    job: string;
    department: string;
    profile_path: string | null;
    adult: boolean;
    gender: number | null;
    known_for_department: string;
    popularity: number;
    credit_id: string;
};

export type MovieCredits = {
    id: number;
    cast: MovieCastMember[];
    crew: MovieCrewMember[];
};

export type MovieCreditsResponse = MovieCredits;

export type MovieVideo = {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
    published_at: string;
    iso_639_1: string;
    iso_3166_1: string;
    size: number;
};

export type MovieVideosResponse = {
    id: number;
    results: MovieVideo[];
};

export type MovieImage = {
    file_path: string;
    width: number;
    height: number;
    aspect_ratio: number;
    vote_average: number;
    vote_count: number;
    iso_639_1: string | null;
};

export type MovieImagesResponse = {
    id: number;
    posters: MovieImage[];
    backdrops: MovieImage[];
    logos: MovieImage[];
};

export type MovieReleaseDateItem = {
    certification: string;
    descriptors: string[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
};

export type MovieReleaseDateCountry = {
    iso_3166_1: string;
    release_dates: MovieReleaseDateItem[];
};

export type MovieReleaseDatesResponse = {
    id: number;
    results: MovieReleaseDateCountry[];
};

export type MovieDetails = {
    id: number;
    title: string;
    original_title: string;
    tagline: string;
    overview: string;
    backdrop_path: string | null;
    poster_path: string | null;
    release_date: string;
    runtime: number | null;
    status: string;
    budget: number;
    revenue: number;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    video: boolean;
    homepage: string | null;
    imdb_id: string | null;
    original_language: string;
    genres: MovieGenre[];
    belongs_to_collection: MovieCollection | null;
    production_companies: MovieProductionCompany[];
    production_countries: MovieProductionCountry[];
    spoken_languages: MovieSpokenLanguage[];
};

export type MovieDetailsWithAppend = MovieDetails & {
    credits?: MovieCreditsResponse;
    videos?: MovieVideosResponse;
    images?: MovieImagesResponse;
    similar?: TmdbListResponse<MovieListItem>;
    recommendations?: TmdbListResponse<MovieListItem>;
    release_dates?: MovieReleaseDatesResponse;
};