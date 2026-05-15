import {TvSearchParams} from "@/src/types";

type TvPageProps = {
    searchParams: TvSearchParams;
};


export default async function TvSerials({ searchParams }: TvPageProps){
    const params = await searchParams;

    const genre = params.genre;

    return (
        <div className={"w-full"}>TvSerials- {genre}</div>
    )
}