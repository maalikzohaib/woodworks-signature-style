import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Portfolio from "@/components/site/Portfolio";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";

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
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">About Our Legacy</h2>
              <p className="text-muted-foreground">We are a team of master carpenters and interior specialists delivering timeless spaces with meticulous attention to detail. From concept to installation, we manage the entire journey.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/lovable-uploads/3f95bb0a-97a0-4485-bde9-9e21213b47f6.png" alt="Classic staircase with ornate railing" className="rounded-lg h-40 w-full object-cover" loading="lazy"/>
              <img src="/lovable-uploads/06271bd1-1475-47ce-9379-3432783d51af.png" alt="Elegant bedroom dresser with mirror" className="rounded-lg h-40 w-full object-cover" loading="lazy"/>
              <img src="/lovable-uploads/31a460f0-4ce3-46fe-8a73-d99c124f2eab.png" alt="Wall panelling and ceiling detail" className="rounded-lg h-40 w-full object-cover" loading="lazy"/>
              <img src="/lovable-uploads/ce153937-5e4f-4263-b005-ddab0c3a6033.png" alt="Console table with lamp and decor" className="rounded-lg h-40 w-full object-cover" loading="lazy"/>
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
              { t: 'Consultation', d: 'We understand your needs and preferences.' },
              { t: 'Design & Pricing', d: 'Concepts, material selection and timelines.' },
              { t: 'Craftsmanship', d: 'Precision fabrication with QA checkpoints.' },
              { t: 'Installation', d: 'Seamless on-site fitout and final finishing.' },
            ].map((s) => (
              <div key={s.t} className="rounded-lg border bg-card p-6 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-accent flex items-center justify-center font-semibold">{s.t.charAt(0)}</div>
                <h3 className="font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
