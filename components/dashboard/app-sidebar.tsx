"use client";

import type { CSSProperties } from "react";

import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

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
  PanelLeftClose,
  PanelLeftOpen,
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type DashboardView =
  | "dashboard"
  | "scan"
  | "history"
  | "alternatives"
  | "ingredients"
  | "insights";

const items = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "scan",
    title: "Scan Product",
    icon: ScanLine,
  },
  {
    id: "history",
    title: "Scan History",
    icon: History,
  },
  {
    id: "alternatives",
    title: "Safer Alternatives",
    icon: ShieldCheck,
  },
  {
    id: "ingredients",
    title: "Ingredients Explorer",
    icon: FlaskConical,
  },
  {
    id: "insights",
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

export function AppSidebar({
  view,
  setView,
}: {
  view: DashboardView;
  setView: React.Dispatch<
    React.SetStateAction<DashboardView>
  >;
}) {

  const { state } = useSidebar();

  const collapsed = state === "collapsed";

  const router = useRouter();

  async function handleLogout() {

    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/auth/login");
  }

  return (
    <Sidebar
      collapsible="icon"
      className="
        border-r
        bg-white/70
        backdrop-blur-xl
        transition-all
        duration-300
      "
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "4.5rem",
        } as CSSProperties
      }
    >

      {/* Header */}
      <SidebarHeader className="p-4 border-b">

        <div className="flex items-center justify-between">

          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold text-violet-700">
                Sakhi
              </h1>

              <p className="text-xs text-muted-foreground mt-1">
                AI-Powered Chemical Safety
              </p>
            </div>
          )}

          <SidebarTrigger className="h-9 w-9 rounded-lg border hover:bg-violet-50">
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </SidebarTrigger>

        </div>

      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="px-3 py-4">

        {/* Main Menu */}
        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.id}>

                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() =>
                      setView(item.id as DashboardView)
                    }
                    className={`
                      h-12
                      rounded-xl
                      text-base
                      transition-colors
                      hover:bg-violet-50
                      hover:text-violet-700

                      ${
                        view === item.id
                          ? "bg-violet-100 text-violet-700"
                          : ""
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />

                    {!collapsed && (
                      <span>{item.title}</span>
                    )}

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mt-8">

          {!collapsed && (
            <div className="px-3 mb-3 text-xs text-muted-foreground uppercase tracking-wider">
              Account
            </div>
          )}

          <SidebarGroupContent>

            <SidebarMenu>

              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={
                      item.title === "Logout"
                        ? handleLogout
                        : undefined
                    }
                    className="
                      h-12
                      rounded-xl
                      text-base
                      hover:bg-violet-50
                      hover:text-violet-700
                      transition-colors
                    "
                  >
                    <item.icon className="h-5 w-5 shrink-0" />

                    {!collapsed && (
                      <span>{item.title}</span>
                    )}

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      {!collapsed && (
        <SidebarFooter className="p-4 border-t">

          <div className="rounded-2xl bg-violet-50 p-4">
            <p className="text-sm text-violet-700 font-medium leading-relaxed">
              Better choices today for a healthier tomorrow.
            </p>
          </div>

        </SidebarFooter>
      )}

    </Sidebar>
  );
}