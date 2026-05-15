import {MoviesSearchParams} from "@/src/types";


type MoviesPageProps = {
    searchParams: MoviesSearchParams;
};


export default async function MoviesPage({searchParams}: MoviesPageProps) {
    const params = await searchParams;

    const genre = params.genre;


    return (
        <div className={"w-full"}>movies {genre}</div>
    )
}