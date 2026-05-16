import {getMovieDetailsWithAppend, getMovieVideos} from "@/src/services";
import {
    MovieCastSection,
    MovieCrewSection,
    MovieHero,
    MovieInfoSection,
    MovieRelatedSection,
    MovieTrailerSection,
} from "@/src/components/movie-single";
import {getBestTrailer} from "@/src/helpers/movieVideo.helpers";


type MoviePageProps = {
    params: Promise<{
        id: string;
    }>;
};


export default async function MoviePage({params}: MoviePageProps) {
    const {id} = await params;

    const [
        movie,
        ukVideos,
        ruVideos,
        enVideos,
    ] = await Promise.all([
        getMovieDetailsWithAppend(id, "uk-UA"),
        getMovieVideos(id, "uk-UA"),
        getMovieVideos(id, "ru-RU"),
        getMovieVideos(id, "en-US"),
    ]);

    const allVideos = [
        ...(movie.videos?.results ?? []),
        ...(ukVideos.results ?? []),
        ...(ruVideos.results ?? []),
        ...(enVideos.results ?? []),
    ];

    const trailer = getBestTrailer(allVideos);

    const cast = movie.credits?.cast.slice(0, 18) ?? [];
    const crew = movie.credits?.crew.slice(0, 12) ?? [];
    const similarMovies = movie.similar?.results.slice(0, 8) ?? [];
    const recommendations = movie.recommendations?.results.slice(0, 8) ?? [];

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <MovieHero movie={movie} trailer={trailer}/>

            <MovieInfoSection movie={movie}/>

            <MovieTrailerSection trailer={trailer}/>

            <MovieCastSection cast={cast}/>

            <MovieCrewSection crew={crew}/>

            <MovieRelatedSection
                title="Схожі фільми"
                movies={similarMovies}
            />

            <MovieRelatedSection
                title="Рекомендації"
                movies={recommendations}
            />
        </main>
    );
}