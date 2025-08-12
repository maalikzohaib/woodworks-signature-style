import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { validateLogin, setSession, generateCredentials } from "@/utils/auth";
import { getAdminCredentials, clearAdminCredentials } from "@/utils/localStorage";
import { LogIn, Key, RotateCcw } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [tempCredentials, setTempCredentials] = useState<{username: string, password: string} | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (validateLogin(username, password)) {
        setSession("admin_authenticated");
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error("Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCredentials = () => {
    const credentials = generateCredentials();
    setTempCredentials(credentials);
    setShowCredentials(true);
    toast.success("New credentials generated! Please save them securely.");
  };

  const handleResetCredentials = () => {
    clearAdminCredentials();
    setTempCredentials(null);
    setShowCredentials(false);
    setUsername("");
    setPassword("");
    toast.success("Credentials reset successfully!");
  };

  const existingCredentials = getAdminCredentials();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Access the quotation management system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {showCredentials && tempCredentials && (
            <div className="p-4 bg-muted rounded-lg border-2 border-primary">
              <h3 className="font-semibold text-sm mb-2">Generated Credentials:</h3>
              <p className="text-sm font-mono">Username: {tempCredentials.username}</p>
              <p className="text-sm font-mono">Password: {tempCredentials.password}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Save these credentials securely. They won't be shown again.
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Use permanent admin credentials to access the system
            </p>
          </div>

          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => navigate("/")}
              className="text-sm"
            >
              Back to Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;