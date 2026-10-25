export default function OliveBranch({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 45"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 38C31 21 64 20 111 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        <path d="M27 28C25 18 32 9 43 5C40 16 35 23 27 28Z" />
        <path d="M44 23C44 12 55 5 67 3C62 14 55 21 44 23Z" />
        <path d="M65 18C71 9 85 6 96 7C86 14 77 18 65 18Z" />
        <path d="M38 26C49 25 57 30 62 38C51 37 44 33 38 26Z" />
        <path d="M60 21C71 19 81 24 87 31C75 32 66 27 60 21Z" />
      </g>
      <ellipse
        cx="72"
        cy="36"
        rx="4.5"
        ry="6"
        transform="rotate(-28 72 36)"
        fill="var(--blue)"
      />
      <ellipse
        cx="91"
        cy="30"
        rx="4"
        ry="5.5"
        transform="rotate(-38 91 30)"
        fill="var(--blue)"
      />
    </svg>
  );
}
