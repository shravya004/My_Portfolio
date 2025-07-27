import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-6" data-testid="contact-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-primary" data-testid="contact-title">
            Get In Touch
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="contact-subtitle">
            Whether it's a project collaboration, job opportunity, or just saying hi, I'd love to hear from you!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {isSubmitted ? (
            <div className="text-center py-8" data-testid="contact-success">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Message Sent!</h3>
              <p className="text-secondary">Thank you for reaching out. I'll get back to you soon.</p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-4"
                data-testid="send-another-button"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your name"
                    className="w-full"
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your@email.com"
                    className="w-full"
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </Label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="What's this about?"
                  className="w-full"
                  data-testid="input-subject"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  rows={6}
                  placeholder="Tell me about your project or just say hello!"
                  className="w-full resize-none"
                  data-testid="input-message"
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-accent text-white hover:bg-blue-600 transition-colors duration-200"
                data-testid="submit-contact-form"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
