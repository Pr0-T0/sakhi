"use client"

import * as React from "react"

import {
  Upload,
  Loader2,
  Activity,
  AlertTriangle,
  FileText,
  HeartPulse,
} from "lucide-react"

type LabReportResult = {
  success?: boolean
  filename?: string
  insights?: string
}

function InsightCard({
  text,
}: {
  text: string
}) {

  const isWarning =
    text.toLowerCase().includes("low") ||
    text.toLowerCase().includes("high") ||
    text.toLowerCase().includes("fever") ||
    text.toLowerCase().includes("elevated")

  return (

    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        isWarning
          ? "border-red-200 bg-red-50"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >

      <div className="flex items-start gap-3">

        <div
          className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
            isWarning
              ? "bg-red-100"
              : "bg-emerald-100"
          }`}
        >

          {isWarning ? (

            <AlertTriangle className="h-5 w-5 text-red-600" />

          ) : (

            <HeartPulse className="h-5 w-5 text-emerald-600" />

          )}

        </div>

        <div>

          <p
            className={`text-sm font-medium leading-relaxed ${
              isWarning
                ? "text-red-900"
                : "text-emerald-900"
            }`}
          >
            {text}
          </p>

        </div>

      </div>

    </div>

  )
}

export default function LabReportScanner() {

  const [selectedImage, setSelectedImage] =
    React.useState<string | null>(null)

  const [loading, setLoading] =
    React.useState(false)

  const [result, setResult] =
    React.useState<LabReportResult | null>(null)

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = event.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setSelectedImage(imageUrl)

    const formData = new FormData()

    formData.append("file", file)

    try {

      setLoading(true)

      const response = await fetch(
        "http://127.0.0.1:8000/scan-lab-report",
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await response.json()

      setResult(data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  const insightList =
    result?.insights
      ?.split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0) || []

  return (

    <div className="min-h-screen bg-[#f6f6f8] p-6">

      <div className="mx-auto max-w-7xl">

        {/* UPLOAD SCREEN */}
        {!selectedImage && (

          <div className="flex min-h-[85vh] items-center justify-center">

            <div className="w-full max-w-4xl rounded-[2rem] border border-violet-100 bg-white p-10 shadow-sm">

              <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-violet-200 bg-violet-50/50 p-16 text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">

                  <Upload className="h-10 w-10 text-violet-700" />

                </div>

                <h1 className="mt-8 text-5xl font-bold text-gray-900">
                  Scan Lab Report
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-gray-500">
                  Upload blood reports or medical lab documents
                  to generate AI-powered health insights.
                </p>

                <label className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-violet-700 px-6 py-3 font-medium text-white transition-all hover:bg-violet-800">

                  <Upload className="h-4 w-4" />

                  Upload Lab Report

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />

                </label>

              </div>

            </div>

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <div className="flex min-h-[80vh] items-center justify-center">

            <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">

              <div className="flex items-center gap-4">

                <Loader2 className="h-7 w-7 animate-spin text-violet-700" />

                <span className="text-lg font-medium text-gray-700">
                  Analyzing Lab Report...
                </span>

              </div>

            </div>

          </div>

        )}

        {/* RESULT */}
        {result && !loading && (

          <div className="space-y-6">

            <button
              onClick={() => {
                setResult(null)
                setSelectedImage(null)
              }}
              className="text-sm font-medium text-violet-700"
            >
              ← Back to Upload
            </button>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="grid gap-6 xl:grid-cols-[340px_1fr]">

                {/* LEFT SIDE */}
                <div className="space-y-5">

                  <img
                    src={selectedImage!}
                    alt="Uploaded Lab Report"
                    className="h-[500px] w-full rounded-3xl border border-gray-200 object-cover"
                  />

                  <div className="rounded-3xl bg-black p-6 text-white">

                    <div className="flex items-center gap-2">

                      <Activity className="h-5 w-5 text-violet-400" />

                      <p className="text-sm text-gray-400">
                        Analysis Status
                      </p>

                    </div>

                    <div className="mt-4">

                      <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300">
                        {result.success
                          ? "Completed"
                          : "Failed"}
                      </span>

                    </div>

                  </div>

                  {result.filename && (

                    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">

                          <FileText className="h-5 w-5 text-violet-700" />

                        </div>

                        <div>

                          <p className="text-sm text-gray-500">
                            Uploaded File
                          </p>

                          <p className="font-semibold text-gray-900">
                            {result.filename}
                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">

                  <div>

                    <h1 className="text-5xl font-bold text-gray-900">
                      Lab Report Analysis
                    </h1>

                    <p className="mt-3 text-lg text-gray-500">
                      AI-generated health observations extracted
                      from your uploaded medical report.
                    </p>

                  </div>

                  {/* INSIGHTS */}
                  <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">

                        <HeartPulse className="h-6 w-6 text-violet-700" />

                      </div>

                      <div>

                        <h2 className="text-2xl font-semibold text-gray-900">
                          Health Insights
                        </h2>

                        <p className="text-sm text-gray-500">
                          Extracted findings from OCR + AI analysis
                        </p>

                      </div>

                    </div>

                    <div className="mt-6 grid gap-4">

                      {insightList.map((item, index) => (

                        <InsightCard
                          key={index}
                          text={item}
                        />

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  )
}