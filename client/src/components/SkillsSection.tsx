import { useQuery } from "@tanstack/react-query";
import { Skill } from "@shared/schema";
import { SiReact, SiJavascript, SiNodedotjs, SiTypescript, SiPython, SiDocker } from "react-icons/si";

const iconMap: Record<string, any> = {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiDocker,
};

export default function SkillsSection() {
  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-white" data-testid="skills-section-loading">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-6 h-32 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-white" data-testid="skills-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary" data-testid="skills-title">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <div 
                key={skill.id}
                className="bg-muted rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                data-testid={`skill-${skill.name.toLowerCase()}`}
              >
                {IconComponent && (
                  <IconComponent className="text-4xl mx-auto mb-4 text-accent" />
                )}
                <h3 className="font-semibold text-primary mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-secondary mt-1 block">{skill.proficiency}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
