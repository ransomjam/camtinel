export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cm-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00A550" />
          <stop offset="55%" stopColor="#FCD116" />
          <stop offset="100%" stopColor="#CE1126" />
        </linearGradient>
      </defs>
      <path
        d="M20 3L6 8v11c0 8.4 5.8 16.3 14 18 8.2-1.7 14-9.6 14-18V8L20 3z"
        fill="url(#cm-shield)"
        opacity="0.15"
      />
      <path
        d="M20 3L6 8v11c0 8.4 5.8 16.3 14 18 8.2-1.7 14-9.6 14-18V8L20 3z"
        fill="none"
        stroke="url(#cm-shield)"
        strokeWidth="1.6"
      />
      <path
        d="M14 20l4 4 8-8"
        fill="none"
        stroke="url(#cm-shield)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
