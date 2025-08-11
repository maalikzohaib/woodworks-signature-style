import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuotationDisplay from '@/components/quotation/QuotationDisplay';
import { quotesStorage } from '@/utils/localStorage';
import { seedExampleQuote } from '@/utils/quoteUtils';
import { Quote } from '@/types/quotation';

const QuotationPage = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Seed example quote if no quotes exist
    seedExampleQuote();
    
    // Get latest published quote
    const latestQuote = quotesStorage.getLatestPublished();
    setQuote(latestQuote || null);
  }, []);

  if (!quote) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Quotation Available</h1>
          <p className="text-muted-foreground mb-6">No published quotations found.</p>
          <Link to="/admin/login" className="text-primary hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <QuotationDisplay quote={quote} />
      <footer className="bg-secondary py-4 print:hidden">
        <div className="container mx-auto text-center">
          <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-primary">
            Admin
          </Link>
        </div>
      </footer>
    </>
  );
};

export default QuotationPage;