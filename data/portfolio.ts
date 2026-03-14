export interface Project {
  id: string;
  title: string;
  description: string;
  metrics: string[];
  tags: string[];
  gridX: number;
  gridY: number;
  visual?: {
    type: 'video' | 'image';
    src: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'pointtaken',
    title: 'PointTaken',
    description: 'Context-aware AI survey engine that adapts questions in real-time to solve high drop-off rates and poor UX.',
    metrics: ['+35% Completion', '2x Data Quality'],
    tags: ['Next.js', 'OpenAI', 'Postgres', 'Tailwind'],
    gridX: -2,
    gridY: 1,
    visual: { type: 'video', src: '/pointtaken_backend.mp4' },
  },
  {
    id: 'rolefit',
    title: 'RoleFit',
    description: 'Semantic matching algorithm scoring candidates on potential fit via vector embeddings, replacing manual screening.',
    metrics: ['-60% Screening Time', 'Better Placement'],
    tags: ['Python', 'FastAPI', 'Vector DB', 'React'],
    gridX: 0,
    gridY: 1,
    visual: { type: 'video', src: '/Demo.mp4' },
  },
  {
    id: 'daywell',
    title: 'DayWell',
    description: 'Personalized nudge engine based on behavioral psychology to help users build consistent wellness habits.',
    metrics: ['+40% DAU in 3mo'],
    tags: ['React Native', 'Node.js', 'Firebase', 'ML Kit'],
    gridX: 2,
    gridY: 1,
    visual: { type: 'image', src: '/under-construction.gif' },
  },
  {
    id: 'pingful',
    title: 'Pingful',
    description: 'Hybrid AI/Human voice bot handling tier-1 support queries to reduce skyrocketing customer support costs.',
    metrics: ['$200k Annual Savings', '-90% Wait Times'],
    tags: ['Twilio', 'GPT-4', 'GCP', 'Python'],
    gridX: -1,
    gridY: -1,
    visual: { type: 'image', src: '/backend.webp' },
  },
  {
    id: 'cx-space',
    title: 'CX Space',
    description: 'RAG pipeline retrieving relevant context for LLM generation to answer specific user questions instantly.',
    metrics: ['Instant Resolution', 'Fewer Tickets'],
    tags: ['Next.js', 'Express', 'MongoDB', 'OpenAI'],
    gridX: 1,
    gridY: -1,
    visual: { type: 'image', src: '/penguin-bot-headset.png' },
  },
];

export const INSIGHTS = [
  {
    title: 'AI Is Best at Pattern Recognition, Not Judgment',
    summary: 'AI excels at identifying trends across data. In CX, it surfaces recurring issues and coaching opportunities faster while humans retain decisions.',
    detail: 'AI excels at identifying trends across large volumes of data, especially where humans get overwhelmed or miss signals. In customer experience, this means AI can surface recurring issues, escalation drivers, sentiment shifts, and coaching opportunities faster, while humans retain ownership of decisions, empathy, and accountability.',
  },
  {
    title: 'Better Inputs Create Better Outputs',
    summary: 'AI is only as useful as the data and prompts it receives. Clean structure and clear intent matter more than complexity.',
    detail: 'AI is only as useful as the data, prompts, and context it receives. This directly applies to QA frameworks, knowledge management, and feedback systems. When SOPs, tags, and workflows are clean, AI tools can actually support agents instead of confusing them.',
  },
  {
    title: 'AI Should Reduce Friction, Not Add Load',
    summary: 'If an AI tool creates more steps or uncertainty, it\'s not doing its job. AI should simplify workflows and reduce manual effort.',
    detail: 'In CX environments, AI should simplify agent workflows, highlight the right information at the right time, and reduce manual effort so teams can focus on customers, not tools.',
  },
  {
    title: 'Automation Without Empathy Breaks Trust',
    summary: 'AI can automate tasks but can\'t replace human judgment in emotionally charged situations.',
    detail: 'This reinforces where AI belongs in support organizations: triage, summarization, pattern detection, and decision support. Empathy, escalation handling, and relationship repair stay human.',
  },
  {
    title: 'AI Is Most Powerful as a Signal, Not a Script',
    summary: 'The strongest AI use cases support thinking, not dictate behavior. In coaching and QA, AI points to patterns while managers lead conversations.',
    detail: 'In coaching and QA, AI can point leaders to patterns worth addressing, while managers lead the actual conversations. This preserves trust, autonomy, and growth.',
  },
  {
    title: 'Responsible AI Requires Clear Ownership',
    summary: 'AI outputs need a human owner who validates, decides, and acts. In CX, this reinforces accountability for customer outcomes.',
    detail: 'In CX operations, this reinforces clear accountability for customer outcomes. AI supports decisions, but people remain responsible for policies, responses, and customer trust.',
  },
  {
    title: 'AI Can Accelerate Learning & Improvement',
    summary: 'AI compresses learning cycles by summarizing insights and identifying what to explore next.',
    detail: 'This supports faster iteration on workflows, knowledge updates, and process improvements without sacrificing quality or care.',
  },
  {
    title: 'The Goal Is Better Outcomes, Not AI Adoption',
    summary: 'Technology only matters if it improves real experiences. Success looks like lower friction and customers who feel understood.',
    detail: 'In CX, success looks like lower friction, clearer answers, better coaching, and customers who feel understood. AI is a tool in service of those outcomes, not the headline.',
  },
];

export const EXPERIENCE = [
  {
    role: 'AI Operations Consultant',
    company: 'Various Startups (SaaS, FinTech)',
    period: '2024 — Present',
    description: 'Architecting an AI-powered help desk platform (CX Space) and developed an AI-driven career tool (RoleFit). Partnering with organizations to implement RAG-based Smart Help Centers, reducing manual inquiries.',
  },
  {
    role: 'Delivery Service Partner (DSP) Program Lead',
    company: 'Amazon',
    period: '2020 — 2024',
    description: 'Designed a tiered escalation framework using AI-supported workflow optimization, reducing complex escalations by 24%. Directed a 20-member team overseeing global CX operations and established a peer-to-peer knowledge system.',
  },
  {
    role: 'Customer Experience Team Lead',
    company: 'Away Travel',
    period: '2019 — 2020',
    description: 'Elevated team effectiveness by 30% via automated reporting. Redesigned SOPs for a 23% efficiency increase. Established cross-functional QA reviews that improved CSAT metrics by 17%.',
  },
  {
    role: 'Customer Experience Manager',
    company: 'GBI International (FinTech)',
    period: '2017 — 2019',
    description: 'Maintained an 89% resolution rate by implementing structured omnichannel workflows. Partnered with UX teams to redesign site navigation, driving a 22% increase in online conversions.',
  },
  {
    role: 'Additional Experience',
    company: 'PINATA · Blake eLearning · aden + anais',
    period: '—',
    description: 'Customer Experience Manager at PINATA (SaaS). Engagement Lead at Blake eLearning (EdTech). Previously Customer Service Rep at aden + anais.',
  },
];

export const TESTIMONIALS = [
  {
    quote: '"Eric brings calm structure to complex support problems. He improves the system while keeping the human experience front and center."',
    attribution: 'Former stakeholder, enterprise support',
  },
  {
    quote: '"His coaching is consistent and specific. The team knows what good looks like and how to get there."',
    attribution: 'Peer leader, customer operations',
  },
  {
    quote: '"He turns metrics into action. You can see the impact in CSAT, productivity, and fewer repeat issues."',
    attribution: 'Cross-functional partner, product and insights',
  },
];
