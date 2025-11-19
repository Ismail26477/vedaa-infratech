"use client"

import { useInView } from "../hooks/useInView"

const MapPin = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Handshake = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 14l7-7m-6 6l-3 3m0 0l-3-3m3 3l6-6" />
  </svg>
)

const HeadphonesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6M3 18a9 9 0 0 0 9 9 9 9 0 0 0 9-9" />
    <circle cx="6" cy="14" r="2" />
    <circle cx="18" cy="14" r="2" />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const WhyChooseUs = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 })

  const reasons = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Deep knowledge of Nagpur real estate market and neighborhoods",
    },
    {
      icon: Handshake,
      title: "Transparent Dealings",
      description: "Honest communication and clear processes at every step",
    },
    {
      icon: HeadphonesIcon,
      title: "Reliable Support",
      description: "24/7 assistance from consultation to closing and beyond",
    },
    {
      icon: Heart,
      title: "Client-First Approach",
      description: "Your satisfaction and success are our top priorities",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.3)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Your Success is Our Mission</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              We don't just sell properties—we build lasting relationships based on trust, expertise, and exceptional
              service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-600/20 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-300 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <p className="text-xl md:text-2xl text-white font-semibold mb-2">Ready to find your dream property?</p>
              <p className="text-gray-300 mb-6">Let's turn your real estate goals into reality</p>
              <button
                onClick={() => {
                  const element = document.getElementById("contact")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
