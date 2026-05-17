import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    basePath: string;
    searchParams?: Record<string, string | undefined>;
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
    const pages: Array<number | "..."> = [];

    if (totalPages <= 7) {
        for (let page = 1; page <= totalPages; page++) {
            pages.push(page);
        }

        return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
        pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
        pages.push(page);
    }

    if (currentPage < totalPages - 3) {
        pages.push("...");
    }

    pages.push(totalPages);

    return pages;
};

const buildHref = (
    basePath: string,
    page: number,
    searchParams?: Record<string, string | undefined>
) => {
    const params = new URLSearchParams();

    Object.entries(searchParams ?? {}).forEach(([key, value]) => {
        if (value) {
            params.set(key, value);
        }
    });

    params.set("page", String(page));

    return `${basePath}?${params.toString()}`;
};

const Pagination = ({
                        currentPage,
                        totalPages,
                        basePath,
                        searchParams,
                    }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const safeTotalPages = Math.min(totalPages, 500);
    const prevPage = Math.max(1, currentPage - 1);
    const nextPage = Math.min(safeTotalPages, currentPage + 1);
    const items = getPaginationItems(currentPage, safeTotalPages);

    return (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Link
                href={buildHref(basePath, prevPage, searchParams)}
                aria-disabled={currentPage <= 1}
                className={`
                    inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition
                    ${
                    currentPage <= 1
                        ? "pointer-events-none border-[var(--color-border)] text-[var(--color-text-muted)] opacity-50"
                        : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                }
                `}
            >
                <ChevronLeft className="h-4 w-4" />
                Назад
            </Link>

            {items.map((item, index) => {
                if (item === "...") {
                    return (
                        <span
                            key={`dots-${index}`}
                            className="inline-flex h-10 w-10 items-center justify-center text-sm font-bold text-[var(--color-text-muted)]"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = item === currentPage;

                return (
                    <Link
                        key={item}
                        href={buildHref(basePath, item, searchParams)}
                        className={`
                            inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition
                            ${
                            isActive
                                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                                : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                        }
                        `}
                    >
                        {item}
                    </Link>
                );
            })}

            <Link
                href={buildHref(basePath, nextPage, searchParams)}
                aria-disabled={currentPage >= safeTotalPages}
                className={`
                    inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition
                    ${
                    currentPage >= safeTotalPages
                        ? "pointer-events-none border-[var(--color-border)] text-[var(--color-text-muted)] opacity-50"
                        : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                }
                `}
            >
                Далі
                <ChevronRight className="h-4 w-4" />
            </Link>
        </nav>
    );
};

export { Pagination };