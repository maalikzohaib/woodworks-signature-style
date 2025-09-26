import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-secondary/50">
      <div className="container mx-auto py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/ec97b138-50b8-4a22-abef-525ffe71a0b4.png" 
              alt="Signature Home Style" 
              className="h-12 w-auto object-contain" 
            />
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
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4"/>
              <a href="https://maps.google.com/maps?q=31.4823698%2C74.4160444&z=17&hl=en" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
                Lahore, Pakistan
              </a>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4"/> +92 300 4763229</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4"/> signaturehomewithstyle@gmail.com</p>
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
          <p>© {new Date().getFullYear()} Signature Home Style. All rights reserved. (<a href="https://wa.me/923259885086?text=Hello%2C%20I%27m%20interested%20in%20your%20development%20work." target="_blank" rel="noopener" className="text-primary hover:underline">Developed by Muhammad Zohaib</a>)</p>
          <div className="flex items-center gap-4">
            
            <a 
              href="/admin/login" 
              className="text-primary hover:underline text-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
