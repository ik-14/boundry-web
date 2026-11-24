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
    summary: 'Tasks, operating environments, human interaction and safety controls.',
    image: '/assets/robot.jpg',
    imageAlt: 'Illustration of a robotic arm',
    imageWidth: 1200,
    imageHeight: 675,
    risk: 'Injury or property damage when a robot interacts with people, equipment or its surroundings.',
    evidence: 'Task logs, payload limits, safety tests and records of human intervention.',
    questions: 'Who operates it, who owns it, and what do customer contracts require?',
  },
  {
    id: 'autonomy',
    name: 'Autonomous systems',
    summary: 'Operating boundaries, fleet activity, incidents and remote oversight.',
    image: '/assets/rover.jpg',
    imageAlt: 'Illustration of an autonomous delivery rover',
    imageWidth: 1200,
    imageHeight: 675,
    risk: 'Collisions, property damage or disruption outside the intended operating conditions.',
    evidence: 'Operating boundaries, route data, intervention rates and incident records.',
    questions: 'Where can it operate, when does a human take over, and who bears the loss?',
  },
  {
    id: 'ai',
    name: 'Artificial intelligence',
    summary: 'Permissions, evaluation results, connected systems and human controls.',
    image: '/assets/ai-agent.png',
    imageAlt: 'Illustration of an autonomous AI agent working across connected digital tools',
    imageWidth: 1254,
    imageHeight: 1254,
    risk: 'Incorrect actions, data exposure or financial loss when AI acts inside business systems.',
    evidence: 'Tool permissions, transaction limits, evaluation results and approval controls.',
    questions: 'What can it access, what can it change, and who approves consequential actions?',
  },
]
