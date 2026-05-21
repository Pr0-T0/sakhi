import { createClient } from "@/lib/supabase/client"

export type RiskScore = {
  score?: number
  level?: string
}

export type ScanResult = {
  product?: {
    name?: string
    brand?: string
    category?: string
  }

  scores?: {
    overall?: number

    toxicity?: RiskScore
    hormonal?: RiskScore
    nutrition?: RiskScore
    processed?: RiskScore
  }
}

export async function saveProductScan(
  scan: ScanResult
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
      .from("product_scans")
      .insert({

        user_id: user.id,

        product_name:
          scan.product?.name ?? null,

        brand:
          scan.product?.brand ?? null,

        category:
          scan.product?.category ?? null,

        overall_score:
          scan.scores?.overall ?? null,

        toxicity_score:
          scan.scores?.toxicity?.score ?? null,

        toxicity_level:
          scan.scores?.toxicity?.level ?? null,

        hormonal_score:
          scan.scores?.hormonal?.score ?? null,

        hormonal_level:
          scan.scores?.hormonal?.level ?? null,

        nutrition_score:
          scan.scores?.nutrition?.score ?? null,

        nutrition_level:
          scan.scores?.nutrition?.level ?? null,

        processed_score:
          scan.scores?.processed?.score ?? null,

        processed_level:
          scan.scores?.processed?.level ?? null,
      })

    if (error) {
      console.error(error)
    }

  } catch (error) {

    console.error(error)

  }
}