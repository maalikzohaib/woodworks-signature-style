import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuoteForm from "@/components/quotation/QuoteForm";
import { isAuthenticated } from "@/utils/auth";

const QuoteNew = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null;
  }

  return <QuoteForm mode="create" />;
};

export default QuoteNew;