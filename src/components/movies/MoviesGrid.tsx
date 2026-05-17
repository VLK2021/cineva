import type { MovieListItem } from "@/src/types";
import { MovieCard } from "@/src/components/movies/MovieCard";

type MoviesGridProps = {
    movies: MovieListItem[];
};

const MoviesGrid = ({ movies }: MoviesGridProps) => {
    if (!movies.length) {
        return (
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-[var(--color-text-muted)]">
                Фільми не знайдено.
            </div>
        );
    }

    return (
        <div
            className="
                grid
                grid-cols-2
                gap-4
                sm:grid-cols-3
                md:grid-cols-4
                xl:grid-cols-5
            "
        >
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export { MoviesGrid };