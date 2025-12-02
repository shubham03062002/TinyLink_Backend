import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import linkRoutes from "./Routers/links.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Health Check (required)
app.get("/healthz", (req, res) => {
  res.status(200).json({
    ok: true,
    version: "1.0",
  });
});

// Routes
app.use("/", linkRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
