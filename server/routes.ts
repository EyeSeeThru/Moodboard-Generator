import type { Express } from "express";
import { db } from "../db";
import { moodboards } from "@db/schema";
import multer from "multer";
import { eq } from "drizzle-orm";

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
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    // In a real app, we'd process and store the image
    // For now, we'll just return a success response
    res.json({ 
      success: true,
      url: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    });
  });
}
