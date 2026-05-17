import { Clapperboard } from "lucide-react";
import type { TvCrewMember } from "@/src/types/tv.types";

type TvCrewSectionProps = {
    crew: TvCrewMember[];
};

const TvCrewSection = ({ crew }: TvCrewSectionProps) => {
    if (!crew.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <Clapperboard className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">Команда</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {crew.map((member) => (
                    <div
                        key={member.credit_id}
                        className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm"
                    >
                        <p className="font-black">{member.name}</p>
                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {member.job} · {member.department}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { TvCrewSection };