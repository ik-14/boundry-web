import type { Technology } from '../data/technologies'

interface TechnologyCardProps {
  technology: Technology
  delay: number
}

export function TechnologyCard({ technology, delay }: TechnologyCardProps) {
  return (
    <li className="audience-row" data-reveal data-delay={delay || undefined}>
      <h3>{technology.name}</h3>
      <p>{technology.summary}</p>
    </li>
  )
}
