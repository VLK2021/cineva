import Link from "next/link";

export type HeaderMegaMenuItem = {
    id: number | string;
    name: string;
    href: string;
};

type HeaderMegaMenuProps = {
    items: HeaderMegaMenuItem[];
};

const HeaderMegaMenu = ({ items }: HeaderMegaMenuProps) => {
    return (
        <div
            className="
                pointer-events-none
                absolute
                left-0
                top-full
                z-50
                w-[460px]
                translate-y-2
                pt-3
                opacity-0
                transition-all
                duration-200
                group-hover:pointer-events-auto
                group-hover:translate-y-0
                group-hover:opacity-100
            "
        >
            <div
                className="
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-card)]
                    p-4
                    shadow-2xl
                "
            >
                <div className="grid grid-cols-2 gap-2">
                    {items.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="
                                rounded-xl
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-[var(--color-text)]
                                transition-colors
                                duration-200
                                hover:bg-[var(--color-brand)]
                                hover:text-white
                            "
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { HeaderMegaMenu };