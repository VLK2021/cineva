"use client";

import {Search, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {useDebounce} from "@/src/hooks/useDebounce";
import {SearchResultItem} from "@/src/components/search/SearchResultItem";
import type {SearchMultiResponse} from "@/src/types/search.types";
import {useLanguage} from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";

const HeaderSearch = () => {
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<SearchMultiResponse | null>(null);

    const debouncedQuery = useDebounce(query, 500);
    const trimmedQuery = query.trim();

    const {lang} = useLanguage();
    const t = lang === "uk" ? uk : en;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const searchValue = debouncedQuery.trim();

        if (searchValue.length < 2) {
            setData(null);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchSearch = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(
                    `/api/search?query=${encodeURIComponent(searchValue)}`,
                    {signal: controller.signal}
                );

                if (!response.ok) {
                    throw new Error("Search failed");
                }

                const result: SearchMultiResponse = await response.json();

                setData({
                    ...result,
                    results: result.results
                        .filter((item) =>
                            ["movie", "tv", "person"].includes(item.media_type)
                        )
                        .slice(0, 8),
                });

                setIsOpen(true);
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    setData(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearch();

        return () => controller.abort();
    }, [debouncedQuery]);

    const submitSearch = () => {
        if (trimmedQuery.length < 2) return;

        setIsOpen(false);
        router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitSearch();
                }}
                className="relative"
            >
                <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]"/>

                <input
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (query.trim().length >= 2) {
                            setIsOpen(true);
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setIsOpen(false);
                        }
                    }}
                    placeholder={t.searchPlaceholder}
                    className="h-11 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-background)] pl-11 pr-11 text-sm font-semibold text-[var(--color-text)] outline-none transition focus:border-[var(--color-brand)]"
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setData(null);
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                    >
                        <X className="h-4 w-4"/>
                    </button>
                )}
            </form>

            {isOpen && trimmedQuery.length >= 2 && (
                <div
                    className="absolute right-0 top-full z-50 mt-3 w-[420px] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-2xl">
                    {isLoading && (
                        <div className="p-4 text-sm font-semibold text-[var(--color-text-muted)]">
                            Шукаю...
                        </div>
                    )}

                    {!isLoading && data && data.results.length > 0 && (
                        <>
                            <div className="max-h-[440px] overflow-y-auto">
                                {data.results.map((item) => (
                                    <SearchResultItem
                                        key={`${item.media_type}-${item.id}`}
                                        item={item}
                                        onClick={() => setIsOpen(false)}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={submitSearch}
                                className="mt-3 w-full rounded-2xl bg-[var(--color-brand)] px-4 py-3 text-sm font-black text-white transition hover:opacity-90"
                            >
                                Показати всі результати
                            </button>
                        </>
                    )}

                    {!isLoading && data && data.results.length === 0 && (
                        <div className="p-4 text-sm font-semibold text-[var(--color-text-muted)]">
                            Нічого не знайдено.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export {HeaderSearch};