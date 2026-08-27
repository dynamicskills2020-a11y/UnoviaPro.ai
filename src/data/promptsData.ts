import { PromptItem } from '../types';

export const PROMPTS_DATA: PromptItem[] = [
  {
    id: 'p-1',
    title: 'The Ultimate Cold Email Pitch with High Response Rate',
    category: 'Business Prompts',
    targetTool: 'ChatGPT / Claude',
    promptText: `Act as a top 1% B2B sales copywriter specializing in cold outbound emails.
Target Persona: [e.g., Chief Technology Officer of a Series A FinTech]
Our Offer: [e.g., AI automation workflow reducing customer onboarding from 3 days to 4 minutes]
Competitor Pain Point: [e.g., High churn during KYC manual verification]

Write a 3-part cold email sequence:
1. Email 1: Pattern interrupt with a specific observation, low-friction ask, under 90 words.
2. Email 2: Quick 2-line case study with concrete metrics.
3. Email 3: Polite permission-based breakup email.
Constraint: No sales clichés like "hope this finds you well" or "just bumping this".`,
    tags: ['Sales', 'Cold Outreach', 'B2B', 'Copywriting'],
    author: 'Unovia Prompt Team',
    likesCount: 1420,
    variables: ['[Target Persona]', '[Our Offer]', '[Competitor Pain Point]'],
  },
  {
    id: 'p-2',
    title: 'Viral LinkedIn Post Generator (Hook, Story, Framework, CTA)',
    category: 'Social Media Prompts',
    targetTool: 'ChatGPT / Claude',
    promptText: `Act as a personal branding strategist who has generated over 50M organic views on LinkedIn.
Topic: [e.g., How I used AI to replace 15 hours of manual data entry per week]
Target Audience: [e.g., Startup Founders and Busy Professionals]
Key Insight: [e.g., Most people use AI for generic writing instead of connecting automated webhooks]

Write 3 viral LinkedIn post variations:
- Option A: Contrawise / Unpopular Opinion Hook
- Option B: Personal Story / Vulnerable Lesson
- Option C: Actionable Step-by-Step Cheatsheet Listicle

Include:
- 1-line powerful hook with line break
- Skimmable body with whitespace
- Clear, low-friction comment CTA to trigger algorithm boost`,
    tags: ['LinkedIn', 'Viral Growth', 'Personal Branding', 'Social'],
    author: 'Unovia Prompt Team',
    likesCount: 2310,
    variables: ['[Topic]', '[Target Audience]', '[Key Insight]'],
  },
  {
    id: 'p-3',
    title: 'Cinematic Midjourney Commercial Product Photography',
    category: 'Image Generation Prompts',
    targetTool: 'Midjourney v6',
    promptText: `commercial luxury product photography of [Product, e.g., Matte Black Smart Fitness Ring with luminous blue LED sensor pulse], resting on a wet dark obsidian stone pedestal, subtle water splash droplets, volumetric moody rim lighting, macro lens 100mm f/2.8, depth of field, ray tracing reflections, 8k resolution, award-winning advertising visual --ar 16:9 --style raw --v 6.0`,
    tags: ['Midjourney', 'Commercial', 'Product', 'Photorealism'],
    author: 'Ananya Deshmukh',
    likesCount: 3120,
    variables: ['[Product]'],
  },
  {
    id: 'p-4',
    title: 'Executive Meeting Summarizer & Action Item Tracker',
    category: 'Productivity Prompts',
    targetTool: 'ChatGPT / Gemini',
    promptText: `Act as an executive chief of staff. Review the following raw meeting transcript and output a structured executive brief in Markdown:

### 1. Executive Summary
(2-3 concise sentences stating the primary purpose and overarching consensus)

### 2. Key Decisions Made
- [Decision 1: Context & Rationale]
- [Decision 2: Context & Rationale]

### 3. Action Items Matrix
| Action Item | Assigned Owner | Priority (High/Med/Low) | Hard Deadline | Dependencies |
| --- | --- | --- | --- | --- |

### 4. Unresolved Questions & Blockers
- [Question 1]

Raw Meeting Transcript:
"""
[Paste Transcript or Notes Here]
"""`,
    tags: ['Meeting Notes', 'Productivity', 'Management', 'Summary'],
    author: 'Unovia Prompt Team',
    likesCount: 1890,
    variables: ['[Paste Transcript or Notes Here]'],
  },
  {
    id: 'p-5',
    title: 'High-Converting Landing Page Copy (PAS & StoryBrand Framework)',
    category: 'Marketing Prompts',
    targetTool: 'ChatGPT / Claude',
    promptText: `Act as a world-class conversion rate optimization (CRO) copywriter.
Product: [e.g., Unovia AI Academy Pro - AI Online Course Platform]
Target Customer: [e.g., Ambitious Indian professionals and students wanting high-income AI skills]
Primary Value Proposition: [e.g., Learn practical AI tools step-by-step with verified certificates]

Draft high-converting landing page copy sections:
1. Above-the-fold Hero Section: High-impact Headline, Subheadline, Primary CTA button text, Social proof snippet.
2. The Problem Agitation (PAS Framework): Identify the fear of AI replacement and show the clear antidote.
3. 3 Core Benefit Pillars with punchy micro-copy.
4. FAQ Section handling top 4 common objections (Price, Time commitment, No coding background, Certificate validity).`,
    tags: ['Landing Page', 'Conversion Copy', 'Marketing', 'Sales Funnel'],
    author: 'Meera Sengupta',
    likesCount: 2780,
    variables: ['[Product]', '[Target Customer]', '[Primary Value Proposition]'],
  },
  {
    id: 'p-6',
    title: 'Explain Complex Topic with Feynman Technique & Mental Models',
    category: 'Education Prompts',
    targetTool: 'ChatGPT / Claude',
    promptText: `Act as Nobel-laureate physicist Richard Feynman, renowned for explaining complex, abstract ideas with radical simplicity and zero jargon.
Topic to explain: [e.g., How Transformer Architecture and Self-Attention work in LLMs]
Target Audience: [e.g., High school student or beginner coder]

Structure the explanation:
1. The Core Idea in 1 sentence.
2. The Intuitive Real-World Analogy (use an everyday metaphor like a library, kitchen, or orchestra).
3. How it Works Step-by-Step without math jargon.
4. Why it Matters for the Future.
5. A simple check-for-understanding quiz question at the end.`,
    tags: ['Feynman Technique', 'Learning', 'Analogy', 'Pedagogy'],
    author: 'Dr. Aarav Sharma',
    likesCount: 1950,
    variables: ['[Topic to explain]', '[Target Audience]'],
  },
  {
    id: 'p-7',
    title: 'Runway Gen-3 Dynamic Drone Shot Video Prompt',
    category: 'Video Generation Prompts',
    targetTool: 'Runway Gen-3 / Sora',
    promptText: `Hyper-realistic cinematic FPV drone flight sweeping across [Location, e.g., an ancient stone temple nestled in lush mist-covered Western Ghats mountains at sunrise], morning sunbeams cutting through atmospheric fog, vibrant greenery, smooth cinematic camera roll, 4k 60fps ultra-fluid motion, high shutter speed, golden hour glow --motion 6`,
    tags: ['Video', 'Runway', 'Drone Shot', 'Cinematography'],
    author: 'Rohit Kulkarni',
    likesCount: 1640,
    variables: ['[Location]'],
  },
  {
    id: 'p-8',
    title: 'Code Refactoring & Unit Test Generator with 100% Coverage',
    category: 'ChatGPT Prompts',
    targetTool: 'ChatGPT / Claude / Cursor',
    promptText: `Act as a Principal Software Engineer. Review the following code snippet:
1. Identify any performance bottlenecks, security vulnerabilities, or anti-patterns.
2. Refactor the code adhering strictly to SOLID principles, TypeScript type-safety, and clean error handling.
3. Write comprehensive unit test suites using Vitest / Jest covering:
   - Happy paths
   - Edge cases (null/undefined inputs, network timeouts, boundary values)
   - Proper mocking

Code snippet:
"""
[Paste Code Here]
"""`,
    tags: ['Coding', 'Refactoring', 'Unit Tests', 'TypeScript'],
    author: 'Unovia Prompt Team',
    likesCount: 2240,
    variables: ['[Paste Code Here]'],
  },
];
