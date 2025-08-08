const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-secondary/50">
      <div className="container mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Signature Home Style. All rights reserved.</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#portfolio" className="hover:underline">Portfolio</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
