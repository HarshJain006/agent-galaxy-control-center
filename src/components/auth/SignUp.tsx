import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Github, Mail, Facebook, User, Code, Building, GraduationCap, Briefcase, Search, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    aboutYou: "",
    goals: [] as string[],
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleNextStep = () => {
    // TODO: Add validation logic here
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Backend integration - User registration
    console.log("SignUp data:", formData);
    toast({
      title: "Account Created!",
      description: "Welcome to AgentHub! Please check your email to verify your account.",
    });
    // TODO: Redirect to dashboard or email verification page
  };

  const handleSocialSignUp = (provider: string) => {
    // TODO: Backend integration - OAuth signup
    console.log(`SignUp with ${provider}`);
    toast({
      title: `${provider} Sign Up`,
      description: `Redirecting to ${provider} authentication...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join AgentHub
          </CardTitle>
          <CardDescription>
            {currentStep === 1 ? "Let's get started with your account" : "Tell us a bit about yourself"}
          </CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Social Sign Up */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={() => handleSocialSignUp("Google")}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => handleSocialSignUp("GitHub")}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleSocialSignUp("Facebook")}
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

              {/* Basic Info Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="johndoe"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="••••••••"
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
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="userType">Sign up as</Label>
                  <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">AI Agent User (wants to use agents)</SelectItem>
                      <SelectItem value="creator">AI Creator (wants to upload agents)</SelectItem>
                      <SelectItem value="both">Both (Explorer + Creator)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I accept the{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms and Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleNextStep}
                  disabled={!formData.agreeToTerms}
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Let's get to know you better!</h3>
                <p className="text-gray-600">This helps us personalize your experience</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Tell us a bit about yourself</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {[
                      { value: "student", label: "Student", icon: GraduationCap },
                      { value: "developer", label: "Developer", icon: Code },
                      { value: "business", label: "Business Owner", icon: Building },
                      { value: "freelancer", label: "Freelancer", icon: User },
                      { value: "researcher", label: "Researcher", icon: Search },
                      { value: "other", label: "Other", icon: Sparkles }
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <Button
                          key={option.value}
                          variant={formData.aboutYou === option.value ? "default" : "outline"}
                          className="h-16 flex-col"
                          onClick={() => handleInputChange("aboutYou", option.value)}
                        >
                          <Icon className="w-5 h-5 mb-1" />
                          <span className="text-xs">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label>What do you want from AgentHub?</Label>
                  <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Use AI tools without coding",
                      "Automate tasks in my company", 
                      "Build & publish my own AI agents",
                      "Earn money by sharing AI models",
                      "Explore new AI tech",
                      "Just browsing"
                    ].map((goal) => (
                      <Badge
                        key={goal}
                        variant={formData.goals.includes(goal) ? "default" : "outline"}
                        className="cursor-pointer py-2 px-3"
                        onClick={() => handleGoalToggle(goal)}
                      >
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(1)}
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}