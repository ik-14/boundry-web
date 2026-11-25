import type { Technology } from '../data/technologies'

interface TechnologyCardProps {
  technology: Technology
  delay: number
}

function TechnologyDiagram({ category }: { category: string }) {
  return (
    <svg className={`technology-diagram technology-diagram--${category}`} viewBox="0 0 160 96" fill="none" aria-hidden="true" focusable="false">
      <g className="diagram-guides">
        <path d="M16 80h128M24 16v7m-3-3h6m106 48v7m-3-3h6" />
        <circle cx="138" cy="18" r="2" />
      </g>
      {category === 'robotics' && (
        <>
          <path className="diagram-ground" d="M44 80v-8h38v8M54 72V60h18v12" />
          <g className="diagram-arm">
            <path className="diagram-accent" d="m58 59 25-31 10 8-22 30Z" />
            <path className="diagram-paper" d="m83 28 8-11 26 19-7 10Z" />
            <circle className="diagram-joint" cx="64" cy="63" r="8" />
            <circle className="diagram-joint" cx="88" cy="32" r="8" />
            <path d="m113 41 8 6m-2-12 9 7-1 10-9 3-8-6" />
            <path className="diagram-payload" d="m121 55 8-4 7 5-8 4Zm0 0v8l7 5 8-4v-8m-8 4v8" />
            <circle cx="64" cy="63" r="2" />
            <circle cx="88" cy="32" r="2" />
          </g>
        </>
      )}
      {category === 'ai' && (
        <>
          <g className="diagram-connections">
            <path d="m39 25 35 17m14 0 36-17M41 70l33-20m14 0 35 20" />
            <path className="diagram-signal" d="M39 25h42v45h42M41 70h40V25h43" />
          </g>
          <g className="diagram-satellites">
            <rect className="diagram-paper" x="24" y="14" width="26" height="22" rx="6" />
            <rect className="diagram-paper" x="112" y="14" width="26" height="22" rx="6" />
            <rect className="diagram-paper" x="28" y="60" width="26" height="22" rx="6" />
            <rect className="diagram-paper" x="110" y="60" width="26" height="22" rx="6" />
            <path d="m32 25 4 4 6-8m78 4h10M125 20v10M36 68h10m-10 6h6m76-3h10" />
          </g>
          <g className="diagram-core">
            <circle className="diagram-accent" cx="81" cy="46" r="17" />
            <path d="m81 36 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
          </g>
        </>
      )}
      {category === 'hardware' && (
        <>
          <g className="diagram-traces">
            <path d="M26 22h14v12h18M22 48h36M29 73h13V61h16m44-27h16V22h15M102 48h37m-37 13h17v12h14M68 26V14m12 12V11m12 15V14M68 69v13m12-13v16m12-16v13" />
            <circle cx="24" cy="22" r="2" /><circle cx="20" cy="48" r="2" /><circle cx="27" cy="73" r="2" />
            <circle cx="135" cy="22" r="2" /><circle cx="141" cy="48" r="2" /><circle cx="135" cy="73" r="2" />
          </g>
          <g className="diagram-chip">
            <rect className="diagram-paper" x="56" y="24" width="48" height="48" rx="7" />
            <rect className="diagram-accent" x="65" y="33" width="30" height="30" rx="3" />
            <path d="M73 42h14v12H73Zm-17-8h-5m5 14h-5m5 14h-5m53-28h5m-5 14h5m-5 14h5" />
          </g>
        </>
      )}
      {category === 'drones' && (
        <>
          <ellipse className="diagram-shadow" cx="80" cy="79" rx="29" ry="4" />
          <g className="diagram-drone">
            <path d="m74 40-24-14m36 14 24-14M74 51 50 65m36-14 24 14" />
            <circle className="diagram-paper" cx="45" cy="23" r="15" /><circle className="diagram-paper" cx="115" cy="23" r="15" />
            <circle className="diagram-paper" cx="45" cy="68" r="15" /><circle className="diagram-paper" cx="115" cy="68" r="15" />
            <g className="diagram-propeller"><path d="m37 19 16 8m-12 4 8-16" /><circle cx="45" cy="23" r="2" /></g>
            <g className="diagram-propeller"><path d="m107 19 16 8m-12 4 8-16" /><circle cx="115" cy="23" r="2" /></g>
            <g className="diagram-propeller"><path d="m37 64 16 8m-12 4 8-16" /><circle cx="45" cy="68" r="2" /></g>
            <g className="diagram-propeller"><path d="m107 64 16 8m-12 4 8-16" /><circle cx="115" cy="68" r="2" /></g>
            <rect className="diagram-accent" x="70" y="33" width="20" height="25" rx="7" />
            <path d="M76 39h8m-7 13h6" />
          </g>
        </>
      )}
    </svg>
  )
}

export function TechnologyCard({ technology, delay }: TechnologyCardProps) {
  return (
    <li className={`audience-row audience-row--${technology.id}`} data-reveal data-tilt="8" data-delay={delay || undefined}>
      <div className="card-surface">
        <div className="card-visual"><TechnologyDiagram category={technology.id} /></div>
        <div className="audience-card-copy">
          <h3>{technology.name}</h3>
          <p>{technology.summary}</p>
        </div>
      </div>
    </li>
  )
}
