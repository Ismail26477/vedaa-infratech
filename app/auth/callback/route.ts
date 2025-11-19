import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            } catch {
              // Silently handle errors
            }
          },
        },
      }
    )

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.log("[v0] Auth callback error:", error.message)
      return NextResponse.redirect(new URL("/?auth_error=true", request.url))
    }

    console.log("[v0] Auth callback successful, user authenticated")
    // Redirect to home page after successful auth
    return NextResponse.redirect(new URL("/", request.url))
  } catch (err) {
    console.log("[v0] Callback exception:", err instanceof Error ? err.message : "Unknown error")
    return NextResponse.redirect(new URL("/?auth_error=true", request.url))
  }
}
