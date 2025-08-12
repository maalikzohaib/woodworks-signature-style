import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Copy, Trash2, Save, FileText, ArrowLeft } from "lucide-react";
import { Quote, LineItem, BusinessInfo } from "@/types/quotation";
import { generateQuoteNumber, calculateLineTotal, calculateGrandTotal, formatCurrency } from "@/utils/quoteUtils";
import { saveQuote, getBusinessInfo, saveBusinessInfo } from "@/utils/localStorage";
import { toast } from "sonner";
import signatureLogo from "@/assets/signature-logo.png";

interface QuoteFormProps {
  initialQuote?: Quote;
  mode: "create" | "edit";
}

const QuoteForm = ({ initialQuote, mode }: QuoteFormProps) => {
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(getBusinessInfo());
  const [quoteNo, setQuoteNo] = useState(initialQuote?.quoteNo || generateQuoteNumber());
  const [date, setDate] = useState(initialQuote?.date || new Date().toISOString().split('T')[0]);
  const [customerReference, setCustomerReference] = useState(initialQuote?.customerReference || "");
  const [terms, setTerms] = useState(initialQuote?.terms || "");
  const [quotationTitle, setQuotationTitle] = useState(initialQuote?.quotationTitle || "Quotation");
  const [lineItems, setLineItems] = useState<LineItem[]>(
    initialQuote?.lineItems || [{
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unit: "Sft",
      rate: 0,
      total: 0
    }]
  );
  const [customerName, setCustomerName] = useState(initialQuote?.customerName || "");
  const [customerAddress, setCustomerAddress] = useState(initialQuote?.customerAddress || "");
  const [receivedAmount, setReceivedAmount] = useState(initialQuote?.receivedAmount || 0);

  const grandTotal = calculateGrandTotal(lineItems);
  const balance = grandTotal - receivedAmount;

  useEffect(() => {
    // Update line item totals when quantity or rate changes
    setLineItems(items => 
      items.map(item => ({
        ...item,
        total: calculateLineTotal(item.quantity, item.rate)
      }))
    );
  }, []);

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.total = calculateLineTotal(
              field === 'quantity' ? Number(value) : item.quantity,
              field === 'rate' ? Number(value) : item.rate
            );
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unit: "Sft",
      rate: 0,
      total: 0
    };
    setLineItems([...lineItems, newItem]);
  };

  const duplicateLineItem = (id: string) => {
    const itemToDuplicate = lineItems.find(item => item.id === id);
    if (itemToDuplicate) {
      const duplicatedItem: LineItem = {
        ...itemToDuplicate,
        id: crypto.randomUUID()
      };
      const index = lineItems.findIndex(item => item.id === id);
      const newItems = [...lineItems];
      newItems.splice(index + 1, 0, duplicatedItem);
      setLineItems(newItems);
    }
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const saveQuoteData = (isDraft: boolean) => {
    if (!customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }

    if (lineItems.some(item => !item.description.trim())) {
      toast.error("Please fill in all item descriptions");
      return;
    }

    // Save business info for future use
    saveBusinessInfo(businessInfo);

    const quote: Quote = {
      id: initialQuote?.id || crypto.randomUUID(),
      quoteNo,
      date,
      customerName,
      customerAddress,
      customerReference,
      terms,
      quotationTitle,
      lineItems,
      grandTotal,
      receivedAmount,
      balance,
      businessInfo,
      isDraft,
      createdAt: initialQuote?.createdAt || new Date().toISOString()
    };

    saveQuote(quote);
    
    if (isDraft) {
      toast.success("Quote saved as draft!");
    } else {
      toast.success("Quote published successfully!");
    }
    
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Logo */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <img 
              src={signatureLogo} 
              alt="Signature Home Style Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {mode === "create" ? "Generate New Quote" : "Edit Quote"}
              </h1>
              <p className="text-muted-foreground">Fill in the details to create a quotation</p>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  value={businessInfo.name}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={businessInfo.tagline}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={businessInfo.address}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={businessInfo.phone}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Details */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Quote Number</Label>
                <Input
                  value={quoteNo}
                  onChange={(e) => setQuoteNo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Quotation Title</Label>
                <Input
                  value={quotationTitle}
                  onChange={(e) => setQuotationTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g., Ahmad sahib"
                />
              </div>
              <div className="space-y-2">
                <Label>Customer Reference</Label>
                <Input
                  value={customerReference}
                  onChange={(e) => setCustomerReference(e.target.value)}
                  placeholder="e.g., 243-R"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Customer Address</Label>
              <Textarea
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Enter customer address"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Terms</Label>
              <Textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Enter terms and conditions"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Line Items</CardTitle>
            <Button onClick={addLineItem} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Item {index + 1}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicateLineItem(item.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      placeholder="Enter item description"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input
                        value={item.unit}
                        onChange={(e) => updateLineItem(item.id, 'unit', e.target.value)}
                        placeholder="e.g., Sft, Pcs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Rate</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Total</Label>
                      <Input
                        value={formatCurrency(item.total)}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Totals */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Grand Total</Label>
                <Input
                  value={formatCurrency(grandTotal)}
                  readOnly
                  className="bg-muted font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label>Received Amount</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Balance</Label>
                <Input
                  value={formatCurrency(balance)}
                  readOnly
                  className="bg-muted font-semibold"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => saveQuoteData(true)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            variant="hero"
            onClick={() => saveQuoteData(false)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;