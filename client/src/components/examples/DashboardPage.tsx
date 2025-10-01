import DashboardPage from "../../pages/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function DashboardPageExample() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-auto p-6">
            <DashboardPage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
