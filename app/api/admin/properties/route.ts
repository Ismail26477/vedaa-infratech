import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/src/lib/supabase/server"

const properties: any[] = [
  {
    id: "1",
    title: "Modern Luxury Apartment",
    description: "Beautiful luxury apartment with stunning city views",
    location: "Mumbai, Maharashtra",
    price: 5000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2500,
    image_url: "/modern-luxury-apartment.png",
    property_type: "Apartment",
    status: "available",
    squareFeet: 2500,
    yearBuilt: 2022,
    rating: 4.8,
    features: ["Smart Home", "Gym", "Parking"],
    country: "India",
  },
  {
    id: "2",
    title: "Premium Villa",
    description: "Spacious premium villa with private garden and pool",
    location: "Bangalore, Karnataka",
    price: 8500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 4200,
    image_url: "/premium-villa.png",
    property_type: "Villa",
    status: "available",
    squareFeet: 4200,
    yearBuilt: 2021,
    rating: 4.9,
    features: ["Swimming Pool", "Garden", "Terrace"],
    country: "India",
  },
  {
    id: "3",
    title: "Spacious Penthouse",
    description: "Luxurious penthouse with rooftop access and panoramic views",
    location: "Delhi, India",
    price: 12000000,
    bedrooms: 5,
    bathrooms: 4,
    area: 5500,
    image_url: "/spacious-penthouse.jpg",
    property_type: "Penthouse",
    status: "available",
    squareFeet: 5500,
    yearBuilt: 2023,
    rating: 5.0,
    features: ["Rooftop", "Cinema", "Wine Cellar"],
    country: "India",
  },
  {
    id: "4",
    title: "Riverside Townhouse",
    description: "Charming townhouse with river view and modern amenities",
    location: "Pune, Maharashtra",
    price: 4200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2800,
    image_url: "/riverside-townhouse.jpg",
    property_type: "Townhouse",
    status: "available",
    squareFeet: 2800,
    yearBuilt: 2020,
    rating: 4.7,
    features: ["River View", "Parking", "Garden"],
    country: "India",
  },
]

const fallbackProperties: any[] = [
  {
    id: "7",
    title: "Sydney Harbour View",
    description: "Beautiful apartment with stunning harbour views",
    location: "Sydney, NSW",
    price: 3500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    image_url: "https://images.pexels.com/photos/1913974/pexels-photo-1913974.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Apartment",
    status: "available",
    squareFeet: 2200,
    yearBuilt: 2019,
    rating: 4.7,
    features: ["Harbour View", "Balcony", "Concierge"],
    country: "Australia",
  },
  {
    id: "9",
    title: "Downtown Dubai Penthouse",
    description: "Luxurious penthouse in the heart of Dubai",
    location: "Downtown Dubai, UAE",
    price: 4500000,
    bedrooms: 3,
    bathrooms: 3,
    area: 3100,
    image_url: "https://images.pexels.com/photos/1913974/pexels-photo-1913974.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Penthouse",
    status: "available",
    squareFeet: 3100,
    yearBuilt: 2020,
    rating: 4.9,
    features: ["City View", "Gym", "Concierge"],
    country: "Dubai",
  },
]

export async function GET() {
  try {
    const supabase = getSupabaseServer()
    const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false })

    if (error) throw error

    const mergedData = [
      ...(data || []),
      ...fallbackProperties.filter((fp) => !data?.some((d) => d.country === fp.country)),
    ]

    return NextResponse.json(mergedData || [])
  } catch (error) {
    console.error("[v0] Failed to fetch properties:", error)
    return NextResponse.json({ message: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer()
    const body = await request.json()

    const normalizedData = {
      title: body.title,
      description: body.description,
      location: body.location,
      price: body.price,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      area: body.area,
      image_url: body.image_url,
      property_type: body.property_type,
      status: body.status,
      squarefeet: body.squareFeet || body.squarefeet, // Handle both formats
      yearbuilt: body.yearBuilt || body.yearbuilt, // Handle both formats
      rating: body.rating,
      features: body.features,
      country: body.country,
    }

    const { data, error } = await supabase.from("properties").insert([normalizedData]).select().single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("[v0] Failed to add property:", error)
    return NextResponse.json({ message: "Failed to add property" }, { status: 500 })
  }
}
