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

/**
 * Отримує список популярних фільмів.
 *
 * Запит:
 * GET /movie/popular
 *
 * Що повертає:
 * - популярні фільми;
 * - пагінацію;
 * - загальну кількість сторінок;
 * - загальну кількість результатів.
 *
 * Використання:
 * - головна сторінка;
 * - блок "Популярні фільми";
 * - стартовий список фільмів.
 */
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
        {
            revalidate: 3600,
        }
    );
};

/**
 * Отримує список фільмів, які зараз ідуть у кінотеатрах.
 *
 * Запит:
 * GET /movie/now_playing
 *
 * Що повертає:
 * - актуальні фільми в прокаті;
 * - список результатів;
 * - пагінацію.
 *
 * Використання:
 * - блок "Зараз у кіно";
 * - головна сторінка;
 * - окрема сторінка актуальних релізів.
 */
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
        {
            revalidate: 1800,
        }
    );
};

/**
 * Отримує список фільмів з найвищим рейтингом.
 *
 * Запит:
 * GET /movie/top_rated
 *
 * Що повертає:
 * - топові фільми за рейтингом;
 * - список результатів;
 * - пагінацію.
 *
 * Використання:
 * - блок "Топ рейтинг";
 * - окрема сторінка найкращих фільмів;
 * - рекомендаційні секції.
 */
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
        {
            revalidate: 3600,
        }
    );
};

/**
 * Отримує список майбутніх фільмів.
 *
 * Запит:
 * GET /movie/upcoming
 *
 * Що повертає:
 * - фільми, які ще мають вийти;
 * - список результатів;
 * - пагінацію;
 * - додаткове поле dates з мінімальною і максимальною датою.
 *
 * Використання:
 * - блок "Скоро вийде";
 * - сторінка майбутніх релізів;
 * - карусель очікуваних прем’єр.
 */
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
        {
            revalidate: 1800,
        }
    );
};

/**
 * Отримує фільми через гнучкий discover-запит.
 *
 * Запит:
 * GET /discover/movie
 *
 * Що дозволяє:
 * - фільтрувати фільми по жанру;
 * - фільтрувати по року;
 * - сортувати по популярності, рейтингу, даті тощо;
 * - використовувати пагінацію.
 *
 * Що повертає:
 * - список фільмів за вибраними фільтрами;
 * - поточну сторінку;
 * - загальну кількість сторінок;
 * - загальну кількість результатів.
 *
 * Використання:
 * - сторінка /movies;
 * - фільтрація по жанрах з header popup;
 * - сортування;
 * - пагінація.
 */
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
    });

    if (genre) params.set("with_genres", genre);
    if (year) params.set("primary_release_year", year);

    return tmdbFetch<TmdbListResponse<MovieListItem>>(
        `/discover/movie?${params.toString()}`,
        {
            revalidate: 3600,
        }
    );
};

/**
 * Отримує базову детальну інформацію про конкретний фільм.
 *
 * Запит:
 * GET /movie/{movie_id}
 *
 * Що повертає:
 * - назву;
 * - опис;
 * - постер;
 * - фон;
 * - рейтинг;
 * - дату релізу;
 * - жанри;
 * - тривалість;
 * - бюджет;
 * - збори;
 * - статус;
 * - країни виробництва;
 * - компанії виробництва;
 * - мови.
 *
 * Використання:
 * - сторінка /movies/[id];
 * - базова детальна сторінка фільму.
 */
const getMovieDetails = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieDetails> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieDetails>(`/movie/${movieId}?${params.toString()}`, {
        revalidate: 86400,
    });
};

/**
 * Отримує розширену детальну інформацію про конкретний фільм.
 *
 * Запит:
 * GET /movie/{movie_id}?append_to_response=credits,videos,images,similar,recommendations,release_dates
 *
 * Що додатково підтягує:
 * - credits: актори та команда;
 * - videos: трейлери й відео;
 * - images: постери/backdrops/logos;
 * - similar: схожі фільми;
 * - recommendations: рекомендації;
 * - release_dates: дати релізів і вікові рейтинги.
 *
 * Використання:
 * - повна сторінка /movies/[id];
 * - коли потрібно одним запитом отримати майже всі дані для single page.
 */
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
        {
            revalidate: 86400,
        }
    );
};

/**
 * Отримує акторський склад і команду конкретного фільму.
 *
 * Запит:
 * GET /movie/{movie_id}/credits
 *
 * Що повертає:
 * - cast: актори;
 * - crew: режисери, сценаристи, продюсери та інша команда.
 *
 * Використання:
 * - блок акторів на сторінці фільму;
 * - список команди;
 * - перехід на сторінки акторів.
 */
const getMovieCredits = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieCreditsResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieCreditsResponse>(
        `/movie/${movieId}/credits?${params.toString()}`,
        {
            revalidate: 86400,
        }
    );
};

/**
 * Отримує відео конкретного фільму.
 *
 * Запит:
 * GET /movie/{movie_id}/videos
 *
 * Що повертає:
 * - трейлери;
 * - тизери;
 * - кліпи;
 * - behind the scenes;
 * - YouTube key для вбудованого плеєра.
 *
 * Використання:
 * - кнопка "Дивитись трейлер";
 * - секція трейлерів;
 * - модальне вікно з YouTube iframe.
 */
const getMovieVideos = (
    movieId: number | string,
    language = "uk-UA"
): Promise<MovieVideosResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieVideosResponse>(
        `/movie/${movieId}/videos?${params.toString()}`,
        {
            revalidate: 86400,
        }
    );
};

/**
 * Отримує зображення конкретного фільму.
 *
 * Запит:
 * GET /movie/{movie_id}/images
 *
 * Що повертає:
 * - posters: постери;
 * - backdrops: фонові зображення;
 * - logos: логотипи фільму.
 *
 * Використання:
 * - галерея;
 * - hero background;
 * - вибір постера або backdrop для UI.
 */
const getMovieImages = (
    movieId: number | string
): Promise<MovieImagesResponse> => {
    return tmdbFetch<MovieImagesResponse>(`/movie/${movieId}/images`, {
        revalidate: 86400,
    });
};

/**
 * Отримує список схожих фільмів.
 *
 * Запит:
 * GET /movie/{movie_id}/similar
 *
 * Що повертає:
 * - фільми, які TMDB вважає схожими;
 * - пагінацію.
 *
 * Використання:
 * - блок "Схожі фільми";
 * - рекомендації під детальною сторінкою.
 */
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
        {
            revalidate: 86400,
        }
    );
};

/**
 * Отримує рекомендації для конкретного фільму.
 *
 * Запит:
 * GET /movie/{movie_id}/recommendations
 *
 * Що повертає:
 * - рекомендовані фільми на основі поточного фільму;
 * - пагінацію.
 *
 * Використання:
 * - блок "Рекомендовано";
 * - секція після опису фільму;
 * - персоналізований вигляд сторінки.
 */
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
        {
            revalidate: 86400,
        }
    );
};

/**
 * Отримує список жанрів фільмів.
 *
 * Запит:
 * GET /genre/movie/list
 *
 * Що повертає:
 * - id жанру;
 * - назву жанру.
 *
 * Використання:
 * - header popup для фільмів;
 * - фільтри на сторінці /movies;
 * - мапінг genre_ids у назви жанрів.
 */
const getMovieGenres = (
    language = "uk-UA"
): Promise<MovieGenresResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<MovieGenresResponse>(
        `/genre/movie/list?${params.toString()}`,
        {
            revalidate: 86400,
        }
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