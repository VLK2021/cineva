"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type HeaderNavLinkProps = {
    href: string;
    children: ReactNode;
};

const HeaderNavLink = ({ href, children }: HeaderNavLinkProps) => {
    const pathname = usePathname();
    const active = pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`
                flex items-center gap-1 text-sm font-semibold transition-colors duration-200
                ${
                active
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-brand)]"
            }
            `}
        >
            {children}
        </Link>
    );
};

export { HeaderNavLink };