import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navigation />
      <HeroSection user={user || null} />
      <AboutSection user={user || null} />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
