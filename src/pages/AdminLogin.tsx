import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authUtils } from '@/utils/auth';
import { adminStorage } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [generatedCreds, setGeneratedCreds] = useState<{username: string, password: string} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authUtils.login(username, password)) {
      toast({
        title: "Login successful",
        description: "Welcome to admin dashboard",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleGenerateCredentials = () => {
    const creds = authUtils.generateCredentials();
    adminStorage.saveCredentials(creds);
    setGeneratedCreds(creds);
    toast({
      title: "Credentials generated",
      description: "Save these credentials safely - they won't be shown again",
    });
  };

  const handleResetCredentials = () => {
    adminStorage.clearCredentials();
    setGeneratedCreds(null);
    setUsername('');
    setPassword('');
    toast({
      title: "Credentials reset",
      description: "All admin credentials have been cleared",
    });
  };

  const existingCreds = adminStorage.getCredentials();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Login to access the quotation dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={!existingCreds}>
              Login
            </Button>
          </form>

          <div className="space-y-4 border-t pt-4">
            {!existingCreds && (
              <Button onClick={handleGenerateCredentials} variant="outline" className="w-full">
                Generate Temporary Credentials
              </Button>
            )}
            
            {existingCreds && (
              <Button onClick={handleResetCredentials} variant="destructive" className="w-full">
                Reset Credentials
              </Button>
            )}
          </div>

          {generatedCreds && (
            <div className="bg-secondary p-4 rounded-md space-y-2">
              <p className="font-semibold text-sm">Generated Credentials:</p>
              <p className="text-sm"><strong>Username:</strong> {generatedCreds.username}</p>
              <p className="text-sm"><strong>Password:</strong> {generatedCreds.password}</p>
              <p className="text-xs text-muted-foreground">Save these credentials - they won't be shown again!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;