import { randomUUID } from "crypto";
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

export interface IStorage {
  // User methods
  getUser(): Promise<User | undefined>;
  updateUser(user: Partial<InsertUser>): Promise<User | undefined>;

  // Skill methods
  getSkills(): Promise<Skill[]>;
  getSkill(id: string): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  // Project methods
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
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // User data from resume
    this.user = {
      id: randomUUID(),
      name: "Shravya Atreya",
      title: "Full Stack Developer",
      description: "A Computer Science undergrad with a knack for blending creativity and technology to build impactful solutions. From crafting responsive frontends to deploying intelligent backend systems, I thrive at the intersection of design, logic, and user empathy.",
      bio: "Currently exploring real-time ML applications, cybersecurity, and full-stack web development. I've worked with developer communities, led event marketing, and interned on research-heavy teams — all while keeping a sharp focus on building things that solve real problems.\nWhen I'm not coding, you'll find me sketching interfaces, experimenting with UI ideas, or helping organize community-driven events. Let's build something awesome together 🚀",
      email: "shravya.atreya@gmail.com",
      linkedinUrl: "https://linkedin.com/in/shravya-atreya",
      githubUrl: "https://github.com/shravya004", 
      twitterUrl: null,
      profileImage: null,
      aboutImage: null
    };

    // Skills from resume
    const skills = [
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

    skills.forEach(skill => {
      const id = randomUUID();
      this.skills.set(id, { id, ...skill });
    });

    // Projects from resume
    const projects = [
      {
        title: "PhishGuard",
        description: "Developed a real-time phishing detection tool leveraging DistilBERT for semantic scoring, combined with metadata-based behavioral heuristics. Combined semantic scoring and user metadata to detect phishing URLs in real time with low-latency inference.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        liveUrl: "",
        githubUrl: "https://github.com/shravya004/PhishGuard-Real-Time-Phishing-detector",
        technologies: ["Python", "Transformers (DistilBERT)", "FastAPI", "Next.js"],
        featured: "true"
      },
      {
        title: "PitchPerfectAI",
        description: "Developed a prompt-driven tool to generate structured, professional cover letters based on user input. Demonstrated skills in product design, deployment, and natural language generation logic.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        liveUrl: "",
        githubUrl: "https://github.com/shravya004/PitchPerfectAI",
        technologies: ["Python", "Streamlit", "Hugging Face Spaces"],
        featured: "true"
      }
    ];

    projects.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { id, ...project });
    });

    // Experiences from resume
    const experiences = [
      {
        title: "Research Intern",
        company: "VIT Chennai (SCOPE)",
        duration: "May 2025 – July 2025",
        description: "Worked on hybrid retrieval systems using BM25, vector search, and Reciprocal Rank Fusion (RRF) to improve QA accuracy. Contributed to model evaluation, prompt design, and technical documentation.",
        technologies: ["Python", "BM25", "Vector Search", "RRF", "ML"],
        current: "false"
      },
      {
        title: "Infosys Springboard Pragti Intern",
        company: "Infosys",
        duration: "February 2025 – June 2025",
        description: "Strengthened cross-functional competencies through modules on communication, personality development, and agile software engineering, aligning both technical and soft skill growth.",
        technologies: ["Agile", "Communication", "Software Engineering"],
        current: "false"
      },
      {
        title: "Events Team Lead",
        company: "Socrates Club",
        duration: "2025 – 2026",
        description: "Led discussions on ethics in AI, surveillance, and digital privacy to bridge philosophical inquiry with modern tech. Increased student participation by 3× through inclusive formats and active campus engagement.",
        technologies: ["Leadership", "Event Management", "AI Ethics"],
        current: "true"
      },
      {
        title: "Marketing Team Member",
        company: "Google Developer Groups",
        duration: "2023 – 2025",
        description: "Conceptualized and executed LinkedIn/Instagram campaign; drove 30%+ boost in user registrations.",
        technologies: ["Digital Marketing", "Social Media", "Campaign Management"],
        current: "false"
      }
    ];

    experiences.forEach(experience => {
      const id = randomUUID();
      this.experiences.set(id, { id, ...experience });
    });

    // Certifications from resume
    const certifications = [
      {
        name: "Google Cloud Computing Foundations",
        issuer: "Google Cloud",
        dateIssued: "2025",
        credentialUrl: "",
        description: "Google Cloud Computing Foundations Certificate"
      },
      {
        name: "Postman API Fundamentals Student Expert",
        issuer: "Postman API",
        dateIssued: "2025",
        credentialUrl: "",
        description: "Postman API Fundamentals Student Expert certification"
      },
      {
        name: "Artificial Intelligence Foundation Certification",
        issuer: "Infosys Springboard",
        dateIssued: "2025",
        credentialUrl: "",
        description: "Artificial Intelligence Foundation Certification"
      },
      {
        name: "Artificial Intelligence Primer Certification",
        issuer: "Infosys Springboard",
        dateIssued: "2025",
        credentialUrl: "",
        description: "Artificial Intelligence Primer Certification"
      }
    ];

    certifications.forEach(certification => {
      const id = randomUUID();
      this.certifications.set(id, { id, ...certification });
    });
  }

  // User methods
  async getUser(): Promise<User | undefined> {
    return this.user;
  }

  async updateUser(updates: Partial<InsertUser>): Promise<User | undefined> {
    if (!this.user) return undefined;
    this.user = { ...this.user, ...updates };
    return this.user;
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkill(id: string): Promise<Skill | undefined> {
    return this.skills.get(id);
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

  // Project methods
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
    const contact: Contact = { ...insertContact, id, createdAt: new Date().toISOString() };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();