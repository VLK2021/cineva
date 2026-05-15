import {HeaderLogo} from "@/src/components/header/HeaderLogo";

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
                    mx-auto
                    flex
                    h-14
                    w-full
                    max-w-7xl
                    items-center
                    justify-between
                    gap-3
                    px-4
                    sm:h-16
                    sm:px-6
                    lg:px-8
                "
            >
                {/* LEFT: Logo */}
                <div className="flex w-[15%] min-w-[150px] shrink-0 items-center justify-start">
                    <HeaderLogo />
                </div>

                {/* CENTER: Navigation */}
                <nav className="hidden flex-1 items-center justify-center md:flex">
                    Navigation
                </nav>

                {/* RIGHT: Actions */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    Actions
                </div>
            </div>
        </header>
    );
};

export { Header };