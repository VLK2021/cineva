import Image from "next/image";
import Link from "next/link";


const HeaderLogo = () => {


    return (
        <Link
            href="/"
            aria-label="Go to CINEVA home page"
            className="
                relative
                flex
                h-10
                w-[140px]
                shrink-0
                items-center
                transition-transform
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
                sm:h-11
                sm:w-[165px]
                md:h-12
                md:w-[190px]
            "
        >
            <Image
                src="/images/logo/cineva-logo.svg"
                alt="CINEVA"
                fill
                priority
                sizes="(max-width: 640px) 140px, (max-width: 768px) 165px, 190px"
                className="object-contain object-left select-none"
            />
        </Link>
    );
};

export { HeaderLogo };