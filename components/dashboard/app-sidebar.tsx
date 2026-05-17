"use client";

import {
  LayoutDashboard,
  ScanLine,
  History,
  ShieldCheck,
  FlaskConical,
  Sparkles,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Scan Product",
    icon: ScanLine,
  },
  {
    title: "Scan History",
    icon: History,
  },
  {
    title: "Safer Alternatives",
    icon: ShieldCheck,
  },
  {
    title: "Ingredients Explorer",
    icon: FlaskConical,
  },
  {
    title: "AI Insights",
    icon: Sparkles,
  },
];

const accountItems = [
  {
    title: "Profile",
    icon: User,
  },
  {
    title: "Settings",
    icon: Settings,
  },
  {
    title: "Logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-white w-64">
      
      {/* Header */}
      <SidebarHeader className="p-6">
        <div>
          <h1 className="text-3xl font-bold text-violet-700">
            Sakhi
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            AI-Powered Chemical Safety
          </p>
        </div>
      </SidebarHeader>

      {/* Main Menu */}
      <SidebarContent>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  
                  <SidebarMenuButton
                    className="
                      h-12
                      rounded-xl
                      text-base
                      hover:bg-violet-50
                      hover:text-violet-700
                    "
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mt-8">
          
          <div className="px-3 mb-3 text-xs text-muted-foreground uppercase tracking-wider">
            Account
          </div>

          <SidebarGroupContent>
            <SidebarMenu>

              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  
                  <SidebarMenuButton
                    className="
                      h-12
                      rounded-xl
                      text-base
                      hover:bg-violet-50
                      hover:text-violet-700
                    "
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4">
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-sm text-violet-700 font-medium">
            Better choices today for a healthier tomorrow.
          </p>
        </div>
      </SidebarFooter>

    </Sidebar>
  );
}