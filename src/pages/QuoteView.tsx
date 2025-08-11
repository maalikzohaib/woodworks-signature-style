import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2 } from "lucide-react";
import QuotationDisplay from "@/components/quotation/QuotationDisplay";
import { Quote } from "@/types/quotation";
import { getQuoteById } from "@/utils/localStorage";
import { isAuthenticated } from "@/utils/auth";

const QuoteView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }

    if (id) {
      const foundQuote = getQuoteById(id);
      if (foundQuote) {
        setQuote(foundQuote);
      } else {
        navigate("/admin/dashboard");
      }
    }
    setLoading(false);
  }, [id, navigate]);

  if (!isAuthenticated() || loading) {
    return null;
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quote Not Found</h1>
          <Button onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b bg-card p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="font-semibold">Quote #{quote.quoteNo}</h1>
              <p className="text-sm text-muted-foreground">Viewing quotation</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate(`/quote/edit/${quote.id}`)}
            variant="outline"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Quote
          </Button>
        </div>
      </div>

      {/* Quote Display */}
      <div className="py-8">
        <QuotationDisplay quote={quote} />
      </div>
    </div>
  );
};

export default QuoteView;