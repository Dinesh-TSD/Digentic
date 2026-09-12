export const SITE_CONFIG = {
  name: 'DIGENTIC TECH',
  tagline: 'The DNA of AI Technology',
  author: 'Dinesh T',
  location: 'Chennai, Tamil Nadu, India',
  email: 'dinesh@digentic.tech',
  social: {
    github: 'https://github.com/dinesht',
    linkedin: 'https://linkedin.com/in/dinesht',
    twitter: 'https://twitter.com/digentic_tech',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Courses', href: '/courses' },
  { label: 'Digital', href: '/digital' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  Platform: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Courses', href: '/courses' },
    { label: 'Digital Assets', href: '/digital' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
  ],
  Resources: [
    { label: 'Free Tools', href: '/digital' },
    { label: 'Newsletter', href: '/#newsletter' },
    { label: 'Resume Template', href: '/digital' },
    { label: 'AI Prompts', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Use', href: '/contact' },
    { label: 'Refund Policy', href: '/contact' },
  ],
};

export const MOCK_PROJECTS = [
  {
    title: 'AI-Powered Chat Assistant',
    description:
      'An intelligent chatbot using LangChain and OpenAI to provide real-time customer support with RAG capabilities.',
    tech: ['Next.js', 'LangChain', 'OpenAI', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'MERN E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with Stripe payments, admin dashboard, and real-time inventory management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'AI Document Analyzer',
    description:
      'Document processing tool that extracts insights, summarizes content, and classifies documents using LLMs.',
    tech: ['Python', 'LLM', 'RAG', 'FastAPI'],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description:
      'Interactive dashboard with live data visualization, customizable widgets, and export functionality.',
    tech: ['Next.js', 'Recharts', 'WebSocket', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'AI Image Caption Generator',
    description:
      'Computer vision model that generates descriptive captions for images using transformer architecture.',
    tech: ['Python', 'PyTorch', 'Transformers', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Task Management SaaS',
    description:
      'Collaborative project management tool with kanban boards, team chat, and automated workflows.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
];

export const MOCK_PROJECTS_FULL = [
  {
    title: 'AI-Powered Chat Assistant',
    description:
      'An intelligent chatbot using LangChain and OpenAI to provide real-time customer support with RAG capabilities. Handles multi-turn conversations, context retention, and document-grounded responses.',
    tech: ['Next.js', 'LangChain', 'OpenAI', 'MongoDB'],
    category: 'AI & ML',
    featured: true,
    status: 'Active',
    views: 1240,
    stars: 342,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'MERN E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with Stripe payments, admin dashboard, real-time inventory management, and order tracking. Scales to 100K+ products.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    featured: true,
    status: 'Active',
    views: 2100,
    stars: 580,
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'AI Document Analyzer',
    description:
      'Document processing tool that extracts insights, summarizes content, and classifies documents using LLMs. Supports PDF, DOCX, and images with batch processing.',
    tech: ['Python', 'LLM', 'RAG', 'FastAPI'],
    category: 'AI & ML',
    featured: true,
    status: 'Active',
    views: 890,
    stars: 215,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description:
      'Interactive dashboard with live data visualization, customizable widgets, and export functionality. WebSocket-powered for instant updates.',
    tech: ['Next.js', 'Recharts', 'WebSocket', 'MongoDB'],
    category: 'Full Stack',
    featured: false,
    status: 'Active',
    views: 1560,
    stars: 198,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'AI Image Caption Generator',
    description:
      'Computer vision model that generates descriptive captions for images using transformer architecture. Deployed on AWS with auto-scaling.',
    tech: ['Python', 'PyTorch', 'Transformers', 'AWS'],
    category: 'AI & ML',
    featured: false,
    status: 'Completed',
    views: 720,
    stars: 156,
    image: 'https://images.pexels.com/photos/2529786/pexels-photo-2529786.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Task Management SaaS',
    description:
      'Collaborative project management tool with kanban boards, team chat, and automated workflows. Real-time sync across devices.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Full Stack',
    featured: false,
    status: 'Active',
    views: 1850,
    stars: 267,
    image: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Developer Portfolio Template',
    description:
      'A modern, responsive portfolio template built with Next.js 15, TypeScript, and Tailwind CSS. Dark/light mode support out of the box.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'Frontend',
    featured: false,
    status: 'Completed',
    views: 980,
    stars: 134,
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'REST API Microservice',
    description:
      'A scalable REST API microservice with JWT authentication, rate limiting, and comprehensive documentation. Docker-ready deployment.',
    tech: ['Node.js', 'Express', 'Docker', 'Redis'],
    category: 'Backend',
    featured: false,
    status: 'Completed',
    views: 640,
    stars: 89,
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Open Source UI Components',
    description:
      'A collection of accessible, customizable React UI components with full TypeScript support. 50+ components and growing.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'Open Source',
    featured: true,
    status: 'Active',
    views: 3200,
    stars: 412,
    image: 'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'AI-Powered SEO Analyzer',
    description:
      'An SEO analysis tool that uses NLP to evaluate content quality, keyword density, and readability. Generates actionable recommendations.',
    tech: ['Python', 'NLP', 'FastAPI', 'React'],
    category: 'AI & ML',
    featured: false,
    status: 'Active',
    views: 1100,
    stars: 178,
    image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'Real-Time Chat App',
    description:
      'A WebSocket-based real-time chat application with typing indicators, read receipts, and file sharing. End-to-end encrypted.',
    tech: ['React', 'Node.js', 'Socket.io', 'Redis'],
    category: 'Full Stack',
    featured: false,
    status: 'Active',
    views: 1450,
    stars: 223,
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  {
    title: 'AI Code Review Bot',
    description:
      'A GitHub-integrated bot that reviews pull requests using LLMs. Detects bugs, suggests improvements, and enforces coding standards.',
    tech: ['Python', 'LLM', 'GitHub API', 'Docker'],
    category: 'Open Source',
    featured: false,
    status: 'Active',
    views: 890,
    stars: 145,
    image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
];

export const MOCK_BLOG_POSTS = [
  {
    title: 'Building AI Agents with LangChain: A Complete Guide',
    excerpt:
      'Learn how to build autonomous AI agents that can reason, plan, and execute tasks using LangChain framework.',
    category: 'AI & ML',
    readTime: '12 min read',
    date: '2025-08-15',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Mastering MERN Stack: From Beginner to Production',
    excerpt:
      'A comprehensive walkthrough of building and deploying a full-stack MERN application with best practices.',
    category: 'Web Dev',
    readTime: '15 min read',
    date: '2025-08-10',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'RAG Systems: Retrieval-Augmented Generation Explained',
    excerpt:
      'Deep dive into how RAG combines retrieval and generation to build more accurate AI applications.',
    category: 'AI & ML',
    readTime: '10 min read',
    date: '2025-08-05',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'TypeTypeScript Best Practices for Next.js 15',
    excerpt:
      'Essential TypeScript patterns and practices for building type-safe Next.js applications at scale.',
    category: 'Web Dev',
    readTime: '8 min read',
    date: '2025-07-28',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Deploying AI Models to Production with Docker',
    excerpt:
      'Step-by-step guide to containerizing and deploying machine learning models with Docker and AWS.',
    category: 'DevOps',
    readTime: '11 min read',
    date: '2025-07-20',
    image: 'https://images.pexels.com/photos/7438097/pexels-photo-7438097.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Building Custom GPTs for Business Use Cases',
    excerpt:
      'How to create domain-specific GPT models tailored to your business needs and data.',
    category: 'AI & ML',
    readTime: '14 min read',
    date: '2025-07-15',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const MOCK_COURSES = [
  {
    title: 'Full-Stack AI Development with LangChain',
    level: 'Advanced',
    lessons: 42,
    rating: 4.9,
    price: 1999,
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Build production-ready AI applications with LangChain, RAG, and autonomous agents.',
  },
  {
    title: 'MERN Stack Masterclass 2025',
    level: 'Intermediate',
    lessons: 38,
    rating: 4.8,
    price: 1499,
    thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Master MongoDB, Express, React, and Node.js to build full-stack applications.',
  },
  {
    title: 'Next.js 15 & TypeScript Complete Course',
    level: 'Beginner',
    lessons: 56,
    rating: 4.9,
    price: 999,
    thumbnail: 'https://images.pexels.com/photos/1605304/pexels-photo-1605304.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Learn Next.js 15 App Router, server components, and TypeScript from scratch.',
  },
];

export const MOCK_DIGITAL_ASSETS = [
  {
    title: 'AI Prompt Engineering Toolkit',
    type: 'E-Book',
    price: 499,
    downloads: 1240,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'MERN Project Starter Template',
    type: 'Template',
    price: 299,
    downloads: 890,
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Developer Resume Pack (10 Templates)',
    type: 'Templates',
    price: 199,
    downloads: 2100,
    image: 'https://images.pexels.com/photos/1605304/pexels-photo-1605304.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const MOCK_TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechStart Inc.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    review:
      'Dinesh delivered our AI chatbot ahead of schedule. His expertise in LangChain and RAG systems is exceptional.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder, DataFlow',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    review:
      'The MERN platform Dinesh built scaled seamlessly to 100K users. Clean code, great communication throughout.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Product Manager, InnovateLabs',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    review:
      'His AI document analyzer saved us 40 hours per week. Truly understands both AI and full-stack development.',
    rating: 5,
  },
  {
    name: 'James Williams',
    role: 'CEO, CloudScale',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
    review:
      'Dinesh is a rare talent who bridges AI engineering and practical product development. Highly recommended.',
    rating: 5,
  },
];

export const MOCK_STATS = [
  { label: 'Projects Built', value: 50, icon: 'Code' },
  { label: 'Blog Posts', value: 120, icon: 'FileText' },
  { label: 'Courses Published', value: 8, icon: 'GraduationCap' },
  { label: 'Happy Clients', value: 35, icon: 'Users' },
];

export const MOCK_SKILLS = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express', 'MongoDB', 'REST API'],
  AI: ['LLM', 'LangChain', 'AI Agents', 'RAG', 'OpenAI API'],
  Tools: ['Git', 'Docker', 'Vercel', 'AWS', 'Postman'],
};

export const MOCK_EXPERIENCE = [
  {
    company: 'TechStart Inc.',
    role: 'Senior AI Engineer',
    duration: '2023 — Present',
    description:
      'Leading AI initiatives, building LLM-powered applications, and mentoring junior developers.',
  },
  {
    company: 'DataFlow Systems',
    role: 'Full-Stack Developer',
    duration: '2021 — 2023',
    description:
      'Built and maintained MERN stack applications serving 100K+ users with real-time features.',
  },
  {
    company: 'InnovateLabs',
    role: 'Software Engineer',
    duration: '2019 — 2021',
    description:
      'Developed REST APIs, integrated third-party services, and optimized database performance.',
  },
];

export const MOCK_CERTIFICATIONS = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: 2024 },
  { name: 'Professional Cloud Developer', issuer: 'Google Cloud', year: 2023 },
  { name: 'Meta Front-End Developer', issuer: 'Meta', year: 2023 },
  { name: 'MongoDB Associate Developer', issuer: 'MongoDB University', year: 2022 },
];

export const MOCK_EDUCATION = {
  degree: 'B.Tech in Computer Science & Engineering',
  college: 'Anna University, Chennai',
  year: '2015 — 2019',
};

export const MOCK_MILESTONES = [
  {
    year: '2019',
    title: 'Started Coding Journey',
    description: 'Graduated with a CS degree and began as a junior software engineer building web applications.',
  },
  {
    year: '2021',
    title: 'Mastered MERN Stack',
    description: 'Dived deep into MongoDB, Express, React, and Node.js — building full-stack platforms at scale.',
  },
  {
    year: '2023',
    title: 'Discovered AI & LLMs',
    description: 'Explored LangChain, RAG systems, and AI agents — building production AI applications.',
  },
  {
    year: '2025',
    title: 'Building DIGENTIC TECH',
    description: 'Launched DIGENTIC TECH to share knowledge, courses, and digital assets with the developer community.',
  },
];
