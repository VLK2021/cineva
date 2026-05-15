

export type MoviesSearchParams = Promise<{
    genre?: string;
    page?: string;
    year?: string;
    sort?: string;
}>;

export type TvSearchParams = Promise<{
    genre?: string;
    page?: string;
    year?: string;
    sort?: string;
}>;

export type ActorsSearchParams = Promise<{
    page?: string;
    query?: string;
}>;