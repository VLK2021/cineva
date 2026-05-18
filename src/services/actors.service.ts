import { tmdbFetch } from "@/src/services/tmdbClient";
import type {
    ActorDetails,
    ActorDetailsWithAppend,
    ActorImagesResponse,
    ActorListItem,
    ActorListResponse,
    ActorMovieCreditsResponse,
    ActorTvCreditsResponse,
} from "@/src/types/actor.types";

type CommonActorParams = {
    page?: number;
    language?: string;
};

const getPopularActors = ({
                              page = 1,
                              language = "uk-UA",
                          }: CommonActorParams = {}): Promise<ActorListResponse<ActorListItem>> => {
    const params = new URLSearchParams({
        page: String(page),
        language,
    });

    return tmdbFetch<ActorListResponse<ActorListItem>>(
        `/person/popular?${params.toString()}`,
        { revalidate: 3600 }
    );
};

const getActorDetails = (
    actorId: number | string,
    language = "uk-UA"
): Promise<ActorDetails> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<ActorDetails>(
        `/person/${actorId}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getActorDetailsWithAppend = (
    actorId: number | string,
    language = "uk-UA"
): Promise<ActorDetailsWithAppend> => {
    const params = new URLSearchParams({
        language,
        append_to_response:
            "movie_credits,tv_credits,combined_credits,images,external_ids",
    });

    return tmdbFetch<ActorDetailsWithAppend>(
        `/person/${actorId}?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getActorMovieCredits = (
    actorId: number | string,
    language = "uk-UA"
): Promise<ActorMovieCreditsResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<ActorMovieCreditsResponse>(
        `/person/${actorId}/movie_credits?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getActorTvCredits = (
    actorId: number | string,
    language = "uk-UA"
): Promise<ActorTvCreditsResponse> => {
    const params = new URLSearchParams({
        language,
    });

    return tmdbFetch<ActorTvCreditsResponse>(
        `/person/${actorId}/tv_credits?${params.toString()}`,
        { revalidate: 86400 }
    );
};

const getActorImages = (
    actorId: number | string
): Promise<ActorImagesResponse> => {
    return tmdbFetch<ActorImagesResponse>(
        `/person/${actorId}/images`,
        { revalidate: 86400 }
    );
};

export {
    getPopularActors,
    getActorDetails,
    getActorDetailsWithAppend,
    getActorMovieCredits,
    getActorTvCredits,
    getActorImages,
};