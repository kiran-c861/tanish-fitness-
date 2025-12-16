import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MacroResultCardProps {
  label: string;
  value: number;
  unit: string;
  color: "primary" | "blue" | "amber" | "rose";
  icon: ReactNode;
  calories?: number;
}

const colorStyles = {
  primary: {
    text: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    glow: "hover:shadow-[0_0_30px_hsl(142_71%_45%/0.3)]",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "hover:shadow-[0_0_30px_hsl(217_91%_60%/0.3)]",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "hover:shadow-[0_0_30px_hsl(43_96%_56%/0.3)]",
  },
  rose: {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    glow: "hover:shadow-[0_0_30px_hsl(350_89%_60%/0.3)]",
  },
};

export function MacroResultCard({ label, value, unit, color, icon, calories }: MacroResultCardProps) {
  const styles = colorStyles[color];
  
  return (
    <div
      className={cn(
        "stat-card border-2 transition-all duration-300 cursor-default group",
        styles.bg,
        styles.border,
        styles.glow
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <div className={cn("p-2 rounded-lg", styles.bg, styles.text)}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className={cn("font-display text-4xl font-bold animate-count-up", styles.text)}>
            {value}
          </span>
          <span className="text-muted-foreground text-lg">{unit}</span>
        </div>
        
        {calories !== undefined && (
          <p className="text-sm text-muted-foreground/70">
            = {calories} kcal
          </p>
        )}
      </div>
    </div>
  );
}
