import { puter } from "puter-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { model = "gpt-4", messages = [] } = req.body;
  const prompt = messages?.[0]?.content || "Hello!";

  try {
    const reply = await puter.chat({ prompt, model });
    res.status(200).json({
      choices: [{ message: { content: reply.text } }]
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Puter.js", details: err.message });
  }
} 
