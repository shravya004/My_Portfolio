import { User } from "@shared/schema";
import { SiReact, SiJavascript, SiNodedotjs, SiTypescript, SiPython, SiDocker } from "react-icons/si";

interface HeroSectionProps {
  user: User | null;
}

const techIcons = [
  { Icon: SiReact, color: "text-blue-500", name: "React" },
  { Icon: SiJavascript, color: "text-yellow-500", name: "JavaScript" },
  { Icon: SiNodedotjs, color: "text-green-500", name: "Node.js" },
  { Icon: SiTypescript, color: "text-blue-600", name: "TypeScript" },
  { Icon: SiPython, color: "text-blue-600", name: "Python" },
  { Icon: SiDocker, color: "text-blue-400", name: "Docker" }
];

export default function HeroSection({ user }: HeroSectionProps) {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 px-6"
      data-testid="hero-section"
    >
      <div className="max-w-6xl mx-auto text-center">

        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary" data-testid="hero-title">
          Hi, I'm <span className="text-accent">{user?.name || "Your Name"}</span>.
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-secondary mb-8" data-testid="hero-subtitle">
          {user?.title || "Software Engineer"}
        </h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto mb-12 leading-relaxed" data-testid="hero-description">
          {user?.description || "Passionate developer crafting modern web experiences with React, Node.js, and cutting-edge technologies."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToContact}
            className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
            data-testid="hire-me-button"
          >
            Hire Me!
          </button>
          <span className="text-muted-green font-medium px-8 py-3" data-testid="availability-status">
            Available for collaborations
          </span>
        </div>

        {/* Floating Tech Stack Icons */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 opacity-60">
          {techIcons.map(({ Icon, color, name }, index) => (
            <div 
              key={name}
              className={`w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-200 ${
                index % 2 === 0 ? "animate-float" : "animate-float-delayed"
              }`}
              data-testid={`tech-icon-${name.toLowerCase()}`}
            >
              <Icon className={`text-2xl ${color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
