import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
          <p className="text-muted-foreground">Signature Home Style, City Center</p>
          <p className="text-muted-foreground">Phone: +00 123 456 789</p>
          <p className="text-muted-foreground">Email: hello@signaturehomestyle.com</p>
        </div>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Name" aria-label="Name" />
            <Input type="email" placeholder="Email" aria-label="Email" />
          </div>
          <Input placeholder="Subject" aria-label="Subject" />
          <Textarea placeholder="Tell us about your project" className="min-h-32" aria-label="Message" />
          <Button variant="hero" className="w-full sm:w-auto">Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
