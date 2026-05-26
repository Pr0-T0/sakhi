"use client"

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts"

type Props = {
  stats: any
}

const COLORS = [
  "#10b981",
  "#f59e0b",
  "#ef4444",
]

export default function DashboardClient({
  stats,
}: Props) {

  return (

    <div className="space-y-6">

      {/* TOP CHARTS */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* PIE CHART */}

        <div className="min-w-0 overflow-hidden rounded-3xl border bg-white p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Risk Distribution
          </h2>

          <div className="h-[350px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={
                    stats.riskDistribution
                  }
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {stats.riskDistribution.map(
                    (
                      _: any,
                      index: number
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="min-w-0 overflow-hidden rounded-3xl border bg-white p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Score Breakdown
          </h2>

          <div className="h-[350px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={
                  stats.scoreBreakdown
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                  fill="#3b82f6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  )
}