import Link from "next/link";
import { MessageSquare } from "lucide-react";
import type { TvReview } from "@/src/types/tv.types";

type TvReviewsSectionProps = {
    reviews: TvReview[];
    lang: "uk" | "en";
    labels: {
        title: string;
        readFull: string;
    };
};

const TvReviewsSection = ({
                              reviews,
                              lang,
                              labels,
                          }: TvReviewsSectionProps) => {
    if (!reviews.length) return null;

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-5 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[var(--color-brand)]" />
                <h2 className="text-2xl font-black">{labels.title}</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {reviews.slice(0, 4).map((review) => (
                    <div
                        key={review.id}
                        className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="font-black">{review.author}</p>

                                <p className="text-xs text-[var(--color-text-muted)]">
                                    {new Date(review.created_at).toLocaleDateString(
                                        lang === "en" ? "en-US" : "uk-UA"
                                    )}
                                </p>
                            </div>

                            {review.author_details.rating && (
                                <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-black text-white">
                                    {review.author_details.rating}/10
                                </span>
                            )}
                        </div>

                        <p className="mt-4 line-clamp-6 text-sm leading-6 text-[var(--color-text-muted)]">
                            {review.content}
                        </p>

                        <Link
                            href={review.url}
                            target="_blank"
                            className="mt-4 inline-flex text-sm font-bold text-[var(--color-brand)]"
                        >
                            {labels.readFull}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { TvReviewsSection };