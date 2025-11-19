"use client"

import { useState, useCallback, useEffect } from "react"
import { createClient } from "./supabase/client"

export interface User {
  id: string
  email: string
  full_name: string | null
  username: string | null
  phone: string | null
  display_name?: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (authUser) {
          const userData: User = {
            id: authUser.id,
            email: authUser.email || "",
            full_name: authUser.user_metadata?.full_name || null,
            username: authUser.user_metadata?.username || null,
            phone: authUser.user_metadata?.phone || null,
            display_name: authUser.user_metadata?.username || authUser.user_metadata?.full_name,
          }
          setUser(userData)
        }
      } catch (error) {
        console.error("[v0] Error checking user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const logout = useCallback(async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("[v0] Error logging out:", error)
    }
  }, [])

  return { user, isLoading, logout }
}
