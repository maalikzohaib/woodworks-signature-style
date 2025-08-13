import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import { Quote } from "@/types/quotation";
import { formatCurrency, formatDate, downloadPDF } from "@/utils/quoteUtils";
import signatureLogo from "/lovable-uploads/ec97b138-50b8-4a22-abef-525ffe71a0b4.png";

interface QuotationDisplayProps {
  quote: Quote;
}

const QuotationDisplay = ({ quote }: QuotationDisplayProps) => {
  const handleDownloadPDF = () => {
    const fileName = `${quote.customerName || 'Quote'}-${quote.quoteNo}.pdf`;
    downloadPDF("quotation-content", fileName);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const currentUrl = window.location.href.replace('/admin', '');
    const message = `Hi! Please find your quotation from Signature Home Style below:\n\n${currentUrl}\n\nVisit our website: https://signnaturehomestyle.store`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div id="quotation-content" className="bg-card border border-border rounded-lg shadow-lg print:border-0 print:shadow-none relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
          <img 
            src={signatureLogo} 
            alt="Watermark" 
            className="w-96 h-64 object-contain"
          />
        </div>
        
        {/* Header */}
        <div className="relative z-10 border-b border-border p-6">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={signatureLogo} 
              alt="Signature Home Style" 
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className="text-lg text-muted-foreground font-medium">
                {quote.businessInfo.tagline}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{quote.businessInfo.address}</p>
            <p>Phone: {quote.businessInfo.phone}</p>
            <p>Website: https://signnaturehomestyle.store</p>
          </div>
        </div>

        {/* Quote Information */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">{quote.quotationTitle}</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold min-w-[100px]">Quote No:</span>
                  <span>{quote.quoteNo}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold min-w-[100px]">Date:</span>
                  <span>{formatDate(quote.date)}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold min-w-[100px]">Customer:</span>
                  <span>{quote.customerName}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold min-w-[100px]">Address:</span>
                  <span className="text-sm leading-relaxed">{quote.customerAddress}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold min-w-[100px]">Reference:</span>
                  <span>{quote.customerReference}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h3 className="font-bold text-primary mb-3">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Grand Total:</span>
                  <span className="font-bold text-primary">{formatCurrency(quote.grandTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Received Amount:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(quote.receivedAmount)}</span>
                </div>
                <div className="flex justify-between border-t border-primary/20 pt-2">
                  <span className="font-bold">Outstanding Balance:</span>
                  <span className="font-bold text-primary">{formatCurrency(quote.balance)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Work Items & Pricing</h3>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-3 text-left font-semibold">Description</th>
                    <th className="p-3 text-center font-semibold">Qty</th>
                    <th className="p-3 text-center font-semibold">Unit</th>
                    <th className="p-3 text-right font-semibold">Rate</th>
                    <th className="p-3 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                      <td className="p-3 border-b border-border">
                        <div className="text-sm leading-relaxed">{item.description}</div>
                      </td>
                      <td className="p-3 text-center border-b border-border">{item.quantity}</td>
                      <td className="p-3 text-center border-b border-border">{item.unit}</td>
                      <td className="p-3 text-right border-b border-border">{formatCurrency(item.rate)}</td>
                      <td className="p-3 text-right border-b border-border font-semibold text-primary">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms & Conditions - Only show if not empty */}
          {quote.terms && quote.terms.trim() && (
            <div className="border-t border-border pt-6">
              <h3 className="font-bold text-primary mb-3">Terms & Conditions</h3>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {quote.terms}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center print:hidden">
        <Button onClick={handleDownloadPDF} variant="default" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handlePrint} variant="outline" size="lg">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button onClick={handleShare} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
          <Share2 className="h-4 w-4 mr-2" />
          Share Quote
        </Button>
      </div>
    </div>
  );
};

export default QuotationDisplay;