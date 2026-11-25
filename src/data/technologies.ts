export interface Technology {
  id: string
  name: string
  summary: string
}

export const technologies: readonly Technology[] = [
  {
    id: 'robotics',
    name: 'Robotics & Physical AI',
    summary: 'Robots in factories, warehouses and public spaces.',
  },
  {
    id: 'ai',
    name: 'AI Software & Agents',
    summary: 'Models and agents acting in business workflows.',
  },
  {
    id: 'hardware',
    name: 'AI Hardware & Infrastructure',
    summary: 'Compute, sensing and connected devices.',
  },
  {
    id: 'drones',
    name: 'Drones',
    summary: 'Inspection, surveying and delivery operations.',
  },
]
