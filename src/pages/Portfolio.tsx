import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import FloatingActions from "@/components/site/FloatingActions";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect } from "react";

const allImages = [
  "/lovable-uploads/02330f2f-5347-409c-8984-c0eeebd30bcb.png",
  "/lovable-uploads/06271bd1-1475-47ce-9379-3432783d51af.png",
  "/lovable-uploads/08ae6eeb-6923-4707-be39-f764392d0da1.png",
  "/lovable-uploads/0cc0c1ca-1d76-425d-bcfc-33af96cb9636.png",
  "/lovable-uploads/184542e9-556a-4893-a0a6-c633732f54c3.png",
  "/lovable-uploads/23826db3-f25f-45f0-9327-f417e8b2a558.png",
  "/lovable-uploads/2dbd548d-f840-4353-8dd0-ec28e23be25b.png",
  "/lovable-uploads/2f969180-e8a5-459d-a2e5-52565ee1c122.png",
  "/lovable-uploads/3eaf4949-90bf-4796-bc9f-41ff5a85214d.png",
  "/lovable-uploads/3f95bb0a-97a0-4485-bde9-9e21213b47f6.png",
  "/lovable-uploads/405fa836-d058-4bcf-bef0-c50e74d22a57.png",
  "/lovable-uploads/48f80958-44a1-44aa-b9c9-b62bf8a9d961.png",
  "/lovable-uploads/4ffcbeac-9da1-4ef7-a39d-da83ecff25de.png",
  "/lovable-uploads/5439a2f7-83bf-4882-aec8-1b16656a7cb3.png",
  "/lovable-uploads/5b8844c3-1d09-4d9b-bd53-d6b1f7f4c79d.png",
  "/lovable-uploads/5ef295c3-a158-4808-91da-c8219da5aeab.png",
  "/lovable-uploads/7824fa36-4b1b-4593-b60d-44f6625e161a.png",
  "/lovable-uploads/784588ae-d6ca-4f31-8982-6a2dfef99425.png",
  "/lovable-uploads/82e34e89-e0fc-4782-b8c5-0c95c4a6bc94.png",
  "/lovable-uploads/937b1066-76f3-4a52-99b4-93afe17a9e3c.png",
  "/lovable-uploads/9bcd18ae-b9d7-4ad6-b2e3-c34c792413e8.png",
  "/lovable-uploads/ChatGPT Image Aug 1, 2025, 10_31_05 PM.png",
  "/lovable-uploads/ChatGPT Image Aug 12, 2025, 10_24_08 AM.png",
  "/lovable-uploads/ChatGPT Image Aug 28, 2025, 11_22_00 AM.png",
  "/lovable-uploads/ChatGPT Image Aug 8, 2025, 02_20_05 PM.png",
  "/lovable-uploads/ChatGPT Image Sep 1, 2025, 03_34_17 PM.png",
  "/lovable-uploads/ChatGPT Image Sep 12, 2025, 01_26_50 PM.png",
  "/lovable-uploads/ChatGPT Image Sep 5, 2025, 04_36_52 PM.png",
  "/lovable-uploads/c6b08855-17b7-4bec-a503-629686ad566a.png",
  "/lovable-uploads/cdb6a938-ca92-47a5-9436-f2e2a6c401a6.png",
  "/lovable-uploads/e983dbc3-3a71-4cf4-8e36-a7293e306b78.png",
];

const Portfolio = () => {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Portfolio - Signature Home Style',
      description: 'View our complete collection of bespoke carpentry and interior design projects',
      url: '/portfolio',
      mainEntity: {
        '@type': 'Organization',
        name: 'Signature Home Style'
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-gradient-to-r from-primary/20 to-accent/20 py-16 md:py-24">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Complete Portfolio</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our full collection of bespoke carpentry and interior design projects, 
              showcasing our commitment to excellence and attention to detail.
            </p>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allImages.map((src, index) => (
                <Dialog key={src}>
                  <DialogTrigger asChild>
                    <div className="group cursor-pointer">
                      <img 
                        src={src} 
                        alt={`Signature Home Style project ${index + 1}`} 
                        className="w-full h-64 object-cover rounded-lg border shadow-md hover:shadow-lg hover-scale transition-all duration-300" 
                        loading="lazy"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full h-auto">
                    <img 
                      src={src} 
                      alt={`Signature Home Style project ${index + 1}`} 
                      className="w-full h-auto object-contain rounded-md"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
};

export default Portfolio;