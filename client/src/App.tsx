import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import { auth } from "@/lib/utils";
import LoginSuccessPage from "@/pages/login-success";
import LoginFailedPage from "@/pages/login-failed";
import SchedulePage from "@/pages/schedule";
import ViewAllPage from "@/pages/view-all";
import DraftsPage from "@/pages/drafts";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  // minimal guard using localStorage token
  if (!auth.isAuthenticated()) {
    return <LoginPage />;
  }
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/login-success" component={LoginSuccessPage} />
      <Route path="/login-failed" component={LoginFailedPage} />
      <Route path="/dashboard">
        <DashboardLayout>
          <PrivateRoute component={DashboardPage} />
        </DashboardLayout>
      </Route>
      <Route path="/dashboard/schedule">
        <DashboardLayout>
          <PrivateRoute component={SchedulePage} />
        </DashboardLayout>
      </Route>
      <Route path="/dashboard/view-all">
        <DashboardLayout>
          <PrivateRoute component={ViewAllPage} />
        </DashboardLayout>
      </Route>
      <Route path="/dashboard/drafts">
        <DashboardLayout>
          <PrivateRoute component={DraftsPage} />
        </DashboardLayout>
      </Route>
      <Route component={LoginPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
