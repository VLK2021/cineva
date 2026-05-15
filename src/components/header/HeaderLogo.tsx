import Image from "next/image";
import Link from "next/link";


const HeaderLogo = () => {
    return (
        <Link
            href="/"
            aria-label="Go to CINEVA home page"
            className="
                group
                relative
                flex
                h-[clamp(34px,4.2vw,52px)]
                w-[clamp(130px,16vw,230px)]
                shrink-0
                items-center
                transition-transform
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
            "
        >
            <Image
                src="/images/logo/cineva-logo.svg"
                alt="CINEVA"
                fill
                priority
                sizes="(max-width: 480px) 130px, (max-width: 768px) 160px, (max-width: 1200px) 200px, 230px"
                className="
                    object-contain
                    object-left
                    select-none
                    transition-opacity
                    duration-300
                    group-hover:opacity-90
                "
            />
        </Link>
    );
};

export { HeaderLogo };