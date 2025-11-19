"use client"

import Header from "@/src/components/Header"
import Hero from "@/src/components/Hero"
import About from "@/src/components/About"
import Services from "@/src/components/Services"
import Properties from "@/src/components/Properties"
import WhyChooseUs from "@/src/components/WhyChooseUs"
import Contact from "@/src/components/Contact"
import Footer from "@/src/components/Footer"
import WhatsAppCTA from "@/src/components/WhatsAppCTA"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    document.title = "Vedaa Infratech - Local, Reliable, Real"

    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Properties />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <WhatsAppCTA />
    </div>
  )
}
