import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter } from "lucide-react";
import { User } from "@shared/schema";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user } = useQuery<User>({ queryKey: ["/api/user"] });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100" : "bg-white/90 backdrop-blur-md"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-primary" data-testid="logo">
            Portfolio
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              {user?.linkedinUrl && (
                <a 
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors duration-200"
                  data-testid="nav-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {user?.githubUrl && (
                <a 
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors duration-200"
                  data-testid="nav-github"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {user?.twitterUrl && (
                <a 
                  href={user.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors duration-200"
                  data-testid="nav-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
            <button 
              onClick={() => scrollToSection("home")}
              className="text-secondary hover:text-accent transition-colors duration-200"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-secondary hover:text-accent transition-colors duration-200"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="text-secondary hover:text-accent transition-colors duration-200"
              data-testid="nav-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection("experience")}
              className="text-secondary hover:text-accent transition-colors duration-200"
              data-testid="nav-experience"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-secondary hover:text-accent transition-colors duration-200"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
