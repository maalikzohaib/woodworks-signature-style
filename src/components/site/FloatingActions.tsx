import { Button } from "@/components/ui/button";
import { Images, MessageCircle } from "lucide-react";

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Button
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => window.open('https://wa.me/YOUR_PHONE_NUMBER', '_blank')}
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        Chat
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => window.location.href = '/portfolio'}
      >
        <Images className="h-5 w-5 mr-2" />
        Gallery
      </Button>
    </div>
  );
};

export default FloatingActions;