import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuoteForm from "@/components/quotation/QuoteForm";
import { Quote } from "@/types/quotation";
import { getQuoteById } from "@/utils/localStorage";
import { isAuthenticated } from "@/utils/auth";

const QuoteEdit = () => {
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
          <button 
            onClick={() => navigate("/admin/dashboard")}
            className="text-primary hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <QuoteForm initialQuote={quote} mode="edit" />;
};

export default QuoteEdit;