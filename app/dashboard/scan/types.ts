export type ScanResult = {
  filename: string

  text: {
    scan_status: string

    meta: {
      has_ingredients: boolean
      has_nutrition: boolean
      has_findings: boolean
      has_claim_warnings: boolean
      total_ingredients: number
    }

    overall_health_score: number

    scores: {
      toxicity: {
        score: number
        level: string
      }

      hormonal: {
        score: number
        level: string
      }

      nutrition: {
        score: number
        level: string
      }

      processed: {
        score: number
      }

      clean_beauty: {
        score: number
      }
    }

    ingredient_summary: {
      natural_count: number
      synthetic_count: number
      preservative_count: number
      edc_count: number
      fragrance_count: number
    }

    positive_highlights: string[]

    findings: any[]

    claim_warnings: any[]

    exposure_breakdown: {
      endocrine_disruptors: number
      preservatives: number
      synthetic_ingredients: number
      natural_ingredients: number
      fragrances: number
    }

    nutrition: Record<string, any>

    ui: {
      primary_score: number
      primary_label: string
      risk_color: string
      score_ring_color: string
    }
  }
}