"use client"

import { useState, useEffect } from "react"

const MessageCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const WhatsAppCTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const phoneNumber = "919359945316"
  const message = "Hi! I am interested in your real estate services."
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      {isVisible && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-40 flex items-center gap-3 animate-bounce"
        >
          <div
            className={`bg-white rounded-lg shadow-2xl px-4 py-3 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <p className="text-green-600 font-semibold text-sm whitespace-nowrap">Chat with us on WhatsApp</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group">
            <MessageCircle className="w-8 h-8 text-white group-hover:animate-pulse" />
          </div>
        </a>
      )}
    </>
  )
}

export default WhatsAppCTA
