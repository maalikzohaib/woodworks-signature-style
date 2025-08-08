import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-secondary/50">
      <div className="container mx-auto py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="text-2xl font-extrabold">Signature Home Style</div>
            <p className="text-sm text-muted-foreground">Luxury carpentry and interiors crafted to perfection. Doors, kitchens, wardrobes and bespoke furniture.</p>
          </div>
          <nav className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#process" className="hover:underline">Process</a></li>
              <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
          <div className="space-y-3">
            <h4 className="font-semibold">Contact</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> City Center</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4"/> +00 123 456 789</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4"/> hello@signaturehomestyle.com</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Get occasional updates about new projects and finishes.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" aria-label="Email" />
              <Button variant="hero">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Signature Home Style. All rights reserved.</p>
          <p>Made with premium craftsmanship and attention to detail.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
