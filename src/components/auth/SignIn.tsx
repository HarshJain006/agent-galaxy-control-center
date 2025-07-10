import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Github, Mail, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  // Form data
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend integration - User authentication
    console.log("SignIn data:", { ...formData, rememberMe });
    
    // Mock authentication logic
    if (formData.emailOrUsername && formData.password) {
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to AgentHub.",
      });
      // TODO: Redirect based on user type
      // If "Agent User" → redirect to Dashboard
      // If "Agent Creator" → redirect to Upload Agent page
      window.location.href = "/dashboard";
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
    }
  };

  const handleSocialSignIn = (provider: string) => {
    // TODO: Backend integration - OAuth signin
    console.log(`SignIn with ${provider}`);
    toast({
      title: `${provider} Sign In`,
      description: `Redirecting to ${provider} authentication...`,
    });
  };

  const handleForgotPassword = () => {
    // TODO: Backend integration - Password reset
    toast({
      title: "Password Reset",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to your AgentHub account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Sign In */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-12 hover:bg-blue-50 transition-colors"
              onClick={() => handleSocialSignIn("Google")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                className="hover:bg-gray-50 transition-colors"
                onClick={() => handleSocialSignIn("GitHub")}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button 
                variant="outline"
                className="hover:bg-blue-50 transition-colors"
                onClick={() => handleSocialSignIn("Facebook")}
              >
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="emailOrUsername">Email or Username</Label>
              <Input
                id="emailOrUsername"
                type="text"
                value={formData.emailOrUsername}
                onChange={(e) => handleInputChange("emailOrUsername", e.target.value)}
                placeholder="Enter your email or username"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            </div>

            <Button 
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Having trouble?{" "}
              <Link to="/support" className="text-blue-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Chatbot Help Bubble */}
      <div className="fixed bottom-6 right-6">
        <Button
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
          onClick={() => toast({
            title: "AI Login Help 🤖",
            description: "Hi! Need help signing in? I can guide you through the process!",
          })}
        >
          🤖
        </Button>
      </div>
    </div>
  );
}