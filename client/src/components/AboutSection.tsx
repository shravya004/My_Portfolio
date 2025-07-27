import { User } from "@shared/schema";

interface AboutSectionProps {
  user: User | null;
}

export default function AboutSection({ user }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6" data-testid="about-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-primary" data-testid="about-title">
              About
            </h2>
            <div className="prose prose-lg text-secondary space-y-6">
              <p data-testid="about-bio">
                {user?.bio || "I'm a passionate software engineer with expertise in building scalable web applications. I love solving complex problems and creating beautiful, user-friendly interfaces that make a real impact."}
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, 
                or sharing my knowledge with the developer community through blog posts and mentoring.
              </p>
              <p>
                I'm currently focused on full-stack development with React, Node.js, and cloud technologies, 
                always staying up-to-date with the latest industry trends and best practices.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src={user?.aboutImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600"}
              alt="About me" 
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              data-testid="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
