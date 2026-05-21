import { Suspense } from "react"
import { redirect } from "next/navigation"

import {
  Activity,
  ShieldAlert,
  HeartPulse,
  FlaskConical,
} from "lucide-react"

import { createClient } from "@/lib/supabase/server"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

async function DashboardContent() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // FETCH PRODUCT SCANS
  const {
    data: productScans,
  } = await supabase
    .from("product_scans")
    .select("*")
    .eq("user_id", user.id)

  const scans = productScans ?? []

  // TOTALS
  const totalScans = scans.length

  const highRiskProducts =
    scans.filter(
      (item) =>
        item.toxicity_level
          ?.toLowerCase()
          .includes("high")
    ).length

  const safeProducts =
    scans.filter(
      (item) =>
        item.toxicity_level
          ?.toLowerCase()
          .includes("low")
    ).length

  // AVERAGES
  function average(
    values: (number | null)[]
  ) {

    if (values.length === 0) {
      return 0
    }

    const total = values.reduce(
      (acc: number, value) =>
        acc + (value ?? 0),
      0
    )

    return Math.round(
      total / values.length
    )
  }

  const avgOverall = average(
    scans.map(
      (item) => item.overall_score
    )
  )

  const avgToxicity = average(
    scans.map(
      (item) => item.toxicity_score
    )
  )

  const avgHormonal = average(
    scans.map(
      (item) => item.hormonal_score
    )
  )

  const avgNutrition = average(
    scans.map(
      (item) => item.nutrition_score
    )
  )

  const avgProcessed = average(
    scans.map(
      (item) => item.processed_score
    )
  )

  return (

    <div className="space-y-8 p-8">

      {/* HEADER */}
      <div>

        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          Product analysis overview and analytics.
        </p>

      </div>

      {/* TOTAL CARDS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Product Scans
                </p>

                <h2 className="mt-2 text-5xl font-bold">
                  {totalScans}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">

                <Activity className="h-7 w-7 text-violet-700" />

              </div>

            </div>

          </CardContent>

        </Card>

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  High Risk Products
                </p>

                <h2 className="mt-2 text-5xl font-bold text-red-500">
                  {highRiskProducts}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                <ShieldAlert className="h-7 w-7 text-red-600" />

              </div>

            </div>

          </CardContent>

        </Card>

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Safe Products
                </p>

                <h2 className="mt-2 text-5xl font-bold text-emerald-500">
                  {safeProducts}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                <HeartPulse className="h-7 w-7 text-emerald-600" />

              </div>

            </div>

          </CardContent>

        </Card>

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Avg Overall Score
                </p>

                <h2 className="mt-2 text-5xl font-bold text-blue-600">
                  {avgOverall}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                <FlaskConical className="h-7 w-7 text-blue-700" />

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* AVERAGE SCORES */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <p className="text-sm text-gray-500">
              Average Toxicity
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {avgToxicity}
            </h2>

          </CardContent>

        </Card>

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <p className="text-sm text-gray-500">
              Average Hormonal
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {avgHormonal}
            </h2>

          </CardContent>

        </Card>

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <p className="text-sm text-gray-500">
              Average Nutrition
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {avgNutrition}
            </h2>

          </CardContent>

        </Card>

        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <p className="text-sm text-gray-500">
              Average Processed
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {avgProcessed}
            </h2>

          </CardContent>

        </Card>

      </div>

    </div>

  )
}

export default function DashboardPage() {

  return (

    <Suspense fallback={<div>Loading...</div>}>

      <DashboardContent />

    </Suspense>

  )
}