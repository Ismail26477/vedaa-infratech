import { useInView } from "../hooks/useInView"

const Award = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8 14 12 17 16 14" />
    <line x1="12" y1="17" x2="12" y2="23" />
    <line x1="9" y1="20" x2="15" y2="20" />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

const Shield = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">Your Trusted Real Estate Partner</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At <span className="font-semibold text-amber-600">Vedaa Infratech</span>, we combine integrity,
                expertise, and a client-first approach to deliver exceptional real estate experiences—whether you're
                buying, selling, or investing.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From first-time buyers to seasoned investors, we deliver results with integrity, expertise, and a
                client-first approach. Our deep local knowledge and commitment to transparent dealings make us the
                preferred choice for residential and commercial real estate in Nagpur.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-4xl font-bold text-amber-600">500+</p>
                  <p className="text-sm text-gray-600 mt-1">Properties Sold</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-4xl font-bold text-amber-600">98%</p>
                  <p className="text-sm text-gray-600 mt-1">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern office"
                  className="rounded-lg shadow-xl w-full h-64 object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Real estate meeting"
                  className="rounded-lg shadow-xl w-full h-64 object-cover mt-8"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Expert Team", desc: "Certified professionals" },
              { icon: Users, title: "Client-First", desc: "Your needs, our priority" },
              { icon: TrendingUp, title: "Market Leaders", desc: "Proven track record" },
              { icon: Shield, title: "Trusted Service", desc: "Transparent dealings" },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-amber-50 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 group-hover:bg-amber-600 transition-colors">
                  {item.icon({ className: "w-8 h-8 text-amber-600 group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
