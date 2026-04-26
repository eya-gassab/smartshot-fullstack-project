
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const getClient = () => new Groq({ apiKey: process.env.GROQ_API_KEY });

export const classifyText = async (text) => {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a screenshot classification system...
Categories: programming, finance, social_media, shopping, education, work, personal, other
Return ONLY the category label. No explanation.`,
      },
      { role: "user", content: `Classify this screenshot text:\n\n${text}` },
    ],
    temperature: 0,
  });
  return response.choices[0].message.content.trim().toLowerCase();
};

//  Génère un titre intelligent
export const generateTitle = async (text) => {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a screenshot title generator. Given extracted text from a screenshot, generate a SHORT descriptive title (max 6 words). Be specific and clear. Return ONLY the title, no punctuation at the end, no quotes.`,
      },
      { role: "user", content: `Generate a title for this screenshot:\n\n${text.slice(0, 500)}` },
    ],
    temperature: 0.3,
    max_tokens: 30,
  });
  return response.choices[0].message.content.trim();
};

//  Génère un résumé AI
export const summarizeText = async (text) => {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a screenshot summarizer. Given extracted text from a screenshot, write a concise summary in 1-2 sentences. Focus on what the screenshot is about and what's important. Return ONLY the summary.`,
      },
      { role: "user", content: `Summarize this screenshot:\n\n${text.slice(0, 1000)}` },
    ],
    temperature: 0.3,
    max_tokens: 100,
  });
  return response.choices[0].message.content.trim();
};