import { Quote, AdminCredentials, BusinessInfo } from '@/types/quotation';

const QUOTES_KEY = 'carpenter_quotes';
const ADMIN_CREDS_KEY = 'admin_credentials';
const BUSINESS_INFO_KEY = 'business_info';
const MAX_QUOTES = 10;

export const quotesStorage = {
  getAll: (): Quote[] => {
    const quotes = localStorage.getItem(QUOTES_KEY);
    return quotes ? JSON.parse(quotes) : [];
  },

  save: (quote: Quote): void => {
    const quotes = quotesStorage.getAll();
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
  },

  getById: (id: string): Quote | undefined => {
    const quotes = quotesStorage.getAll();
    return quotes.find(q => q.id === id);
  },

  getLatestPublished: (): Quote | undefined => {
    const quotes = quotesStorage.getAll();
    return quotes.find(q => !q.isDraft);
  },

  delete: (id: string): void => {
    const quotes = quotesStorage.getAll();
    const filtered = quotes.filter(q => q.id !== id);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(filtered));
  },

  getRecent: (limit: number = 10): Quote[] => {
    const quotes = quotesStorage.getAll();
    return quotes.slice(0, limit);
  }
};

export const adminStorage = {
  getCredentials: (): AdminCredentials | null => {
    const creds = localStorage.getItem(ADMIN_CREDS_KEY);
    return creds ? JSON.parse(creds) : null;
  },

  saveCredentials: (credentials: AdminCredentials): void => {
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(credentials));
  },

  clearCredentials: (): void => {
    localStorage.removeItem(ADMIN_CREDS_KEY);
  }
};

export const businessInfoStorage = {
  get: (): BusinessInfo => {
    const info = localStorage.getItem(BUSINESS_INFO_KEY);
    return info ? JSON.parse(info) : {
      name: 'Signature Home Style',
      tagline: 'We Deal In All Kinds of Wood Works',
      address: 'Bhatta Chowk Bedian Road LHR',
      phone: '03004763229'
    };
  },

  save: (info: BusinessInfo): void => {
    localStorage.setItem(BUSINESS_INFO_KEY, JSON.stringify(info));
  }
};