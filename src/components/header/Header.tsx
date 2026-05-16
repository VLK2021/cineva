import { HeaderLogo } from "@/src/components/header/HeaderLogo";
import { HeaderNavigation, movieGenres, tvGenres } from "@/src/components/header/HeaderNavigation";
import { HeaderMobileMenu } from "@/src/components/header/HeaderMobileMenu";
import { HeaderSearch } from "@/src/components/header/HeaderSearch";
import { HeaderMobileSearch } from "@/src/components/header/HeaderMobileSearch";

const Header = () => {
    return (
        <header
            className="
                sticky
                top-0
                z-50
                w-full
                border-b
                border-[var(--color-border)]
                bg-[var(--color-card)]/90
                text-[var(--color-text)]
                backdrop-blur-xl
                transition-colors
                duration-300
            "
        >
            <div
                className="
                    relative
                    flex
                    h-14
                    w-full
                    items-center
                    gap-3
                    px-3
                    sm:h-16
                    sm:px-5
                    md:px-6
                    lg:px-8
                    xl:px-10
                "
            >
                <div className="flex shrink-0 items-center justify-start">
                    <HeaderLogo />
                </div>

                <div className="hidden flex-1 items-center justify-center md:flex">
                    <HeaderNavigation />
                </div>

                <div
                    className="
                        hidden
                        w-full
                        max-w-[360px]
                        shrink
                        items-center
                        justify-end
                        lg:flex
                    "
                >
                    <HeaderSearch />
                </div>

                <div
                    className="
                        ml-auto
                        flex
                        shrink-0
                        items-center
                        justify-end
                        gap-2
                        sm:gap-3
                    "
                >
                    <HeaderMobileSearch />

                    <span className="text-sm font-medium">
                        Actions
                    </span>

                    <HeaderMobileMenu
                        movieGenres={movieGenres}
                        tvGenres={tvGenres}
                    />
                </div>
            </div>
        </header>
    );
};

export { Header };