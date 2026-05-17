"use client"

import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  ScanLine,
  History,
  ShieldCheck,
  FlaskConical,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const [collapsed, setCollapsed] =
    React.useState(false)

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Scan Product",
      href: "/dashboard/scan",
      icon: ScanLine,
    },
    {
      title: "History",
      href: "/dashboard/history",
      icon: History,
    },
    {
      title: "Alternatives",
      href: "/dashboard/alternatives",
      icon: ShieldCheck,
    },
    {
      title: "Ingredients",
      href: "/dashboard/ingredients",
      icon: FlaskConical,
    },
    {
      title: "AI Insights",
      href: "/dashboard/insights",
      icon: Sparkles,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8fc]">

      {/* Sidebar */}
      <aside
        className={`
          flex
          flex-col
          border-r
          bg-white
          shadow-sm
          transition-all
          duration-300
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

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-5">

          <div className="space-y-2">

            {menuItems.map((item) => {

              const isActive =
                pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
                    transition-colors
                    hover:bg-violet-50
                    hover:text-violet-700

                    ${
                      isActive
                        ? "bg-violet-100 text-violet-700"
                        : ""
                    }
                  `}
                >

                  <item.icon className="h-5 w-5 shrink-0" />

                  {!collapsed && (
                    <span className="font-medium">
                      {item.title}
                    </span>
                  )}

                </Link>
              )
            })}

          </div>

        </div>

        {/* Profile Button */}
        <div className="border-t p-3">

          <Link
            href="/dashboard/profile"
            className={`
              flex
              items-center
              gap-4
              rounded-2xl
              px-4
              py-3
              transition-colors
              hover:bg-violet-50
              hover:text-violet-700

              ${
                pathname === "/dashboard/profile"
                  ? "bg-violet-100 text-violet-700"
                  : ""
              }
            `}
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-violet-100
              "
            >
              <User className="h-5 w-5 text-violet-700" />
            </div>

            {!collapsed && (
              <div>

                <p className="font-medium">
                  Profile
                </p>

                <p className="text-sm text-gray-500">
                  Manage account
                </p>

              </div>
            )}

          </Link>

        </div>

      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>

    </div>
  )
}