"use client"

import * as React from "react"

import {
  Upload,
  Loader2,
} from "lucide-react"

export default function ScanPage() {

  const [selectedImage, setSelectedImage] =
    React.useState<string | null>(null)

  const [loading, setLoading] =
    React.useState(false)

  const [result, setResult] =
    React.useState<any>(null)

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
      const response = await fetch("http://127.0.0.1:8000/extract-text", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        flex
        min-h-[calc(100vh-120px)]
        items-center
        justify-center
      "
    >

      <div className="w-full max-w-3xl">

        {/* Upload Card */}
        <div
          className="
            rounded-[2rem]
            border
            border-violet-100
            bg-white/70
            p-8
            shadow-sm
            backdrop-blur-sm
          "
        >

          {!selectedImage ? (

            <div
              className="
                flex
                min-h-[420px]
                flex-col
                items-center
                justify-center
                rounded-[2rem]
                border-2
                border-dashed
                border-violet-200
                bg-gradient-to-br
                from-violet-50
                to-white
                p-10
                text-center
              "
            >

              {/* Icon */}
              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-100
                "
              >

                <Upload className="h-10 w-10 text-violet-700" />

              </div>

              {/* Heading */}
              <h1 className="mt-7 text-4xl font-bold text-gray-900">
                Upload Product Image
              </h1>

              <p className="mt-4 max-w-lg text-gray-500">
                Upload a product label or ingredient image
                for AI-powered ingredient extraction.
              </p>

              {/* Upload Button */}
              <label
                className="
                  mt-8
                  inline-flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-2xl
                  bg-violet-700
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  hover:bg-violet-800
                "
              >

                <Upload className="h-4 w-4" />

                Choose Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

              </label>

              <p className="mt-4 text-sm text-gray-400">
                JPG, PNG or WEBP
              </p>

            </div>

          ) : (

            <div>

              {/* Preview */}
              <img
                src={selectedImage}
                alt="Uploaded"
                className="
                  mx-auto
                  max-h-[360px]
                  rounded-2xl
                  object-contain
                  shadow-sm
                "
              />

              {/* Loading */}
              {loading && (

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    justify-center
                    gap-3
                    text-violet-700
                  "
                >

                  <Loader2 className="h-5 w-5 animate-spin" />

                  <span className="font-medium">
                    Extracting ingredients...
                  </span>

                </div>

              )}

              {/* Result */}
              {result && !loading && (

                <div
                  className="
                    mt-8
                    rounded-2xl
                    border
                    border-violet-100
                    bg-[#faf8ff]
                    p-5
                  "
                >

                  <h2 className="mb-4 text-xl font-semibold">
                    Extracted JSON
                  </h2>

                  <pre
                    className="
                      overflow-x-auto
                      rounded-xl
                      bg-black
                      p-4
                      text-sm
                      text-green-400
                    "
                  >
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}