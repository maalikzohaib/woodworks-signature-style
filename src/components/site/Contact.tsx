import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="container mx-auto py-16 md:py-24">
      <header className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
        <p className="text-muted-foreground mt-2">Ready to transform your home? Let's discuss your project.</p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <p className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> City Center</p>
          <p className="text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4"/> +00 123 456 789</p>
          <p className="text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4"/> hello@signaturehomestyle.com</p>
          <p className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/> Mon–Sat: 10:00–18:00</p>
          <p className="text-muted-foreground">Service areas: City Center and surrounding regions.</p>
          <div className="flex gap-2">
            <Button asChild variant="hero">
              <a href="https://wa.me/00123456789" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+00123456789" aria-label="Call Signature Home Style">Call Now</a>
            </Button>
          </div>
        </div>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Name" aria-label="Name" />
            <Input type="email" placeholder="Email" aria-label="Email" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input type="tel" placeholder="Phone" aria-label="Phone" />
            <Input placeholder="City" aria-label="City" />
          </div>
          <Input placeholder="Project Type (e.g., Doors, Kitchen, Wardrobes)" aria-label="Project Type" />
          <Input placeholder="Estimated Budget (optional)" aria-label="Budget" />
          <Textarea placeholder="Tell us about your project" className="min-h-32" aria-label="Message" />
          <Button variant="hero" className="w-full sm:w-auto">Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
