import { ChevronDown } from "lucide-react";
import { HeaderMegaMenu, type HeaderMegaMenuItem } from "./HeaderMegaMenu";
import { HeaderNavLink } from "./HeaderNavLink";

type HeaderNavigationProps = {
    movieGenres: HeaderMegaMenuItem[];
    tvGenres: HeaderMegaMenuItem[];
};

const HeaderNavigation = ({ movieGenres, tvGenres }: HeaderNavigationProps) => {
    return (
        <nav className="hidden items-center justify-center gap-7 md:flex">
            <div className="group relative">
                <HeaderNavLink href="/movies">
                    Фільми
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </HeaderNavLink>

                <HeaderMegaMenu items={movieGenres} />
            </div>

            <div className="group relative">
                <HeaderNavLink href="/tv">
                    Серіали
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </HeaderNavLink>

                <HeaderMegaMenu items={tvGenres} />
            </div>

            <HeaderNavLink href="/actors">Актори</HeaderNavLink>
        </nav>
    );
};

export { HeaderNavigation };