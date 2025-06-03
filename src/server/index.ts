import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const CLIENT_DIR = path.resolve(projectRoot, "src/client");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.static(CLIENT_DIR));

app.post("/contact-form", (req, res) => {
  try {
    const { name, email, activities } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Missing name" });
    }
    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }
    if (!Array.isArray(activities)) {
      return res.status(400).json({ message: "Invalid activities format" });
    }

    if (activities.length !== 3) {
      return res
        .status(400)
        .json({ message: "Exactly three activities must be selected" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const nameRegex = /^[\p{L}\s\-]+$/u;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    console.log("Received form data:", { name, email, activities });
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Error processing form submission" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
