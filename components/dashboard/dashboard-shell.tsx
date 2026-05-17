"use client";

import { useState } from "react";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/dashboard/app-sidebar";

type DashboardView =
  | "dashboard"
  | "scan"
  | "history"
  | "alternatives"
  | "ingredients"
  | "insights";

export default function DashboardShell() {

  const [view, setView] =
    useState<DashboardView>("dashboard");

  return (
    <SidebarProvider>

      {/* Sidebar */}
      <AppSidebar
        view={view}
        setView={setView}
      />

      {/* Main Content Area */}
      <SidebarInset className="flex-1 bg-[#faf9ff]">

        <main className="w-full min-h-screen p-6">

          {view === "dashboard" && (
            <div className="w-full">
              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              <p className="text-muted-foreground mt-2">
                Welcome to your dashboard.
              </p>
            </div>
          )}

          {view === "scan" && (
            <div className="w-full">
              <h1 className="text-4xl font-bold">
                Scan Product
              </h1>

              <p className="text-muted-foreground mt-2">
                Scan and analyze products instantly.
              </p>
            </div>
          )}

          {view === "history" && (
            <div className="w-full">
              <h1 className="text-4xl font-bold">
                Scan History
              </h1>

              <p className="text-muted-foreground mt-2">
                View your previous scans.
              </p>
            </div>
          )}

          {view === "alternatives" && (
            <div className="w-full">
              <h1 className="text-4xl font-bold">
                Safer Alternatives
              </h1>

              <p className="text-muted-foreground mt-2">
                Discover healthier product options.
              </p>
            </div>
          )}

          {view === "ingredients" && (
            <div className="w-full">
              <h1 className="text-4xl font-bold">
                Ingredients Explorer
              </h1>

              <p className="text-muted-foreground mt-2">
                Explore chemical ingredients and risks.
              </p>
            </div>
          )}

          {view === "insights" && (
            <div className="w-full">
              <h1 className="text-4xl font-bold">
                AI Insights
              </h1>

              <p className="text-muted-foreground mt-2">
                Personalized AI-powered health insights.
              </p>
            </div>
          )}

        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}