import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper to generate image using HF
async function generateImage(prompt) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HF image generation failed: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:image/png;base64,${base64}`;
}

export class AIService {
  // Generate blog content + image
  async generateBlogWithImage(topic) {
    try {
      // 1️⃣ Generate blog text
      const response = await openai.responses.create({
        model: "gpt-5-mini",
        input: [
          {
            role: "system",
            content:
              "You are an expert blog writer. Write concise, engaging blogs. Provide a clear title on the first line, followed by short paragraphs explaining the topic."
          },
          {
            role: "user",
            content: `Write a short, informative blog about "${topic}".`
          }
        ],
        text: { format: { type: "text" }, verbosity: "medium" },
        reasoning: { effort: "medium" },
        tools: [],
        store: true,
      });

      const aiText = response.output_text?.trim();
      if (!aiText) throw new Error("AI returned empty content");

      const [firstLine, ...rest] = aiText.split("\n");
      const title = firstLine.replace(/^#\s*/, "").trim();
      const content = rest.join("\n").trim();

      // 2️⃣ Generate image for the blog
      const prompt = `Blog image for: ${topic}. Landscape, 16:9, visually appealing.`;
      const imageUrl = await generateImage(prompt);

      return { title, content, imageUrl };
    } catch (error) {
      console.error("❌ Error generating blog + image:", error.message);
      throw new Error("AI blog generation failed");
    }
  }
}
