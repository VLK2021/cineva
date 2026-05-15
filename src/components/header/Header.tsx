import { HeaderLogo } from "@/src/components/header/HeaderLogo";


const Header = () => {


    return (
        <header
            className="
                sticky top-0 z-50
                w-full
                border-b border-[var(--color-border)]
                bg-[var(--color-card)]/90
                text-[var(--color-text)]
                backdrop-blur-xl
                transition-colors duration-300
            "
        >
            <div
                className="
                    flex
                    h-14
                    w-full
                    items-center
                    justify-between
                    gap-3
                    px-3
                    sm:h-16
                    sm:px-5
                    md:px-6
                    lg:px-8
                    xl:px-10
                "
            >
                <div
                    className="
                        flex
                        min-w-[130px]
                        max-w-[220px]
                        shrink-0
                        items-center
                        justify-start
                        sm:min-w-[160px]
                        md:min-w-[190px]
                    "
                >
                    <HeaderLogo />
                </div>

                <nav
                    className="
                        hidden
                        flex-1
                        items-center
                        justify-center
                        text-sm
                        font-medium
                        md:flex
                    "
                >
                    Navigation
                </nav>

                <div
                    className="
                        flex
                        min-w-[110px]
                        shrink-0
                        items-center
                        justify-end
                        gap-2
                        sm:min-w-[140px]
                        sm:gap-3
                    "
                >
                    Actions
                </div>
            </div>
        </header>
    );
};

export { Header };