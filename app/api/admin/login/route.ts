import { type NextRequest, NextResponse } from "next/server"

// Simple hardcoded credentials (in production, use proper database auth)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin@123",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

      return NextResponse.json(
        {
          success: true,
          token,
          message: "Login successful",
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
