export const IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

export const formatMoney = (value: number) => {
    if (!value) return "Невідомо";

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatRuntime = (runtime: number | null) => {
    if (!runtime) return "Невідомо";

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (!hours) return `${minutes} хв`;

    return `${hours} год ${minutes} хв`;
};

export const getYear = (date?: string) => {
    if (!date) return "Невідомо";
    return date.slice(0, 4);
};