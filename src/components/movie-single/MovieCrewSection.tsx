import type { MovieCrewMember } from "@/src/types";

type MovieCrewSectionProps = {
    crew: MovieCrewMember[];
};

const MovieCrewSection = ({ crew }: MovieCrewSectionProps) => {
    if (!crew.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <h2 className="text-2xl font-black">Команда</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {crew.map((member) => (
                    <div
                        key={member.credit_id}
                        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm"
                    >
                        <h3 className="font-bold">{member.name}</h3>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {member.job} · {member.department}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { MovieCrewSection };