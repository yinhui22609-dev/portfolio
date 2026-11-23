export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 2v44M2 24h44M8.5 8.5l31 31m0-31-31 31" stroke="currentColor" strokeWidth="7" />
    </svg>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return <span className={`registration-cross ${className}`} aria-hidden="true" />;
}

export function OrbitMark() {
  return (
    <svg className="orbit-mark" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <ellipse cx="40" cy="40" rx="35" ry="16" stroke="currentColor" strokeWidth="1.2" transform="rotate(-40 40 40)" />
      <ellipse cx="40" cy="40" rx="35" ry="16" stroke="currentColor" strokeWidth="1.2" transform="rotate(40 40 40)" />
      <circle cx="40" cy="40" r="5" fill="currentColor" />
    </svg>
  );
}
