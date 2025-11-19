"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in (except on login page)
    const token = localStorage.getItem("adminToken")
    if (!token && !window.location.pathname.includes("/login")) {
      router.push("/admin/login")
    }
  }, [router])

  return <>{children}</>
}
