import { db } from "../DBCON/db.js";

// Code validation
const codePattern = /^[A-Za-z0-9]{6,8}$/;

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const createLink = async (req, res) => {
  try {
    let { url, code } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Auto generate if missing
    if (!code) code = generateCode();

    // Validate code
    if (!codePattern.test(code)) {
      return res.status(400).json({ error: "Invalid code format" });
    }

    // Check duplicate
    const existing = await db.query(
      "SELECT * FROM links WHERE code = $1",
      [code]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Code already exists" });
    }

    // Insert
    await db.query(
      "INSERT INTO links (code, url) VALUES ($1, $2)",
      [code, url]
    );

    res.status(201).json({
      code,
      url,
      shortUrl: `${process.env.BASE_URL}/${code}`,
      clicks: 0,
      lastClicked: null,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllLinks = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT code, url, clicks, last_clicked AS lastClicked FROM links ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSingleLink = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      "SELECT code, url, clicks, last_clicked AS lastClicked FROM links WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Code not found" });

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      "DELETE FROM links WHERE code = $1",
      [code]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Code not found" });

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const redirectLink = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.query(
      "SELECT * FROM links WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Code not found" });

    const link = result.rows[0];

    // Update click count + timestamp
    await db.query(
      "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1",
      [code]
    );

    return res.redirect(302, link.url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
