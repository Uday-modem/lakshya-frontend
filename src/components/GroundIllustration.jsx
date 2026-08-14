import React from 'react'

// Companion piece to SkyIllustration — a small "crowd going for the same
// opening" scene. Pure inline SVG (transparent by nature, no PNG asset to
// ship or lose), sized smaller than the sky illustration so the two overlap
// as one composition rather than two evenly-sized stacked blocks.
export default function GroundIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a crowd of candidates reaching for the same job opportunity"
    >
      {/* ground line */}
      <path d="M10 190 H410" stroke="#E3DFD3" strokeWidth="2" />

      {/* job opportunity card */}
      <g transform="translate(168 30)">
        <rect x="0" y="0" width="84" height="108" rx="10" fill="#F7F5EF" stroke="#12233D" strokeWidth="2.5" />
        <rect x="26" y="16" width="32" height="24" rx="4" fill="#12233D" />
        <rect x="34" y="24" width="16" height="10" rx="2" fill="#F7F5EF" />
        <rect x="14" y="52" width="56" height="6" rx="3" fill="#12233D" />
        <rect x="14" y="66" width="48" height="4" rx="2" fill="#E3DFD3" />
        <rect x="14" y="76" width="48" height="4" rx="2" fill="#E3DFD3" />
        <g fill="#C99A3B">
          <path d="M20 92 l2.4 5 5.6 0.6 -4.2 3.8 1.2 5.4 -4.8 -2.8 -4.8 2.8 1.2 -5.4 -4.2 -3.8 5.6 -0.6 Z" />
          <path d="M40 92 l2.4 5 5.6 0.6 -4.2 3.8 1.2 5.4 -4.8 -2.8 -4.8 2.8 1.2 -5.4 -4.2 -3.8 5.6 -0.6 Z" opacity="0.6" />
          <path d="M60 92 l2.4 5 5.6 0.6 -4.2 3.8 1.2 5.4 -4.8 -2.8 -4.8 2.8 1.2 -5.4 -4.2 -3.8 5.6 -0.6 Z" opacity="0.3" />
        </g>
      </g>

      {/* rope */}
      <path d="M20 150 H400" stroke="#7C8AA0" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" />

      {/* left team (simple figures pulling) */}
      {[0, 1, 2].map((i) => (
        <g key={`l-${i}`} transform={`translate(${18 + i * 34} 118)`}>
          <circle cx="10" cy="8" r="8" fill="#12233D" />
          <path d="M2 22 C2 14 18 14 18 22 L18 44 L2 44 Z" fill="#4C5C74" />
          <path d="M-6 150 L2 130" stroke="none" />
        </g>
      ))}

      {/* right team */}
      {[0, 1, 2].map((i) => (
        <g key={`r-${i}`} transform={`translate(${318 + i * 34} 118)`}>
          <circle cx="10" cy="8" r="8" fill="#A97F2B" />
          <path d="M2 22 C2 14 18 14 18 22 L18 44 L2 44 Z" fill="#C99A3B" />
        </g>
      ))}
    </svg>
  )
}