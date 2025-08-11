import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LOGO = "/lovable-uploads/96369ff6-90cc-42e5-80c7-104b6ca93f16.png"; // User's logo

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm text-foreground/80 hover:text-foreground transition-colors story-link px-2 py-1">
    {children}
  </a>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn("container mx-auto flex h-16 items-center justify-between")}> 
        <a href="/home" className="flex items-center gap-3">
          <img src={LOGO} alt="Signature Home Style logo" className="h-8 w-auto rounded-sm" loading="eager" />
          <span className="font-semibold text-lg">Signature Home Style</span>
        </a>
        <nav className="hidden md:flex items-center gap-4">
          <NavItem href="#about">About</NavItem>
          <NavItem href="#services">Services</NavItem>
          <NavItem href="#process">Process</NavItem>
          <NavItem href="#portfolio">Portfolio</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <a href="tel:+923004763229" aria-label="Call Signature Home Style">Call Us</a>
          </Button>
          <Button asChild variant="hero">
            <a href="https://wa.me/923004763229" target="_blank" rel="noopener" aria-label="Get a quote on WhatsApp">Get a Quote</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
