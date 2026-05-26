import { Suspense } from "react"

import { redirect } from "next/navigation"

import {
  Activity,
  ShieldAlert,
  HeartPulse,
  FlaskConical,
} from "lucide-react"

import { createClient }
from "@/lib/supabase/server"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import DashboardClient
from "./dashboard-client"

import {
  generateProductAnalytics,
} from "@/lib/analytics/generate-product-analytics"
import InsightsCard from "./insights-card"

async function DashboardContent() {

  const supabase =
    await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // FETCH PRODUCT SCANS

  const {
    data: productScans,
    error,
  } = await supabase
    .from("product_scans")
    .select(`
      id,
      product_name,
      brand,
      category,
      overall_score,
      toxicity_score,
      toxicity_level,
      hormonal_score,
      hormonal_level,
      nutrition_score,
      nutrition_level,
      processed_score,
      processed_level,
      scanned_at
    `)
    .eq("user_id", user.id)
    .order("scanned_at", {
      ascending: true,
    })

  if (error) {
    console.error(error)
  }

  const scans =
    productScans ?? []

  // GENERATE ANALYTICS

  const stats =
    generateProductAnalytics(scans)

  return (

    <div className="space-y-8 p-8">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          Product analysis overview
          and analytics.
        </p>

      </div>

      <InsightsCard stats={stats}/>

      {/* TOP STATS */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL SCANS */}

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Product Scans
                </p>

                <h2 className="mt-2 text-5xl font-bold">
                  {stats.totalScans}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">

                <Activity className="h-7 w-7 text-violet-700" />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* HIGH RISK */}

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  High Risk Products
                </p>

                <h2 className="mt-2 text-5xl font-bold text-red-500">
                  {stats.highRiskProducts}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                <ShieldAlert className="h-7 w-7 text-red-600" />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* SAFE PRODUCTS */}

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Safe Products
                </p>

                <h2 className="mt-2 text-5xl font-bold text-emerald-500">
                  {stats.safeProducts}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                <HeartPulse className="h-7 w-7 text-emerald-600" />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* AVG OVERALL */}

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Avg Overall Score
                </p>

                <h2 className="mt-2 text-5xl font-bold text-blue-600">
                  {stats.avgOverall}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                <FlaskConical className="h-7 w-7 text-blue-700" />

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* CHARTS */}

      <DashboardClient
        stats={stats}
      />

    </div>

  )
}

export default function DashboardPage() {

  return (

    <Suspense
      fallback={
        <div className="p-8">
          Loading Dashboard...
        </div>
      }
    >

      <DashboardContent />

    </Suspense>

  )
}