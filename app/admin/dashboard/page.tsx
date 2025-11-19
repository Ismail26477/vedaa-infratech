"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, LogOut, Plus, Edit2, X, ArrowLeft } from "lucide-react"
import { Star } from "lucide-react"

interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image_url: string
  property_type: string
  status: string
  squareFeet?: number
  yearBuilt?: number
  rating?: number
  features?: string[]
  country?: string // Added country field to organize properties by location
}

const Bed = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M6 9l-2 7v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5l-2-7M6 9h12" />
  </svg>
)

const Bath = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm0 16h16M8 9h8" />
  </svg>
)

export default function AdminDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image_url: "",
    property_type: "residential",
    status: "available",
    squareFeet: "",
    yearBuilt: "",
    rating: "",
    features: "",
    country: "India", // Added default country selection
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/properties")
      const data = await response.json()
      setProperties(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch properties")
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    fetchProperties()
  }, [router])

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      image_url: "",
      property_type: "residential",
      status: "available",
      squareFeet: "",
      yearBuilt: "",
      rating: "",
      features: "",
      country: "India", // Reset to default country
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/admin/properties/${editingId}` : "/api/admin/properties"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          bedrooms: Number.parseInt(formData.bedrooms),
          bathrooms: Number.parseInt(formData.bathrooms),
          area: Number.parseFloat(formData.area),
          squareFeet: formData.squareFeet ? Number.parseFloat(formData.squareFeet) : null,
          yearBuilt: formData.yearBuilt ? Number.parseInt(formData.yearBuilt) : null,
          rating: formData.rating ? Number.parseFloat(formData.rating) : null,
          features: formData.features ? formData.features.split(",").map((f) => f.trim()) : [],
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || `Failed to ${editingId ? "update" : "add"} property`)
        return
      }

      setMessage(`Property ${editingId ? "updated" : "added"} successfully!`)
      resetForm()
      fetchProperties()
    } catch (err) {
      setError(`An error occurred while ${editingId ? "updating" : "adding"} the property`)
    }
  }

  const handleEditProperty = (property: Property) => {
    setFormData({
      title: property.title,
      description: property.description,
      location: property.location,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      image_url: property.image_url,
      property_type: property.property_type,
      status: property.status,
      squareFeet: property.squareFeet?.toString() || "",
      yearBuilt: property.yearBuilt?.toString() || "",
      rating: property.rating?.toString() || "",
      features: property.features?.join(", ") || "",
      country: property.country || "India", // Load country from property
    })
    setEditingId(property.id)
    setShowForm(true)
    setSelectedProperty(null)
  }

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return

    try {
      const response = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" })

      if (!response.ok) {
        setError("Failed to delete property")
        return
      }

      setMessage("Property deleted successfully!")
      fetchProperties()
    } catch (err) {
      setError("An error occurred while deleting the property")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your properties</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {message && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Add/Edit Property Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingId ? "Edit Property" : "Add New Property"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProperty} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Property Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md font-semibold"
                    required
                  >
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="Dubai">Dubai</option>
                  </select>
                  <Input
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Price (₹)"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Area (sq ft)"
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Square Feet"
                    type="number"
                    value={formData.squareFeet}
                    onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                  />
                  <Input
                    placeholder="Year Built"
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                  />
                  <Input
                    placeholder="Rating (0-5)"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                  <Input
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Office-Residence">Office-Residence</option>
                    <option value="Green Home">Green Home</option>
                    <option value="House">House</option>
                    <option value="Estate">Estate</option>
                  </select>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />

                <Input
                  placeholder="Features (comma-separated, e.g., Smart Home, Gym, Parking)"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />

                <div className="flex gap-4">
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                    {editingId ? "Update Property" : "Add Property"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add Button */}
        {!showForm && (
          <Button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="mb-6 flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add New Property
          </Button>
        )}

        {/* Properties List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Properties ({properties.length})</h2>

          <div className="flex gap-2 mb-6 flex-wrap">
            {["All", "India", "Australia", "Dubai"].map((country) => (
              <button
                key={country}
                onClick={() => {
                  // Filter properties by country
                  console.log("[v0] Filtering by country:", country)
                  // TODO: Implement actual filtering logic here
                }}
                className="px-4 py-2 bg-amber-100 text-amber-700 font-semibold rounded-lg hover:bg-amber-200 transition-all"
              >
                {country}
              </button>
            ))}
          </div>

          {properties.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                No properties yet. Click "Add New Property" to get started.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {property.image_url && (
                    <div className="w-full h-48 overflow-hidden bg-gray-200">
                      <img
                        src={property.image_url || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{property.title}</h3>
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-semibold">
                        {property.country}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Trash2 className="w-4 h-4 mr-2 text-amber-600" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    {property.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(property.rating || 0) ? "text-amber-600" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({property.rating})</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                      {property.squareFeet && (
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{property.squareFeet} sq ft</span>
                        </div>
                      )}
                      {property.yearBuilt && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Built {property.yearBuilt}</span>
                        </div>
                      )}
                    </div>
                    {property.features && property.features.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {property.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Beds</span>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Baths</span>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Area</span>
                        <p className="font-semibold">{property.area} sq ft</p>
                      </div>
                    </div>
                    <p className="text-amber-600 font-bold text-lg mb-4">₹{property.price.toLocaleString("en-IN")}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedProperty(property)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleEditProperty(property)}
                        variant="outline"
                        size="sm"
                        className="flex-1 flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteProperty(property.id)}
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header with Back Button */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedProperty(null)}
                className="flex items-center gap-2 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                <span className="font-semibold">Back</span>
              </button>
              <h2 className="text-2xl font-bold">{selectedProperty.title}</h2>
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

              {/* Property Type Badge */}
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold">
                  {selectedProperty.property_type}
                </span>
                {selectedProperty.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(selectedProperty.rating || 0) ? "text-amber-600" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 font-semibold text-gray-900">({selectedProperty.rating})</span>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <Trash2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Location</p>
                  <p className="text-lg text-gray-900 font-medium">{selectedProperty.location}</p>
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <Trash2 className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedProperty.bedrooms}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <Trash2 className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedProperty.bathrooms}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedProperty.area}</p>
                  <p className="text-xs text-gray-600">sq ft</p>
                </div>
                {selectedProperty.yearBuilt && (
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Year Built</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.yearBuilt}</p>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-lg border-2 border-amber-200">
                <p className="text-sm text-gray-600 font-semibold mb-1">Price</p>
                <p className="text-4xl font-bold text-amber-600">₹{selectedProperty.price.toLocaleString("en-IN")}</p>
              </div>

              {/* Features */}
              {selectedProperty.features && selectedProperty.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProperty.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span className="text-gray-900 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button onClick={() => setSelectedProperty(null)} variant="outline" className="flex-1">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleEditProperty(selectedProperty)
                    setSelectedProperty(null)
                  }}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
