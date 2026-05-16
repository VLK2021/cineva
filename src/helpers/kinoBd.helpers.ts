const normalizeTitle = (title?: string | null) => {
    return title?.trim() || "";
};

const getUniqueTitles = (titles: string[]) => {
    return Array.from(new Set(titles.filter(Boolean)));
};

const buildKinoBdTitleCandidates = ({
                                        ruTitle,
                                        ukTitle,
                                        originalTitle,
                                    }: {
    ruTitle?: string | null;
    ukTitle?: string | null;
    originalTitle?: string | null;
}) => {
    return getUniqueTitles([
        normalizeTitle(ruTitle),
        normalizeTitle(ukTitle),
        normalizeTitle(originalTitle),
    ]);
};

export { buildKinoBdTitleCandidates };