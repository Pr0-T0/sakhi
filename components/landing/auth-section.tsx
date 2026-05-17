import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthSection() {
  return (
    <section id="auth-section" className="w-full px-4 sm:px-6 mt-8 mb-10">
      <div className="max-w-7xl mx-auto bg-white border rounded-[32px] p-6 md:p-10 shadow-sm">
        
        <div className="flex flex-col items-center text-center">
          
          {/* Heading */}
          <h2 className="text-3xl font-bold">
            Let’s get started
          </h2>

          <p className="text-muted-foreground mt-2 max-w-2xl">
            Create an account to save your scans,
            track exposure, and receive personalized insights.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            
            {/* Login */}
            <Button
              variant="outline"
              className="
                h-14
                px-10
                rounded-2xl
                text-base
                border-violet-200
                hover:bg-violet-50
              "
            >
            <Link href="/auth/login">Sign in</Link>
            </Button>

            {/* Register */}
            <Button
              className="
                h-14
                px-10
                rounded-2xl
                text-base
                bg-violet-700
                hover:bg-violet-800
              "
            >
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>

          </div>

        </div>
      </div>
    </section>
  );
}