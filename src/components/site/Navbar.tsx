import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LOGO = "/lovable-uploads/c44817cb-43d3-4d0d-9cce-88f368f4dd91.png"; // Provided by user

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm text-foreground/80 hover:text-foreground transition-colors story-link px-2 py-1">
    {children}
  </a>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn("container mx-auto flex h-16 items-center justify-between")}> 
        <a href="#" className="flex items-center gap-3">
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
          <Button variant="outline" className="hidden md:inline-flex">Call Us</Button>
          <Button variant="hero">Get a Quote</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
