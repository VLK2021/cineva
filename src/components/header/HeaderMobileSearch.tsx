"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { HeaderSearch } from "./HeaderSearch";

const HeaderMobileSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeSearch = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open search"
                className="
                    inline-flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-card)]
                    text-[var(--color-text)]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-[var(--color-brand)]
                    hover:bg-[var(--color-brand)]
                    hover:text-white
                    active:scale-95
                    lg:hidden
                "
            >
                <Search className="h-5 w-5" />
            </button>

            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        bg-black/40
                        backdrop-blur-sm
                        lg:hidden
                    "
                >
                    <div
                        className="
                            border-b
                            border-[var(--color-border)]
                            bg-[var(--color-card)]
                            px-4
                            py-4
                            shadow-2xl
                        "
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-semibold text-[var(--color-text)]">
                                Пошук
                            </p>

                            <button
                                type="button"
                                onClick={closeSearch}
                                aria-label="Close search"
                                className="
                                    inline-flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[var(--color-border)]
                                    text-[var(--color-text)]
                                    transition-all
                                    duration-200
                                    hover:border-[var(--color-brand)]
                                    hover:bg-[var(--color-brand)]
                                    hover:text-white
                                    active:scale-95
                                "
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <HeaderSearch onSearch={closeSearch} autoFocus />
                    </div>
                </div>
            )}
        </>
    );
};

export { HeaderMobileSearch };