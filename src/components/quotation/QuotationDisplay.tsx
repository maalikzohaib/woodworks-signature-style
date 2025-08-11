import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { Quote } from "@/types/quotation";
import { formatCurrency, formatDate, downloadPDF } from "@/utils/quoteUtils";

interface QuotationDisplayProps {
  quote: Quote;
}

const QuotationDisplay = ({ quote }: QuotationDisplayProps) => {
  const handleDownloadPDF = () => {
    downloadPDF("quotation-content", `Quote-${quote.quoteNo}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div id="quotation-content" className="bg-card border rounded-lg p-8 print:border-0 print:shadow-none">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-primary">{quote.businessInfo.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{quote.businessInfo.tagline}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {quote.businessInfo.address} — Phone: {quote.businessInfo.phone}
          </p>
        </div>

        {/* Quote Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{quote.quotationTitle}</h2>
            <div className="space-y-2">
              <p><strong>Quote No:</strong> {quote.quoteNo}</p>
              <p><strong>Date:</strong> {formatDate(quote.date)}</p>
              <p><strong>Customer Reference:</strong> {quote.customerReference}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Terms:</h3>
            <p className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">{quote.terms}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left">Description</th>
                <th className="border border-border p-3 text-center">Quantity</th>
                <th className="border border-border p-3 text-right">Rate</th>
                <th className="border border-border p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-border p-3">{item.description}</td>
                  <td className="border border-border p-3 text-center">{item.quantity}</td>
                  <td className="border border-border p-3 text-right">{formatCurrency(item.rate)}</td>
                  <td className="border border-border p-3 text-right">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="ml-auto max-w-sm space-y-2">
          <div className="flex justify-between py-2 border-t">
            <span className="font-semibold">Grand Total:</span>
            <span className="font-bold text-lg">{formatCurrency(quote.grandTotal)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Received Amount:</span>
            <span>{formatCurrency(quote.receivedAmount)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-b font-semibold">
            <span>Balance:</span>
            <span className="text-primary">{formatCurrency(quote.balance)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center print:hidden">
        <Button onClick={handleDownloadPDF} variant="hero" size="lg">
          <Download className="h-5 w-5" />
          Download PDF
        </Button>
        <Button onClick={handlePrint} variant="outline" size="lg">
          <Printer className="h-5 w-5" />
          Print
        </Button>
      </div>
    </div>
  );
};

export default QuotationDisplay;