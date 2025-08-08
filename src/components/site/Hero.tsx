import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";

const heroImg = "/lovable-uploads/2dbd548d-f840-4353-8dd0-ec28e23be25b.png"; // Kitchen

const Hero = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const style = useMemo(() => ({
    background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, hsl(var(--primary)/0.18), transparent 60%)`,
  }), [pos]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      window.requestAnimationFrame(() => setPos({ x, y }));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={style} aria-hidden />
      <div className="container mx-auto grid gap-10 py-16 md:py-24 md:grid-cols-2 items-center">
        <div className="space-y-6 animate-enter">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">Bespoke Carpentry • Interiors</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Crafting Your Dream Spaces</h1>
          <p className="text-lg text-muted-foreground max-w-prose">Premium doors, kitchens, wardrobes and refined interiors handcrafted to your lifestyle. We combine time-honored artistry with modern precision.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="hero" size="lg">Get a Quote</Button>
            <Button variant="outline" size="lg">View Portfolio</Button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <Stat k="150+" v="Projects" />
            <Stat k="10+" v="Years Experience" />
            <Stat k="100%" v="Client Satisfaction" />
          </div>
        </div>
        <div className="relative">
          <img src={heroImg} alt="Modern luxury kitchen cabinetry with golden accents" className="w-full h-auto rounded-xl border shadow-md hover-scale" loading="eager"/>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ k, v }: { k: string; v: string }) => (
  <div className="text-left">
    <div className="text-3xl font-bold">{k}</div>
    <div className="text-sm text-muted-foreground">{v}</div>
  </div>
);

export default Hero;
