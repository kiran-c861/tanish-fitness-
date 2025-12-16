import { useState, useMemo } from "react";
import { Activity, Flame, Target, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MacroResultCard } from "./MacroResultCard";
import { CalorieAdjustment } from "./CalorieAdjustment";

interface MacroResults {
  BMR: number;
  TDEE: number;
  adjustedCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
}

const activityLevels = [
  { label: "Sedentary (1.2)", value: "1.2", description: "Little or no exercise" },
  { label: "Lightly Active (1.375)", value: "1.375", description: "Light exercise 1-3 days/week" },
  { label: "Moderately Active (1.55)", value: "1.55", description: "Moderate exercise 3-5 days/week" },
  { label: "Very Active (1.725)", value: "1.725", description: "Hard exercise 6-7 days/week" },
  { label: "Extra Active (1.9)", value: "1.9", description: "Very hard exercise & physical job" },
];

const proteinOptions = [0.8, 0.9, 1.0, 1.2, 1.3, 1.4];

function calculateMacros(
  age: number,
  heightCm: number,
  weightKg: number,
  activityFactor: number,
  proteinMultiplier: number,
  calorieAdjustment: number
): MacroResults {
  // Harris-Benedict equation for BMR
  const BMR = 66 + (13.7 * weightKg) + (5 * heightCm) - (6.8 * age);
  const TDEE = BMR * activityFactor;
  const adjustedCalories = TDEE + calorieAdjustment;
  
  const proteinGrams = proteinMultiplier * weightKg;
  const proteinCals = proteinGrams * 4;
  const remaining = adjustedCalories - proteinCals;
  const carbsCals = remaining * 0.6;
  const fatsCals = remaining * 0.4;
  const carbsGrams = carbsCals / 4;
  const fatsGrams = fatsCals / 9;
  
  return { BMR, TDEE, adjustedCalories, proteinGrams, carbsGrams, fatsGrams };
}

