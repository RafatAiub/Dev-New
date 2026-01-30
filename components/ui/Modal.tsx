'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

interface ModalProps {
    children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
    const router = useRouter();

    const handleClose = useCallback(() => {
        router.back();
    }, [router]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [handleClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 modal-backdrop"
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-5xl mx-4 my-8 md:my-16">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -top-2 -right-2 md:top-4 md:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110"
                    aria-label="Close modal"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18" />
                        <path d="M6 6L18 18" />
                    </svg>
                </button>

                {/* Content */}
                <div className="rounded-2xl bg-[var(--bg)] border border-white/10 shadow-2xl p-4 md:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
