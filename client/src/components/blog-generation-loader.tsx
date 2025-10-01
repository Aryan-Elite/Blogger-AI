import { useEffect, useState } from "react";
import { Check, Loader2, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Step {
  id: string;
  label: string;
  progress: number;
  status: "completed" | "in-progress" | "pending";
}

export function BlogGenerationLoader() {
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", label: "Researching topic", progress: 0, status: "in-progress" },
    { id: "2", label: "Generating outline", progress: 0, status: "pending" },
    { id: "3", label: "Writing content...", progress: 0, status: "pending" },
    { id: "4", label: "Finding relevant images", progress: 0, status: "pending" },
    { id: "5", label: "Optimizing for SEO", progress: 0, status: "pending" },
  ]);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    const updateStep = (index: number) => {
      const interval = setInterval(() => {
        setSteps((prev) => {
          const newSteps = [...prev];
          if (newSteps[index].progress < 100) {
            newSteps[index].progress += 10;
            if (newSteps[index].progress === 100) {
              newSteps[index].status = "completed";
              if (index < newSteps.length - 1) {
                newSteps[index + 1].status = "in-progress";
                updateStep(index + 1);
              }
            }
          }
          return newSteps;
        });
      }, 200);
      intervals.push(interval);
    };

    updateStep(0);

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  const getIcon = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-chart-2" />;
      case "in-progress":
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case "pending":
        return <Pause className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center" data-testid="text-generation-title">
        Generating Your Blog...
      </h2>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="space-y-2">
            <div className="flex items-center gap-3">
              {getIcon(step.status)}
              <span
                className={`text-sm font-medium ${
                  step.status === "completed"
                    ? "text-foreground"
                    : step.status === "in-progress"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                data-testid={`text-step-${step.id}`}
              >
                {step.label}
              </span>
            </div>
            <Progress 
              value={step.progress} 
              className="h-2" 
              data-testid={`progress-step-${step.id}`}
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-8" data-testid="text-estimated-time">
        This usually takes 2-3 minutes...
      </p>
    </Card>
  );
}
