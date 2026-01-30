import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-10 h-80 w-80 rounded-full glow-effect" />
                <div className="absolute right-0 top-52 h-72 w-72 rounded-full glow-effect-subtle" />
                <div className="noise absolute inset-0" />
            </div>

            <div className="relative z-10 text-center px-4">
                <div className="card-gradient rounded-2xl p-[1px]">
                    <div className="rounded-2xl surface p-12 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                        {/* 404 Badge */}
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
                            <span className="text-4xl font-bold text-white">404</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-white">Page Not Found</h1>

                        {/* Message */}
                        <p className="mt-4 text-lg text-zinc-400 max-w-md">
                            Sorry, the page you are looking for does not exist.
                        </p>

                        {/* Back Button */}
                        <Link
                            href="/en"
                            className="btn mt-8 inline-flex"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
