"use client"

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

const Phone = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const Mail = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <circle cx="17.5" cy="6.5" r="1.5" />
  </svg>
)

const ArrowUp = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-slate-900 text-white relative">
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-lg hover:scale-110 group"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img
                src="/vedaa-realestate-logo.png"
                alt="Vedaa Infratech Logo"
                className="w-24 sm:w-28 md:w-32 h-auto object-contain opacity-90 mb-3"
              />
              <div>
                <h3 className="text-lg font-bold">Vedaa Infratech</h3>
                <p className="text-sm text-amber-400">Local, Reliable, Real</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted partner in residential and commercial real estate, delivering excellence with integrity.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/vedaainfratech?igsh=Y3dqZWR5MDh0MHl5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Properties", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-400 hover:text-amber-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Residential Sales</li>
              <li>Commercial Real Estate</li>
              <li>Property Management</li>
              <li>Investment Advisory</li>
              <li>Rental Services</li>
              <li>Land Development</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <a
                href="tel:8459989479"
                className="flex items-start gap-3 text-gray-400 hover:text-amber-600 transition-colors"
              >
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>8459989479</p>
                  <p>9359945316</p>
                </div>
              </a>
              <a
                href="mailto:contact@vedarealities.com"
                className="flex items-center gap-3 text-gray-400 hover:text-amber-600 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contact@vedarealities.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <Home className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>
                  F ENCO 301, VINAYAK ENCLAVE
                  <br />P NO1, Manish Nagar
                  <br />
                  Nagpur, Maharashtra 440015
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Vedaa Infratech. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <button className="hover:text-amber-600 transition-colors">Privacy Policy</button>
              <button className="hover:text-amber-600 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
