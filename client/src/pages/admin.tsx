import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminPanel from "@/components/AdminPanel";

export default function Admin() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center" data-testid="admin-page">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>
        <p className="text-lg text-secondary mb-8">
          Manage your portfolio content from here.
        </p>
        <Button 
          onClick={() => setIsAdminOpen(true)}
          className="bg-accent text-white hover:bg-blue-600"
          data-testid="open-admin-panel"
        >
          Open Admin Panel
        </Button>
      </div>
      
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
