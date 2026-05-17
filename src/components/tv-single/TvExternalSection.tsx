import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";
import type { TvDetailsWithAppend } from "@/src/types/tv.types";

type TvExternalSectionProps = {
    tv: TvDetailsWithAppend;
};

const TvExternalSection = ({ tv }: TvExternalSectionProps) => {
    const externalIds = tv.external_ids;

    const links = [
        tv.homepage
            ? { label: "Офіційний сайт", href: tv.homepage }
            : null,
        externalIds?.imdb_id
            ? { label: "IMDb", href: `https://www.imdb.com/title/${externalIds.imdb_id}` }
            : null,
        externalIds?.wikidata_id
            ? { label: "Wikidata", href: `https://www.wikidata.org/wiki/${externalIds.wikidata_id}` }
            : null,
        externalIds?.facebook_id
            ? { label: "Facebook", href: `https://www.facebook.com/${externalIds.facebook_id}` }
            : null,
        externalIds?.instagram_id
            ? { label: "Instagram", href: `https://www.instagram.com/${externalIds.instagram_id}` }
            : null,
        externalIds?.twitter_id
            ? { label: "X / Twitter", href: `https://x.com/${externalIds.twitter_id}` }
            : null,
    ].filter(Boolean) as { label: string; href: string }[];

    if (!links.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Зовнішні посилання</h2>
            </div>

            <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                    >
                        {link.label}
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export { TvExternalSection };