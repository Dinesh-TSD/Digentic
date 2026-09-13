export type ProductCategory =
  | 'All Products'
  | 'AI Prompts & Kits'
  | 'UI Templates'
  | 'Boilerplates'
  | 'Resume Templates'
  | 'Notion Templates'
  | 'eBooks & Guides';

export type ProductType =
  | 'AI Prompts'
  | 'UI Templates'
  | 'Boilerplate'
  | 'Resume'
  | 'Notion'
  | 'eBook';

export interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: ProductType;
  category: ProductCategory;
  price: number | null; // null = free
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  downloadCount: number;
  image: string;
  images: string[];
  features: string[];
  filesIncluded: { name: string; size: string; format: string }[];
  tags: string[];
  reviews: {
    author: string;
    avatar: string;
    rating: number;
    text: string;
    helpfulCount: number;
    date: string;
  }[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
  format: string;
  fileSize: string;
  updates: string;
  support: string;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: '1',
    slug: 'ai-prompt-engineering-toolkit',
    title: 'AI Prompt Engineering Toolkit',
    description: '200+ battle-tested prompts for GPT-4, Claude & Gemini',
    longDescription:
      'A comprehensive collection of 200+ professionally crafted prompts for developers, designers, marketers, and entrepreneurs. Includes prompt frameworks, chain-of-thought templates, and system prompt blueprints for production AI applications.',
    type: 'AI Prompts',
    category: 'AI Prompts & Kits',
    price: 499,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 218,
    downloadCount: 1240,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      '200+ ready-to-use prompts across 15 categories',
      'Chain-of-thought and ReAct prompt templates',
      'System prompt blueprints for AI agents',
      'Prompt chaining patterns for complex tasks',
      'Compatible with GPT-4, Claude 3, and Gemini Pro',
      'Lifetime updates included',
    ],
    filesIncluded: [
      { name: 'AI-Prompts-Toolkit-v2.pdf', size: '4.2 MB', format: 'PDF' },
      { name: 'Prompts-Library.notion', size: '1.1 MB', format: 'Notion' },
      { name: 'Prompts-Cheatsheet.pdf', size: '800 KB', format: 'PDF' },
      { name: 'Prompts-JSON-Export.json', size: '320 KB', format: 'JSON' },
    ],
    tags: ['AI', 'Prompts', 'LLM', 'GPT-4', 'Claude', 'Gemini'],
    reviews: [
      {
        author: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Saved me weeks of trial and error. The system prompt blueprints alone are worth the price.',
        helpfulCount: 42,
        date: 'Aug 20, 2025',
      },
      {
        author: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Best prompt collection I have used. Well organized and covers every use case I needed.',
        helpfulCount: 38,
        date: 'Aug 14, 2025',
      },
      {
        author: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4,
        text: 'Very comprehensive. The Notion export makes it easy to build your own prompt library.',
        helpfulCount: 21,
        date: 'Aug 05, 2025',
      },
    ],
    faqs: [
      {
        question: 'Which AI models are these prompts designed for?',
        answer: 'All prompts are tested and optimized for GPT-4, Claude 3 Opus, and Gemini Pro. They work with any instruction-tuned model.',
      },
      {
        question: 'Do I get updates when new prompts are added?',
        answer: 'Yes, you get lifetime free updates. Every time new prompts are added, you receive a download link automatically.',
      },
      {
        question: 'Can I use these prompts commercially?',
        answer: 'Yes, a commercial license is included. You can use these prompts in client projects and SaaS products.',
      },
    ],
    featured: true,
    format: 'PDF + Notion + JSON',
    fileSize: '6.4 MB total',
    updates: 'Lifetime free updates',
    support: 'Email support (48h)',
  },
  {
    id: '2',
    slug: 'nextjs-saas-boilerplate',
    title: 'Next.js 15 SaaS Boilerplate',
    description: 'Production-ready Next.js starter with auth, payments & dashboard',
    longDescription:
      'A complete Next.js 15 SaaS starter kit with authentication (NextAuth), Stripe payments, admin dashboard, dark/light mode, TypeScript, Tailwind CSS, MongoDB integration, and email notifications. Ship your SaaS in days, not months.',
    type: 'Boilerplate',
    category: 'Boilerplates',
    price: 1299,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 156,
    downloadCount: 890,
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Next.js 15 App Router with TypeScript',
      'NextAuth.js with Google, GitHub & email providers',
      'Stripe subscription & one-time payment integration',
      'MongoDB + Mongoose data layer',
      'Admin dashboard with analytics',
      'Dark/Light mode with Tailwind CSS',
      'Responsive design, SEO optimized',
      'Docker & Vercel deployment ready',
    ],
    filesIncluded: [
      { name: 'nextjs-saas-boilerplate.zip', size: '12.4 MB', format: 'ZIP' },
      { name: 'Setup-Guide.pdf', size: '2.1 MB', format: 'PDF' },
      { name: 'Architecture-Diagram.pdf', size: '800 KB', format: 'PDF' },
    ],
    tags: ['Next.js', 'SaaS', 'TypeScript', 'Stripe', 'MongoDB', 'Boilerplate'],
    reviews: [
      {
        author: 'James Williams',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Saved me at least 2 weeks of setup. The auth and Stripe integration are production-quality.',
        helpfulCount: 67,
        date: 'Sep 01, 2025',
      },
      {
        author: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Clean code, well documented, and the setup guide made it easy to customize.',
        helpfulCount: 44,
        date: 'Aug 22, 2025',
      },
    ],
    faqs: [
      {
        question: 'What version of Next.js does this use?',
        answer: 'This boilerplate uses Next.js 15 with the App Router and React 19. It is kept up to date with the latest stable versions.',
      },
      {
        question: 'Is Razorpay integration included?',
        answer: 'The current version includes Stripe. A Razorpay variant is available — contact us after purchase.',
      },
    ],
    featured: true,
    format: 'ZIP (Source Code)',
    fileSize: '15.3 MB total',
    updates: '6 months of updates',
    support: 'Priority email (24h)',
  },
  {
    id: '3',
    slug: 'developer-ui-kit',
    title: 'Developer Portfolio UI Kit',
    description: '50+ Figma components for developer portfolios & landing pages',
    longDescription:
      'A premium Figma UI kit with 50+ components specifically designed for developer portfolios, tech landing pages, and SaaS websites. Includes dark and light variants, auto-layout components, and a complete design system.',
    type: 'UI Templates',
    category: 'UI Templates',
    price: 699,
    rating: 4.7,
    reviewCount: 94,
    downloadCount: 620,
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      '50+ Figma components with auto-layout',
      'Dark and light mode variants',
      'Complete design system (colors, typography, spacing)',
      'Responsive grids for desktop, tablet, and mobile',
      'Hero, navbar, portfolio, blog, contact sections',
      'Free Google Fonts used throughout',
    ],
    filesIncluded: [
      { name: 'Dev-Portfolio-UI-Kit.fig', size: '18.6 MB', format: 'Figma' },
      { name: 'Design-System.pdf', size: '3.2 MB', format: 'PDF' },
      { name: 'Component-Guide.pdf', size: '1.8 MB', format: 'PDF' },
    ],
    tags: ['Figma', 'UI Kit', 'Portfolio', 'Design System', 'Templates'],
    reviews: [
      {
        author: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Beautiful components. The auto-layout makes customization a breeze.',
        helpfulCount: 29,
        date: 'Aug 10, 2025',
      },
    ],
    faqs: [
      {
        question: 'Do I need a paid Figma plan?',
        answer: 'No, the kit works with the free Figma plan. A paid plan is only needed if you want to share it with a team.',
      },
    ],
    featured: false,
    format: 'Figma + PDF',
    fileSize: '23.6 MB total',
    updates: '3 months of updates',
    support: 'Email support (72h)',
  },
  {
    id: '4',
    slug: 'ai-engineer-resume-pack',
    title: 'AI Engineer Resume Pack',
    description: '10 ATS-optimized resume templates for AI & ML engineers',
    longDescription:
      'A collection of 10 professionally designed, ATS-optimized resume templates tailored for AI engineers, ML engineers, and data scientists. Available in Word, Google Docs, and Figma formats. Includes a cover letter template and LinkedIn optimization guide.',
    type: 'Resume',
    category: 'Resume Templates',
    price: 299,
    rating: 4.9,
    reviewCount: 341,
    downloadCount: 2100,
    image: 'https://images.pexels.com/photos/1605304/pexels-photo-1605304.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1605304/pexels-photo-1605304.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      '10 unique resume templates (modern, minimal, creative)',
      'ATS-friendly formatting — tested on top parsers',
      'Available in DOCX, Google Docs, and Figma',
      'Cover letter template included',
      'LinkedIn profile optimization checklist',
      'AI-specific keyword guide',
    ],
    filesIncluded: [
      { name: 'AI-Resume-Templates.zip', size: '8.4 MB', format: 'ZIP' },
      { name: 'Cover-Letter-Template.docx', size: '400 KB', format: 'DOCX' },
      { name: 'LinkedIn-Optimization-Guide.pdf', size: '1.2 MB', format: 'PDF' },
      { name: 'ATS-Keyword-Guide.pdf', size: '900 KB', format: 'PDF' },
    ],
    tags: ['Resume', 'ATS', 'AI Engineer', 'Career', 'Templates'],
    reviews: [
      {
        author: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Got 3 interviews in my first week using these templates. The ATS optimization is real.',
        helpfulCount: 88,
        date: 'Sep 05, 2025',
      },
      {
        author: 'James Williams',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'Clean, modern designs that stand out. The keyword guide was extremely helpful.',
        helpfulCount: 56,
        date: 'Aug 28, 2025',
      },
    ],
    faqs: [
      {
        question: 'Are these really ATS-compatible?',
        answer: 'Yes, each template has been tested against top ATS systems including Workday, Greenhouse, and Lever.',
      },
      {
        question: 'Can I edit these in Google Docs for free?',
        answer: 'Yes, Google Docs templates are included and fully editable with a free Google account.',
      },
    ],
    featured: true,
    format: 'DOCX + Figma + PDF',
    fileSize: '11 MB total',
    updates: 'Lifetime free updates',
    support: 'Email support (48h)',
  },
  {
    id: '5',
    slug: 'ai-productivity-notion-kit',
    title: 'AI Productivity Notion Kit',
    description: 'Second brain + project tracker for developers & founders',
    longDescription:
      'A fully-loaded Notion workspace template built for developers and founders. Includes a second brain knowledge base, project management system, habit tracker, content calendar, and AI learning tracker. Duplicate once and own your productivity.',
    type: 'Notion',
    category: 'Notion Templates',
    price: null,
    rating: 4.6,
    reviewCount: 127,
    downloadCount: 3400,
    image: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Second brain knowledge base system',
      'Kanban + timeline project management',
      'Daily habit tracker with streaks',
      'Content calendar for blog & social media',
      'AI learning log — track models, papers, and tools',
      'Freelance client CRM',
    ],
    filesIncluded: [
      { name: 'Notion-Workspace-Template (Duplicate Link)', size: '—', format: 'Notion' },
      { name: 'Setup-Guide.pdf', size: '1.4 MB', format: 'PDF' },
    ],
    tags: ['Notion', 'Productivity', 'Second Brain', 'Project Management', 'Free'],
    reviews: [
      {
        author: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'I use this every single day. The knowledge base system is exactly what I needed.',
        helpfulCount: 61,
        date: 'Sep 08, 2025',
      },
    ],
    faqs: [
      {
        question: 'Do I need a paid Notion account?',
        answer: 'No, this template works fully with the free Notion plan.',
      },
    ],
    featured: false,
    format: 'Notion Template + PDF',
    fileSize: '1.4 MB (PDF guide)',
    updates: 'Free forever',
    support: 'Community Discord',
  },
  {
    id: '6',
    slug: 'mern-stack-starter-kit',
    title: 'MERN Stack Starter Kit',
    description: 'Full-stack MongoDB, Express, React & Node.js boilerplate',
    longDescription:
      'A battle-hardened MERN stack boilerplate with JWT authentication, role-based access control, file uploads, email notifications, and a complete REST API with Swagger documentation. MongoDB Atlas integration out of the box.',
    type: 'Boilerplate',
    category: 'Boilerplates',
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 203,
    downloadCount: 1560,
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'React 18 + Vite + TypeScript frontend',
      'Node.js + Express REST API backend',
      'JWT auth with refresh token rotation',
      'Role-based access control (RBAC)',
      'Multer file upload with Cloudinary',
      'Nodemailer email integration',
      'Swagger API documentation',
      'Docker Compose for local development',
    ],
    filesIncluded: [
      { name: 'mern-starter-kit.zip', size: '9.8 MB', format: 'ZIP' },
      { name: 'API-Documentation.pdf', size: '2.4 MB', format: 'PDF' },
      { name: 'Setup-Guide.md', size: '120 KB', format: 'Markdown' },
    ],
    tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node.js', 'Boilerplate'],
    reviews: [
      {
        author: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'The RBAC implementation is clean and the code structure follows best practices perfectly.',
        helpfulCount: 52,
        date: 'Aug 31, 2025',
      },
    ],
    faqs: [
      {
        question: 'Can I use this for commercial projects?',
        answer: 'Yes, a commercial license is included with your purchase.',
      },
    ],
    featured: true,
    format: 'ZIP (Source Code)',
    fileSize: '12.3 MB total',
    updates: '6 months of updates',
    support: 'Priority email (24h)',
  },
  {
    id: '7',
    slug: 'langchain-rag-guide',
    title: 'LangChain & RAG: The Complete Guide',
    description: 'Build production RAG apps with LangChain, Pinecone & OpenAI',
    longDescription:
      'A 120-page comprehensive eBook covering everything you need to build production-ready RAG (Retrieval-Augmented Generation) applications using LangChain, Pinecone vector database, and OpenAI. Includes real code examples, architecture diagrams, and best practices.',
    type: 'eBook',
    category: 'eBooks & Guides',
    price: 399,
    rating: 4.9,
    reviewCount: 178,
    downloadCount: 980,
    image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      '120-page comprehensive eBook (PDF)',
      'Covers LangChain v0.3+ with latest APIs',
      'Real-world RAG architectures and patterns',
      'Pinecone, Weaviate, and ChromaDB comparisons',
      'Code examples in Python and TypeScript',
      'Deployment guide for AWS and Vercel',
    ],
    filesIncluded: [
      { name: 'LangChain-RAG-Complete-Guide.pdf', size: '14.2 MB', format: 'PDF' },
      { name: 'Code-Examples.zip', size: '3.6 MB', format: 'ZIP' },
      { name: 'Architecture-Diagrams.pdf', size: '2.8 MB', format: 'PDF' },
    ],
    tags: ['LangChain', 'RAG', 'OpenAI', 'Pinecone', 'AI', 'eBook'],
    reviews: [
      {
        author: 'James Williams',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'This is the guide I wish I had when starting with RAG. Covers edge cases other guides miss.',
        helpfulCount: 73,
        date: 'Sep 03, 2025',
      },
    ],
    faqs: [
      {
        question: 'Is the code compatible with the latest LangChain version?',
        answer: 'Yes, all code examples are written for LangChain v0.3+ and are updated regularly.',
      },
    ],
    featured: false,
    format: 'PDF + ZIP',
    fileSize: '20.6 MB total',
    updates: 'Lifetime free updates',
    support: 'Email support (48h)',
  },
  {
    id: '8',
    slug: 'freelancer-client-proposal-kit',
    title: 'Freelancer Client Proposal Kit',
    description: 'Win more clients with battle-tested proposal templates',
    longDescription:
      'A complete freelancer proposal kit with 5 professionally designed proposal templates, contract templates, project scope document, pricing calculator, and a client onboarding checklist. Everything you need to win and manage freelance clients.',
    type: 'eBook',
    category: 'eBooks & Guides',
    price: null,
    rating: 4.5,
    reviewCount: 89,
    downloadCount: 2800,
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      '5 proposal templates (Word + Google Docs)',
      'Freelance contract template',
      'Project scope document template',
      'Pricing calculator spreadsheet',
      'Client onboarding checklist',
    ],
    filesIncluded: [
      { name: 'Proposal-Templates.zip', size: '6.2 MB', format: 'ZIP' },
      { name: 'Freelance-Contract.docx', size: '280 KB', format: 'DOCX' },
      { name: 'Pricing-Calculator.xlsx', size: '180 KB', format: 'XLSX' },
    ],
    tags: ['Freelance', 'Proposal', 'Contract', 'Career', 'Free'],
    reviews: [
      {
        author: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        text: 'These templates helped me land my first ₹50K project. Absolutely worth downloading.',
        helpfulCount: 41,
        date: 'Aug 18, 2025',
      },
    ],
    faqs: [
      {
        question: 'Are these templates editable?',
        answer: 'Yes, all templates are fully editable in Microsoft Word or Google Docs.',
      },
    ],
    featured: false,
    format: 'DOCX + XLSX',
    fileSize: '6.7 MB total',
    updates: 'Free forever',
    support: 'Community Discord',
  },
];

export const CATEGORY_FILTERS: { label: ProductCategory; icon: string }[] = [
  { label: 'All Products', icon: '🗂️' },
  { label: 'AI Prompts & Kits', icon: '🤖' },
  { label: 'UI Templates', icon: '🎨' },
  { label: 'Boilerplates', icon: '⚡' },
  { label: 'Resume Templates', icon: '📄' },
  { label: 'Notion Templates', icon: '📝' },
  { label: 'eBooks & Guides', icon: '📚' },
];

export const BADGE_STYLES: Record<ProductType, string> = {
  'AI Prompts': 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  'UI Templates': 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Boilerplate': 'bg-orange-600 text-white',
  'Resume': 'bg-orange-500 text-white',
  'Notion': 'bg-orange-400 text-white',
  'eBook': 'bg-orange-700 text-white',
};
