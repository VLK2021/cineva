"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { HeaderMegaMenu, type HeaderMegaMenuItem } from "./HeaderMegaMenu";

export const movieGenres: HeaderMegaMenuItem[] = [
    { id: 28, name: "Бойовики", href: "/movies?genre=28" },
    { id: 12, name: "Пригоди", href: "/movies?genre=12" },
    { id: 16, name: "Мультфільми", href: "/movies?genre=16" },
    { id: 35, name: "Комедії", href: "/movies?genre=35" },
    { id: 80, name: "Кримінал", href: "/movies?genre=80" },
    { id: 18, name: "Драми", href: "/movies?genre=18" },
    { id: 14, name: "Фентезі", href: "/movies?genre=14" },
    { id: 27, name: "Жахи", href: "/movies?genre=27" },
    { id: 9648, name: "Детективи", href: "/movies?genre=9648" },
    { id: 878, name: "Фантастика", href: "/movies?genre=878" },
    { id: 53, name: "Трилери", href: "/movies?genre=53" },
    { id: 10752, name: "Військові", href: "/movies?genre=10752" },
];

export const tvGenres: HeaderMegaMenuItem[] = [
    { id: 10759, name: "Бойовик & пригоди", href: "/tv?genre=10759" },
    { id: 16, name: "Анімація", href: "/tv?genre=16" },
    { id: 35, name: "Комедії", href: "/tv?genre=35" },
    { id: 80, name: "Кримінал", href: "/tv?genre=80" },
    { id: 99, name: "Документальні", href: "/tv?genre=99" },
    { id: 18, name: "Драми", href: "/tv?genre=18" },
    { id: 10751, name: "Сімейні", href: "/tv?genre=10751" },
    { id: 9648, name: "Детективи", href: "/tv?genre=9648" },
    { id: 10765, name: "Sci-Fi & Fantasy", href: "/tv?genre=10765" },
    { id: 10768, name: "Військові", href: "/tv?genre=10768" },
];

const HeaderNavigation = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    const linkClass = (active: boolean) => `
        flex items-center gap-1 text-sm font-semibold transition-colors duration-200
        ${active ? "text-[var(--color-brand)]" : "text-[var(--color-text)] hover:text-[var(--color-brand)]"}
    `;

    return (
        <nav className="hidden items-center justify-center gap-7 md:flex">
            <div className="group relative">
                <Link href="/movies" className={linkClass(isActive("/movies"))}>
                    Фільми
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                <HeaderMegaMenu items={movieGenres} />
            </div>

            <div className="group relative">
                <Link href="/tv" className={linkClass(isActive("/tv"))}>
                    Серіали
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                <HeaderMegaMenu items={tvGenres} />
            </div>

            <Link href="/actors" className={linkClass(isActive("/actors"))}>
                Актори
            </Link>
        </nav>
    );
};

export { HeaderNavigation };