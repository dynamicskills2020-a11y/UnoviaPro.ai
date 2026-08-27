import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'ai-for-beginners',
    title: 'AI for Beginners',
    tagline: 'The ultimate zero-to-hero primer on Artificial Intelligence and everyday tools.',
    category: 'Beginner',
    difficulty: 'Beginner',
    instructor: {
      name: 'Dr. Aarav Sharma',
      title: 'Head of AI Pedagogy & Ex-Google Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      studentsCount: 14200,
    },
    rating: 4.9,
    reviewsCount: 3820,
    lessonsCount: 16,
    durationHours: 6.5,
    enrolledCount: 15420,
    priceINR: 1499,
    priceUSD: 19,
    originalPriceINR: 3999,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    skills: ['GenAI Fundamentals', 'ChatGPT Basics', 'Everyday AI Tools', 'Ethical AI', 'Prompt Foundations'],
    prerequisites: ['No prior coding or technical knowledge required'],
    description:
      'Start your AI journey with this comprehensive, gentle, step-by-step masterclass. Learn how LLMs think, how neural networks process language, and how to harness AI for daily productivity, writing, and problem-solving without getting overwhelmed by jargon.',
    badgeReward: {
      id: 'badge-ai-explorer',
      name: 'AI Explorer',
      icon: '🏆',
      description: 'Awarded for completing the foundational AI for Beginners course.',
    },
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Demystifying Artificial Intelligence',
        lessons: [
          {
            id: 'l1',
            title: '1.1 What is AI, Machine Learning, and Generative AI?',
            duration: '14 mins',
            summary: 'Understand the clear distinction between predictive algorithms and generative AI models like ChatGPT and Gemini.',
            contentMarkdown: `### Welcome to Your AI Journey!
Artificial Intelligence has shifted from scientific laboratories to everyday desktop and mobile apps. In this lesson, we break down:
- **Traditional Computing**: Fixed rules written by human programmers.
- **Machine Learning**: Systems learning patterns from billions of data points.
- **Generative AI**: Foundation models (like GPT-4 and Gemini) predicting tokens to create text, images, and audio.

#### Key Takeaways:
1. AI is not magic; it is **pattern recognition at scale**.
2. Large Language Models (LLMs) calculate the probability of the most contextually relevant next words (tokens).
3. The real skill is **Prompt Engineering**—giving clear instructions, context, and constraints.`,
            promptTemplates: [
              {
                title: 'Concept Explainer Prompt',
                tool: 'ChatGPT / Gemini',
                prompt: 'Explain [Complex Topic, e.g., Quantum Computing] to a 10-year-old using a baking analogy. Keep it under 150 words.',
              },
            ],
            assignment: {
              title: 'Your First AI Interaction',
              instructions: 'Ask the Unovia AI Mentor to explain how Generative AI creates images from text. Take notes on diffusion models.',
              starterPromptOrCode: 'Explain diffusion models for AI image generation in 3 simple bullet points.',
              solutionHint: 'Diffusion models start with pure visual static/noise and iteratively denoise it toward the requested concept.',
            },
            quiz: [
              {
                id: 101,
                question: 'What is the primary role of a Generative AI foundation model?',
                options: [
                  'Statically searching a dictionary database',
                  'Predicting the most relevant next tokens to create novel content',
                  'Physically rewiring computer hardware chips',
                  'Translating text into Morse code only',
                ],
                correctAnswer: 1,
                explanation: 'Generative AI models use probabilistic token prediction based on trillions of trained linguistic connections.',
              },
              {
                id: 102,
                question: 'Which of the following requires no prior programming experience?',
                options: [
                  'Natural Language Prompting with Generative AI',
                  'Compiling custom C++ kernels',
                  'Writing binary assembly drivers',
                  'Manual memory allocation',
                ],
                correctAnswer: 0,
                explanation: 'Modern Generative AI empowers everyone to use natural language (English, Hindi, etc.) as the programming medium.',
              },
            ],
            resources: [
              { name: 'AI Foundations Cheatsheet (PDF)', type: 'pdf', url: '#', size: '2.4 MB' },
              { name: 'Top 50 AI Terms Glossary', type: 'template', url: '#', size: '1.1 MB' },
            ],
          },
          {
            id: 'l2',
            title: '1.2 How Large Language Models (LLMs) Actually Work',
            duration: '18 mins',
            summary: 'Explore tokens, context windows, temperature settings, and hallucination prevention.',
            contentMarkdown: `### Inside the Brain of an LLM
- **Tokens**: Pieces of words (approx. 4 characters or 0.75 words per token).
- **Context Window**: How much previous conversation text the AI can remember simultaneously.
- **Hallucinations**: When the model generates plausible-sounding but factually incorrect information.

#### How to Prevent Hallucinations:
- Always ask the model to **cite its reasoning step-by-step**.
- Provide grounding source text: *"Based ONLY on the provided context below, answer..."*
- Use the instruction: *"If you do not know the exact answer, explicitly say 'I do not have verified data on this'."*`,
            promptTemplates: [
              {
                title: 'Hallucination Shield Prompt',
                tool: 'ChatGPT / Claude',
                prompt: 'Answer the following question based ONLY on the text enclosed in <context> tags. If not mentioned, reply "Not found in text". <context>[Insert Context]</context> Question: [Insert Question]',
              },
            ],
            quiz: [
              {
                id: 103,
                question: 'What is a "context window" in an LLM?',
                options: [
                  'The visual window size of your monitor screen',
                  'The maximum amount of tokens (text) the model can hold in working memory at once',
                  'The time taken to open ChatGPT',
                  'The browser cache partition',
                ],
                correctAnswer: 1,
                explanation: 'The context window dictates how much text (both input instructions and past conversation) the model can reference concurrently.',
              },
            ],
          },
          {
            id: 'l3',
            title: '1.3 Top 10 Everyday AI Tools for Instant Productivity',
            duration: '22 mins',
            summary: 'Hands-on walkthrough of ChatGPT, Gemini, Perplexity, Canva Magic Studio, and Otter.ai.',
            contentMarkdown: `### 10x Your Daily Output
We walk through live workflows for email drafting, meeting summarization, research syntheses, and document extraction.`,
            promptTemplates: [
              {
                title: 'Executive Meeting Summary',
                tool: 'Gemini',
                prompt: 'Summarize these raw meeting notes into: 1) Executive Summary (2 sentences), 2) Key Decisions Made, 3) Action Items with Owners & Deadlines. Raw notes: [Paste notes]',
              },
            ],
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Practical Prompting Mastery',
        lessons: [
          {
            id: 'l4',
            title: '2.1 The R-C-T-F Prompt Engineering Framework',
            duration: '16 mins',
            summary: 'Learn the proprietary Unovia RCTF formula (Role, Context, Task, Format) that guarantees high-grade AI outputs.',
            contentMarkdown: `### The Unovia RCTF Framework
1. **R - Role**: Who is the AI pretending to be? (*"Act as a Fortune 500 Chief Marketing Officer..."*)
2. **C - Context**: What is the background situation? (*"We are launching an AI education app in India targeting college students..."*)
3. **T - Task**: What exact job must be completed? (*"Draft 5 viral LinkedIn post hooks highlighting career benefits..."*)
4. **F - Format**: How should the output look? (*"Provide a Markdown table with Columns: Hook, Emotional Angle, Target Persona, Estimated CTR."*)`,
            promptTemplates: [
              {
                title: 'Full RCTF Master Template',
                tool: 'Any LLM',
                prompt: 'ROLE: Act as an expert [Industry/Role].\nCONTEXT: [Explain company/project/situation].\nTASK: [Clear instruction with explicit constraints].\nFORMAT: [Bullet points / JSON / Markdown Table].\nCONSTRAINTS: Avoid buzzwords, keep under 300 words.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'master-chatgpt',
    title: 'Master ChatGPT: From Casual User to Power Operator',
    tagline: 'Unlock Custom Instructions, Advanced Data Analysis, Custom GPTs, and API automations.',
    category: 'Creator',
    difficulty: 'Intermediate',
    instructor: {
      name: 'Priya Nambiar',
      title: 'AI Workflow Consultant & Top 1% ChatGPT Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 4.95,
      studentsCount: 18900,
    },
    rating: 4.95,
    reviewsCount: 4210,
    lessonsCount: 22,
    durationHours: 8.0,
    enrolledCount: 19800,
    priceINR: 1999,
    priceUSD: 25,
    originalPriceINR: 4999,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    skills: ['Advanced ChatGPT', 'Custom GPTs Builder', 'Data Analytics', 'Plugin & Tool Ecosystem', 'Workflow Automation'],
    prerequisites: ['Basic familiarity with ChatGPT free interface'],
    description:
      'Transform ChatGPT into your personal executive assistant, data scientist, copywriter, and coding mentor. Master Custom Instructions, Canvas mode, document analysis, multi-modal vision parsing, and building custom monetizable GPTs.',
    badgeReward: {
      id: 'badge-prompt-master',
      name: 'Prompt Master',
      icon: '🚀',
      description: 'Mastered ChatGPT power user tactics and custom GPT architectures.',
    },
    modules: [
      {
        id: 'cgpt-m1',
        title: 'Module 1: Advanced Prompt Architectures',
        lessons: [
          {
            id: 'cgpt-l1',
            title: '1.1 System Directives & Meta-Prompting',
            duration: '15 mins',
            summary: 'How to inject persistent personas and memory rules.',
            contentMarkdown: 'Master custom instructions to bypass repetitive setup.',
          },
          {
            id: 'cgpt-l2',
            title: '1.2 Advanced Data Analysis with CSVs & Financials',
            duration: '25 mins',
            summary: 'Upload raw datasets and generate charts, statistical regressions, and forecasts automatically.',
            contentMarkdown: 'Harness Python in the sandbox for instant spreadsheet intelligence.',
          },
        ],
      },
    ],
  },
  {
    id: 'prompt-engineering-pro',
    title: 'Prompt Engineering Pro: Industry Certification',
    tagline: 'Chain-of-Thought, Tree-of-Thoughts, Few-Shot, and Agentic Prompting for Enterprise.',
    category: 'Professional',
    difficulty: 'Advanced',
    instructor: {
      name: 'Vikramaditya Bose',
      title: 'Principal AI Architect & LLM Systems Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4.98,
      studentsCount: 9400,
    },
    rating: 4.98,
    reviewsCount: 2950,
    lessonsCount: 28,
    durationHours: 11.5,
    enrolledCount: 11200,
    priceINR: 2999,
    priceUSD: 39,
    originalPriceINR: 6999,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    skills: ['Chain-of-Thought (CoT)', 'ReAct Framework', 'Few-Shot Learning', 'Structured JSON Output', 'Prompt Optimization'],
    prerequisites: ['Understanding of LLMs and basic prompt principles'],
    description:
      'The comprehensive enterprise standard for prompt engineers. Learn how to architect complex reasoning prompts, benchmark model evaluations, enforce deterministic JSON outputs, prevent prompt injection attacks, and orchestrate multi-step autonomous workflows.',
    badgeReward: {
      id: 'badge-prompt-architect',
      name: 'Prompt Architect',
      icon: '⚡',
      description: 'Certified Master of enterprise prompt pipelines and reasoning architectures.',
    },
    modules: [
      {
        id: 'pe-m1',
        title: 'Module 1: Cognitive Reasoning Frameworks',
        lessons: [
          {
            id: 'pe-l1',
            title: '1.1 Chain of Thought & Self-Consistency Prompting',
            duration: '20 mins',
            summary: 'Boost mathematical and logical reasoning accuracy by over 40% with structured scratchpad reasoning.',
            contentMarkdown: 'Deep dive into zero-shot-CoT and majority voting sampling.',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-image-creation',
    title: 'AI Image Creation: Midjourney, Stable Diffusion & DALL-E',
    tagline: 'Master photorealistic rendering, cinematic lighting, style consistency, and branding art.',
    category: 'Creator',
    difficulty: 'All Levels',
    instructor: {
      name: 'Ananya Deshmukh',
      title: 'Digital Artist & Creative Director (VFX / Midjourney Certified)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      rating: 4.92,
      studentsCount: 16500,
    },
    rating: 4.92,
    reviewsCount: 3410,
    lessonsCount: 20,
    durationHours: 7.5,
    enrolledCount: 17200,
    priceINR: 1999,
    priceUSD: 25,
    originalPriceINR: 4999,
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80',
    skills: ['Midjourney v6', 'Photorealism & Lighting', 'Character Consistency', 'Aspect Ratios & Parameters', 'Commercial Art Licensing'],
    prerequisites: ['No art background required'],
    description:
      'Turn text into breathtaking visual assets for marketing, book covers, website UI, gaming, and social media. Learn prompt parameters (--ar, --v, --s, --c, --cw), cinematic camera focal lengths, and character consistency workflows across scenes.',
    badgeReward: {
      id: 'badge-ai-creator',
      name: 'AI Creator',
      icon: '🎨',
      description: 'Mastered visual AI asset generation and cinematic creative direction.',
    },
    modules: [
      {
        id: 'img-m1',
        title: 'Module 1: Midjourney v6 Fundamentals',
        lessons: [
          {
            id: 'img-l1',
            title: '1.1 Camera Angles, Lighting Prompts & Aspect Ratios',
            duration: '22 mins',
            summary: 'Learn ISO, volumetric lighting, Octane render, and 85mm portrait camera parameters.',
            contentMarkdown: 'Transform flat images into award-winning photography.',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-video-creation',
    title: 'AI Video Creation: Runway Gen-3, Luma, Pika & Sora Prep',
    tagline: 'Produce cinematic short films, YouTube Shorts, and commercial ads with text-to-video AI.',
    category: 'Creator',
    difficulty: 'Intermediate',
    instructor: {
      name: 'Rohit Kulkarni',
      title: 'AI Filmmaker & Commercial Video Producer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.89,
      studentsCount: 8800,
    },
    rating: 4.89,
    reviewsCount: 1950,
    lessonsCount: 18,
    durationHours: 6.8,
    enrolledCount: 9400,
    priceINR: 2499,
    priceUSD: 29,
    originalPriceINR: 5499,
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80',
    skills: ['Runway Gen-3 Alpha', 'Luma Dream Machine', 'Motion Brush & Camera Control', 'Lip-Sync AI', 'Audio FX & Soundtrack AI'],
    prerequisites: ['Basic computer skills'],
    description:
      'Step into the future of filmmaking. Learn how to generate dynamic camera sweeps, motion brush animations, character lip-syncing with ElevenLabs, and assemble complete viral social media reels and commercial client video ads entirely with AI tools.',
    badgeReward: {
      id: 'badge-video-maestro',
      name: 'AI Video Maestro',
      icon: '🎬',
      description: 'Mastered cinematic text-to-video and AI post-production pipelines.',
    },
    modules: [
      {
        id: 'vid-m1',
        title: 'Module 1: Text-to-Video Pipelines',
        lessons: [
          {
            id: 'vid-l1',
            title: '1.1 Motion Control & Camera Directives in Runway',
            duration: '24 mins',
            summary: 'Control pan, zoom, tilt, and motion vector velocities effortlessly.',
            contentMarkdown: 'Directing virtual AI cameras with precision prompt control.',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-for-digital-marketing',
    title: 'AI for Digital Marketing: 10x ROI Campaigns',
    tagline: 'Automate SEO, copywriting, ad creatives, lead funnels, and email personalization with AI.',
    category: 'Business',
    difficulty: 'Beginner',
    instructor: {
      name: 'Meera Sengupta',
      title: 'Growth Marketing Director (Ex-HubSpot & Unovia Partner)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      rating: 4.94,
      studentsCount: 12100,
    },
    rating: 4.94,
    reviewsCount: 3100,
    lessonsCount: 24,
    durationHours: 8.5,
    enrolledCount: 13200,
    priceINR: 1999,
    priceUSD: 25,
    originalPriceINR: 4999,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    skills: ['AI SEO & Keyword Clustering', 'High-Converting Ad Copy', 'Customer Avatar Generation', 'Email Sequences', 'Social Media Auto-Scheduling'],
    prerequisites: ['Basic marketing awareness is helpful'],
    description:
      'Reinvent your digital marketing playbook. Build programmatic SEO clusters, write viral Facebook and Google Ads copy, generate on-brand ad visuals, and automate customized email nurture sequences that convert visitors into paying clients.',
    badgeReward: {
      id: 'badge-growth-hacker',
      name: 'AI Growth Hacker',
      icon: '📈',
      description: 'Certified in high-converting AI marketing pipelines and lead funnels.',
    },
    modules: [
      {
        id: 'mkt-m1',
        title: 'Module 1: Programmatic AI SEO & Copy',
        lessons: [
          {
            id: 'mkt-l1',
            title: '1.1 Building AI-Driven SEO Silos & Search Intent Maps',
            duration: '22 mins',
            summary: 'How to rank on Google in the AI era with helpful content frameworks.',
            contentMarkdown: 'Structuring content pillars with AI assistance.',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-automation-for-business',
    title: 'AI Automation for Business: Make.com, Zapier & AI Agents',
    tagline: 'Connect AI models to your CRM, WhatsApp, Gmail, and Google Sheets without coding.',
    category: 'Business',
    difficulty: 'Intermediate',
    instructor: {
      name: 'Kabir Verma',
      title: 'Automation Architect & Founder of AutoFlow AI',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      rating: 4.96,
      studentsCount: 11400,
    },
    rating: 4.96,
    reviewsCount: 2800,
    lessonsCount: 26,
    durationHours: 9.5,
    enrolledCount: 12800,
    priceINR: 2999,
    priceUSD: 39,
    originalPriceINR: 6999,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    skills: ['Make.com / Integromat', 'Zapier AI', 'WhatsApp AI Bots', 'CRM Auto-Enrichment', 'Autonomous Business Agents'],
    prerequisites: ['Basic logical thinking'],
    description:
      'Automate 80% of repetitive operational tasks in your business. Learn how to build autonomous customer support bots on WhatsApp, auto-generate invoices, scrape lead data, enrich customer profiles with ChatGPT APIs, and trigger real-time alerts.',
    badgeReward: {
      id: 'badge-automation-expert',
      name: 'Automation Expert',
      icon: '🤖',
      description: 'Mastered no-code enterprise AI workflow integrations and agentic bots.',
    },
    modules: [
      {
        id: 'auto-m1',
        title: 'Module 1: Zero-Code AI Pipelines',
        lessons: [
          {
            id: 'auto-l1',
            title: '1.1 Creating Your First Make.com + ChatGPT Workflow',
            duration: '26 mins',
            summary: 'Auto-reply to customer emails with tailored AI drafts and CRM updates.',
            contentMarkdown: 'Hands-on connection of Webhooks, JSON parsers, and LLM routers.',
          },
        ],
      },
    ],
  },
  {
    id: 'build-your-ai-business',
    title: 'Build Your AI Business: Agency, SaaS & Freelancing',
    tagline: 'Launch a profitable AI consulting agency, micro-SaaS, or freelance AI service in 30 days.',
    category: 'Business',
    difficulty: 'All Levels',
    instructor: {
      name: 'Siddharth Nair',
      title: 'Serial Entrepreneur & Angel Investor ($3M+ AI Agency Exits)',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      rating: 4.97,
      studentsCount: 13900,
    },
    rating: 4.97,
    reviewsCount: 3620,
    lessonsCount: 25,
    durationHours: 10.0,
    enrolledCount: 15100,
    priceINR: 3499,
    priceUSD: 45,
    originalPriceINR: 7999,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
    skills: ['AI Agency (AAA) Models', 'Client Acquisition & Cold Pitching', 'Pricing & Retainers', 'Delivery Templates', 'Micro-SaaS Ideation'],
    prerequisites: ['Hunger to build a scalable AI income stream'],
    description:
      'A complete, tactical blueprint for building a recurring revenue business in the AI economy. Discover the most in-demand AI services clients pay ₹50,000 to ₹3,00,000 / month for: AI chatbot deployment, content engines, workflow automation, and custom training.',
    badgeReward: {
      id: 'badge-ai-entrepreneur',
      name: 'AI Entrepreneur',
      icon: '💼',
      description: 'Mastered commercial AI agency strategies and client acquisition funnels.',
    },
    modules: [
      {
        id: 'biz-m1',
        title: 'Module 1: High-Ticket AI Service Offerings',
        lessons: [
          {
            id: 'biz-l1',
            title: '1.1 The 4 Highest-Margin AI Services to Sell in 2026',
            duration: '28 mins',
            summary: 'Why businesses desperately need AI automation and how to package recurring retainer offers.',
            contentMarkdown: 'Complete breakdown of pricing tiers, contracts, and proposals.',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-tools-masterclass',
    title: 'AI Tools Masterclass: The 50 Best AI Tools in 2026',
    tagline: 'Deep hands-on walkthrough of the most impactful productivity, voice, presentation, and coding tools.',
    category: 'Creator',
    difficulty: 'Beginner',
    instructor: {
      name: 'Sneha Patel',
      title: 'Tech Reviewer & AI Productivity Coach (500k+ Followers)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.91,
      studentsCount: 17400,
    },
    rating: 4.91,
    reviewsCount: 4100,
    lessonsCount: 30,
    durationHours: 9.0,
    enrolledCount: 18900,
    priceINR: 1799,
    priceUSD: 22,
    originalPriceINR: 4499,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    skills: ['Gamma AI', 'Cursor IDE', 'ElevenLabs Voice', 'Perplexity Pro', 'Descript Video Editor', 'Notion AI'],
    prerequisites: ['None'],
    description:
      'Never get left behind in the AI tool explosion. Get curated, hands-on, fast-paced tutorials for the top 50 AI software tools across writing, video editing, voice cloning, presentation generation, deep research, and rapid prototyping.',
    badgeReward: {
      id: 'badge-tool-master',
      name: 'AI Toolmaster',
      icon: '🛠️',
      description: 'Certified across 50+ cutting-edge AI production tools and applications.',
    },
    modules: [
      {
        id: 'tools-m1',
        title: 'Module 1: Deep Research & Presentation AI',
        lessons: [
          {
            id: 'tools-l1',
            title: '1.1 Perplexity Pro + Gamma AI for Instant 10-Slide Decks',
            duration: '18 mins',
            summary: 'Research citations in 60 seconds and auto-format into an executive pitch deck.',
            contentMarkdown: 'Instant executive reporting with verified citations and diagrams.',
          },
        ],
      },
    ],
  },
  {
    id: 'create-and-sell-online-courses',
    title: 'Create and Sell Online Courses with AI',
    tagline: 'Design curriculums, write scripts, record avatars, generate quizzes, and launch in 7 days.',
    category: 'Business',
    difficulty: 'All Levels',
    instructor: {
      name: 'Rohan Mathur',
      title: 'EdTech Founder & Master Course Creator (Unovia Academy Director)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 4.96,
      studentsCount: 10200,
    },
    rating: 4.96,
    reviewsCount: 2650,
    lessonsCount: 22,
    durationHours: 8.0,
    enrolledCount: 11800,
    priceINR: 2499,
    priceUSD: 29,
    originalPriceINR: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    skills: ['Course Curriculum AI Generation', 'AI Voiceover & Avatar Video', 'Interactive Quiz Creation', 'Landing Page Copy', 'Marketplace Publishing'],
    prerequisites: ['Subject matter expertise or passion in any topic'],
    description:
      'Monetize your knowledge faster than ever. Learn how to use AI to research profitable course niches, generate lesson syllabi, write teleprompter scripts, create AI avatar videos without showing your face, and publish directly to the Unovia Marketplace.',
    badgeReward: {
      id: 'badge-unovia-pro',
      name: 'Unovia AI Pro',
      icon: '👑',
      description: 'Mastered end-to-end digital course creation and monetization systems.',
    },
    modules: [
      {
        id: 'crs-m1',
        title: 'Module 1: AI Course Ideation & Scripting',
        lessons: [
          {
            id: 'crs-l1',
            title: '1.1 Rapid Curriculum Generation & Script Teleprompter Prompts',
            duration: '22 mins',
            summary: 'Draft an entire 20-lesson video curriculum script in under 2 hours.',
            contentMarkdown: 'Pedagogical prompt frameworks for maximum student engagement.',
          },
        ],
      },
    ],
  },
];
