import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6 bg-background">
          <h1 className="text-2xl font-bold">Sidebar Example</h1>
          <p className="text-muted-foreground mt-2">
            The sidebar navigation is on the left
          </p>
        </div>
      </div>
    </SidebarProvider>
  );
}
