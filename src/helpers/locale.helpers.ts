export type AppLocale = "uk" | "en";

export const DEFAULT_LOCALE: AppLocale = "uk";

export const getTmdbLanguage = (locale?: string) => {
    if (locale === "en") return "en-US";

    return "uk-UA";
};