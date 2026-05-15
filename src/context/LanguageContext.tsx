"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Language = "uk" | "en";

type LangContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LangContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    if (typeof window === "undefined") return "uk";

    const saved = localStorage.getItem("lang");

    if (saved === "uk" || saved === "en") {
        return saved;
    }

    return "uk";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>(getInitialLanguage);

    useEffect(() => {
        localStorage.setItem("lang", lang);
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