export interface Technology {
  id: string
  name: string
  summary: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  risk: string
  evidence: string
  questions: string
}

export const technologies: readonly Technology[] = [
  {
    id: 'robotics',
    name: 'Robotics',
    summary: 'Warehouse robots, industrial arms and machines working alongside people.',
    image: '/assets/robot.jpg',
    imageAlt: 'Illustration of a robotic arm',
    imageWidth: 1200,
    imageHeight: 675,
    risk: 'Injury or property damage during operation.',
    evidence: 'Safety tests, task logs and intervention records.',
    questions: 'Who operates the robot, and what cover do customers require?',
  },
  {
    id: 'autonomy',
    name: 'Autonomous systems',
    summary: 'Drones, autonomous vehicles and delivery systems.',
    image: '/assets/rover.jpg',
    imageAlt: 'Illustration of an autonomous delivery rover',
    imageWidth: 1200,
    imageHeight: 675,
    risk: 'Collisions or disruption outside the intended operating conditions.',
    evidence: 'Operating boundaries, route data and incident records.',
    questions: 'Where can it operate, and when does a human take over?',
  },
  {
    id: 'ai',
    name: 'Artificial intelligence',
    summary: 'AI agents and models acting inside business workflows.',
    image: '/assets/ai-agent.png',
    imageAlt: 'Illustration of an autonomous AI agent working across connected digital tools',
    imageWidth: 1254,
    imageHeight: 1254,
    risk: 'Incorrect actions, data exposure or financial loss.',
    evidence: 'Permissions, evaluation results and approval controls.',
    questions: 'What can it access or change, and who approves its actions?',
  },
]
