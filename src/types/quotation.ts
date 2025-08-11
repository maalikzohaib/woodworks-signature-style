export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
}

export interface Quote {
  id: string;
  quoteNo: string;
  date: string;
  customerReference: string;
  terms: string;
  quotationTitle: string;
  businessInfo: BusinessInfo;
  lineItems: LineItem[];
  grandTotal: number;
  receivedAmount: number;
  balance: number;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}