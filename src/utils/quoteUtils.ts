import { Quote, LineItem } from '@/types/quotation';
import { quotesStorage } from './localStorage';

export const generateQuoteNumber = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const calculateLineTotal = (quantity: number, rate: number): number => {
  return quantity * rate;
};

export const calculateGrandTotal = (lineItems: LineItem[]): number => {
  return lineItems.reduce((sum, item) => sum + item.total, 0);
};

export const calculateBalance = (grandTotal: number, receivedAmount: number): number => {
  return grandTotal - receivedAmount;
};

export const createNewQuote = (): Partial<Quote> => {
  const today = new Date().toISOString().split('T')[0];
  return {
    id: crypto.randomUUID(),
    quoteNo: generateQuoteNumber(),
    date: today,
    customerReference: '',
    terms: '',
    quotationTitle: 'Quotation',
    lineItems: [{
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
      total: 0
    }],
    grandTotal: 0,
    receivedAmount: 0,
    balance: 0,
    isDraft: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const seedExampleQuote = (): void => {
  const existingQuotes = quotesStorage.getAll();
  if (existingQuotes.length === 0) {
    const exampleQuote: Quote = {
      id: crypto.randomUUID(),
      quoteNo: '34764',
      date: '2025-04-14',
      customerReference: 'Customer Ahmad sahib 243-R',
      terms: 'Wardrobe',
      quotationTitle: 'Quotation',
      businessInfo: {
        name: 'Signature Home Style',
        tagline: 'We Deal In All Kinds of Wood Works',
        address: 'Bhatta Chowk Bedian Road LHR',
        phone: '03004763229'
      },
      lineItems: [
        {
          id: crypto.randomUUID(),
          description: 'Wardrobe Boxing Patex Laminated Sheets With Aluminium Profile + Glass Shutters Assembled In Chinese Hardware with Profile Lights Without Accessories',
          quantity: 54,
          rate: 3000,
          total: 162000
        },
        {
          id: crypto.randomUUID(),
          description: 'Partition wall with door',
          quantity: 1,
          rate: 200000,
          total: 200000
        },
        {
          id: crypto.randomUUID(),
          description: 'Lounge cabinets with ss gold powder coated frames & 4 chairs without marble',
          quantity: 1,
          rate: 343000,
          total: 343000
        }
      ],
      grandTotal: 705000,
      receivedAmount: 0,
      balance: 705000,
      isDraft: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    quotesStorage.save(exampleQuote);
  }
};