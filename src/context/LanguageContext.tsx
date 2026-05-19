"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type Language = "uk" | "en";

type LangContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LangContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: ReactNode;
    initialLang: Language;
};

export const LanguageProvider = ({
                                     children,
                                     initialLang,
                                 }: LanguageProviderProps) => {
    const router = useRouter();
    const [lang, setLangState] = useState<Language>(initialLang);

    const setLang = (nextLang: Language) => {
        setLangState(nextLang);

        localStorage.setItem("lang", nextLang);
        document.cookie = `lang=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;

        router.refresh();
    };

    useEffect(() => {
        localStorage.setItem("lang", lang);
        document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);

    if (!ctx) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }

    return ctx;
};