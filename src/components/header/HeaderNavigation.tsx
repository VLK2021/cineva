"use client";

import { ChevronDown } from "lucide-react";
import { HeaderMegaMenu, type HeaderMegaMenuItem } from "./HeaderMegaMenu";
import { HeaderNavLink } from "./HeaderNavLink";
import {useLanguage} from "@/src/context";
import uk from "@/src/locales/uk";
import en from "@/src/locales/en";

type HeaderNavigationProps = {
    movieGenres: HeaderMegaMenuItem[];
    tvGenres: HeaderMegaMenuItem[];
};

const HeaderNavigation = ({ movieGenres, tvGenres }: HeaderNavigationProps) => {
    const { lang } = useLanguage();
    const t = lang === "uk" ? uk : en;


    return (
        <nav className="hidden items-center justify-center gap-7 md:flex">
            <div className="group relative">
                <HeaderNavLink href="/movies">
                    {t.films}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </HeaderNavLink>

                <HeaderMegaMenu items={movieGenres} />
            </div>

            <div className="group relative">
                <HeaderNavLink href="/tv">
                    {t.serials}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </HeaderNavLink>

                <HeaderMegaMenu items={tvGenres} />
            </div>

            <HeaderNavLink href="/actors">{t.actors}</HeaderNavLink>
        </nav>
    );
};

export { HeaderNavigation };