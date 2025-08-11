import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuoteForm from '@/components/quotation/QuoteForm';
import { authUtils } from '@/utils/auth';

const QuoteEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  if (!authUtils.isAuthenticated()) {
    return null;
  }

  return <QuoteForm quoteId={id} />;
};

export default QuoteEdit;