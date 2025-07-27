import { useQuery } from "@tanstack/react-query";
import { Certification } from "@shared/schema";
import { Award, ExternalLink } from "lucide-react";

export default function CertificationsSection() {
  const { data: certifications = [], isLoading } = useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-6" data-testid="certifications-section-loading">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
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

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6" data-testid="certifications-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-primary" data-testid="certifications-title">
            Certifications
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="certifications-subtitle">
            Professional certifications and achievements that validate my expertise and commitment to continuous learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((certification) => (
            <div 
              key={certification.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              data-testid={`certification-${certification.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="text-accent w-8 h-8 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary" data-testid={`certification-name-${certification.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {certification.name}
                    </h3>
                    <p className="text-accent font-medium" data-testid={`certification-issuer-${certification.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {certification.issuer}
                    </p>
                  </div>
                </div>
                
                <p className="text-secondary mb-4" data-testid={`certification-description-${certification.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  {certification.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary" data-testid={`certification-date-${certification.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    Issued: {certification.dateIssued}
                  </span>
                  {certification.credentialUrl && certification.credentialUrl !== "" && (
                    <a 
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline font-medium"
                      data-testid={`certification-credential-${certification.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Credential
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