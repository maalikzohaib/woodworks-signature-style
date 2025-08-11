import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { authUtils } from '@/utils/auth';
import { quotesStorage } from '@/utils/localStorage';
import { Quote } from '@/types/quotation';
import { Plus, Eye, Edit, Trash2, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadQuotes();
  }, [navigate]);

  const loadQuotes = () => {
    const recentQuotes = quotesStorage.getRecent(10);
    setQuotes(recentQuotes);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      quotesStorage.delete(id);
      loadQuotes();
      toast({
        title: "Quote deleted",
        description: "The quotation has been removed successfully",
      });
    }
  };

  const handleLogout = () => {
    authUtils.logout();
    navigate('/admin/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Quotation Dashboard</h1>
          <div className="flex gap-2">
            <Link to="/admin/quote/new">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Generate Quote
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Last 10 Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            {quotes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No quotes found</p>
                <Link to="/admin/quote/new">
                  <Button>Create Your First Quote</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote No</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.quoteNo}</TableCell>
                      <TableCell>{quote.customerReference}</TableCell>
                      <TableCell>{new Date(quote.date).toLocaleDateString()}</TableCell>
                      <TableCell>Rs. {quote.grandTotal.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          quote.isDraft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {quote.isDraft ? 'Draft' : 'Published'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Link to={`/admin/quote/view/${quote.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Link to={`/admin/quote/edit/${quote.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDelete(quote.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;