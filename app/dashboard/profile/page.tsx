"use client"

import * as React from "react"

import { createClient } from "@/lib/supabase/client"

import {
  User,
  Save,
  Loader2,
} from "lucide-react"

export default function ProfilePage() {

  const supabase = createClient()

  const [loading, setLoading] =
    React.useState(true)

  const [saving, setSaving] =
    React.useState(false)

  const [userId, setUserId] =
    React.useState<string | null>(null)

  const [fullName, setFullName] =
    React.useState("")

  const [age, setAge] =
    React.useState("")

  const [message, setMessage] =
    React.useState("")

  React.useEffect(() => {

    async function fetchProfile() {

      try {

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        setUserId(user.id)

        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, age")
          .eq("id", user.id)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error(error)
          return
        }

        if (data) {
          setFullName(data.full_name || "")
          setAge(data.age?.toString() || "")
        }

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)
      }
    }

    fetchProfile()

  }, [supabase])

  async function handleSave() {

    if (!userId) return

    try {

      setSaving(true)
      setMessage("")

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          full_name: fullName,
          age: age ? Number(age) : null,
          updated_at: new Date().toISOString(),
        })

      if (error) {
        console.error(error)
        setMessage("Failed to save profile")
        return
      }

      setMessage("Profile updated successfully")

    } catch (error) {

      console.error(error)
      setMessage("Something went wrong")

    } finally {

      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="flex items-center gap-3 text-violet-700">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span className="font-medium">
            Loading profile...
          </span>
        </div>

      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl pb-10">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-900">
          Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your profile information.
        </p>

      </div>

      {/* Card */}
      <div
        className="
          rounded-3xl
          border
          border-violet-100
          bg-white/70
          p-8
          shadow-sm
          backdrop-blur-sm
        "
      >

        {/* Avatar Placeholder */}
        <div className="flex justify-center">

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
            <User className="h-10 w-10 text-violet-700" />
          </div>

        </div>

        {/* Form */}
        <div className="mt-10 space-y-6">

          {/* Full Name */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="Enter your full name"
              className="
                w-full
                rounded-2xl
                border
                border-violet-100
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-violet-300
                focus:ring-4
                focus:ring-violet-100
              "
            />

          </div>

          {/* Age */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
              placeholder="Enter your age"
              className="
                w-full
                rounded-2xl
                border
                border-violet-100
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-violet-300
                focus:ring-4
                focus:ring-violet-100
              "
            />

          </div>

          {/* Message */}
          {message && (
            <div
              className="
                rounded-2xl
                bg-violet-50
                px-4
                py-3
                text-sm
                text-violet-700
              "
            >
              {message}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="
              inline-flex
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
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >

            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Profile
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  )
}
