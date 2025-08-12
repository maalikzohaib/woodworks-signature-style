export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
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
  customerName: string;
  customerAddress: string;
  customerReference: string;
  terms: string;
  quotationTitle: string;
  lineItems: LineItem[];
  grandTotal: number;
  receivedAmount: number;
  balance: number;
  businessInfo: BusinessInfo;
  isDraft: boolean;
  createdAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
  createdAt: string;
}