import { Button } from "@/components/ui/button";

const imgs = [
  "/lovable-uploads/184542e9-556a-4893-a0a6-c633732f54c3.png",
  "/lovable-uploads/08ae6eeb-6923-4707-be39-f764392d0da1.png",
  "/lovable-uploads/937b1066-76f3-4a52-99b4-93afe17a9e3c.png",
  "/lovable-uploads/48f80958-44a1-44aa-b9c9-b62bf8a9d961.png",
  "/lovable-uploads/82e34e89-e0fc-4782-b8c5-0c95c4a6bc94.png",
  "/lovable-uploads/23826db3-f25f-45f0-9327-f417e8b2a558.png",
  "/lovable-uploads/4ffcbeac-9da1-4ef7-a39d-da83ecff25de.png",
  "/lovable-uploads/5b8844c3-1d09-4d9b-bd53-d6b1f7f4c79d.png",
  "/lovable-uploads/cdb6a938-ca92-47a5-9436-f2e2a6c401a6.png",
  "/lovable-uploads/12042c60-391a-4506-be6a-706b62772792.png",
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Our Portfolio</h2>
          <p className="text-muted-foreground mt-2">A curated selection of our latest bespoke projects.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button asChild variant="hero">
              <a href="#contact" aria-label="Request full portfolio">Request Full Portfolio</a>
            </Button>
          </div>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...new Set(imgs)].map((src) => (
            <img key={src} src={src} alt="Project showcase by Signature Home Style" className="w-full h-64 object-cover rounded-md border hover:shadow-md hover-scale" loading="lazy"/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
