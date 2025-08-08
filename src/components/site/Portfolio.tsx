const imgs = [
  "/lovable-uploads/f1ef67e6-ed82-4235-b6a4-1642598b8a93.png",
  "/lovable-uploads/4219d665-63d4-4e58-a673-8767f844281e.png",
  "/lovable-uploads/31a460f0-4ce3-46fe-8a73-d99c124f2eab.png",
  "/lovable-uploads/2dbd548d-f840-4353-8dd0-ec28e23be25b.png",
  "/lovable-uploads/ce153937-5e4f-4263-b005-ddab0c3a6033.png",
  "/lovable-uploads/2f969180-e8a5-459d-a2e5-52565ee1c122.png",
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Our Portfolio</h2>
          <p className="text-muted-foreground mt-2">A curated selection of our latest bespoke projects.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {imgs.map((src) => (
            <img key={src} src={src} alt="Project showcase" className="w-full h-64 object-cover rounded-md border hover:shadow-md hover-scale" loading="lazy"/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
