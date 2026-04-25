type LockIconProps = {
    isLocked: boolean;
    size?: number | string;
    className?: string;
};

export function LockIcon({ isLocked, size = 20, className = "" }: LockIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Clean, rounded rectangle body (shared between both states) */}
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />

            {/* Minimalist keyhole (shared between both states) */}
            <circle cx="12" cy="16" r="1" />

            {/* Conditional Shackle */}
            {isLocked ? (
                /* Fully closed shackle */
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            ) : (
                /* Open shackle */
                <path d="M7 11V7a5 5 0 0 1 10 0" />
            )}
        </svg>
    );
}