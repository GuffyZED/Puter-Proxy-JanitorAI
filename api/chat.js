export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { model = "gpt-4", messages = [] } = req.body;
  const prompt = messages?.[0]?.content || "Hello!";

  try {
    const response = await fetch("https://api.puter.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify({ prompt, model })
    });

    const data = await response.json();

    res.status(200).json({
      choices: [{ message: { content: data.text } }]
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Puter API", details: err.message });
  }
}
