"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, MapPin, Bed as Bed2, Bath } from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  country: string
  price: number
  bedrooms: number
  bathrooms: number
  area: string
  description: string
  image_url: string
  property_type: string
  rating: number
  features?: string[]
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("India")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleLocationChange = (e: CustomEvent) => {
      console.log("[v0] Location changed to:", e.detail.location)
      setSelectedLocation(e.detail.location)
      setCurrentIndex(0)
      sessionStorage.setItem("selectedLocation", e.detail.location)
    }

    window.addEventListener("locationChanged", handleLocationChange as EventListener)
    return () => window.removeEventListener("locationChanged", handleLocationChange as EventListener)
  }, [])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/admin/properties")

        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }

        const data = await response.json()
        console.log("[v0] Fetched properties:", data)
        setProperties(data)
      } catch (err) {
        console.error("[v0] Error fetching properties:", err)
        setError("Failed to load properties. Please try again later.")
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties by selected country
  const filteredProperties = properties.filter((prop) => prop.country.toLowerCase() === selectedLocation.toLowerCase())

  // Get carousel items for current location
  const visibleProperties = filteredProperties.slice(currentIndex, currentIndex + 3)

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, filteredProperties.length - 3)
      return Math.min(prev + 1, maxIndex)
    })
  }

  return (
    <section id="properties" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Properties</h2>
          <p className="text-lg text-gray-600">
            Discover our premium real estate listings across India, Dubai, and Australia
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["India", "Dubai", "Australia"].map((location) => (
            <button
              key={location}
              onClick={() => {
                setSelectedLocation(location)
                setCurrentIndex(0)
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedLocation === location
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-white text-gray-900 border-2 border-gray-200 hover:border-amber-600"
              }`}
            >
              {location}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 p-6 rounded-lg text-center">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found in {selectedLocation}.</p>
          </div>
        )}

        {/* Properties Carousel */}
        {!loading && !error && filteredProperties.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {visibleProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => setSelectedProperty(property)}
                >
                  {/* Property Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img
                      src={property.image_url || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property.property_type}
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(property.rating) ? "fill-amber-600 text-amber-600" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({property.rating})</span>
                    </div>

                    {/* Details */}
                    <div className="flex gap-4 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-1">
                        <Bed2 className="w-4 h-4 text-amber-600" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-amber-600" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="text-gray-600">{property.area}</div>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-bold text-amber-600">
                      ₹{Number(property.price).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {filteredProperties.length > 3 && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-full bg-amber-600 text-white hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= filteredProperties.length - 3}
                  className="p-3 rounded-full bg-amber-600 text-white hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Property Detail Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="flex items-center gap-2 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                  <span className="font-semibold">Back</span>
                </button>
                <h2 className="text-2xl font-bold text-center">{selectedProperty.title}</h2>
                <div className="w-12"></div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Property Image */}
                <div className="w-full h-80 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={selectedProperty.image_url || "/placeholder.svg"}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property Type and Rating */}
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold">
                    {selectedProperty.property_type}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(selectedProperty.rating) ? "fill-amber-600 text-amber-600" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 font-semibold text-gray-900">({selectedProperty.rating})</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Location</p>
                    <p className="text-lg text-gray-900 font-medium">{selectedProperty.location}</p>
                  </div>
                </div>

                {/* Property Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <Bed2 className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.bedrooms}</p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <Bath className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.bathrooms}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.area}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-lg border-2 border-amber-200">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Price</p>
                  <p className="text-4xl font-bold text-amber-600">
                    ₹{Number(selectedProperty.price).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Description */}
                {selectedProperty.description && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
                  </div>
                )}

                {/* Features */}
                {selectedProperty.features && selectedProperty.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProperty.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          <span className="text-gray-900 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="flex-1 px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-all"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Properties
