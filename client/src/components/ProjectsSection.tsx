import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 px-6" data-testid="projects-section-loading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">Featured Projects</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              A collection of projects that showcase my skills and passion for creating impactful solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6" data-testid="projects-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-primary" data-testid="projects-title">
            Featured Projects
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="projects-subtitle">
            A collection of projects that showcase my skills and passion for creating impactful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              data-testid={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                data-testid={`project-image-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary" data-testid={`project-title-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.title}
                </h3>
                <p className="text-secondary mb-4" data-testid={`project-description-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                      data-testid={`project-tech-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline font-medium"
                      data-testid={`project-live-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-secondary hover:text-primary"
                      data-testid={`project-github-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
