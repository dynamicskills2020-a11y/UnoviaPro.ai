import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// AI Mentor Chat endpoint
app.post("/api/mentor/chat", async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // High-quality contextual fallback if API key isn't provided
      return res.json({
        reply: `Hello! I am **Unovia AI Mentor** 🤖. Here is an expert insight on **${message.slice(0, 40)}**:
        
1. **Core Concept**: In Artificial Intelligence and modern generative workflows, starting with clear prompt framing, task decomposition, and iterative feedback delivers 10x higher output quality.
2. **Recommended Action**: Explore our *Prompt Engineering Pro* or *AI Tools Masterclass* modules in the Learn tab to practice with real-world business scenarios.
3. **Pro Tip**: Use role-based instructions: \`"Act as an expert [Role]. Perform [Specific Task] adhering to [Constraints]. Output in [Format]."\``
      });
    }

    const systemInstruction = `You are "Unovia AI Mentor", the world-class dedicated AI tutor and learning assistant for Unovia AI Academy Pro (Tagline: "Learn AI. Build Skills. Create Opportunities.", Website: www.unovia.ai, Contact: +91-9353649990).
Your goal is to guide students, beginners, professionals, and creators step-by-step in mastering artificial intelligence (ChatGPT, Claude, Midjourney, Stable Diffusion, AI Agents, Automation, Make/Zapier, Python for AI, LLM APIs).
Be encouraging, structured, practical, and clear. Break down complex AI concepts using intuitive real-world analogies, actionable bullet points, prompt templates, and direct recommendations to courses in Unovia AI Academy Pro.
When formatting responses, use clean Markdown with bolding, code blocks for prompts or code, and concise takeaway steps.`;

    const contents = [
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
      {
        role: "user",
        parts: [{ text: `Student context: ${JSON.stringify(context)}\n\nStudent question: ${message}` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm here to help you master AI! How else can I assist your learning journey?";
    res.json({ reply });
  } catch (error: any) {
    console.error("AI Mentor Chat Error:", error);
    res.status(500).json({
      error: "AI Mentor service temporary error",
      details: error?.message || "Unknown error",
      reply: "I am having trouble connecting to the cloud mentor right now. Please try again or ask another question about AI prompting, image generation, or course recommendations!"
    });
  }
});

// AI Prompt Improver endpoint
app.post("/api/mentor/improve-prompt", async (req, res) => {
  try {
    const { roughPrompt, category = "General" } = req.body;
    if (!roughPrompt) {
      return res.status(400).json({ error: "Rough prompt is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        improvedPrompt: `Act as a senior ${category} AI specialist with 10+ years of domain expertise.
Task: ${roughPrompt}
Context & Guidelines:
1. Provide a comprehensive, step-by-step breakdown.
2. Include concrete real-world examples and edge cases.
3. Highlight actionable optimization strategies.
Format: Output as structured Markdown with executive summary, implementation checklist, and key metrics.`,
        explanation: "Enhanced with Persona definition, explicit Context boundaries, Step-by-step Execution constraints, and Structured Output formatting.",
        suggestedVariables: ["[Target Audience]", "[Tone/Style]", "[Word Count/Budget]"]
      });
    }

    const promptText = `Take this rough user prompt for ${category}: "${roughPrompt}".
Improve it into an advanced, high-performing Master Prompt for ChatGPT/Claude/Midjourney.
Return a valid JSON object with the following fields:
- "improvedPrompt": The polished, production-ready master prompt with placeholders like [Target Audience] where applicable.
- "explanation": Why these improvements make the prompt output 10x better.
- "tips": An array of 3 quick bullet tips for the user.
- "suggestedVariables": An array of strings indicating customizable variables in the prompt.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are the Lead Prompt Engineer at Unovia AI Academy Pro. Return only valid JSON.",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Prompt Improver Error:", error);
    res.json({
      improvedPrompt: `Act as an expert in this domain. Deliver an in-depth, structured solution for: "${req.body?.roughPrompt || ''}". Ensure practical examples, constraints, and actionable next steps.`,
      explanation: "Added persona anchoring and structural output directives.",
      tips: ["Be specific about your audience", "Specify tone and length constraints", "Ask for step-by-step reasoning"],
      suggestedVariables: ["[Goal]", "[Audience]", "[Format]"]
    });
  }
});

// AI Dynamic Quiz Generator
app.post("/api/mentor/generate-quiz", async (req, res) => {
  try {
    const { topic = "Generative AI Fundamentals", difficulty = "Beginner" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        quiz: [
          {
            id: 1,
            question: `What is the primary function of a generative AI foundational model like GPT-4 or Gemini in ${topic}?`,
            options: [
              "Executing static database indexing algorithms",
              "Predicting the most contextually relevant next tokens based on input patterns",
              "Storing raw images directly inside memory cache tables",
              "Manually rewriting operating system firmware"
            ],
            correctAnswer: 1,
            explanation: "Generative models calculate probabilistic distributions over token vocabularies to generate coherent, novel outputs from learned training representations."
          },
          {
            id: 2,
            question: "In prompt engineering, what does 'Few-Shot Prompting' refer to?",
            options: [
              "Giving the AI a strict 5-second deadline",
              "Providing a few input-output examples inside the prompt to guide the model's pattern",
              "Limiting the AI output to only 3 words",
              "Using photo snapshots as visual tokens"
            ],
            correctAnswer: 1,
            explanation: "Few-shot prompting provides 2-5 explicit demonstration pairs within the prompt so the model generalizes the target formatting and logic style instantly."
          }
        ]
      });
    }

    const promptText = `Generate 3 high-yield interactive quiz questions on the topic "${topic}" at "${difficulty}" difficulty level.
Return JSON with format:
{
  "quiz": [
    {
      "id": number,
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": number (index 0-3),
      "explanation": "Detailed pedagogical explanation of why this answer is correct."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are the Chief Academic Officer at Unovia AI Academy Pro. Output only strict JSON.",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Quiz generator error:", error);
    res.status(500).json({ error: "Failed to generate dynamic quiz" });
  }
});

// Personalized 30-Day Learning Plan
app.post("/api/mentor/roadmap", async (req, res) => {
  try {
    const { goal, currentLevel, hoursPerWeek } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        planTitle: `30-Day Personalized AI Acceleration Plan for ${goal || 'AI Master'}`,
        summary: "A customized 4-week roadmap curated by Unovia AI Academy Pro.",
        weeks: [
          {
            week: 1,
            focus: "AI Foundations & Prompt Architecture",
            milestone: "Build your first 5 master prompts and understand token mechanics.",
            keyActions: [
              "Complete 'AI for Beginners' Modules 1-4",
              "Master Zero-shot vs Few-shot prompt templates",
              "Explore Top 10 Generative AI productivity tools"
            ]
          },
          {
            week: 2,
            focus: "Multimodal AI & Content Production",
            milestone: "Create a complete visual & audio media campaign using Midjourney and ElevenLabs.",
            keyActions: [
              "Practice camera angles and style weights in AI Image Creation",
              "Generate realistic voiceovers and localized video scripts",
              "Integrate ChatGPT for content calendar drafting"
            ]
          },
          {
            week: 3,
            focus: "AI Workflow Automation & Business Systems",
            milestone: "Connect Make.com or Zapier with AI APIs to auto-process customer inquiries.",
            keyActions: [
              "Build automated lead qualification pipelines",
              "Create custom GPTs with specialized knowledge retrieval",
              "Deploy auto-summarization for weekly meetings"
            ]
          },
          {
            week: 4,
            focus: "Cap-Stone AI Project & Certification",
            milestone: "Deploy a live AI-powered product prototype and receive your Unovia Certificate.",
            keyActions: [
              "Complete capstone submission and peer review",
              "Pass final AI certification exam (Score > 85%)",
              "Publish project to Unovia Showcase & LinkedIn"
            ]
          }
        ]
      });
    }

    const prompt = `Create a structured 4-week AI learning roadmap for a student with Goal: "${goal}", Current Level: "${currentLevel}", Hours/Week: ${hoursPerWeek}.
Return JSON schema:
{
  "planTitle": "string",
  "summary": "string",
  "weeks": [
    {
      "week": number,
      "focus": "string",
      "milestone": "string",
      "keyActions": ["string", "string", "string"]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Unovia AI Academy Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
