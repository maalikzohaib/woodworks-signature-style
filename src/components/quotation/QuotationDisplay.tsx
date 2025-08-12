import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import { Quote } from "@/types/quotation";
import { formatCurrency, formatDate, downloadPDF } from "@/utils/quoteUtils";
import signatureLogo from "@/assets/signature-logo.png";

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

  const handleShare = () => {
    const currentUrl = window.location.href;
    const whatsappMessage = `Check out this quotation from Signature Home Style: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div id="quotation-content" className="bg-gradient-to-br from-card to-card/80 border-2 border-primary/20 rounded-2xl p-10 shadow-2xl print:border-0 print:shadow-none relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary/60 to-primary"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary/60 to-primary"></div>
        
        {/* Header with Logo and Watermark */}
        <div className="relative">
          {/* Large Center Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
            <img 
              src={signatureLogo} 
              alt="Signature Home Style Watermark" 
              className="w-[600px] h-[400px] object-contain"
            />
          </div>
          
          <div className="text-center border-b-2 border-primary/20 pb-8 mb-8 relative z-10">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                <img 
                  src={signatureLogo} 
                  alt="Signature Home Style Logo" 
                  className="w-20 h-20 object-contain relative z-10"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {quote.businessInfo.name}
                </h1>
                <p className="text-xl text-muted-foreground font-medium mt-1">{quote.businessInfo.tagline}</p>
              </div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <p className="text-sm text-muted-foreground font-medium">
                📍 {quote.businessInfo.address}
              </p>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                📞 Phone: {quote.businessInfo.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
              📋 {quote.quotationTitle}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Quote No:</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full text-sm font-medium">{quote.quoteNo}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Date:</span>
                <span className="text-muted-foreground">{formatDate(quote.date)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Customer:</span>
                <span className="font-medium">{quote.customerName}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Address:</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{quote.customerAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary min-w-[120px]">Reference:</span>
                <span className="bg-secondary/50 px-3 py-1 rounded-full text-sm">{quote.customerReference}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-6 border border-secondary/20">
            <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
              📝 Terms & Conditions
            </h3>
            <div className="bg-card/80 p-4 rounded-lg border border-secondary/20">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{quote.terms}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            🛠️ Work Items & Pricing
          </h3>
          <div className="overflow-x-auto rounded-xl border-2 border-primary/20 shadow-lg">
            <table className="w-full border-collapse bg-card">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <th className="p-4 text-left font-bold">Description</th>
                  <th className="p-4 text-center font-bold">Qty</th>
                  <th className="p-4 text-center font-bold">Unit</th>
                  <th className="p-4 text-right font-bold">Rate</th>
                  <th className="p-4 text-right font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {quote.lineItems.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-card' : 'bg-primary/5'} hover:bg-primary/10 transition-colors`}>
                    <td className="p-4 border-b border-primary/10">
                      <div className="font-medium text-sm leading-relaxed">{item.description}</div>
                    </td>
                    <td className="p-4 text-center border-b border-primary/10 font-medium">{item.quantity}</td>
                    <td className="p-4 text-center border-b border-primary/10 font-medium">{item.unit}</td>
                    <td className="p-4 text-right border-b border-primary/10 font-medium">{formatCurrency(item.rate)}</td>
                    <td className="p-4 text-right border-b border-primary/10 font-bold text-primary">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="ml-auto max-w-md">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border-2 border-primary/20 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              💰 Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-primary/20">
                <span className="font-semibold text-muted-foreground">Grand Total:</span>
                <span className="font-bold text-xl text-primary">{formatCurrency(quote.grandTotal)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-muted-foreground">Received Amount:</span>
                <span className="font-semibold text-green-600">{formatCurrency(quote.receivedAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t-2 border-primary/30 bg-primary/5 rounded-lg px-3">
                <span className="font-bold text-primary">Outstanding Balance:</span>
                <span className="font-bold text-xl text-primary">{formatCurrency(quote.balance)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center print:hidden">
        <Button onClick={handleDownloadPDF} variant="hero" size="lg" className="shadow-lg">
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handlePrint} variant="outline" size="lg" className="shadow-lg">
          <Printer className="h-5 w-5 mr-2" />
          Print
        </Button>
        <Button onClick={handleShare} variant="default" size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
          <Share2 className="h-5 w-5 mr-2" />
          Share on WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default QuotationDisplay;