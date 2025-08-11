import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuotationDisplay from '@/components/quotation/QuotationDisplay';
import { authUtils } from '@/utils/auth';
import { quotesStorage } from '@/utils/localStorage';
import { Quote } from '@/types/quotation';
import { Edit, ArrowLeft } from 'lucide-react';

const QuoteView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    if (id) {
      const foundQuote = quotesStorage.getById(id);
      setQuote(foundQuote || null);
    }
  }, [navigate, id]);

  if (!authUtils.isAuthenticated()) {
    return null;
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quote Not Found</h1>
          <Link to="/admin/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold">View Quote</h1>
          <div className="flex gap-2">
            <Link to={`/admin/quote/edit/${quote.id}`}>
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Quote
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
        <QuotationDisplay quote={quote} />
      </div>
    </div>
  );
};

export default QuoteView;