/** Zug in Seitenansicht (SVG), fährt beim Betreten der Station ein; Räder drehen sich mit */
export function Train({ className = "", delay = 0.2 }: { className?: string; delay?: number }) {
  const wheel = (x: number) => (
    <g transform={`translate(${x} 254)`}>
      <g style={{ animation: `wheel-spin 2.8s cubic-bezier(.16,1,.3,1) ${delay}s both`, transformBox: "fill-box", transformOrigin: "center" }}>
        <circle r="20" fill="#1F3640" />
        <circle r="8" fill="#689099" />
        <path d="M0,-18 V18 M-18,0 H18 M-12.7,-12.7 L12.7,12.7 M12.7,-12.7 L-12.7,12.7" stroke="#3c5d68" strokeWidth="2" />
      </g>
    </g>
  );
  const bogie = (x: number) => (
    <g key={x}>
      <rect x={x - 92} y="222" width="184" height="18" rx="6" fill="#13232A" />
      {wheel(x - 48)}
      {wheel(x + 48)}
    </g>
  );
  const coach = (x: number) => (
    <g key={x} transform={`translate(${x} 0)`}>
      <rect x="40" y="58" width="620" height="14" rx="7" fill="#cfdcdf" />
      <rect x="0" y="70" width="700" height="152" rx="20" fill="url(#tBody)" stroke="#cfdcdf" strokeWidth="2" />
      <rect x="0" y="176" width="700" height="5" fill="#FAB33F" />
      <path d="M0 186h700v16a20 20 0 0 1-20 20H20A20 20 0 0 1 0 202Z" fill="#13232A" />
      {[70, 214, 376, 520].map((wx) => (
        <rect key={wx} x={wx} y="98" width="110" height="52" rx="10" fill="url(#tGlass)" />
      ))}
      <rect x="336" y="92" width="28" height="94" rx="4" fill="none" stroke="#8aa3aa" strokeWidth="2" />
      {bogie(140)}
      {bogie(560)}
    </g>
  );

  return (
    <svg viewBox="-1440 -40 3840 340" className={className} aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
      <defs>
        <linearGradient id="tBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#f1f5f6" />
          <stop offset="1" stopColor="#cfdcdf" />
        </linearGradient>
        <linearGradient id="tGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f4b55" />
          <stop offset=".5" stopColor="#13232A" />
          <stop offset="1" stopColor="#1F3640" />
        </linearGradient>
        <clipPath id="tLoco">
          <path d="M1560,70 H2180 C2236,70 2268,82 2298,122 L2344,190 C2356,207 2350,222 2328,222 H1560 Z" />
        </clipPath>
      </defs>
      {/* Oberleitung */}
      <line x1="-2000" y1="14" x2="4400" y2="14" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
      {[-1600, -650, 300, 1250, 2200].map((x) => (
        <g key={x} transform={`translate(${x} 0)`} fill="rgba(255,255,255,.28)">
          <rect x="-5" y="-40" width="10" height="320" />
          <rect x="-5" y="-30" width="90" height="5" />
        </g>
      ))}
      <g style={{ animation: `train-in 2.8s cubic-bezier(.16,1,.3,1) ${delay}s both` }}>
        {coach(-1320)}
        {coach(-600)}
        {coach(120)}
        {coach(840)}
        <g>
          <rect x="1620" y="56" width="560" height="16" rx="8" fill="#cfdcdf" />
          <path d="M1872,56 L1924,36 L1890,14 M1858,14 H1922" fill="none" stroke="#13232A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <g clipPath="url(#tLoco)">
            <rect x="1560" y="60" width="800" height="170" fill="url(#tBody)" />
            <rect x="1560" y="176" width="820" height="5" fill="#FAB33F" />
            <rect x="1560" y="186" width="820" height="44" fill="#13232A" />
            <path d="M2212,86 C2246,88 2270,100 2290,126 L2312,158 H2212 Z" fill="url(#tGlass)" />
            <rect x="2110" y="96" width="74" height="50" rx="8" fill="url(#tGlass)" />
            <rect x="1600" y="96" width="74" height="50" rx="8" fill="url(#tGlass)" />
            <g fill="#cfdcdf">
              <rect x="1790" y="104" width="220" height="5" rx="2" />
              <rect x="1790" y="116" width="220" height="5" rx="2" />
              <rect x="1790" y="128" width="220" height="5" rx="2" />
            </g>
            <text x="1900" y="168" textAnchor="middle" fontFamily="var(--font-ubuntu)" fontWeight="700" fontSize="26" fill="#406976" letterSpacing="2">
              SGE
            </text>
          </g>
          <circle cx="2326" cy="198" r="7" fill="#fff" style={{ filter: "drop-shadow(0 0 10px #fff)" }} />
          {bogie(1720)}
          {bogie(2180)}
        </g>
      </g>
      {/* Gleis */}
      <rect x="-2000" y="276" width="6400" height="5" fill="#13232A" />
    </svg>
  );
}
