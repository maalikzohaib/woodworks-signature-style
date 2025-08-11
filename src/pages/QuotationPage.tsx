import { useEffect, useState } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import QuotationDisplay from "@/components/quotation/QuotationDisplay";
import { Quote } from "@/types/quotation";
import { getLatestPublishedQuote, initializeExampleData } from "@/utils/localStorage";

const QuotationPage = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    initializeExampleData();
    const latestQuote = getLatestPublishedQuote();
    setQuote(latestQuote);
  }, []);

  if (!quote) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">No Quotation Available</h1>
            <p className="text-muted-foreground">No published quotation found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <QuotationDisplay quote={quote} />
      </main>
      <Footer />
    </div>
  );
};

export default QuotationPage;