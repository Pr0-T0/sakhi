import { createClient } from "@/lib/supabase/client"

export type LabReportResult = {
  success?: boolean
  filename?: string
  insights?: string
}

export async function saveLabReport(
  report: LabReportResult
) {

  try {

    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("User not found")
      return
    }

    const { error } = await supabase
      .from("lab_reports")
      .insert({

        user_id: user.id,

        filename:
          report.filename ?? null,

        insights:
          report.insights ?? null,

        status:
          report.success
            ? "completed"
            : "failed",
      })

    if (error) {
      console.error(error)
    }

  } catch (error) {

    console.error(error)

  }
}