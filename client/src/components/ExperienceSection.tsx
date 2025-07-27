import { useQuery } from "@tanstack/react-query";
import { Experience } from "@shared/schema";

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 px-6 bg-white" data-testid="experience-section-loading">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Experience</h2>
          <div className="space-y-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 animate-pulse">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="w-px bg-gray-200 h-20 mt-4"></div>
                </div>
                <div className="flex-1 pb-8 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 px-6 bg-white" data-testid="experience-section">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary" data-testid="experience-title">
          Experience
        </h2>
        
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="flex gap-8" data-testid={`experience-${index}`}>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                {index < experiences.length - 1 && (
                  <div className="w-px bg-gray-200 h-full mt-4"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary" data-testid={`experience-title-${index}`}>
                      {experience.title}
                    </h3>
                    <p className="text-accent font-medium" data-testid={`experience-company-${index}`}>
                      {experience.company}
                    </p>
                  </div>
                  <span className="text-secondary text-sm" data-testid={`experience-duration-${index}`}>
                    {experience.duration}
                  </span>
                </div>
                <p className="text-secondary leading-relaxed mb-4" data-testid={`experience-description-${index}`}>
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                      data-testid={`experience-tech-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
