export default async function handler(req, res) {
  // Erlaubt dem eigenen Dashboard den Zugriff
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const TOKEN = process.env.GITHUB_TOKEN;
    if (!TOKEN) {
      return res.status(500).json({ error: "GITHUB_TOKEN fehlt im Dashboard-Projekt." });
    }

    // Holt die jobs.json direkt und sicher mit dem Token aus deinem privaten Repository
    const response = await fetch(
      "https://github.com",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
          "User-Agent": "JobSearch-Dashboard-App"
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: `GitHub meldet Status ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
