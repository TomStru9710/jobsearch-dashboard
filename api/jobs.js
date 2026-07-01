export default async function handler(req, res) {
  // CORS-Header, damit Ihr Browser die Daten lesen darf
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const TOKEN = process.env.GITHUB_TOKEN;
    if (!TOKEN) {
      return res.status(500).json({ error: "GITHUB_TOKEN fehlt im Dashboard-Projekt." });
    }

    // Holt die jobs.json sicher mit Ihrem neuen Token aus dem privaten Updater-Repository
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
