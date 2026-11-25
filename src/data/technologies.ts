export interface Technology {
  id: string
  name: string
  summary: string
  slug: string
}

export const technologies: readonly Technology[] = [
  {
    id: 'robotics',
    slug: 'robotics',
    name: 'Robotics & Physical AI',
    summary: 'Robots in factories, warehouses and public spaces.',
  },
  {
    id: 'ai',
    slug: 'ai-software',
    name: 'AI Software & Agents',
    summary: 'Models and agents acting in business workflows.',
  },
  {
    id: 'drones',
    slug: 'drones-autonomy',
    name: 'Drones & Autonomous Systems',
    summary: 'Autonomous flights, vehicles and field operations.',
  },
  {
    id: 'hardware',
    slug: 'hardware-infrastructure',
    name: 'Hardware & AI Infrastructure',
    summary: 'Compute, sensing and connected devices.',
  },
]
