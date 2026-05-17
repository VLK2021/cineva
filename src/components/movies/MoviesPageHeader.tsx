type MoviesPageHeaderProps = {
    totalResults: number;
    page: number;
};

const MoviesPageHeader = ({ totalResults, page }: MoviesPageHeaderProps) => {
    return (
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
                    Каталог
                </p>

                <h1 className="text-3xl font-black text-[var(--color-text)] sm:text-4xl">
                    Усі фільми
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                    Загальний каталог фільмів. Тут відображаються фільми всіх жанрів.
                    Пізніше сюди додамо жанри, сортування та фільтри.
                </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm shadow-sm">
                <span className="font-bold text-[var(--color-text)]">
                    {totalResults.toLocaleString("uk-UA")}
                </span>{" "}
                <span className="text-[var(--color-text-muted)]">
                    результатів · сторінка {page}
                </span>
            </div>
        </div>
    );
};

export { MoviesPageHeader };