import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertSkillSchema, 
  insertProjectSchema, 
  insertExperienceSchema, 
  insertContactSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  app.put("/api/user", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.updateUser(validatedData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.json(skill);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, validatedData);
      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data" });
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteSkill(id);
      if (!deleted) {
        return res.status(404).json({ message: "Skill not found" });
      }
      res.json({ message: "Skill deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Experience routes
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.post("/api/experiences", async (req, res) => {
    try {
      const validatedData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(validatedData);
      res.json(experience);
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.put("/api/experiences/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(id, validatedData);
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      res.status(400).json({ message: "Invalid experience data" });
    }
  });

  app.delete("/api/experiences/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteExperience(id);
      if (!deleted) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json({ message: "Experience deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete experience" });
    }
  });

  // Contact routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
