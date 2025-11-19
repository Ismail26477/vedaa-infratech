"use client"

import { useState, useEffect } from "react"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const sliderImages = [
    {
      url: "https://wallpapercave.com/wp/wp4110657.jpg",
      alt: "Luxury Building 1",
      title: "Premium Luxury",
      description: "Modern luxury apartments",
    },
    {
      url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?cs=srgb&dl=pexels-expect-best-323780.jpg&fm=jpg",
      alt: "Modern Property",
      title: "Contemporary Design",
      description: "Sleek modern properties",
    },
    {
      url: "https://wallpapercave.com/wp/wp4110686.jpg",
      alt: "Luxury Building 2",
      title: "Elegant Estates",
      description: "Premium residential spaces",
    },
    {
      url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Beachfront Property",
      title: "Beachfront Living",
      description: "Stunning waterfront views",
    },
    {
      url: "https://images.pexels.com/photos/1913974/pexels-photo-1913974.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Urban Skyrise",
      title: "Urban Skyrise",
      description: "City center commercial",
    },
    {
      url: "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Country Villa",
      title: "Country Villa",
      description: "Sprawling rural estates",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [sliderImages.length])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )

  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )

  const ChevronDown = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )

  const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log("[v0] Image failed to load:", image.url)
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-5" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-6 inline-block">
          <span className="inline-block px-6 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-600/30 rounded-full text-amber-400 text-sm font-medium">
            {sliderImages[currentSlide].title} - Slide {currentSlide + 1}/{sliderImages.length}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Local. Reliable. Real.
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          {sliderImages[currentSlide].description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection("properties")}
            className="group px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            View Properties
            <ArrowRight />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Dot indicators and manual navigation */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-10 text-white"
      >
        <ChevronDown />
      </button>
    </section>
  )
}

export default Hero
