"use client"

import * as React from "react"

import {
  Upload,
  Loader2,
  Info,
} from "lucide-react"

export type RiskScore = {
  score?: number
  level?: string
}

export type NutritionValue = {
  value?: number
  unit?: string
}

export type Ingredient = {
  original_text?: string
  normalized_name?: string
  ingredient_type?: string
  risk_tags?: string[]
  detected_edc?: boolean
  is_natural?: boolean
}

export type Finding = {
  ingredient?: string
  issues?: string[]
}

export type ScanResult = {

  status?: string

  product?: {
    name?: string
    brand?: string
    category?: string
    document_type?: string
  }

  scores?: {

    overall?: number

    toxicity?: RiskScore

    hormonal?: RiskScore

    nutrition?: RiskScore

    processed?: RiskScore

    clean_beauty?: RiskScore
  }

  ingredient_stats?: {
    natural?: number
    synthetic?: number
    preservatives?: number
    edcs?: number
    fragrances?: number
  }

  exposure?: {
    endocrine_disruptors?: number
    preservatives?: number
    synthetic_ingredients?: number
    natural_ingredients?: number
    fragrances?: number
  }

  nutrition?: {
    serving_size?: string

    calories?: NutritionValue
    sugar?: NutritionValue
    added_sugar?: NutritionValue
    protein?: NutritionValue
    fat?: NutritionValue
    saturated_fat?: NutritionValue
    trans_fat?: NutritionValue
    sodium?: NutritionValue
    fiber?: NutritionValue
    carbohydrates?: NutritionValue
  }

  ingredients?: Ingredient[]

  highlights?: string[]

  findings?: Finding[]

  warnings?: string[]

  allergens?: string[]

  claims?: string[]

  meta?: {
    filename?: string
    ocr_quality?: string
    ingredient_count?: number
    ingredients_detected?: boolean
    nutrition_detected?: boolean
    findings_detected?: boolean
  }
}

type ScoreCardProps = {
  title: string
  score?: number
  level?: string
}

function getLevelColor(level?: string) {

  if (!level) {
    return "text-gray-500"
  }

  const lower = level.toLowerCase()

  if (lower.includes("high")) {
    return "text-red-500"
  }

  if (lower.includes("moderate")) {
    return "text-orange-500"
  }

  return "text-green-500"
}

function getProgressColor(level?: string) {

  if (!level) {
    return "bg-gray-400"
  }

  const lower = level.toLowerCase()

  if (lower.includes("high")) {
    return "bg-red-500"
  }

  if (lower.includes("moderate")) {
    return "bg-orange-500"
  }

  return "bg-green-500"
}

function ScoreCard({
  title,
  score,
  level,
}: ScoreCardProps) {

  return (

    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-2">

        <h3 className="text-sm font-medium text-gray-700">
          {title}
        </h3>

        <Info className="h-4 w-4 text-gray-400" />

      </div>

      <div className="mt-4 flex items-end gap-2">

        <span className={`text-5xl font-bold ${getLevelColor(level)}`}>
          {score ?? 0}
        </span>

        <span className="mb-2 text-gray-400">
          /100
        </span>

      </div>

      {level && (

        <p className={`mt-1 text-sm font-medium ${getLevelColor(level)}`}>
          {level}
        </p>

      )}

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">

        <div
          style={{
            width: `${score ?? 0}%`
          }}
          className={`h-full rounded-full ${getProgressColor(level)}`}
        />

      </div>

    </div>

  )
}

