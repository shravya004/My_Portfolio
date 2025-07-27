import { User } from "@shared/schema";

interface AboutSectionProps {
  user: User | null;
}

export default function AboutSection({ user }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6" data-testid="about-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-primary" data-testid="about-title">
            About
          </h2>
          <div className="text-lg text-secondary text-center space-y-6 leading-relaxed">
            <div data-testid="about-bio">
              {user?.bio?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              )) || (
                <>
                  <p className="mb-4">
                    Currently exploring real-time ML applications, cybersecurity, and full-stack web development. I've worked with developer communities, led event marketing, and interned on research-heavy teams — all while keeping a sharp focus on building things that solve real problems.
                  </p>
                  <p>
                    When I'm not coding, you'll find me sketching interfaces, experimenting with UI ideas, or helping organize community-driven events. Let's build something awesome together 🚀
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
