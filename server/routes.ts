import type { Express } from "express";
import { db } from "../db";
import { moodboards } from "@db/schema";
import multer from "multer";
import { eq } from "drizzle-orm";
import fetch from "node-fetch";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = "https://api.unsplash.com";

const upload = multer({ 
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export function registerRoutes(app: Express) {
  // Get all moodboards
  app.get("/api/moodboards", async (req, res) => {
    try {
      const allMoodboards = await db.select().from(moodboards);
      res.json(allMoodboards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch moodboards" });
    }
  });

  // Get single moodboard
  app.get("/api/moodboards/:id", async (req, res) => {
    try {
      const moodboard = await db.select()
        .from(moodboards)
        .where(eq(moodboards.id, parseInt(req.params.id)))
        .limit(1);
      
      if (!moodboard.length) {
        return res.status(404).json({ error: "Moodboard not found" });
      }
      
      res.json(moodboard[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch moodboard" });
    }
  });

  // Create new moodboard
  app.post("/api/moodboards", async (req, res) => {
    try {
      const newMoodboard = await db.insert(moodboards)
        .values({
          name: req.body.name,
          layout: req.body.layout,
          images: req.body.images,
          settings: req.body.settings
        })
        .returning();
      
      res.json(newMoodboard[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create moodboard" });
    }
  });

  // Update moodboard
  app.put("/api/moodboards/:id", async (req, res) => {
    try {
      const updatedMoodboard = await db.update(moodboards)
        .set({
          name: req.body.name,
          layout: req.body.layout,
          images: req.body.images,
          settings: req.body.settings,
          updatedAt: new Date()
        })
        .where(eq(moodboards.id, parseInt(req.params.id)))
        .returning();

      if (!updatedMoodboard.length) {
        return res.status(404).json({ error: "Moodboard not found" });
      }

      res.json(updatedMoodboard[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update moodboard" });
    }
  });

  // Upload image
  app.post("/api/upload", upload.single("image"), (req: Express.Request, res) => {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    // In a real app, we'd process and store the image
    // For now, we'll just return a success response
    res.json({ 
      success: true,
      url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    });
  });

  // Search images from Unsplash
  app.get("/api/search-images", async (req, res) => {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=8`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch from Unsplash');
      }

      const data = await response.json();
      const images = data.results.map((img: any) => ({
        id: img.id,
        url: img.urls.regular,
        alt: img.alt_description || img.description || 'Unsplash image',
      }));

      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch images from Unsplash" });
    }
  });
}
