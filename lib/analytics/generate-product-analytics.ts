type ProductScan = {
  id: string
  product_name: string | null
  brand: string | null
  category: string | null
  overall_score: number | null
  toxicity_score: number | null
  toxicity_level: string | null
  hormonal_score: number | null
  hormonal_level: string | null
  nutrition_score: number | null
  nutrition_level: string | null
  processed_score: number | null
  processed_level: string | null
  scanned_at: string
}

function average(
  values: (number | null)[]
) {
  const filtered = values.filter(
    (v): v is number => v !== null
  )
  if (filtered.length === 0) {
    return 0
  }
  const total = filtered.reduce(
    (acc, value) => acc + value,
    0
  )
  return Math.round(
    total / filtered.length
  )
}

export function
generateProductAnalytics(
  scans: ProductScan[]
) {

  const totalScans = scans.length
  // RISK COUNTS
  const highRiskProducts =
    scans.filter((item) => {
      const level =
        item.toxicity_level
          ?.toLowerCase() ?? ""
      return level.includes("high")
    }).length

  const safeProducts =
    scans.filter((item) => {
      const level =
        item.toxicity_level
          ?.toLowerCase() ?? ""
      return level.includes("low")
    }).length

  const moderateProducts =
    scans.filter((item) => {
      const level =
        item.toxicity_level
          ?.toLowerCase() ?? ""

      return level.includes("moderate")
    }).length

  // AVERAGES
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

  // PIE CHART

  const riskDistribution = [
    {
      name: "Safe",
      value: safeProducts,
    },
    {
      name: "Moderate",
      value: moderateProducts,
    },
    {
      name: "High Risk",
      value: highRiskProducts,
    },
  ]

  // BAR CHART
  const scoreBreakdown = [
    {
      name: "Toxicity",
      value: avgToxicity,
    },
    {
      name: "Hormonal",
      value: avgHormonal,
    },
    {
      name: "Nutrition",
      value: avgNutrition,
    },
    {
      name: "Processed",
      value: avgProcessed,
    },
  ]

  // CATEGORY BREAKDOWN
  const categoryMap:
    Record<string, number> = {}

  scans.forEach((scan) => {

    const category =
      scan.category || "Unknown"

    categoryMap[category] =
      (categoryMap[category] || 0) + 1

  })
  const categoryBreakdown =
    Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    )

  // TRENDS
  const trendMap:
    Record<
      string,
      {
        date: string
        scans: number
      }
    > = {}

  scans.forEach((scan) => {
    const date = new Date(
      scan.scanned_at
    ).toLocaleDateString()
    if (!trendMap[date]) {

      trendMap[date] = {
        date,
        scans: 0,
      }

    }

    trendMap[date].scans += 1

  })

  const scanTrends =
    Object.values(trendMap)

  // RECENT

  const recentScans =
    [...scans]
      .reverse()
      .slice(0, 5)

  // INSIGHTS ANALYTICS

  const healthyScanRatio =
    totalScans === 0
      ? 0
      : Number(
          (
            safeProducts /
            totalScans
          ).toFixed(2)
        )

  const highToxicityRatio =
    totalScans === 0
      ? 0
      : Number(
          (
            highRiskProducts /
            totalScans
          ).toFixed(2)
        )

  const cosmeticCount =
    scans.filter((scan) =>
      scan.category
        ?.toLowerCase()
        .includes("cosmetic")
    ).length

  const foodCount =
    scans.filter((scan) =>
      scan.category
        ?.toLowerCase()
        .includes("food")
    ).length

  const cosmeticRatio =
    totalScans === 0
      ? 0
      : Number(
          (
            cosmeticCount /
            totalScans
          ).toFixed(2)
        )

  const foodRatio =
    totalScans === 0
      ? 0
      : Number(
          (
            foodCount /
            totalScans
          ).toFixed(2)
        )

  // WEEKLY FREQUENCY

  let scanFrequencyWeekly = 0

  if (scans.length > 1) {

    const firstDate =
      new Date(
        scans[0].scanned_at
      ).getTime()

    const lastDate =
      new Date(
        scans[
          scans.length - 1
        ].scanned_at
      ).getTime()

    const diffDays =
      (lastDate - firstDate) /
      (1000 * 60 * 60 * 24)

    const weeks =
      Math.max(diffDays / 7, 1)

    scanFrequencyWeekly =
      Number(
        (
          totalScans / weeks
        ).toFixed(2)
      )
  }

  return {
    totalScans,
    highRiskProducts,
    safeProducts,
    moderateProducts,
    avgOverall,
    avgToxicity,
    avgHormonal,
    avgNutrition,
    avgProcessed,
    riskDistribution,
    scoreBreakdown,
    categoryBreakdown,
    scanTrends,
    recentScans,
    healthyScanRatio,
    highToxicityRatio,
    cosmeticRatio,
    foodRatio,
    scanFrequencyWeekly,
  }
}