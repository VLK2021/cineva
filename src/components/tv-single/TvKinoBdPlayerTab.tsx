"use client";

import { useEffect, useMemo, useRef } from "react";

type TvKinoBdPlayerTabProps = {
    imdbId?: string | null;
    tvTitle: string;
};

const KINOBD_SCRIPT_SRC = "https://kinobd.net/js/player_.js";

const TvKinoBdPlayerTab = ({ imdbId, tvTitle }: TvKinoBdPlayerTabProps) => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    const preparedImdbId = useMemo(() => {
        return imdbId?.replace(/^tt/i, "").trim() || "";
    }, [imdbId]);

    const preparedTitle = useMemo(() => {
        return tvTitle.trim();
    }, [tvTitle]);

    useEffect(() => {
        if (!rootRef.current) return;
        if (!preparedImdbId && !preparedTitle) return;

        const root = rootRef.current;

        root.innerHTML = "";

        const playerDiv = document.createElement("div");
        playerDiv.id = "kinobd";
        playerDiv.className = "h-full w-full";

        if (preparedImdbId) {
            playerDiv.setAttribute("data-player", "videospider");
            playerDiv.setAttribute("data-imdb", preparedImdbId);
        } else {
            playerDiv.setAttribute("data-title", preparedTitle);
        }

        const script = document.createElement("script");
        script.src = KINOBD_SCRIPT_SRC;
        script.async = true;

        root.appendChild(playerDiv);
        root.appendChild(script);

        return () => {
            root.innerHTML = "";
        };
    }, [preparedImdbId, preparedTitle]);

    return <div ref={rootRef} className="h-full w-full" />;
};

export { TvKinoBdPlayerTab };