import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a brief loading state for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(username, password);
    
    if (result.success) {
      toast.success("Login successful! Welcome back.");
      navigate("/");
    } else {
      setError(result.error || "Invalid credentials");
      toast.error("Login failed. Please check your credentials.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20 animate-pulse-glow">
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-wider">
            TANISH <span className="text-primary">FITNESS</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Login Card */}
        <div 
          className="glass-card rounded-2xl p-8 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="bg-secondary/50 border-border focus:border-primary text-foreground h-12"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-secondary/50 border-border focus:border-primary text-foreground h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Show Password Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="showPassword"
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(checked as boolean)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label 
                htmlFor="showPassword" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Show password
              </Label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm animate-slide-up">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 glow-primary transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground/50 mt-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Tanish Fitness Admin Panel
        </p>
      </div>
    </div>
  );
}
