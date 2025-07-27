import { Linkedin, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-6" data-testid="footer">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="#" 
            className="text-white hover:text-accent transition-colors duration-200"
            data-testid="social-linkedin"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-accent transition-colors duration-200"
            data-testid="social-github"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-accent transition-colors duration-200"
            data-testid="social-twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="text-white hover:text-accent transition-colors duration-200"
            data-testid="social-email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-400" data-testid="copyright">
          © 2024 Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
