import { LangSwitcher } from "@/src/components/LangSwitcher";
import { ThemeSwitcher } from "@/src/components/ThemeSwitcher";

const HeaderActions = () => {
    return (
        <div
            className="
                flex
                shrink-0
                items-center
                justify-end
                gap-2
                sm:gap-3
            "
        >
            <LangSwitcher />
            <ThemeSwitcher />

            <button
                type="button"
                className="
                    hidden
                    h-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-card)]
                    px-3
                    text-xs
                    font-semibold
                    text-[var(--color-text)]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-[var(--color-brand)]
                    hover:bg-[var(--color-brand)]
                    hover:text-white
                    active:scale-95
                    sm:inline-flex
                    md:h-10
                    md:px-4
                    md:text-sm
                "
            >
                Log in
            </button>
        </div>
    );
};

export { HeaderActions };