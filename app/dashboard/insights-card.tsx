"use client"

import {
  useEffect,
  useState,
} from "react"

type Props = {
  stats: any
}

export default function InsightsCard({
  stats,
}: Props) {

  const [loading, setLoading] =
    useState(false)

  const [insight, setInsight] =
    useState("")

  useEffect(() => {

    async function
    generateInsights() {

      try {

        setLoading(true)

        const response =
          await fetch(
            "http://127.0.0.1:8000/predict-insights",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                avg_nutrition_score:
                  stats.avgNutrition,

                avg_toxicity_score:
                  stats.avgToxicity,

                avg_processed_score:
                  stats.avgProcessed,

                avg_hormonal_score:
                  stats.avgHormonal,

                avg_overall_score:
                  stats.avgOverall,

                scan_frequency_weekly:
                  stats.scanFrequencyWeekly,

                scan_count:
                  stats.totalScans,

                healthy_scan_ratio:
                  stats.healthyScanRatio,

                high_toxicity_ratio:
                  stats.highToxicityRatio,

                cosmetic_ratio:
                  stats.cosmeticRatio,

                food_ratio:
                  stats.foodRatio,

              }),
            }
          )

        const data =
          await response.json()

        console.log(data)

        setInsight(
          data.insight ||
          data.prediction ||
          JSON.stringify(data)
        )

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)

      }
    }

    generateInsights()

  }, [stats])

  return (

    <div className="rounded-3xl border bg-white p-6">

      <h2 className="text-2xl font-bold">
        AI Health Insights
      </h2>

      {loading ? (

        <p className="mt-4 text-gray-500">
          Generating insights...
        </p>

      ) : (

        <div className="mt-4">

          <p className="leading-7 text-gray-700">
            {insight}
          </p>

        </div>

      )}

    </div>

  )
}