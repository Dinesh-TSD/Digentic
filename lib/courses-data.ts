// Shared course data used by listing page, detail page, and learn page.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12:34"
  preview: boolean; // free preview available
  videoUrl?: string; // real URL in production; undefined = placeholder
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  reviewCount: number;
  students: number;
  price: number; // 0 = free
  thumbnail: string;
  previewVideoUrl: string;
  instructor: {
    name: string;
    avatar: string;
    title: string;
    bio: string;
    courses: number;
    students: number;
    rating: number;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  tags: string[];
  outcomes: string[];
  targetAudience: string[];
  curriculum: Section[];
  reviews: Review[];
  features: string[];
  language: string;
}

// ---------------------------------------------------------------------------
// Curriculum helpers
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Sample videos — verified publicly accessible with CORS headers
// ---------------------------------------------------------------------------
export const SAMPLE_VIDEOS = {
  /** W3C Sintel trailer — reliable, CORS-enabled, ~5 MB */
  short: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  /** W3C Bunny — slightly longer */
  medium: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
  /** YouTube — react-player handles via embed */
  youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

const PREVIEW_VIDEO = SAMPLE_VIDEOS.short;

// ---------------------------------------------------------------------------
// Curriculum helpers
// ---------------------------------------------------------------------------
function makeLessons(count: number, prefix: string): Lesson[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: `${prefix.replace(/-/g, ' ')} — Lesson ${i + 1}`,
    duration: `${8 + (i % 7)}:${String((i * 13) % 60).padStart(2, '0')}`,
    preview: i < 2,
    videoUrl: i < 2 ? PREVIEW_VIDEO : undefined,
  }));
}

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------
export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Full-Stack AI Development with LangChain',
    description: 'Build production-ready AI applications with LangChain, RAG, and autonomous agents from scratch.',
    longDescription: `This is the most comprehensive course on building production AI applications available today. You'll go from zero to deploying autonomous agents, RAG pipelines, and LLM-powered full-stack apps — using the same stack used at top AI companies.\n\nEvery module is project-based: by the end you'll have 5 portfolio-worthy AI applications you can show clients and employers.`,
    category: 'AI & Agents',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 42,
    rating: 4.9,
    reviewCount: 312,
    students: 3240,
    price: 1999,
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience. He has built LLM systems for startups and enterprises, and now teaches everything he knows through DIGENTIC TECH.',
      courses: 9,
      students: 28000,
      rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['LangChain', 'RAG', 'Agents', 'OpenAI', 'Python'],
    outcomes: [
      'Build autonomous AI agents using LangChain and LangGraph',
      'Implement RAG systems with Pinecone and Chroma vector DBs',
      'Deploy LLM apps to production on Vercel and AWS',
      'Integrate OpenAI, Anthropic, and open-source LLMs',
      'Build multi-agent systems with CrewAI and AutoGen',
      'Add memory, tools, and reasoning to your agents',
      'Monitor and debug LLM pipelines with LangSmith',
      'Ship 5 complete AI projects for your portfolio',
    ],
    targetAudience: [
      'Full-stack developers wanting to add AI to their stack',
      'Python developers building their first LLM application',
      'Freelancers looking to offer AI development services',
      'Engineers who want to understand RAG and agent architectures',
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Module 1: LLM Foundations',
        lessons: makeLessons(6, 'LLM-Foundations'),
      },
      {
        id: 's2',
        title: 'Module 2: LangChain Deep Dive',
        lessons: makeLessons(8, 'LangChain-Deep-Dive'),
      },
      {
        id: 's3',
        title: 'Module 3: RAG Systems',
        lessons: makeLessons(7, 'RAG-Systems'),
      },
      {
        id: 's4',
        title: 'Module 4: Autonomous Agents',
        lessons: makeLessons(9, 'Autonomous-Agents'),
      },
      {
        id: 's5',
        title: 'Module 5: Production Deployment',
        lessons: makeLessons(6, 'Production-Deployment'),
      },
      {
        id: 's6',
        title: 'Module 6: Capstone Projects',
        lessons: makeLessons(6, 'Capstone-Projects'),
      },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 20, 2025',
        text: 'The RAG module alone was worth the price. I shipped my first client AI project the week after finishing it. Dinesh explains things with incredible clarity.',
        helpful: 42,
      },
      {
        id: 'r2',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 15, 2025',
        text: 'Best AI course on the internet. Unlike YouTube tutorials, every module builds on the last and produces a real working project. 100% worth it.',
        helpful: 38,
      },
      {
        id: 'r3',
        name: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 4,
        date: 'Aug 10, 2025',
        text: 'Really solid content. I would love more coverage on open-source models like LLaMA, but the LangChain and agents content is top-tier.',
        helpful: 21,
      },
    ],
    features: [
      'Lifetime access',
      'Mobile friendly',
      'Certificate of completion',
      '30-day money-back guarantee',
      'Downloadable resources',
      'Private Discord community',
    ],
    language: 'English',
  },
  {
    id: '2',
    title: 'MERN Stack Masterclass 2025',
    description: 'Master MongoDB, Express, React, and Node.js to build scalable full-stack applications.',
    longDescription: `A complete deep-dive into the MERN stack — from setting up your first Express server to deploying a full-featured app with authentication, payments, and real-time features.\n\nYou'll build a production-grade e-commerce platform with admin dashboard, Stripe payments, and live inventory updates.`,
    category: 'MERN Stack',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 38,
    rating: 4.8,
    reviewCount: 245,
    students: 5120,
    price: 1499,
    thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9,
      students: 28000,
      rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe'],
    outcomes: [
      'Build REST APIs with Node.js and Express from scratch',
      'Design MongoDB schemas and use Mongoose effectively',
      'Create responsive React UIs with hooks and context',
      'Add JWT authentication and protected routes',
      'Integrate Stripe for payments',
      'Deploy your app to Vercel and MongoDB Atlas',
      'Add real-time features with Socket.io',
      'Write tests with Jest and React Testing Library',
    ],
    targetAudience: [
      'JavaScript developers wanting to go full-stack',
      'Frontend developers ready to learn backend',
      'Bootcamp graduates wanting a real-world project',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Node.js & Express', lessons: makeLessons(7, 'NodeJS-Express') },
      { id: 's2', title: 'Module 2: MongoDB & Mongoose', lessons: makeLessons(6, 'MongoDB-Mongoose') },
      { id: 's3', title: 'Module 3: React Frontend', lessons: makeLessons(8, 'React-Frontend') },
      { id: 's4', title: 'Module 4: Auth & Payments', lessons: makeLessons(7, 'Auth-Payments') },
      { id: 's5', title: 'Module 5: Deployment', lessons: makeLessons(5, 'Deployment') },
      { id: 's6', title: 'Module 6: Real-Time Features', lessons: makeLessons(5, 'Real-Time-Features') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'James Williams',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 22, 2025',
        text: 'I tried 3 other MERN courses before this one. This is the only one that actually explains WHY you write things the way you do, not just copy-paste.',
        helpful: 55,
      },
      {
        id: 'r2',
        name: 'Anita Patel',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 18, 2025',
        text: 'The Stripe integration module is gold. Got paid for my first freelance project before finishing the course.',
        helpful: 33,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee', 'Downloadable resources'],
    language: 'English',
  },
  {
    id: '3',
    title: 'Next.js 15 & TypeScript Complete Course',
    description: 'Learn Next.js 15 App Router, server components, and TypeScript from absolute zero.',
    longDescription: `Learn Next.js 15 from scratch — App Router, server and client components, TypeScript, Tailwind CSS, and deployment. By the end you'll have built a production-quality blog with CMS, auth, and SEO.`,
    category: 'Next.js',
    level: 'Beginner',
    duration: '5 weeks',
    lessons: 56,
    rating: 4.9,
    reviewCount: 428,
    students: 7890,
    price: 999,
    thumbnail: 'https://images.pexels.com/photos/1605304/pexels-photo-1605304.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9,
      students: 28000,
      rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    outcomes: [
      'Understand the Next.js 15 App Router architecture',
      'Use server components and client components correctly',
      'Write type-safe TypeScript throughout your app',
      'Style with Tailwind CSS utility classes',
      'Add authentication with NextAuth.js',
      'Fetch data with server actions and API routes',
      'Optimize images, fonts, and metadata for SEO',
      'Deploy to Vercel with CI/CD',
    ],
    targetAudience: [
      'JavaScript developers learning React for the first time',
      'React developers moving to Next.js',
      'Developers wanting to learn TypeScript in context',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: JavaScript & TypeScript Basics', lessons: makeLessons(8, 'JS-TS-Basics') },
      { id: 's2', title: 'Module 2: React Fundamentals', lessons: makeLessons(10, 'React-Fundamentals') },
      { id: 's3', title: 'Module 3: Next.js App Router', lessons: makeLessons(12, 'Nextjs-App-Router') },
      { id: 's4', title: 'Module 4: Data Fetching & Auth', lessons: makeLessons(10, 'Data-Auth') },
      { id: 's5', title: 'Module 5: Deployment & SEO', lessons: makeLessons(8, 'Deployment-SEO') },
      { id: 's6', title: 'Module 6: Capstone Project', lessons: makeLessons(8, 'Capstone') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Rahul Verma',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Sep 01, 2025',
        text: 'Started as a complete beginner. Now I have a full Next.js app in production. The TypeScript sections are especially well explained.',
        helpful: 71,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee'],
    language: 'English',
  },
  {
    id: '4',
    title: 'LLM Engineering: From Prompts to Production',
    description: 'Deep dive into prompt engineering, fine-tuning, and deploying LLMs in real-world systems.',
    longDescription: 'Master every layer of the LLM stack — prompting, fine-tuning with LoRA, evaluation, and serving models in production using vLLM and FastAPI.',
    category: 'LLM Engineering',
    level: 'Advanced',
    duration: '7 weeks',
    lessons: 48,
    rating: 4.8,
    reviewCount: 189,
    students: 2100,
    price: 2499,
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9, students: 28000, rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['LLM', 'Prompt Engineering', 'Fine-tuning', 'vLLM'],
    outcomes: [
      'Write advanced prompt templates with few-shot examples',
      'Fine-tune LLaMA and Mistral with LoRA and QLoRA',
      'Evaluate LLM outputs with automated metrics',
      'Serve models with vLLM and FastAPI',
      'Build a retrieval-augmented LLM API',
      'Monitor and improve LLM quality over time',
      'Understand tokenization and context window management',
      'Implement guardrails and safety filters',
    ],
    targetAudience: [
      'ML engineers moving into LLM specialisation',
      'AI developers wanting production-grade skills',
      'Researchers building applied LLM products',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Prompt Engineering Mastery', lessons: makeLessons(8, 'Prompt-Engineering') },
      { id: 's2', title: 'Module 2: Fine-tuning with LoRA', lessons: makeLessons(9, 'LoRA-Fine-tuning') },
      { id: 's3', title: 'Module 3: Evaluation & Benchmarking', lessons: makeLessons(7, 'Evaluation') },
      { id: 's4', title: 'Module 4: Production Serving', lessons: makeLessons(8, 'Production-Serving') },
      { id: 's5', title: 'Module 5: Safety & Guardrails', lessons: makeLessons(8, 'Safety-Guardrails') },
      { id: 's6', title: 'Module 6: Capstone', lessons: makeLessons(8, 'LLM-Capstone') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Karan Mehta',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 28, 2025',
        text: 'The fine-tuning section is unlike anything else I have found online. Running LoRA on my own data within the first week.',
        helpful: 44,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee', 'GPU lab access'],
    language: 'English',
  },
  {
    id: '5',
    title: 'Freelancing as an AI Developer',
    description: 'Land your first AI freelancing project, price your services, and build long-term clients.',
    longDescription: 'A practical playbook for getting paid as an AI developer. From writing a winning proposal to delivering projects and building a pipeline of repeat clients.',
    category: 'Freelancing & Career',
    level: 'Beginner',
    duration: '3 weeks',
    lessons: 24,
    rating: 4.7,
    reviewCount: 301,
    students: 4560,
    price: 0,
    thumbnail: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9, students: 28000, rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['Freelancing', 'Career', 'AI', 'Upwork'],
    outcomes: [
      'Build a standout freelancer profile for Upwork and Toptal',
      'Write proposals that win on budget and on vision',
      'Price your AI services confidently',
      'Scope projects to avoid scope creep',
      'Deliver and get 5-star reviews consistently',
      'Build a repeat-client pipeline',
      'Handle contracts and invoices professionally',
      'Scale from solo to agency',
    ],
    targetAudience: [
      'Developers wanting their first freelance income',
      'AI engineers tired of full-time jobs',
      'Students wanting to earn while they learn',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Setting Up Your Profile', lessons: makeLessons(5, 'Profile-Setup') },
      { id: 's2', title: 'Module 2: Finding & Winning Projects', lessons: makeLessons(7, 'Finding-Projects') },
      { id: 's3', title: 'Module 3: Delivery & Client Management', lessons: makeLessons(6, 'Client-Management') },
      { id: 's4', title: 'Module 4: Scaling Your Business', lessons: makeLessons(6, 'Scaling') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Pooja Nair',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Sep 05, 2025',
        text: 'Landed my first $800 project two weeks after finishing this course. The proposal templates alone are worth it — and this is FREE!',
        helpful: 89,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', 'Template pack included'],
    language: 'English',
  },
  {
    id: '6',
    title: 'Building AI Agents with AutoGen & CrewAI',
    description: 'Create multi-agent systems that collaborate, delegate, and solve complex real-world tasks.',
    longDescription: 'Go beyond single-agent systems. Learn to design, build, and orchestrate teams of AI agents using AutoGen and CrewAI — with real enterprise use cases.',
    category: 'AI & Agents',
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 35,
    rating: 4.9,
    reviewCount: 142,
    students: 1870,
    price: 1999,
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9, students: 28000, rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['AutoGen', 'CrewAI', 'Multi-Agent', 'LangGraph'],
    outcomes: [
      'Understand multi-agent architectures and patterns',
      'Build agent teams with AutoGen GroupChat',
      'Design role-based crews with CrewAI',
      'Add tool use and code execution to agents',
      'Build a research agent that writes reports',
      'Build a coding agent that reviews PRs',
      'Deploy multi-agent systems to production',
      'Observe and debug agent conversations',
    ],
    targetAudience: [
      'Developers who have completed a basic LangChain course',
      'AI engineers ready for advanced architectures',
      'Teams evaluating multi-agent frameworks',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Multi-Agent Fundamentals', lessons: makeLessons(6, 'MA-Fundamentals') },
      { id: 's2', title: 'Module 2: AutoGen Deep Dive', lessons: makeLessons(8, 'AutoGen') },
      { id: 's3', title: 'Module 3: CrewAI Workflows', lessons: makeLessons(7, 'CrewAI') },
      { id: 's4', title: 'Module 4: Production Systems', lessons: makeLessons(7, 'MA-Production') },
      { id: 's5', title: 'Module 5: Capstone', lessons: makeLessons(7, 'MA-Capstone') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Sep 03, 2025',
        text: 'The CrewAI module is brilliant. Built a research pipeline that replaced 4 hours of manual work in 15 minutes.',
        helpful: 37,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee'],
    language: 'English',
  },
  {
    id: '7',
    title: 'React Hooks & State Management Deep Dive',
    description: 'Master React Hooks, Context API, Zustand, and advanced patterns for complex UIs.',
    longDescription: 'Stop fighting with state. This course covers every React state management pattern from useState to Zustand, with real performance optimization techniques.',
    category: 'Next.js',
    level: 'Intermediate',
    duration: '4 weeks',
    lessons: 30,
    rating: 4.7,
    reviewCount: 198,
    students: 3450,
    price: 799,
    thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9, students: 28000, rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['React', 'Hooks', 'Zustand', 'Context API'],
    outcomes: [
      'Master all React built-in hooks deeply',
      'Build and test custom hooks',
      'Manage global state with Context API correctly',
      'Use Zustand for scalable state management',
      'Optimize React performance with useMemo and useCallback',
      'Handle async state with React Query',
      'Debug state issues with React DevTools',
      'Write unit tests for hooks with React Testing Library',
    ],
    targetAudience: [
      'React developers who feel confused by hooks',
      'Developers who have used Redux and want a lighter approach',
      'Teams migrating class components to hooks',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Hooks Foundation', lessons: makeLessons(7, 'Hooks-Foundation') },
      { id: 's2', title: 'Module 2: Custom Hooks', lessons: makeLessons(7, 'Custom-Hooks') },
      { id: 's3', title: 'Module 3: Global State', lessons: makeLessons(8, 'Global-State') },
      { id: 's4', title: 'Module 4: Performance', lessons: makeLessons(8, 'Performance') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Shreya Joshi',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 30, 2025',
        text: 'Finally understand useCallback and useMemo properly. The performance section saved our app from re-render hell.',
        helpful: 29,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee'],
    language: 'English',
  },
  {
    id: '8',
    title: 'MongoDB & Node.js for Beginners',
    description: 'Start from zero and build REST APIs with Node.js, Express, and MongoDB Atlas.',
    longDescription: 'A friendly beginner course covering everything from installing Node.js to deploying a REST API on Render with a MongoDB Atlas database.',
    category: 'MERN Stack',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 28,
    rating: 4.6,
    reviewCount: 267,
    students: 6200,
    price: 0,
    thumbnail: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9, students: 28000, rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['MongoDB', 'Node.js', 'REST API', 'Express'],
    outcomes: [
      'Set up a Node.js and Express project from scratch',
      'Design MongoDB schemas with Mongoose',
      'Build CRUD REST APIs',
      'Add input validation with Joi or Zod',
      'Handle errors and HTTP status codes correctly',
      'Add basic JWT authentication',
      'Deploy to Render with MongoDB Atlas',
      'Document your API with Swagger',
    ],
    targetAudience: [
      'Absolute beginners with basic JavaScript knowledge',
      'Frontend developers learning their first backend',
      'Students building their first API project',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Node.js Basics', lessons: makeLessons(7, 'Nodejs-Basics') },
      { id: 's2', title: 'Module 2: MongoDB & Mongoose', lessons: makeLessons(7, 'Mongo-Mongoose') },
      { id: 's3', title: 'Module 3: Building REST APIs', lessons: makeLessons(7, 'REST-APIs') },
      { id: 's4', title: 'Module 4: Auth & Deployment', lessons: makeLessons(7, 'Auth-Deploy') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Arjun Pillai',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Sep 06, 2025',
        text: 'Built my first API in 3 days. The explanations are clear enough even for a non-CS background like mine.',
        helpful: 51,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', 'Template pack included'],
    language: 'English',
  },
  {
    id: '9',
    title: 'RAG Systems: Build Your Own AI Knowledge Base',
    description: 'Implement retrieval-augmented generation pipelines with vector databases and embeddings.',
    longDescription: 'A hands-on course covering the full RAG stack: embedding models, vector stores (Pinecone, Chroma, Weaviate), retrieval strategies, and building a production knowledge base.',
    category: 'LLM Engineering',
    level: 'Intermediate',
    duration: '5 weeks',
    lessons: 32,
    rating: 4.8,
    reviewCount: 176,
    students: 2780,
    price: 1299,
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewVideoUrl: PREVIEW_VIDEO,
    instructor: {
      name: 'Dinesh T',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'AI Engineer & MERN Developer',
      bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
      courses: 9, students: 28000, rating: 4.9,
      github: 'https://github.com/dinesht',
      linkedin: 'https://linkedin.com/in/dinesht',
      twitter: 'https://twitter.com/digentic_tech',
    },
    tags: ['RAG', 'Vector DB', 'Embeddings', 'Pinecone', 'Chroma'],
    outcomes: [
      'Understand embedding models and similarity search',
      'Build a vector store with Pinecone and Chroma',
      'Implement naive and advanced RAG pipelines',
      'Add re-ranking to improve retrieval quality',
      'Build a document Q&A system',
      'Handle chunking strategies for different doc types',
      'Evaluate RAG quality with RAGAS',
      'Deploy a production RAG API',
    ],
    targetAudience: [
      'Developers who understand basic LangChain but want to go deeper on RAG',
      'Teams building internal knowledge bases',
      'Engineers evaluating vector database options',
    ],
    curriculum: [
      { id: 's1', title: 'Module 1: Embeddings & Vector Search', lessons: makeLessons(7, 'Embeddings') },
      { id: 's2', title: 'Module 2: Building the Pipeline', lessons: makeLessons(8, 'RAG-Pipeline') },
      { id: 's3', title: 'Module 3: Advanced Retrieval', lessons: makeLessons(8, 'Advanced-Retrieval') },
      { id: 's4', title: 'Module 4: Production RAG', lessons: makeLessons(9, 'Production-RAG') },
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Neha Singh',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 5,
        date: 'Aug 25, 2025',
        text: 'The chunking strategy comparison alone changed how I build RAG systems. Went from 60% to 88% retrieval accuracy.',
        helpful: 62,
      },
    ],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee'],
    language: 'English',
  },
];
