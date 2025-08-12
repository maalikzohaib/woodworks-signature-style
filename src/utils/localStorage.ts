import { Quote, AdminCredentials, BusinessInfo } from "@/types/quotation";

const QUOTES_KEY = "carpenter_quotes";
const ADMIN_KEY = "carpenter_admin";
const BUSINESS_KEY = "carpenter_business";
const MAX_QUOTES = 10;

export const getQuotes = (): Quote[] => {
  const stored = localStorage.getItem(QUOTES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveQuote = (quote: Quote): void => {
  const quotes = getQuotes();
  const existingIndex = quotes.findIndex(q => q.id === quote.id);
  
  if (existingIndex >= 0) {
    quotes[existingIndex] = quote;
  } else {
    quotes.unshift(quote);
    if (quotes.length > MAX_QUOTES) {
      quotes.splice(MAX_QUOTES);
    }
  }
  
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
};

export const deleteQuote = (id: string): void => {
  const quotes = getQuotes().filter(q => q.id !== id);
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
};

export const getQuoteById = (id: string): Quote | null => {
  const quotes = getQuotes();
  return quotes.find(q => q.id === id) || null;
};

export const getLatestPublishedQuote = (): Quote | null => {
  const quotes = getQuotes();
  return quotes.find(q => !q.isDraft) || null;
};

export const saveAdminCredentials = (credentials: AdminCredentials): void => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(credentials));
};

export const getAdminCredentials = (): AdminCredentials | null => {
  const stored = localStorage.getItem(ADMIN_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const clearAdminCredentials = (): void => {
  localStorage.removeItem(ADMIN_KEY);
};

export const saveBusinessInfo = (businessInfo: BusinessInfo): void => {
  localStorage.setItem(BUSINESS_KEY, JSON.stringify(businessInfo));
};

export const getBusinessInfo = (): BusinessInfo => {
  const stored = localStorage.getItem(BUSINESS_KEY);
  return stored ? JSON.parse(stored) : {
    name: "Signature Home Style",
    tagline: "We Deal In All Kinds of Wood Works",
    address: "Bhatta Chowk Bedian Road LHR",
    phone: "03004763229"
  };
};

// Initialize with example data if no quotes exist
export const initializeExampleData = (): void => {
  const quotes = getQuotes();
  if (quotes.length === 0) {
    const exampleQuote: Quote = {
      id: "example-1",
    quoteNo: "34764",
    date: "2025-04-14",
    customerName: "Ahmad sahib",
    customerAddress: "243-R, Lahore",
    customerReference: "Customer Ahmad sahib 243-R",
    terms: "Wardrobe",
      quotationTitle: "Quotation",
      lineItems: [
        {
          id: "item-1",
          description: "Wardrobe Boxing Patex Laminated Sheets With Aluminium Profile + Glass Shutters Assembled In Chinese Hardware with Profile Lights Without Accessories",
          quantity: 54,
          unit: "Sft",
          rate: 3000,
          total: 162000
        },
        {
          id: "item-2",
          description: "Partition wall with door",
          quantity: 1,
          unit: "Pcs",
          rate: 200000,
          total: 200000
        },
        {
          id: "item-3",
          description: "Lounge cabinets with ss gold powder coated frames & 4 chairs without marble",
          quantity: 1,
          unit: "Set",
          rate: 343000,
          total: 343000
        }
      ],
      grandTotal: 705000,
      receivedAmount: 0,
      balance: 705000,
      businessInfo: getBusinessInfo(),
      isDraft: false,
      createdAt: new Date().toISOString()
    };
    
    saveQuote(exampleQuote);
  }
};