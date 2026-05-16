"use client";

import { useForm } from "react-hook-form";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchFormData = {
    query: string;
};

type HeaderSearchProps = {
    onSearch?: () => void;
    autoFocus?: boolean;
};

const HeaderSearch = ({ onSearch, autoFocus = false }: HeaderSearchProps) => {
    const router = useRouter();

    const {
        register,
        watch,
        resetField,
        handleSubmit,
    } = useForm<SearchFormData>({
        defaultValues: {
            query: "",
        },
    });

    const query = watch("query");

    const onSubmit = (data: SearchFormData) => {
        const trimmedQuery = data.query.trim();

        if (!trimmedQuery) return;

        router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
        onSearch?.();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div
                className="
                    group
                    relative
                    flex
                    h-10
                    items-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-card)]
                    shadow-sm
                    transition-all
                    duration-300
                    focus-within:border-[var(--color-brand)]
                    focus-within:shadow-md
                    sm:h-11
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        left-4
                        flex
                        items-center
                        justify-center
                        text-[var(--color-text-muted)]
                        transition-colors
                        duration-300
                        group-focus-within:text-[var(--color-brand)]
                    "
                >
                    <Search className="h-4 w-4" />
                </div>

                <input
                    type="text"
                    placeholder="Пошук фільмів, серіалів, акторів..."
                    autoComplete="off"
                    autoFocus={autoFocus}
                    {...register("query")}
                    className="
                        h-full
                        w-full
                        bg-transparent
                        pl-11
                        pr-11
                        text-sm
                        text-[var(--color-text)]
                        outline-none
                        placeholder:text-[var(--color-text-muted)]
                    "
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => resetField("query")}
                        aria-label="Clear search"
                        className="
                            absolute
                            right-3
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            text-[var(--color-text-muted)]
                            transition-all
                            duration-200
                            hover:bg-[var(--color-brand)]
                            hover:text-white
                            active:scale-95
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </form>
    );
};

export { HeaderSearch };