import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuoteForm from '@/components/quotation/QuoteForm';
import { authUtils } from '@/utils/auth';

const QuoteNew = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  if (!authUtils.isAuthenticated()) {
    return null;
  }

  return <QuoteForm />;
};

export default QuoteNew;