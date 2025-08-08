import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const imgs = {
  doors: "/lovable-uploads/4219d665-63d4-4e58-a673-8767f844281e.png",
  kitchen: "/lovable-uploads/2dbd548d-f840-4353-8dd0-ec28e23be25b.png",
  wardrobe: "/lovable-uploads/784588ae-d6ca-4f31-8982-6a2dfef99425.png",
  bedroom: "/lovable-uploads/2f969180-e8a5-459d-a2e5-52565ee1c122.png",
};

const Services = () => {
  return (
    <section id="services" className="container mx-auto py-16 md:py-24">
      <header className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
        <p className="text-muted-foreground mt-2">From statement doors to luxury kitchens and wardrobes, we deliver refined, custom-made solutions.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <ServiceCard title="Custom Doors" img={imgs.doors} points={["Solid wood & metal work","Intricate carving & detailing","Premium finishes"]} />
        <ServiceCard title="Luxury Kitchens" img={imgs.kitchen} points={["Modular precision","Integrated lighting","Hard-wearing surfaces"]} />
        <ServiceCard title="Designer Wardrobes" img={imgs.wardrobe} points={["Space-optimized","Premium hardware","Tailored interiors"]} />
        <ServiceCard title="Bedroom Interiors" img={imgs.bedroom} points={["Headboards & panelling","Side tables & consoles","Signature palettes"]} />
      </div>
    </section>
  );
};

const ServiceCard = ({ title, img, points }: { title: string; img: string; points: string[] }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <img src={img} alt={`${title} showcase`} className="w-full h-56 object-cover" loading="lazy"/>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Premium craftsmanship with timeless aesthetics.</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
        {points.map((p) => (<li key={p}>{p}</li>))}
      </ul>
    </CardContent>
  </Card>
);

export default Services;
