// Clean, minimal infographic illustrations for "How it works".
// Brand: navy line work on a yellow-tinted disc. Single subject, plenty of breathing room.

type IllProps = { className?: string };

const NAVY = "var(--color-primary-navy, #0E1B3D)";
const YELLOW = "var(--color-primary-yellow, #FFD23F)";
const PAPER = "#FFFFFF";

/* 1 — Create: a simple document with a pencil */
export function CreateCampaignIllustration({ className }: IllProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="80" r="58" fill={YELLOW} opacity="0.25" />

      {/* document */}
      <rect
        x="70"
        y="44"
        width="60"
        height="76"
        rx="6"
        fill={PAPER}
        stroke={NAVY}
        strokeWidth="2.4"
      />
      {/* lines */}
      <rect x="80" y="60" width="40" height="4" rx="2" fill={NAVY} />
      <rect x="80" y="72" width="30" height="3" rx="1.5" fill={NAVY} opacity="0.4" />
      <rect x="80" y="82" width="36" height="3" rx="1.5" fill={NAVY} opacity="0.4" />
      <rect x="80" y="92" width="24" height="3" rx="1.5" fill={NAVY} opacity="0.4" />

      {/* pencil */}
      <g transform="translate(122 96) rotate(40)">
        <rect
          x="0"
          y="0"
          width="44"
          height="8"
          rx="1.5"
          fill={YELLOW}
          stroke={NAVY}
          strokeWidth="2"
        />
        <rect x="0" y="0" width="6" height="8" fill={NAVY} />
        <polygon points="44,0 52,4 44,8" fill={NAVY} />
      </g>
    </svg>
  );
}

/* 2 — Share: a paper-plane style send */
export function ShareNetworkIllustration({ className }: IllProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="80" r="58" fill={YELLOW} opacity="0.25" />

      {/* dashed flight path */}
      <path
        d="M50 110 Q 90 30 150 60"
        stroke={NAVY}
        strokeWidth="2"
        strokeDasharray="4 5"
        fill="none"
        opacity="0.55"
      />

      {/* paper plane */}
      <g transform="translate(118 46)">
        <polygon
          points="0,16 44,0 30,38 22,24"
          fill={YELLOW}
          stroke={NAVY}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <polyline
          points="0,16 22,24 44,0"
          fill="none"
          stroke={NAVY}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>

      {/* tiny start dot */}
      <circle cx="50" cy="110" r="4" fill={NAVY} />
    </svg>
  );
}

/* 3 — Receive: a heart-coin */
export function ReceiveDonationsIllustration({ className }: IllProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="80" r="58" fill={YELLOW} opacity="0.25" />

      {/* coin */}
      <circle
        cx="100"
        cy="82"
        r="38"
        fill={YELLOW}
        stroke={NAVY}
        strokeWidth="2.4"
      />
      <circle
        cx="100"
        cy="82"
        r="30"
        fill="none"
        stroke={NAVY}
        strokeWidth="1.4"
        opacity="0.45"
      />

      {/* heart inside coin */}
      <path
        d="M100 100
           C 92 92, 82 88, 82 78
           C 82 71, 88 67, 93 67
           C 96 67, 99 69, 100 72
           C 101 69, 104 67, 107 67
           C 112 67, 118 71, 118 78
           C 118 88, 108 92, 100 100 Z"
        fill={NAVY}
      />
    </svg>
  );
}
