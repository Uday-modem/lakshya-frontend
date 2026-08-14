import React from 'react'

// Lightweight, brand-coloured, fully transparent illustration for the auth
// pages "sky" slot (paired with the ground/job-opportunity illustration).
// Pure inline SVG so there's no background box, no PNG matte, and no extra
// asset to ship — swap this out for a licensed illustration file any time
// by replacing this component's contents.
export default function SkyIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a candidate rising above the crowd with an offer in hand"
    >
      {/* floating dashes / motion trail */}
      <path d="M18 96 L72 96" stroke="#C99A3B" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M8 118 L54 118" stroke="#C99A3B" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M30 140 L64 140" stroke="#12233D" strokeWidth="3" strokeLinecap="round" opacity="0.25" />

      {/* paper airplane */}
      <g transform="translate(300 40) rotate(18)">
        <path d="M0 0 L64 18 L0 36 L14 18 Z" fill="#F7F5EF" stroke="#12233D" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M14 18 L38 18" stroke="#12233D" strokeWidth="2" />
      </g>

      {/* stars / sparkle */}
      <g fill="#C99A3B">
        <path d="M356 110 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" />
        <circle cx="70" cy="60" r="4" />
        <circle cx="120" cy="34" r="3" />
      </g>

      {/* rocket trail */}
      <path
        d="M120 300 C 150 230, 190 170, 236 118"
        stroke="#C99A3B"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* rocket body */}
      <g transform="translate(196 78) rotate(38)">
        <path d="M20 0 C32 10 34 34 20 56 C6 34 8 10 20 0 Z" fill="#12233D" />
        <circle cx="20" cy="24" r="7" fill="#F7F5EF" stroke="#C99A3B" strokeWidth="2" />
        <path d="M20 56 L8 74 L18 66 Z" fill="#C99A3B" />
        <path d="M20 56 L32 74 L22 66 Z" fill="#C99A3B" />
        <path d="M16 58 C16 72 24 72 24 58 Z" fill="#E85C41" />
      </g>

      {/* resume card carried along */}
      <g transform="translate(230 170)">
        <rect x="0" y="0" width="70" height="90" rx="8" fill="#F7F5EF" stroke="#12233D" strokeWidth="2.5" />
        <rect x="14" y="18" width="42" height="6" rx="3" fill="#C99A3B" />
        <rect x="14" y="34" width="42" height="4" rx="2" fill="#E3DFD3" />
        <rect x="14" y="44" width="42" height="4" rx="2" fill="#E3DFD3" />
        <rect x="14" y="54" width="28" height="4" rx="2" fill="#E3DFD3" />
        <circle cx="35" cy="74" r="9" fill="none" stroke="#2F7D53" strokeWidth="2.5" />
        <path d="M31 74 l3 3 6 -6" stroke="#2F7D53" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* small hearts / delight accents */}
      <g fill="#E3DFD3">
        <path d="M84 210 c-8 -8 -20 0 -10 12 l10 10 10 -10 c10 -12 -2 -20 -10 -12 Z" opacity="0.9" />
        <path d="M64 250 c-5 -5 -13 0 -6 8 l6 6 6 -6 c7 -8 -1 -13 -6 -8 Z" opacity="0.7" />
      </g>
    </svg>
  )
}