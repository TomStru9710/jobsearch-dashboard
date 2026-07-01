export default async function handler(req, res) {
  try {
    const TOKEN = process.env.GITHUB_TOKEN;
    const response = await fetch(
      "https://github.com",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
          "User-Agent": "JobSearch-Dashboard"
        },
      }
    );
    if (!response.ok) return res.status(response.status).json({ error: "GitHub-Fehler" });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
