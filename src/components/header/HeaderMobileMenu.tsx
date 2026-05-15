"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import type { HeaderMegaMenuItem } from "./HeaderMegaMenu";

type HeaderMobileMenuProps = {
    movieGenres: HeaderMegaMenuItem[];
    tvGenres: HeaderMegaMenuItem[];
};

const HeaderMobileMenu = ({ movieGenres, tvGenres }: HeaderMobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSection, setOpenSection] = useState<"movies" | "tv" | null>(null);

    const toggleSection = (section: "movies" | "tv") => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenSection(null);
    };

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Open mobile menu"
                className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-full
                    border border-[var(--color-border)]
                    bg-[var(--color-card)]
                    text-[var(--color-text)]
                    transition-all duration-200
                    active:scale-95
                "
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {isOpen && (
                <div
                    className="
                        absolute left-0 top-full z-50
                        w-full
                        border-b border-[var(--color-border)]
                        bg-[var(--color-card)]
                        px-4 py-4
                        shadow-2xl
                    "
                >
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={() => toggleSection("movies")}
                            className="
                                flex items-center justify-between
                                rounded-xl px-3 py-3
                                text-left text-sm font-semibold
                                text-[var(--color-text)]
                                hover:bg-[var(--color-background)]
                            "
                        >
                            Фільми
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                    openSection === "movies" ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {openSection === "movies" && (
                            <div className="grid grid-cols-2 gap-2 px-2 pb-2">
                                {movieGenres.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="
                                            rounded-lg px-3 py-2
                                            text-sm text-[var(--color-text-muted)]
                                            hover:bg-[var(--color-brand)]
                                            hover:text-white
                                        "
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => toggleSection("tv")}
                            className="
                                flex items-center justify-between
                                rounded-xl px-3 py-3
                                text-left text-sm font-semibold
                                text-[var(--color-text)]
                                hover:bg-[var(--color-background)]
                            "
                        >
                            Серіали
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                    openSection === "tv" ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {openSection === "tv" && (
                            <div className="grid grid-cols-2 gap-2 px-2 pb-2">
                                {tvGenres.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="
                                            rounded-lg px-3 py-2
                                            text-sm text-[var(--color-text-muted)]
                                            hover:bg-[var(--color-brand)]
                                            hover:text-white
                                        "
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <Link
                            href="/actors"
                            onClick={closeMenu}
                            className="
                                rounded-xl px-3 py-3
                                text-sm font-semibold
                                text-[var(--color-text)]
                                hover:bg-[var(--color-background)]
                            "
                        >
                            Актори
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export { HeaderMobileMenu };