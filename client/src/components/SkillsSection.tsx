import { useQuery } from "@tanstack/react-query";
import { Skill } from "@shared/schema";
import { SiPython, SiC, SiCplusplus, SiJavascript, SiHtml5, SiReact, SiFlask, SiTensorflow } from "react-icons/si";

const iconMap: Record<string, any> = {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiReact,
  SiFlask,
  SiTensorflow,
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
                className="bg-muted rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer group"
                data-testid={`skill-${skill.name.toLowerCase()}`}
              >
                {IconComponent && (
                  <IconComponent className="text-4xl mx-auto mb-4 text-accent group-hover:text-blue-600 transition-colors duration-200" />
                )}
                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors duration-200">{skill.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
