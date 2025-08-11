import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit2, Trash2, LogOut } from "lucide-react";
import { Quote } from "@/types/quotation";
import { getQuotes, deleteQuote } from "@/utils/localStorage";
import { clearSession, isAuthenticated } from "@/utils/auth";
import { formatCurrency, formatDate } from "@/utils/quoteUtils";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    
    loadQuotes();
  }, [navigate]);

  const loadQuotes = () => {
    const allQuotes = getQuotes();
    setQuotes(allQuotes);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      deleteQuote(id);
      loadQuotes();
      toast.success("Quote deleted successfully!");
    }
  };

  const handleLogout = () => {
    clearSession();
    navigate("/admin/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Quotation Dashboard</h1>
            <p className="text-muted-foreground">Manage your carpenter quotations</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => navigate("/quote/new")} 
              variant="hero" 
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Generate Quote
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Quotes</CardDescription>
              <CardTitle className="text-2xl">{quotes.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Published Quotes</CardDescription>
              <CardTitle className="text-2xl">
                {quotes.filter(q => !q.isDraft).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Draft Quotes</CardDescription>
              <CardTitle className="text-2xl">
                {quotes.filter(q => q.isDraft).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quotes List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quotes</CardTitle>
            <CardDescription>Last 10 quotes created</CardDescription>
          </CardHeader>
          <CardContent>
            {quotes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No quotes found</p>
                <Button 
                  onClick={() => navigate("/quote/new")} 
                  className="mt-4"
                >
                  Create Your First Quote
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Quote No</th>
                      <th className="text-left p-3">Customer</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-right p-3">Total</th>
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-mono">{quote.quoteNo}</td>
                        <td className="p-3">{quote.customerReference}</td>
                        <td className="p-3">{formatDate(quote.date)}</td>
                        <td className="p-3 text-right font-semibold">
                          {formatCurrency(quote.grandTotal)}
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={quote.isDraft ? "secondary" : "default"}>
                            {quote.isDraft ? "Draft" : "Published"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate(`/quote/view/${quote.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate(`/quote/edit/${quote.id}`)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteQuote(quote.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;