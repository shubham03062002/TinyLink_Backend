import express from "express";
// import {
//   createLink,
//   getAllLinks,
//   getSingleLink,
//   deleteLink,
//   redirectLink
// } from "./Controllers/linksController.js";

import { createLink,getAllLinks,getSingleLink,deleteLink,redirectLink } from "../Controllers/linksController.js";

const router = express.Router();

// API routes
router.post("/api/links", createLink);
router.get("/api/links", getAllLinks);
router.get("/api/links/:code", getSingleLink);
router.delete("/api/links/:code", deleteLink);

// Redirect route
router.get("/:code", redirectLink);

export default router;
