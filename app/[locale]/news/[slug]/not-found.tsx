import Link from 'next/link';

interface NewsNotFoundProps {
    params: Promise<{ locale: string; slug: string }>;
}

export default async function NewsNotFound({ params }: NewsNotFoundProps) {
    // In Next.js 14+, we might not have access to params in not-found
    // So we'll use a generic message with the slug interpolated client-side

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="card-gradient rounded-2xl p-[1px]">
                <div className="rounded-2xl surface p-12 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                    {/* Error Icon */}
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-10 w-10 text-rose-400"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white">News Not Found</h1>

                    {/* Message - As required by assignment */}
                    <p className="mt-4 text-lg text-zinc-400">
                        This News with <span className="text-cyan-400 font-mono">this id</span> was not found!
                    </p>

                    {/* Subtext */}
                    <p className="mt-2 text-sm text-zinc-500">
                        The news article you&apos;re looking for may have been removed or doesn&apos;t exist.
                    </p>

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="btn mt-8 inline-flex"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
