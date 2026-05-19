export type AppLanguage = "uk" | "en";

export const DEFAULT_LANGUAGE: AppLanguage = "uk";

export const getTmdbLanguage = (lang?: string) => {
    return lang === "en" ? "en-US" : "uk-UA";
};