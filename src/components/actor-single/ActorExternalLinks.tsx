import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";
import type { ActorDetailsWithAppend } from "@/src/types/actor.types";

type ActorExternalLinksProps = {
    actor: ActorDetailsWithAppend;
    labels: {
        title: string;
        officialSite: string;
    };
};

const ActorExternalLinks = ({ actor, labels }: ActorExternalLinksProps) => {
    const external = actor.external_ids;

    const links = [
        actor.homepage
            ? { label: labels.officialSite, href: actor.homepage }
            : null,
        actor.imdb_id
            ? { label: "IMDb", href: `https://www.imdb.com/name/${actor.imdb_id}` }
            : null,
        external?.wikidata_id
            ? { label: "Wikidata", href: `https://www.wikidata.org/wiki/${external.wikidata_id}` }
            : null,
        external?.facebook_id
            ? { label: "Facebook", href: `https://www.facebook.com/${external.facebook_id}` }
            : null,
        external?.instagram_id
            ? { label: "Instagram", href: `https://www.instagram.com/${external.instagram_id}` }
            : null,
        external?.twitter_id
            ? { label: "X / Twitter", href: `https://x.com/${external.twitter_id}` }
            : null,
        external?.tiktok_id
            ? { label: "TikTok", href: `https://www.tiktok.com/@${external.tiktok_id}` }
            : null,
        external?.youtube_id
            ? { label: "YouTube", href: `https://www.youtube.com/${external.youtube_id}` }
            : null,
    ].filter(Boolean) as { label: string; href: string }[];

    if (!links.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">{labels.title}</h2>
            </div>

            <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-bold transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                    >
                        {link.label}
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export { ActorExternalLinks };