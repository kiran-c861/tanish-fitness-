import { MacroCalculator } from "@/components/MacroCalculator";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <MacroCalculator />
      </main>
    </div>
  );
};

export default Index;
