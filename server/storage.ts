import { 
  type User, 
  type InsertUser,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject,
  type Experience,
  type InsertExperience,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(user: Partial<InsertUser>): Promise<User | undefined>;

  // Skills methods
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  // Projects methods
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Experience methods
  getExperiences(): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: string, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: string): Promise<boolean>;

  // Contact methods
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private user: User | undefined;
  private skills: Map<string, Skill>;
  private projects: Map<string, Project>;
  private experiences: Map<string, Experience>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.skills = new Map();
    this.projects = new Map();
    this.experiences = new Map();
    this.contacts = new Map();
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Default user
    this.user = {
      id: randomUUID(),
      name: "Your Name",
      title: "Software Engineer",
      description: "Passionate developer crafting modern web experiences with React, Node.js, and cutting-edge technologies.",
      bio: "I'm a passionate software engineer with expertise in building scalable web applications. I love solving complex problems and creating beautiful, user-friendly interfaces that make a real impact.",
      email: "your@email.com",
      profileImage: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600"
    };

    // Default skills
    const defaultSkills = [
      { name: "React", proficiency: "90", icon: "SiReact", category: "Frontend" },
      { name: "JavaScript", proficiency: "95", icon: "SiJavascript", category: "Language" },
      { name: "Node.js", proficiency: "85", icon: "SiNodedotjs", category: "Backend" },
      { name: "TypeScript", proficiency: "88", icon: "SiTypescript", category: "Language" },
      { name: "Python", proficiency: "80", icon: "SiPython", category: "Language" },
      { name: "Docker", proficiency: "75", icon: "SiDocker", category: "DevOps" }
    ];

    defaultSkills.forEach(skill => {
      const id = randomUUID();
      this.skills.set(id, { id, ...skill });
    });

    // Default projects
    const defaultProjects = [
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and payment processing.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: "#",
        githubUrl: "#",
        technologies: ["React", "Node.js", "MongoDB"],
        featured: "true"
      },
      {
        title: "Task Management App",
        description: "A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: "#",
        githubUrl: "#",
        technologies: ["Vue.js", "Firebase", "TypeScript"],
        featured: "true"
      }
    ];

    defaultProjects.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { id, ...project });
    });

    // Default experiences
    const defaultExperiences = [
      {
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        description: "Led development of scalable web applications serving 100k+ users. Implemented CI/CD pipelines, mentored junior developers, and collaborated with cross-functional teams to deliver high-quality products.",
        technologies: ["React", "Node.js", "AWS"],
        current: "true"
      },
      {
        title: "Full Stack Developer",
        company: "StartupCo",
        duration: "2020 - 2022",
        description: "Built and maintained multiple client-facing applications. Worked closely with designers and product managers to create user-friendly interfaces and optimize application performance.",
        technologies: ["Vue.js", "Python", "PostgreSQL"],
        current: "false"
      }
    ];

    defaultExperiences.forEach(experience => {
      const id = randomUUID();
      this.experiences.set(id, { id, ...experience });
    });
  }

  // User methods
  async getUser(): Promise<User | undefined> {
    return this.user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.user = user;
    return user;
  }

  async updateUser(updates: Partial<InsertUser>): Promise<User | undefined> {
    if (!this.user) return undefined;
    this.user = { ...this.user, ...updates };
    return this.user;
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(id: string, updates: Partial<InsertSkill>): Promise<Skill | undefined> {
    const skill = this.skills.get(id);
    if (!skill) return undefined;
    const updatedSkill = { ...skill, ...updates };
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }

  // Projects methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Experience methods
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = randomUUID();
    const experience: Experience = { ...insertExperience, id };
    this.experiences.set(id, experience);
    return experience;
  }

  async updateExperience(id: string, updates: Partial<InsertExperience>): Promise<Experience | undefined> {
    const experience = this.experiences.get(id);
    if (!experience) return undefined;
    const updatedExperience = { ...experience, ...updates };
    this.experiences.set(id, updatedExperience);
    return updatedExperience;
  }

  async deleteExperience(id: string): Promise<boolean> {
    return this.experiences.delete(id);
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
