import { Suspense } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import DashboardShell from "@/components/dashboard/dashboard-shell";

async function DashboardContent() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div>

      <h1 className="text-5xl font-bold">
        Dashboard
      </h1>

      <p className="mt-3 text-lg text-gray-500">
        Welcome to your dashboard.
      </p>

    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}