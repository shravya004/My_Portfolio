import { 
  type User, 
  type InsertUser,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject,
  type Experience,
  type InsertExperience,
  type Certification,
  type InsertCertification,
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

  // Certification methods
  getCertifications(): Promise<Certification[]>;
  getCertification(id: string): Promise<Certification | undefined>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: string, certification: Partial<InsertCertification>): Promise<Certification | undefined>;
  deleteCertification(id: string): Promise<boolean>;

  // Contact methods
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private user: User | undefined;
  private skills: Map<string, Skill>;
  private projects: Map<string, Project>;
  private experiences: Map<string, Experience>;
  private certifications: Map<string, Certification>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.skills = new Map();
    this.projects = new Map();
    this.experiences = new Map();
    this.certifications = new Map();
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
      bio: "I'm a Computer Science undergrad with a knack for blending creativity and technology to build impactful solutions. From crafting responsive frontends to deploying intelligent backend systems, I thrive at the intersection of design, logic, and user empathy. Currently exploring real-time ML applications, cybersecurity, and full-stack web development. I've worked with developer communities, led event marketing, and interned on research-heavy teams — all while keeping a sharp focus on building things that solve real problems. When I'm not coding, you'll find me sketching interfaces, experimenting with UI ideas, or helping organize community-driven events. Let's build something awesome together 🚀",
      email: "your@email.com",
      linkedinUrl: "https://linkedin.com/in/yourprofile",
      githubUrl: "https://github.com/yourusername", 
      twitterUrl: "https://twitter.com/yourusername",
      profileImage: null,
      aboutImage: null
    };

    // Default skills
    const defaultSkills = [
      { name: "Python", proficiency: "90", icon: "SiPython", category: "Language" },
      { name: "C", proficiency: "85", icon: "SiC", category: "Language" },
      { name: "C++", proficiency: "85", icon: "SiCplusplus", category: "Language" },
      { name: "Java", proficiency: "80", icon: "SiJavascript", category: "Language" },
      { name: "JavaScript", proficiency: "88", icon: "SiJavascript", category: "Language" },
      { name: "HTML/CSS", proficiency: "90", icon: "SiHtml5", category: "Frontend" },
      { name: "ReactJS", proficiency: "85", icon: "SiReact", category: "Frontend" },
      { name: "Flask", proficiency: "80", icon: "SiFlask", category: "Backend" },
      { name: "TensorFlow", proficiency: "75", icon: "SiTensorflow", category: "ML" }
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
        liveUrl: null,
        githubUrl: null,
        technologies: ["React", "Node.js", "MongoDB"],
        featured: "true"
      },
      {
        title: "Task Management App",
        description: "A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: null,
        githubUrl: null,
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

    // Default certifications
    const defaultCertifications = [
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        dateIssued: "2024",
        credentialUrl: "",
        description: "Foundational cloud computing knowledge and AWS services."
      },
      {
        name: "Python for Data Science",
        issuer: "Coursera",
        dateIssued: "2023",
        credentialUrl: "",
        description: "Advanced Python programming for data analysis and machine learning."
      }
    ];

    defaultCertifications.forEach(certification => {
      const id = randomUUID();
      this.certifications.set(id, { id, ...certification });
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

  // Certification methods
  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values());
  }

  async getCertification(id: string): Promise<Certification | undefined> {
    return this.certifications.get(id);
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const id = randomUUID();
    const certification: Certification = { ...insertCertification, id };
    this.certifications.set(id, certification);
    return certification;
  }

  async updateCertification(id: string, updates: Partial<InsertCertification>): Promise<Certification | undefined> {
    const certification = this.certifications.get(id);
    if (!certification) return undefined;
    const updatedCertification = { ...certification, ...updates };
    this.certifications.set(id, updatedCertification);
    return updatedCertification;
  }

  async deleteCertification(id: string): Promise<boolean> {
    return this.certifications.delete(id);
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
