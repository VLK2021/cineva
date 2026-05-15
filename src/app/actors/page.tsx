import {ActorsSearchParams} from "@/src/types";

type ActorsProps = {
    searchParams: ActorsSearchParams
}

export default async function Actors({searchParams}: ActorsProps){
    const params = await searchParams;


    return(
        <div>actors- {}</div>
    )
}