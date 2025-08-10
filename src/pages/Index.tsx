import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Portfolio from "@/components/site/Portfolio";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingActions from "@/components/site/FloatingActions";
import { useEffect } from "react";
import { MessageSquare, Ruler, Hammer, CheckCircle } from "lucide-react";

const Index = () => {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Signature Home Style',
      url: '/',
      logo: '/lovable-uploads/c44817cb-43d3-4d0d-9cce-88f368f4dd91.png',
      sameAs: []
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
        <Hero />
        <section id="about" className="container mx-auto py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">About Our Legacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At Signature Home Style, we believe that exceptional craftsmanship is an art form passed down through generations. 
                  With over a decade of experience in bespoke carpentry and interior design, our master craftsmen combine traditional 
                  techniques with contemporary innovation.
                </p>
                <p>
                  From the initial consultation to the final installation, we manage every aspect of your project with meticulous 
                  attention to detail. Our commitment to excellence has earned us the trust of discerning homeowners who demand 
                  nothing but the finest quality.
                </p>
                <p>
                  Whether it's a statement entrance door, a luxury kitchen, or custom wardrobes, we create spaces that reflect 
                  your unique style and stand the test of time. Every piece is handcrafted with precision and passion.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="/lovable-uploads/184542e9-556a-4893-a0a6-c633732f54c3.png" 
                    alt="Grand door with marble inlay" 
                    className="h-48 w-full object-cover rounded-xl border shadow-md hover-scale animate-fade-in" 
                    style={{ animationDelay: '0.1s' }}
                    loading="lazy"
                  />
                  <img 
                    src="/lovable-uploads/cdb6a938-ca92-47a5-9436-f2e2a6c401a6.png" 
                    alt="Modern luxury kitchen" 
                    className="h-64 w-full object-cover rounded-xl border shadow-md hover-scale animate-fade-in" 
                    style={{ animationDelay: '0.3s' }}
                    loading="lazy"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img 
                    src="/lovable-uploads/08ae6eeb-6923-4707-be39-f764392d0da1.png" 
                    alt="Custom cane cabinet" 
                    className="h-64 w-full object-cover rounded-xl border shadow-md hover-scale animate-fade-in" 
                    style={{ animationDelay: '0.2s' }}
                    loading="lazy"
                  />
                  <img 
                    src="/lovable-uploads/937b1066-76f3-4a52-99b4-93afe17a9e3c.png" 
                    alt="Elegant console and mirror" 
                    className="h-48 w-full object-cover rounded-xl border shadow-md hover-scale animate-fade-in" 
                    style={{ animationDelay: '0.4s' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Services />
        <section id="process" className="container mx-auto py-16 md:py-24">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Our Process</h2>
            <p className="text-muted-foreground mt-2">A simple and transparent path to beautiful results.</p>
          </header>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { t: 'Consultation', d: 'We understand your needs and preferences.', Icon: MessageSquare },
              { t: 'Design & Pricing', d: 'Concepts, material selection and timelines.', Icon: Ruler },
              { t: 'Craftsmanship', d: 'Precision fabrication with QA checkpoints.', Icon: Hammer },
              { t: 'Installation', d: 'Seamless on-site fitout and final finishing.', Icon: CheckCircle },
            ].map((s) => (
              <div key={s.t} className="rounded-lg border bg-card p-6 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-accent flex items-center justify-center text-primary">
                  <s.Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
        <Portfolio />
        <Contact />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
};

export default Index;
