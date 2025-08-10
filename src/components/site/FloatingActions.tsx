import { Button } from "@/components/ui/button";
import { Images, MessageCircle } from "lucide-react";

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a href="https://wa.me/923004763229" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <Button variant="hero" size="lg" className="shadow-md">
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </Button>
      </a>
      <a href="/portfolio" aria-label="View portfolio">
        <Button variant="premium" size="lg" className="shadow-md">
          <Images className="h-5 w-5" /> Portfolio
        </Button>
      </a>
    </div>
  );
};

export default FloatingActions;
