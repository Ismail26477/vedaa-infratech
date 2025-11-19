import { useInView } from "../hooks/useInView"

const Home = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const Building2 = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 2v20M15 2v20M4 7h16M4 12h16M4 17h16" />
  </svg>
)

const ClipboardList = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="2" width="15" height="20" rx="2" ry="2" />
    <path d="M8 6h10M8 10h10M8 14h10M8 18h10" />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const Key = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 2l-9 4m0 0L6 2m6 4v12m0 0l-6-3m6 3l6-3" />
  </svg>
)

const Landmark = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 20 6 20 18 4 18 4 6 12 2" />
    <path d="M12 10v8M8 14h8" />
  </svg>
)

const Services = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const services = [
    {
      icon: Home,
      title: "Residential Sales & Purchases",
      description: "Find, buy, or sell homes with ease. We guide you through every step of the journey.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Building2,
      title: "Commercial Real Estate",
      description: "Tailored leasing and acquisition solutions for your business needs.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: ClipboardList,
      title: "Property Management",
      description: "Full-service management for stress-free ownership and maximum returns.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Real Estate Investment Advisory",
      description: "Data-driven insights to grow your portfolio and maximize ROI.",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Key,
      title: "Rental Services",
      description: "Efficient property marketing and leasing solutions for landlords and tenants.",
      color: "bg-rose-100 text-rose-600",
    },
    {
      icon: Landmark,
      title: "Land & Development",
      description: "From zoning to resale, we guide every step of your land investment.",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Comprehensive Real Estate Solutions
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              From residential to commercial, we offer a full spectrum of real estate services tailored to your unique
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-center text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Learn More</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