export default function ScanPage() {

  const [selectedImage, setSelectedImage] =
    React.useState<string | null>(null)

  const [loading, setLoading] =
    React.useState(false)

  const [result, setResult] =
    React.useState<ScanResult | null>(null)

  async function handleImageUpload(
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
        "http://127.0.0.1:8000/extract-text",
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await response.json()

      setResult(data as ScanResult)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen bg-[#f6f6f8] p-6">

      <div className="mx-auto max-w-7xl">

        {/* UPLOAD */}
        {!selectedImage && (

          <div className="flex min-h-[80vh] items-center justify-center">

            <div className="w-full max-w-3xl rounded-[2rem] border border-violet-100 bg-white p-10 shadow-sm">

              <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-violet-200 bg-violet-50/50 p-16 text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">

                  <Upload className="h-10 w-10 text-violet-700" />

                </div>

                <h1 className="mt-8 text-5xl font-bold text-gray-900">
                  Scan Product
                </h1>

                <p className="mt-4 max-w-lg text-gray-500">
                  Disclaimer:The analysis produced will depend heavily on the OCR data 
                </p>

                <label className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-violet-700 px-6 py-3 font-medium text-white transition-all hover:bg-violet-800">

                  <Upload className="h-4 w-4" />

                  Upload Image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
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

                <Loader2 className="h-6 w-6 animate-spin text-violet-700" />

                <span className="text-lg font-medium text-gray-700">
                  Analyzing Product...
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

              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">

                {/* LEFT */}
                <div className="space-y-5">

                  <img
                    src={selectedImage!}
                    alt="Uploaded"
                    className="h-[380px] w-full rounded-3xl object-cover"
                  />

                  {result.scores?.overall !== undefined && (

                    <div className="rounded-3xl bg-black p-6 text-white">

                      <p className="text-sm text-gray-400">
                        Overall Score
                      </p>

                      <div className="mt-3 flex items-end gap-2">

                        <span className="text-7xl font-bold">
                          {result.scores.overall}
                        </span>

                        <span className="mb-3 text-lg text-gray-400">
                          /100
                        </span>

                      </div>

                    </div>

                  )}

                  {result.product && (

                    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">

                      <h2 className="text-lg font-semibold text-gray-900">
                        Product Information
                      </h2>

                      <div className="mt-4 space-y-3">

                        {result.product.name && (

                          <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                              Name
                            </span>

                            <span className="font-medium text-gray-900">
                              {result.product.name}
                            </span>

                          </div>

                        )}

                        {result.product.brand && (

                          <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                              Brand
                            </span>

                            <span className="font-medium text-gray-900">
                              {result.product.brand}
                            </span>

                          </div>

                        )}

                        {result.product.category && (

                          <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                              Category
                            </span>

                            <span className="font-medium text-gray-900">
                              {result.product.category}
                            </span>

                          </div>

                        )}

                        {result.product.document_type && (

                          <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                              Type
                            </span>

                            <span className="font-medium text-gray-900">
                              {result.product.document_type}
                            </span>

                          </div>

                        )}

                      </div>

                    </div>

                  )}

                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                  <div>

                    <h1 className="text-5xl font-bold text-gray-900">
                      Product Analysis
                    </h1>

                    <p className="mt-3 text-lg text-gray-500">
                      AI-powered ingredient and nutrition analysis
                    </p>

                  </div>

                  {/* SCORES */}
                  {result.scores && (

                    <div>

                      <h2 className="mb-5 text-2xl font-semibold text-gray-900">
                        Health Scores
                      </h2>

                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                        {result.scores.toxicity && (

                          <ScoreCard
                            title="Toxicity"
                            score={result.scores.toxicity.score}
                            level={result.scores.toxicity.level}
                          />

                        )}

                        {result.scores.hormonal && (

                          <ScoreCard
                            title="Hormonal"
                            score={result.scores.hormonal.score}
                            level={result.scores.hormonal.level}
                          />

                        )}

                        {result.scores.nutrition && (

                          <ScoreCard
                            title="Nutrition"
                            score={result.scores.nutrition.score}
                            level={result.scores.nutrition.level}
                          />

                        )}

                        {result.scores.clean_beauty && (

                          <ScoreCard
                            title="Clean Beauty"
                            score={result.scores.clean_beauty.score}
                            level={result.scores.clean_beauty.level}
                          />

                        )}

                      </div>

                    </div>

                  )}

                  {/* NUTRITION */}
                  {result.nutrition && (

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">

                      <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-semibold text-blue-900">
                          Nutrition Facts
                        </h2>

                        {result.nutrition.serving_size && (

                          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700">
                            {result.nutrition.serving_size}
                          </span>

                        )}

                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                        {Object.entries(result.nutrition).map(
                          ([key, value], index) => (

                            key !== "serving_size" &&
                            value &&
                            typeof value === "object" &&
                            value.value !== undefined && (

                              <div
                                key={index}
                                className="rounded-2xl bg-white p-5 shadow-sm"
                              >

                                <p className="text-sm font-medium capitalize text-gray-500">
                                  {key.replaceAll("_", " ")}
                                </p>

                                <div className="mt-3 flex items-end gap-2">

                                  <span className="text-5xl font-bold text-gray-900">
                                    {value.value}
                                  </span>

                                  {value.unit && (

                                    <span className="mb-1 text-gray-500">
                                      {value.unit}
                                    </span>

                                  )}

                                </div>

                              </div>

                            )

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* HIGHLIGHTS */}
                  {result.highlights &&
                    result.highlights.length > 0 && (

                      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

                        <h2 className="text-2xl font-semibold text-emerald-900">
                          Positive Highlights
                        </h2>

                        <div className="mt-5 grid gap-3 md:grid-cols-2">

                          {result.highlights.map(
                            (item, index) => (

                              <div
                                key={index}
                                className="rounded-2xl bg-white p-4 text-sm font-medium text-gray-700"
                              >
                                ✓ {item}
                              </div>

                            )
                          )}

                        </div>

                      </div>

                    )}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  )
}