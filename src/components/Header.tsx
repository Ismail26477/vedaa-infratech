"use client"

import { useState, useEffect } from "react"
import AuthModal from "./AuthModal"
import { useUser } from "../lib/userStore"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const { user, logout } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleLocationChange = (event: Event) => {
      const customEvent = event as CustomEvent
      const location = customEvent.detail?.location
      if (location && ["India", "Dubai", "Australia"].includes(location)) {
        setSelectedLocation(location)
      }
    }

    window.addEventListener("locationChanged", handleLocationChange)
    return () => window.removeEventListener("locationChanged", handleLocationChange)
  }, [])

  const scrollToSection = (id: string, location?: string) => {
    if (location) {
      setSelectedLocation(location)
      window.dispatchEvent(
        new CustomEvent("locationChanged", {
          detail: { location },
        }),
      )
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const Menu = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )

  const X = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )

  const menuItems = ["Home", "About", "Services", "Properties", "Contact"]
  const locations = ["India", "Dubai", "Australia"]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => scrollToSection("hero")}>
            <img
              src="/vedaa-realestate-logo.png"
              alt="Vedaa Infratech Logo"
              className="w-24 sm:w-28 md:w-36 h-auto object-contain flex-shrink-0"
            />
            <div className="hidden sm:block flex-shrink-0">
              <h1 className={`text-lg sm:text-xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>Vedaa Infratech</h1>
              <p className={`text-xs ${isScrolled ? "text-amber-600" : "text-amber-400"}`}>Local, Reliable, Real</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Main Menu Items */}
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Location Divider */}
            <div className={`w-px h-6 ${isScrolled ? "bg-gray-300" : "bg-white/30"}`}></div>

            {locations.map((location) => (
              <button
                key={location}
                onClick={() => scrollToSection("properties", location)}
                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-full ${
                  selectedLocation === location
                    ? isScrolled
                      ? "bg-amber-600 text-white"
                      : "bg-white/30 text-white"
                    : isScrolled
                      ? "text-gray-900 hover:bg-amber-100"
                      : "text-white hover:bg-white/10"
                }`}
              >
                {location}
              </button>
            ))}

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  Welcome, {user.display_name || user.username || user.full_name || user.email}
                </span>
                <button
                  onClick={logout}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                    isScrolled ? "bg-red-600 text-white hover:bg-red-700" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  isScrolled ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t">
          <nav className="px-4 py-4 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {/* Main Menu Items */}
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-gray-900 hover:text-amber-600 transition-colors py-2 font-medium"
              >
                {item}
              </button>
            ))}

            {/* Mobile Divider */}
            <div className="h-px bg-gray-200 my-2"></div>

            <div className="font-semibold text-gray-900 text-sm mb-2">Browse by Location:</div>
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => scrollToSection("properties", location)}
                className={`text-left py-2 font-medium transition-colors px-3 rounded ${
                  selectedLocation === location ? "bg-amber-100 text-amber-700" : "text-gray-700 hover:text-amber-600"
                }`}
              >
                🌍 {location}
              </button>
            ))}

            {/* Mobile Divider */}
            <div className="h-px bg-gray-200 my-2"></div>

            {/* Mobile Auth */}
            {user ? (
              <div className="flex flex-col gap-2 py-2">
                <span className="text-gray-900 font-semibold text-sm">
                  Welcome, {user.display_name || user.username || user.full_name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-left text-red-600 font-semibold hover:text-red-700 transition-colors py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-left text-amber-600 font-semibold hover:text-amber-700 transition-colors py-2"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          setIsAuthModalOpen(false)
          window.location.reload()
        }}
      />
    </header>
  )
}

export default Header
