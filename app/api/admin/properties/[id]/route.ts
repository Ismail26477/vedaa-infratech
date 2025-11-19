import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/src/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const supabase = getSupabaseServer()

    const { data, error } = await supabase.from("properties").select("*").eq("id", id).single()

    if (error || !data) {
      return NextResponse.json({ message: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Failed to fetch property:", error)
    return NextResponse.json({ message: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const body = await request.json()
    const supabase = getSupabaseServer()

    const { data, error } = await supabase.from("properties").update(body).eq("id", id).select().single()

    if (error || !data) {
      return NextResponse.json({ message: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("[v0] Failed to update property:", error)
    return NextResponse.json({ message: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const supabase = getSupabaseServer()

    const { error } = await supabase.from("properties").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Property deleted successfully" })
  } catch (error) {
    console.error("[v0] Failed to delete property:", error)
    return NextResponse.json({ message: "Failed to delete property" }, { status: 500 })
  }
}
