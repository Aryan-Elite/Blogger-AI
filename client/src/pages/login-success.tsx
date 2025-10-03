import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function LoginSuccessPage() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const id = setTimeout(() => setLocation('/dashboard'), 1200);
    return () => clearTimeout(id);
  }, [setLocation]);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Login Successful</h1>
        <p className="text-muted-foreground">Redirecting you to your dashboard...</p>
        <Button onClick={() => setLocation('/dashboard')}>Go to Dashboard</Button>
      </div>
    </div>
  );
}


