"use client";

import { useEffect, useMemo, useRef } from "react";

type TvKinoBdPlayerTabProps = {
    kinopoiskId?: string | null;
    tvTitle: string;
};

const KINOBD_SCRIPT_SRC = "https://kinobd.net/js/player_.js";

const TvKinoBdPlayerTab = ({
                               kinopoiskId,
                               tvTitle,
                           }: TvKinoBdPlayerTabProps) => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    const preparedKinopoiskId = useMemo(() => {
        return kinopoiskId?.replace(/^tt/i, "").trim() || "";
    }, [kinopoiskId]);

    const preparedTitle = useMemo(() => {
        return tvTitle.trim();
    }, [tvTitle]);

    useEffect(() => {
        if (!rootRef.current) return;
        if (!preparedKinopoiskId && !preparedTitle) return;

        const root = rootRef.current;

        root.innerHTML = "";

        const playerDiv = document.createElement("div");
        playerDiv.id = "kinobd";
        playerDiv.className = "h-full w-full";

        if (preparedKinopoiskId) {
            playerDiv.setAttribute("data-kinopoisk", preparedKinopoiskId);
        }

        if (preparedTitle) {
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
    }, [preparedKinopoiskId, preparedTitle]);

    return <div ref={rootRef} className="h-full w-full" />;
};

export { TvKinoBdPlayerTab };