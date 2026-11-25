export interface Sector {
  id: 'robotics' | 'ai' | 'drones' | 'hardware'
  slug: string
  name: string
  kicker: string
  title: string
  description: string
  examples: string[]
  coverage: { scenario: string; cover: string; detail: string }[]
  gap: { title: string; body: string }
  evidence: { title: string; detail: string }[]
  ctaTitle: string
  metaDescription: string
  sources: { label: string; url: string }[]
}

export const sectors: readonly Sector[] = [
  {
    id: 'robotics',
    slug: 'robotics',
    name: 'Robotics & Physical AI',
    kicker: 'Robotics & Physical AI',
    title: 'Insurance for robots doing real work.',
    description: 'A first pilot brings your system into someone else’s workplace. We help explain the machine, its operating limits and its safeguards so insurers can assess the deployment.',
    examples: ['Warehouse robots', 'Industrial automation', 'Humanoids & service robots', 'Field robotics'],
    coverage: [
      {
        scenario: 'A robot injures someone or damages their equipment.',
        cover: 'Public / general & product liability',
        detail: 'Explore protection against claims for physical harm. The right wording depends on whether you build, supply or operate the robot.',
      },
      {
        scenario: 'Your system makes a mistake that costs a customer money.',
        cover: 'Technology errors & omissions',
        detail: 'Consider claims arising from a technology failure or service error, including financial loss without physical damage. Contracts and exclusions matter.',
      },
      {
        scenario: 'Your own robot is damaged at a site or in transit.',
        cover: 'Property, equipment & transit cover',
        detail: 'Check how the machine is insured away from your premises, including prototypes, demonstration units and equipment moving between sites.',
      },
    ],
    gap: {
      title: '“Robotics company” leaves a lot unexplained.',
      body: 'A supervised arm behind a barrier and a mobile robot working beside people present different risks. A generic business description can miss those differences. Operating limits, testing arrangements and responsibility at the customer’s site need to be clear in the submission and considered in the policy wording.',
    },
    evidence: [
      { title: 'Where it operates', detail: 'The task, site layout, people nearby, loads and limits on movement.' },
      { title: 'How it stays in control', detail: 'Human supervision, emergency stops, fallback behaviour and safety testing.' },
      { title: 'What the deployment proves', detail: 'Trial results, recorded incidents, software versions and the responsibilities in your customer contract.' },
    ],
    ctaTitle: 'Tell us where your robot is going next.',
    metaDescription: 'Explore insurance questions for robotics and physical AI. Boundry turns operating limits, safeguards and test evidence into a clearer case for cover.',
    sources: [
      { label: 'Munich Re: AI risks and existing insurance', url: 'https://www.munichre.com/content/dam/munichre/contentlounge/website-pieces/documents/MR_AI-Whitepaper-Insuring-Generative-AI.pdf' },
      { label: 'Chubb: technology errors and omissions', url: 'https://www.chubb.com/us-en/business-insurance/integrity-by-chubb.html' },
      { label: 'Chubb: hardware and equipment exposures', url: 'https://www.chubb.com/us-en/business-insurance/electronics-or-hardware-manufacturing.html' },
    ],
  },
  {
    id: 'ai',
    slug: 'ai-software',
    name: 'AI Software & Agents',
    kicker: 'AI Software & Agents',
    title: 'Insurance for software that takes action.',
    description: 'Your agent can access data, make decisions and act inside a customer’s workflow. We help insurers understand those permissions, the consequences of an error and the controls around them.',
    examples: ['AI agents & copilots', 'Decision models', 'Enterprise AI software', 'Automated workflows'],
    coverage: [
      {
        scenario: 'An agent’s mistake causes a customer financial loss.',
        cover: 'Technology errors & omissions',
        detail: 'Explore liability for errors in your technology or services. The definition of your service should reflect what the agent actually does.',
      },
      {
        scenario: 'Customer data is exposed or a connected system is compromised.',
        cover: 'Cyber & privacy liability',
        detail: 'Consider breach response costs and claims over data or network security. The cause of the incident and the policy’s terms determine its response.',
      },
      {
        scenario: 'Your model falls short of an agreed performance level.',
        cover: 'Specialist AI performance cover',
        detail: 'Some products address defined performance shortfalls. The metric, threshold and resulting financial exposure need to be measurable and agreed with the insurer.',
      },
    ],
    gap: {
      title: 'An agent’s permissions change the insurance question.',
      body: 'Software that suggests an action has different consequences from software that executes it. A standard technology policy may be relevant, but its service definitions, contractual liability provisions and any AI exclusions need checking against the workflow. “Uses AI” alone tells an insurer very little.',
    },
    evidence: [
      { title: 'What it can do', detail: 'Tools, permissions, data access and the decisions the system can make for a customer.' },
      { title: 'Where people stay involved', detail: 'Approval steps, spending limits, escalation paths and how actions can be stopped or reversed.' },
      { title: 'How you test it', detail: 'Evaluations, failure cases, security controls and the performance commitments in your contracts.' },
    ],
    ctaTitle: 'Talk through what your AI can do.',
    metaDescription: 'Insurance questions for AI software and agents: technology E&O, cyber and performance risks. Make permissions, controls and evaluations useful to insurers.',
    sources: [
      { label: 'Chubb: technology errors and omissions', url: 'https://www.chubb.com/us-en/business-insurance/integrity-by-chubb.html' },
      { label: 'Travelers: how cyber insurance works', url: 'https://www.travelers.com/resources/business-topics/cyber-security/how-does-cyber-insurance-work' },
      { label: 'Munich Re: AI performance assessment and insurance', url: 'https://www.munichre.com/en/solutions/for-industry-clients/insure-ai/faq.html' },
    ],
  },
  {
    id: 'drones',
    slug: 'drones-autonomy',
    name: 'Drones & Autonomous Systems',
    kicker: 'Drones & Autonomous Systems',
    title: 'Insurance that starts with the mission.',
    description: 'Inspection flights, autonomous deliveries and vehicle trials each have their own insurance questions. We help describe where your system operates, who controls it and what happens when something goes wrong.',
    examples: ['Inspection & mapping drones', 'Autonomous delivery', 'Vehicle trials', 'Flight & navigation software'],
    coverage: [
      {
        scenario: 'A drone crashes, injuring someone or damaging the aircraft.',
        cover: 'Aviation liability & hull cover',
        detail: 'Liability addresses harm to others; hull cover concerns the aircraft itself. Payloads, permitted missions and manufacturer exposures need separate consideration.',
      },
      {
        scenario: 'An autonomous ground vehicle causes a collision.',
        cover: 'Motor & autonomous vehicle cover',
        detail: 'Explore cover suited to the vehicle and its use. Road operation, testing, supervision and responsibility for the driving system all affect the assessment.',
      },
      {
        scenario: 'Your mapping or navigation software causes a customer loss.',
        cover: 'Technology errors & omissions',
        detail: 'Financial loss from a faulty deliverable or service can raise a different insurance question from damage in a crash. Both need to be described.',
      },
    ],
    gap: {
      title: 'The mission matters as much as the machine.',
      body: 'Aircraft, road vehicles and their software create different exposures. A broad technology description can miss aircraft or vehicle exclusions, operating restrictions and the split between manufacturer and operator. The insurance submission needs to describe the actual mission, including remote supervision and loss-of-connection behaviour.',
    },
    evidence: [
      { title: 'The operating boundary', detail: 'Routes, airspace or sites, operating permissions and proximity to people or property.' },
      { title: 'Control and recovery', detail: 'Operator involvement, communications, obstacle avoidance and the response to a failed connection or sensor.' },
      { title: 'The record behind the mission', detail: 'Test results, operating logs, incident history and responsibilities across the vehicle, software and operator.' },
    ],
    ctaTitle: 'Bring your next mission into the conversation.',
    metaDescription: 'Explore insurance for drones and autonomous systems, from aviation and vehicle risks to software liability. Boundry helps explain the mission and safeguards.',
    sources: [
      { label: 'AIG: unmanned aircraft insurance', url: 'https://www.aig.com/business/insurance/specialty/unmanned-aircraft-system' },
      { label: 'AXA XL: autonomous vehicle coverage', url: 'https://axaxl.com/press-releases/axa-xl-launches-single-customisable-policy-for-autonomous-vehicles' },
      { label: 'Chubb: technology errors and omissions', url: 'https://www.chubb.com/us-en/business-insurance/integrity-by-chubb.html' },
    ],
  },
  {
    id: 'hardware',
    slug: 'hardware-infrastructure',
    name: 'Hardware & AI Infrastructure',
    kicker: 'Hardware & AI Infrastructure',
    title: 'Insurance for the hardware behind AI.',
    description: 'Sensors, compute and connected devices bring software into the physical world. We help explain the product, its dependencies and its stage of development before a pilot, shipment or customer deployment.',
    examples: ['Sensors & edge devices', 'AI compute hardware', 'Connected equipment', 'Inference infrastructure'],
    coverage: [
      {
        scenario: 'A faulty device injures someone or damages a customer’s property.',
        cover: 'Public / general & product liability',
        detail: 'Explore liability arising from the hardware you supply. Your role in design, manufacture, installation and maintenance helps define the exposure.',
      },
      {
        scenario: 'Equipment is damaged and your operation stops.',
        cover: 'Property, equipment breakdown & business interruption',
        detail: 'Consider the assets and income at risk. Breakdown and interruption cover have specific triggers; a service outage alone may not meet them.',
      },
      {
        scenario: 'A sensor or firmware error costs a customer money.',
        cover: 'Technology errors & omissions',
        detail: 'Consider financial loss caused by a defective product or service, alongside physical-damage exposures. Performance commitments and contractual terms need attention.',
      },
    ],
    gap: {
      title: 'The hardware label misses the system around it.',
      body: 'A sensor can be a component, a connected service or part of a safety-critical system. A generic description may miss the firmware, customer dependencies and whether a unit is a prototype or a finished product. Those details help insurers assess the exposure and examine how the relevant policies fit together.',
    },
    evidence: [
      { title: 'The product and its stage', detail: 'What you build, where it is installed and whether the units are prototypes, pilots or production hardware.' },
      { title: 'The dependencies', detail: 'Firmware, connectivity, third-party components and the customer processes that rely on the device.' },
      { title: 'The evidence behind reliability', detail: 'Test results, failure modes, maintenance responsibilities and recovery arrangements when equipment fails.' },
    ],
    ctaTitle: 'Tell us what you’re putting into the world.',
    metaDescription: 'Insurance questions for AI hardware, sensors and infrastructure. Understand product liability, equipment and technology risks with technical assessment from Boundry.',
    sources: [
      { label: 'Chubb: electronics and hardware manufacturing risks', url: 'https://www.chubb.com/us-en/business-insurance/electronics-or-hardware-manufacturing.html' },
      { label: 'Chubb: insurance for technology companies', url: 'https://www.chubb.com/us-en/business-insurance/industries/technology.html' },
      { label: 'Chubb: product and service errors and omissions', url: 'https://www.chubb.com/us-en/business-insurance/integrity-by-chubb.html' },
    ],
  },
]
