import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  User, 
  Project, 
  Experience, 
  insertUserSchema, 
  insertProjectSchema, 
  insertExperienceSchema,
  type InsertUser,
  type InsertProject,
  type InsertExperience
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Plus, Edit, Trash2 } from "lucide-react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);

  // Queries
  const { data: user } = useQuery<User>({ queryKey: ["/api/user"] });
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: experiences = [] } = useQuery<Experience[]>({ queryKey: ["/api/experiences"] });

  // User form
  const userForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: user || {
      name: "",
      title: "",
      description: "",
      bio: "",
      email: "",
      profileImage: "",
      aboutImage: "",
    },
  });

  // Project form
  const projectForm = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      liveUrl: "",
      githubUrl: "",
      technologies: [],
      featured: "false",
    },
  });

  // Experience form
  const experienceForm = useForm<InsertExperience>({
    resolver: zodResolver(insertExperienceSchema),
    defaultValues: {
      title: "",
      company: "",
      duration: "",
      description: "",
      technologies: [],
      current: "false",
    },
  });

  // Mutations
  const updateUserMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const response = await apiRequest("PUT", "/api/user", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Profile updated successfully!" });
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      const response = await apiRequest("POST", "/api/projects", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsProjectDialogOpen(false);
      projectForm.reset();
      toast({ title: "Project created successfully!" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      const response = await apiRequest("PUT", `/api/projects/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsProjectDialogOpen(false);
      setEditingProject(null);
      projectForm.reset();
      toast({ title: "Project updated successfully!" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted successfully!" });
    },
  });

  const createExperienceMutation = useMutation({
    mutationFn: async (data: InsertExperience) => {
      const response = await apiRequest("POST", "/api/experiences", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      setIsExperienceDialogOpen(false);
      experienceForm.reset();
      toast({ title: "Experience created successfully!" });
    },
  });

  const updateExperienceMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertExperience> }) => {
      const response = await apiRequest("PUT", `/api/experiences/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      setIsExperienceDialogOpen(false);
      setEditingExperience(null);
      experienceForm.reset();
      toast({ title: "Experience updated successfully!" });
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/experiences/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({ title: "Experience deleted successfully!" });
    },
  });

  // Handlers
  const handleUserSubmit = (data: InsertUser) => {
    updateUserMutation.mutate(data);
  };

  const handleProjectSubmit = (data: InsertProject) => {
    const techArray = typeof data.technologies === 'string' 
      ? data.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : data.technologies;
    
    const projectData = { ...data, technologies: techArray };
    
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: projectData });
    } else {
      createProjectMutation.mutate(projectData);
    }
  };

  const handleExperienceSubmit = (data: InsertExperience) => {
    const techArray = typeof data.technologies === 'string' 
      ? data.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : data.technologies;
    
    const experienceData = { ...data, technologies: techArray };
    
    if (editingExperience) {
      updateExperienceMutation.mutate({ id: editingExperience.id, data: experienceData });
    } else {
      createExperienceMutation.mutate(experienceData);
    }
  };

  const openProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      projectForm.reset({
        ...project,
        technologies: project.technologies.join(', ')
      } as any);
    } else {
      setEditingProject(null);
      projectForm.reset();
    }
    setIsProjectDialogOpen(true);
  };

  const openExperienceDialog = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      experienceForm.reset({
        ...experience,
        technologies: experience.technologies.join(', ')
      } as any);
    } else {
      setEditingExperience(null);
      experienceForm.reset();
    }
    setIsExperienceDialogOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" data-testid="admin-panel">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary" data-testid="admin-title">Admin Panel</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                data-testid="close-admin"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
                <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
                <TabsTrigger value="experience" data-testid="tab-experience">Experience</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={userForm.handleSubmit(handleUserSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            {...userForm.register("name")}
                            data-testid="input-profile-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            {...userForm.register("title")}
                            data-testid="input-profile-title"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...userForm.register("email")}
                          data-testid="input-profile-email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          {...userForm.register("description")}
                          data-testid="input-profile-description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          {...userForm.register("bio")}
                          data-testid="input-profile-bio"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="profileImage">Profile Image URL</Label>
                          <Input
                            id="profileImage"
                            {...userForm.register("profileImage")}
                            data-testid="input-profile-image"
                          />
                        </div>
                        <div>
                          <Label htmlFor="aboutImage">About Image URL</Label>
                          <Input
                            id="aboutImage"
                            {...userForm.register("aboutImage")}
                            data-testid="input-about-image"
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        disabled={updateUserMutation.isPending}
                        data-testid="save-profile"
                      >
                        {updateUserMutation.isPending ? "Saving..." : "Save Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Projects</CardTitle>
                      <Button onClick={() => openProjectDialog()} data-testid="add-project">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="bg-gray-50 p-4 rounded-lg" data-testid={`project-item-${project.id}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{project.title}</h4>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openProjectDialog(project)}
                                data-testid={`edit-project-${project.id}`}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteProjectMutation.mutate(project.id)}
                                data-testid={`delete-project-${project.id}`}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-secondary mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Work Experience</CardTitle>
                      <Button onClick={() => openExperienceDialog()} data-testid="add-experience">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experiences.map((experience) => (
                        <div key={experience.id} className="bg-gray-50 p-4 rounded-lg" data-testid={`experience-item-${experience.id}`}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{experience.title}</h4>
                              <p className="text-sm text-accent">{experience.company}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openExperienceDialog(experience)}
                                data-testid={`edit-experience-${experience.id}`}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteExperienceMutation.mutate(experience.id)}
                                data-testid={`delete-experience-${experience.id}`}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-secondary">{experience.duration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Project Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="project-dialog">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="project-title">Title</Label>
              <Input
                id="project-title"
                {...projectForm.register("title")}
                data-testid="input-project-title"
              />
            </div>
            <div>
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                {...projectForm.register("description")}
                data-testid="input-project-description"
              />
            </div>
            <div>
              <Label htmlFor="project-image">Image URL</Label>
              <Input
                id="project-image"
                {...projectForm.register("image")}
                data-testid="input-project-image"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-live">Live URL</Label>
                <Input
                  id="project-live"
                  {...projectForm.register("liveUrl")}
                  data-testid="input-project-live"
                />
              </div>
              <div>
                <Label htmlFor="project-github">GitHub URL</Label>
                <Input
                  id="project-github"
                  {...projectForm.register("githubUrl")}
                  data-testid="input-project-github"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="project-technologies">Technologies (comma-separated)</Label>
              <Input
                id="project-technologies"
                {...projectForm.register("technologies" as any)}
                placeholder="React, Node.js, TypeScript"
                data-testid="input-project-technologies"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" data-testid="save-project">
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsProjectDialogOpen(false)}
                data-testid="cancel-project"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Experience Dialog */}
      <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="experience-dialog">
          <DialogHeader>
            <DialogTitle>{editingExperience ? "Edit Experience" : "Add New Experience"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={experienceForm.handleSubmit(handleExperienceSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience-title">Job Title</Label>
                <Input
                  id="experience-title"
                  {...experienceForm.register("title")}
                  data-testid="input-experience-title"
                />
              </div>
              <div>
                <Label htmlFor="experience-company">Company</Label>
                <Input
                  id="experience-company"
                  {...experienceForm.register("company")}
                  data-testid="input-experience-company"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="experience-duration">Duration</Label>
              <Input
                id="experience-duration"
                {...experienceForm.register("duration")}
                placeholder="2020 - 2022"
                data-testid="input-experience-duration"
              />
            </div>
            <div>
              <Label htmlFor="experience-description">Description</Label>
              <Textarea
                id="experience-description"
                rows={4}
                {...experienceForm.register("description")}
                data-testid="input-experience-description"
              />
            </div>
            <div>
              <Label htmlFor="experience-technologies">Technologies (comma-separated)</Label>
              <Input
                id="experience-technologies"
                {...experienceForm.register("technologies" as any)}
                placeholder="React, Node.js, TypeScript"
                data-testid="input-experience-technologies"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" data-testid="save-experience">
                {editingExperience ? "Update Experience" : "Create Experience"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsExperienceDialogOpen(false)}
                data-testid="cancel-experience"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
