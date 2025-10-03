import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LoginFailedPage() {
  const [, setLocation] = useLocation();
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


