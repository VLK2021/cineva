"use client";

import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";

type BackButtonProps = {
    fallbackHref?: string;
    label?: string;
};

const BackButton = ({
                        fallbackHref = "/movies",
                        label = "Назад",
                    }: BackButtonProps) => {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
            return;
        }

        router.push(fallbackHref);
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-black/35
                px-4
                py-2
                text-sm
                font-bold
                text-white
                shadow-lg
                backdrop-blur-xl
                transition
                hover:bg-white
                hover:text-black
                active:scale-95
            "
        >
            <ArrowLeft className="h-4 w-4"/>
            {label}
        </button>
    );
};

export {BackButton};