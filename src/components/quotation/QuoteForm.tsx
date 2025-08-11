import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Copy, Trash2, Save, FileText } from 'lucide-react';
import { Quote, LineItem, BusinessInfo } from '@/types/quotation';
import { quotesStorage, businessInfoStorage } from '@/utils/localStorage';
import { calculateLineTotal, calculateGrandTotal, calculateBalance, createNewQuote } from '@/utils/quoteUtils';
import { useToast } from '@/hooks/use-toast';

interface QuoteFormProps {
  quoteId?: string;
}

const QuoteForm = ({ quoteId }: QuoteFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quote, setQuote] = useState<Quote>(() => {
    if (quoteId) {
      const existingQuote = quotesStorage.getById(quoteId);
      return existingQuote || createNewQuote() as Quote;
    }
    return {
      ...createNewQuote(),
      businessInfo: businessInfoStorage.get()
    } as Quote;
  });

  useEffect(() => {
    if (quoteId) {
      const existingQuote = quotesStorage.getById(quoteId);
      if (existingQuote) {
        setQuote(existingQuote);
      }
    }
  }, [quoteId]);

  const updateBusinessInfo = (field: keyof BusinessInfo, value: string) => {
    const newBusinessInfo = { ...quote.businessInfo, [field]: value };
    setQuote(prev => ({ ...prev, businessInfo: newBusinessInfo }));
    businessInfoStorage.save(newBusinessInfo);
  };

  const updateQuoteField = (field: keyof Quote, value: any) => {
    setQuote(prev => ({ ...prev, [field]: value }));
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newLineItems = [...quote.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newLineItems[index].total = calculateLineTotal(
        Number(newLineItems[index].quantity),
        Number(newLineItems[index].rate)
      );
    }

    const grandTotal = calculateGrandTotal(newLineItems);
    const balance = calculateBalance(grandTotal, quote.receivedAmount);

    setQuote(prev => ({
      ...prev,
      lineItems: newLineItems,
      grandTotal,
      balance
    }));
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
      total: 0
    };
    setQuote(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  const duplicateLineItem = (index: number) => {
    const itemToDuplicate = quote.lineItems[index];
    const newItem: LineItem = {
      ...itemToDuplicate,
      id: crypto.randomUUID()
    };
    const newLineItems = [...quote.lineItems];
    newLineItems.splice(index + 1, 0, newItem);
    setQuote(prev => ({ ...prev, lineItems: newLineItems }));
  };

  const removeLineItem = (index: number) => {
    if (quote.lineItems.length > 1) {
      const newLineItems = quote.lineItems.filter((_, i) => i !== index);
      const grandTotal = calculateGrandTotal(newLineItems);
      const balance = calculateBalance(grandTotal, quote.receivedAmount);
      
      setQuote(prev => ({
        ...prev,
        lineItems: newLineItems,
        grandTotal,
        balance
      }));
    }
  };

  const updateReceivedAmount = (amount: number) => {
    const balance = calculateBalance(quote.grandTotal, amount);
    setQuote(prev => ({
      ...prev,
      receivedAmount: amount,
      balance
    }));
  };

  const handleSave = (isDraft: boolean) => {
    const updatedQuote = {
      ...quote,
      isDraft,
      updatedAt: new Date().toISOString()
    };
    
    quotesStorage.save(updatedQuote);
    
    toast({
      title: isDraft ? "Draft saved" : "Quote generated",
      description: isDraft ? "Quote saved as draft" : "Quote generated successfully",
    });

    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {quoteId ? 'Edit Quote' : 'Generate Quote'}
          </h1>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-6">
          {/* Business Info */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={quote.businessInfo.name}
                  onChange={(e) => updateBusinessInfo('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={quote.businessInfo.tagline}
                  onChange={(e) => updateBusinessInfo('tagline', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={quote.businessInfo.address}
                  onChange={(e) => updateBusinessInfo('address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={quote.businessInfo.phone}
                  onChange={(e) => updateBusinessInfo('phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quote Details */}
          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quoteNo">Quote Number</Label>
                <Input
                  id="quoteNo"
                  value={quote.quoteNo}
                  onChange={(e) => updateQuoteField('quoteNo', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={quote.date}
                  onChange={(e) => updateQuoteField('date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="customerReference">Customer Reference</Label>
                <Input
                  id="customerReference"
                  value={quote.customerReference}
                  onChange={(e) => updateQuoteField('customerReference', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="quotationTitle">Quotation Title</Label>
                <Input
                  id="quotationTitle"
                  value={quote.quotationTitle}
                  onChange={(e) => updateQuoteField('quotationTitle', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="terms">Terms</Label>
                <Textarea
                  id="terms"
                  value={quote.terms}
                  onChange={(e) => updateQuoteField('terms', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Line Items
                <Button onClick={addLineItem} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.lineItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          rows={2}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateLineItem(index, 'rate', Number(e.target.value))}
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        Rs. {item.total.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => duplicateLineItem(index)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeLineItem(index)}
                            disabled={quote.lineItems.length === 1}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardHeader>
              <CardTitle>Totals</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Grand Total</Label>
                <div className="text-2xl font-bold">Rs. {quote.grandTotal.toLocaleString()}</div>
              </div>
              <div>
                <Label htmlFor="receivedAmount">Received Amount</Label>
                <Input
                  id="receivedAmount"
                  type="number"
                  value={quote.receivedAmount}
                  onChange={(e) => updateReceivedAmount(Number(e.target.value))}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label>Balance</Label>
                <div className="text-2xl font-bold text-primary">Rs. {quote.balance.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => handleSave(true)} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSave(false)} 
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Generate Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;