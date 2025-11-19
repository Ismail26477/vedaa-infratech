"use client"

import { useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Properties from "./components/Properties"
import WhyChooseUs from "./components/WhyChooseUs"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import WhatsAppCTA from "./components/WhatsAppCTA"

function App() {
  useEffect(() => {
    document.title = "Vedaa Infratech - Local, Reliable, Real"
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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

export default App
