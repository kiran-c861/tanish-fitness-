import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Zap, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Header() {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="glass-card rounded-none border-x-0 border-t-0 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <span className="font-display text-base sm:text-xl font-bold tracking-wider">
            TANISH <span className="text-primary">FITNESS</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{username}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="bg-secondary/50 border-border hover:bg-destructive/20 hover:border-destructive hover:text-destructive transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3"
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
