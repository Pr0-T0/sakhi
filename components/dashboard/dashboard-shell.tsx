"use client"

import * as React from "react"

import {
  LayoutDashboard,
  ScanLine,
  History,
  ShieldCheck,
  FlaskConical,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function DashboardShell() {

  const [collapsed, setCollapsed] =
    React.useState(false)

  const [activeView, setActiveView] =
    React.useState("Dashboard")

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Scan Product",
      icon: ScanLine,
    },
    {
      title: "History",
      icon: History,
    },
    {
      title: "Alternatives",
      icon: ShieldCheck,
    },
    {
      title: "Ingredients",
      icon: FlaskConical,
    },
    {
      title: "AI Insights",
      icon: Sparkles,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8fc]">

      {/* Sidebar */}
      <aside
        className={`
          relative
          flex
          flex-col
          border-r
          bg-white
          shadow-sm
          transition-all
          duration-300
          ease-in-out
          ${collapsed ? "w-20" : "w-72"}
        `}
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">

          {!collapsed && (
            <div>
              <h1 className="text-3xl font-bold text-violet-700">
                Sakhi
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                AI-Powered Chemical Safety
              </p>
            </div>
          )}

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              transition-colors
              hover:bg-violet-50
            "
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-5">

          <div className="space-y-2">

            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() =>
                  setActiveView(item.title)
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-3
                  text-left
                  transition-colors
                  hover:bg-violet-50
                  hover:text-violet-700
                  ${
                    activeView === item.title
                      ? "bg-violet-100 text-violet-700"
                      : ""
                  }
                `}
              >

                <item.icon className="h-5 w-5 shrink-0" />

                {!collapsed && (
                  <span className="text-base font-medium">
                    {item.title}
                  </span>
                )}

              </button>
            ))}

          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-4">

          {!collapsed ? (
            <div className="rounded-2xl bg-violet-50 p-4">

              <p className="text-sm font-medium leading-relaxed text-violet-700">
                Better choices today for a healthier tomorrow.
              </p>

            </div>
          ) : (
            <div className="flex justify-center">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-100
                  font-bold
                  text-violet-700
                "
              >
                S
              </div>

            </div>
          )}

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">

        {/* Header */}
        <div className="mb-8">

          <h2 className="text-5xl font-bold text-gray-900">
            {activeView}
          </h2>

          <p className="mt-3 text-lg text-gray-500">
            You are currently viewing the {activeView} section.
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Products Scanned
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              128
            </h3>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Risk Alerts
            </p>

            <h3 className="mt-3 text-4xl font-bold text-red-500">
              12
            </h3>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Safe Alternatives
            </p>

            <h3 className="mt-3 text-4xl font-bold text-green-600">
              42
            </h3>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              AI Insights
            </p>

            <h3 className="mt-3 text-4xl font-bold text-violet-700">
              18
            </h3>

          </div>

        </div>

        {/* Recent Analysis */}
        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">

          <h3 className="text-2xl font-bold">
            Recent Analysis
          </h3>

          <div className="mt-6 space-y-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-5
                  transition-colors
                  hover:bg-gray-50
                "
              >

                <div>

                  <p className="font-semibold">
                    Product Scan #{item}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Completed chemical safety analysis.
                  </p>

                </div>

                <span
                  className="
                    rounded-full
                    bg-green-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-green-700
                  "
                >
                  Safe
                </span>

              </div>
            ))}

          </div>

        </div>

      </main>

    </div>
  )
}