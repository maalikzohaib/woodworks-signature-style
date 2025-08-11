import { LineItem } from "@/types/quotation";

export const generateQuoteNumber = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const calculateLineTotal = (quantity: number, rate: number): number => {
  return quantity * rate;
};

export const calculateGrandTotal = (lineItems: LineItem[]): number => {
  return lineItems.reduce((total, item) => total + item.total, 0);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB');
};

export const downloadPDF = async (elementId: string, filename: string): Promise<void> => {
  const { default: html2pdf } = await import('html2pdf.js');
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
};