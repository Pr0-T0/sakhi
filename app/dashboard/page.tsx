import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      
      <AppSidebar />

      <main className="flex-1 p-6">
        
        <SidebarTrigger />

        <div className="mt-6 ">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground  mt-2">
            Welcome to Sakhi Dashboard.
          </p>
        </div>

      </main>

    </SidebarProvider>
  );
}