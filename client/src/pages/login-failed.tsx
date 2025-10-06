import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function LoginFailedPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Login failed",
      description: "Please check your credentials or domain and try again.",
      variant: "destructive",
    });
  }, [toast]);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Login Failed</h1>
        <p className="text-muted-foreground">Please check your credentials or domain and try again.</p>
        <Button onClick={() => setLocation('/')}>Back to Login</Button>
      </div>
    </div>
  );
}


