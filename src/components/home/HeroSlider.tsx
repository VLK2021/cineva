"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

type HeroMovie = {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
};

type HeroSliderProps = {
    movies: HeroMovie[];
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const HeroSlider = ({ movies }: HeroSliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const filteredMovies = movies.filter((movie) => movie.backdrop_path);

    if (!filteredMovies.length) return null;

    const activeMovie = filteredMovies[activeIndex];

    const nextSlide = () => {
        setActiveIndex((prev) =>
            prev === filteredMovies.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? filteredMovies.length - 1 : prev - 1
        );
    };

    return (
        <section
            className="
                relative
                min-h-[520px]
                overflow-hidden
                bg-[var(--color-background)]
                text-white
                sm:min-h-[560px]
                lg:min-h-[640px]
            "
        >
            <Image
                src={`${IMAGE_BASE_URL}/original${activeMovie.backdrop_path}`}
                alt={activeMovie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-black/30" />

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-[520px]
                    w-full
                    items-center
                    px-4
                    py-16
                    sm:min-h-[560px]
                    sm:px-6
                    lg:min-h-[640px]
                    lg:px-10
                "
            >
                <div className="max-w-3xl">
                    <div
                        className="
                            mb-4
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-[var(--color-brand)]/90
                            px-4
                            py-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-white
                        "
                    >
                        Featured movie
                    </div>

                    <h1
                        className="
                            max-w-2xl
                            text-4xl
                            font-black
                            leading-tight
                            tracking-tight
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        {activeMovie.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
                        <span className="inline-flex items-center gap-1">
                            <Star className="h-4 w-4 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                            {activeMovie.vote_average.toFixed(1)}
                        </span>

                        {activeMovie.release_date && (
                            <span>{activeMovie.release_date.slice(0, 4)}</span>
                        )}
                    </div>

                    <p
                        className="
                            mt-5
                            line-clamp-4
                            max-w-2xl
                            text-sm
                            leading-7
                            text-white/80
                            sm:text-base
                        "
                    >
                        {activeMovie.overview || "Опис для цього фільму поки відсутній."}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={`/movies/${activeMovie.id}`}
                            className="
                                rounded-full
                                bg-[var(--color-brand)]
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:scale-[1.03]
                                hover:shadow-xl
                                active:scale-95
                            "
                        >
                            Детальніше
                        </Link>

                        <Link
                            href="/movies"
                            className="
                                rounded-full
                                border
                                border-white/30
                                bg-white/10
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                backdrop-blur
                                transition-all
                                duration-300
                                hover:bg-white/20
                                active:scale-95
                            "
                        >
                            Усі фільми
                        </Link>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="
                    absolute
                    left-4
                    top-1/2
                    z-20
                    hidden
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-black/35
                    text-white
                    backdrop-blur
                    transition-all
                    duration-300
                    hover:bg-[var(--color-brand)]
                    md:flex
                "
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                    absolute
                    right-4
                    top-1/2
                    z-20
                    hidden
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-black/35
                    text-white
                    backdrop-blur
                    transition-all
                    duration-300
                    hover:bg-[var(--color-brand)]
                    md:flex
                "
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-8 left-4 z-20 flex gap-2 sm:left-6 lg:left-10">
                {filteredMovies.slice(0, 8).map((movie, index) => (
                    <button
                        key={movie.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`
                            h-2.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                            activeIndex === index
                                ? "w-8 bg-[var(--color-brand)]"
                                : "w-2.5 bg-white/40 hover:bg-white/70"
                        }
                        `}
                    />
                ))}
            </div>
        </section>
    );
};

export { HeroSlider };