export function MacroCalculator() {
  // Use string state for inputs so users can type freely (we validate on blur)
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("75");
  const [gender, setGender] = useState("male");
  const [activityFactor, setActivityFactor] = useState("1.2");
  const [proteinMultiplier, setProteinMultiplier] = useState(1.0);
  const [calorieAdjustment, setCalorieAdjustment] = useState(0);

  const results = useMemo(() => {
    const ageNum = Number(age) || 30;
    const heightNum = Number(heightCm) || 175;
    const weightNum = Number(weightKg) || 75;

    return calculateMacros(ageNum, heightNum, weightNum, parseFloat(activityFactor), proteinMultiplier, calorieAdjustment);
  }, [age, heightCm, weightKg, activityFactor, proteinMultiplier, calorieAdjustment]);

  const adjustmentType = calorieAdjustment > 0 ? "surplus" : calorieAdjustment < 0 ? "deficit" : "maintenance";

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 animate-slide-up">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse-glow" />
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-wider">
            TANISH <span className="text-primary">FITNESS</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-2">
          Calculate your daily caloric needs and macronutrient breakdown based on your goals
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Age */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Age (years)</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
              onBlur={(e) => {
                const n = Math.max(10, Math.min(100, Number(e.target.value) || 10));
                setAge(String(n));
              }}
              className="bg-secondary/50 border-border focus:border-primary text-foreground h-12 text-lg"
            />
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Height (cm)</Label>
            <Input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value.replace(/\D/g, ""))}
              onBlur={(e) => {
                const n = Math.max(100, Math.min(250, Number(e.target.value) || 100));
                setHeightCm(String(n));
              }}
              className="bg-secondary/50 border-border focus:border-primary text-foreground h-12 text-lg"
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Weight (kg)</Label>
            <Input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value.replace(/\D/g, ""))}
              onBlur={(e) => {
                const n = Math.max(30, Math.min(300, Number(e.target.value) || 30));
                setWeightKg(String(n));
              }}
              className="bg-secondary/50 border-border focus:border-primary text-foreground h-12 text-lg"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="bg-secondary/50 border-border focus:border-primary text-foreground h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Level */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity Level
            </Label>
            <Select value={activityFactor} onValueChange={setActivityFactor}>
              <SelectTrigger className="bg-secondary/50 border-border focus:border-primary text-foreground h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div className="flex flex-col">
                      <span>{level.label}</span>
                      <span className="text-xs text-muted-foreground">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Protein Multiplier */}
          <div className="space-y-3">
            <Label className="text-muted-foreground text-sm flex items-center justify-between">
              <span>Protein per kg bodyweight</span>
              <span className="text-primary font-semibold">{proteinMultiplier}g</span>
            </Label>
            <Slider
              value={[proteinMultiplier]}
              onValueChange={(value) => setProteinMultiplier(value[0])}
              min={0.8}
              max={1.4}
              step={0.1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.8g</span>
              <span>1.4g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calorie Adjustment Section */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Calorie Goal
        </h2>
        
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-sm sm:text-base">Your maintenance calories (TDEE):</p>
          <p className="font-display text-3xl sm:text-4xl font-bold text-primary">{Math.round(results.TDEE)} kcal</p>
        </div>

        <CalorieAdjustment
          adjustment={calorieAdjustment}
          onAdjustmentChange={setCalorieAdjustment}
        />

        {calorieAdjustment !== 0 && (
          <div className="text-center pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-lg">
              {adjustmentType === "surplus" ? (
                <TrendingUp className="w-6 h-6 text-success" />
              ) : (
                <TrendingDown className="w-6 h-6 text-destructive" />
              )}
              <span className="text-muted-foreground">Adjusted daily intake:</span>
            </div>
            <p className={`font-display text-4xl sm:text-5xl font-bold mt-2 animate-count-up ${adjustmentType === "surplus" ? "text-success" : "text-destructive"}`}>
              {Math.round(results.adjustedCalories)} kcal
            </p>
            <p className={`text-sm mt-1 ${adjustmentType === "surplus" ? "text-success/70" : "text-destructive/70"}`}>
              ({calorieAdjustment > 0 ? "+" : ""}{calorieAdjustment} from maintenance)
            </p>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-xl font-semibold text-foreground text-center">Your Daily Macros</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MacroResultCard
            label="Calories"
            value={Math.round(results.adjustedCalories)}
            unit="kcal"
            color="primary"
            icon={<Flame className="w-6 h-6" />}
          />
          <MacroResultCard
            label="Protein"
            value={Math.round(results.proteinGrams)}
            unit="g"
            color="blue"
            icon={<span className="text-2xl">🥩</span>}
            calories={Math.round(results.proteinGrams * 4)}
          />
          <MacroResultCard
            label="Carbohydrates"
            value={Math.round(results.carbsGrams)}
            unit="g"
            color="amber"
            icon={<span className="text-2xl">🍞</span>}
            calories={Math.round(results.carbsGrams * 4)}
          />
          <MacroResultCard
            label="Fats"
            value={Math.round(results.fatsGrams)}
            unit="g"
            color="rose"
            icon={<span className="text-2xl">🥑</span>}
            calories={Math.round(results.fatsGrams * 9)}
          />
        </div>

        {/* Macro Distribution Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4 text-center">Macro Distribution</h3>
          <div className="h-8 rounded-full overflow-hidden flex">
            <div
              className="bg-blue-500 transition-all duration-500"
              style={{ width: `${(results.proteinGrams * 4 / results.adjustedCalories) * 100}%` }}
            />
            <div
              className="bg-amber-500 transition-all duration-500"
              style={{ width: `${(results.carbsGrams * 4 / results.adjustedCalories) * 100}%` }}
            />
            <div
              className="bg-rose-500 transition-all duration-500"
              style={{ width: `${(results.fatsGrams * 9 / results.adjustedCalories) * 100}%` }}
            />
          </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-3 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              Protein {Math.round((results.proteinGrams * 4 / results.adjustedCalories) * 100)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Carbs {Math.round((results.carbsGrams * 4 / results.adjustedCalories) * 100)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              Fats {Math.round((results.fatsGrams * 9 / results.adjustedCalories) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-sm text-muted-foreground/70">
        Calculations use the Harris-Benedict equation with a 60/40 carbs/fats split
      </p>
    </div>
  );
}
