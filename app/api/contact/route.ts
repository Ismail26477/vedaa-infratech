import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact API called")
    const body = await request.json()
    console.log("[v0] Request body:", { ...body, message: body.message?.substring(0, 50) })
    
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // silently ignore cookie errors in Server Components
            }
          },
        },
      }
    )

    console.log("[v0] Inserting into contacts table")
    const { error, data } = await supabase.from("contacts").insert([
      {
        name,
        email,
        phone: phone || null,
        message,
      },
    ])

    if (error) {
      console.error("[v0] Database error:", error.message, error.details, error.code)
      return NextResponse.json({ error: "Failed to save message. Please try again." }, { status: 500 })
    }

    console.log("[v0] Message saved successfully:", data)
    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 201 })
  } catch (error) {
    console.error("[v0] API error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "An error occurred. Please try again." }, { status: 500 })
  }
}
