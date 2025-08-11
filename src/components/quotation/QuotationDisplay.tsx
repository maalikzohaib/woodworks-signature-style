import { Quote } from '@/types/quotation';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface QuotationDisplayProps {
  quote: Quote;
}

const QuotationDisplay = ({ quote }: QuotationDisplayProps) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('quotation-content');
    const opt = {
      margin: 1,
      filename: `quotation-${quote.quoteNo}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div id="quotation-content" className="bg-white shadow-lg rounded-lg p-8 mb-6 print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="border-b-2 border-primary pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-primary">{quote.businessInfo.name}</h1>
                <p className="text-lg text-muted-foreground mt-1">{quote.businessInfo.tagline}</p>
                <div className="mt-4 text-sm">
                  <p>{quote.businessInfo.address}</p>
                  <p>Phone: {quote.businessInfo.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-semibold">{quote.quotationTitle}</h2>
                <p className="text-sm text-muted-foreground mt-1">Quote #{quote.quoteNo}</p>
              </div>
            </div>
          </div>

          {/* Quote Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Quote Details</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Date:</strong> {new Date(quote.date).toLocaleDateString()}</p>
                <p><strong>Customer Reference:</strong> {quote.customerReference}</p>
                <p><strong>Terms:</strong> {quote.terms}</p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-secondary">
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {quote.lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">Rs. {item.rate.toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">Rs. {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="font-semibold">Grand Total:</span>
                  <span className="font-semibold">Rs. {quote.grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Received Amount:</span>
                  <span>Rs. {quote.receivedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-t-2 border-primary font-bold">
                  <span>Balance:</span>
                  <span>Rs. {quote.balance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center print:hidden">
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuotationDisplay;