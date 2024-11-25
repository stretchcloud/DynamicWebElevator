import type { Express } from "express";
import { db } from "../db";
import { resources } from "@db/schema";

export function registerRoutes(app: Express) {
  // Search resources
  app.get("/api/resources/search", async (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.json([]);
    }

    try {
      const results = await db.query.resources.findMany({
        where: (resources, { like }) => like(resources.title, `%${query}%`),
        limit: 10,
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to search resources" });
    }
  });

  // Get resources by category
  app.get("/api/resources/:category", async (req, res) => {
    const { category } = req.params;
    try {
      const results = await db.query.resources.findMany({
        where: (resources, { eq }) => eq(resources.category, category),
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });
}
