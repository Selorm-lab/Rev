"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/context/auth-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { Home, Truck, MapPin, Calendar, User, XMark, Search, ChevronDown } from "lucide-react"

interface Trip {
  id: string
  route: string
  distance: string
  duration: string
  price: number
  seatsAvailable: number
  totalSeats: number
  status: "active" | "completed" | "cancelled"
  createdAt: string
}

const mockTrips: Trip[] = [
  {
    id: "1",
    route: "Accra - Kumasi",
    distance: "200 km",
    duration: "3 hours",
    price: 35,
    seatsAvailable: 3,
    totalSeats: 15,
    status: "active",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    route: "Accra - Tamale",
    distance: "450 km",
    duration: "6 hours",
    price: 65,
    seatsAvailable: 8,
    totalSeats: 15,
    status: "active",
    createdAt: "2026-01-10",
  },
  {
    id: "3",
    route: "Accra - Nairobi",
    distance: "1800 km",
    duration: "18 hours",
    price: 180,
    seatsAvailable: 12,
    totalSeats: 15,
    status: "active",
    createdAt: "2026-01-05",
  },
  {
    id: "4",
    route: "Accra - Lagos",
    distance: "1200 km",
    duration: "15 hours",
    price: 200,
    seatsAvailable: 5,
    totalSeats: 15,
    status: "active",
    createdAt: "2026-01-20",
  },
  {
    id: "5",
    route: "Accra - Ouagadougou",
    distance: "800 km",
    duration: "10 hours",
    price: 120,
    seatsAvailable: 10,
    totalSeats: 15,
    status: "completed",
    createdAt: "2026-01-01",
  },
]

// Route filter types
const isShortTrip = (trip: Trip) =>
  trip.distance <= "300 km" || trip.route.toLowerCase().includes("kumasi")

const isLongDistance = (trip: Trip) =>
  Number(trip.distance) > 300

export default function Dashboard() {
  const { user } = useAuth()
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState<"all" | "short" | "long">("all")

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold">Rev</h1>
          <p className="text-zinc-600 text-lg">Please sign in to access the dashboard.</p>
          <Button onClick={() => window.location.href="/signin"}>Sign In</Button>
        </div>
      </div>
    )
  }

  const filteredTrips =
    filter === "short"
      ? mockTrips.filter(isShortTrip)
      : filter === "long"
      ? mockTrips.filter(isLongDistance)
      : mockTrips

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <div className="ml-64 min-h-screen p-6 overflow-x-hidden">
          {/* Header */}
          <header className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <h1 className="text-3xl font-bold">Rev</h1>
            <p className="text-zinc-600 text-sm">Intercity Trip Platform</p>
          </header>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="p-3">
              <div className="flex items-start gap-2">
                <Search className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Short Trips</p>
                  <p className="text-2xl font-bold">{filteredTrips.filter(isShortTrip).length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Long Distance</p>
                  <p className="text-2xl font-bold">{filteredTrips.filter(isLongDistance).length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Total Bookings</p>
                  <p className="text-2xl font-bold">128</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Active Users</p>
                  <p className="text-2xl font-bold">2,431</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant="outline"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-primary/10 text-primary" : ""}
            >
              All Trips
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("short")}
              className={filter === "short" ? "bg-primary/10 text-primary" : ""}
            >
              Short Trips
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("long")}
              className={filter === "long" ? "bg-primary/10 text-primary" : ""}
            >
              Long Distance
            </Button>
          </div>

          {/* Trips Overview */}
          <main className="mt-6 space-y-4">
            <h2 className="text-base font-medium text-zinc-600">Recent Trips</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTrips.map((trip) => (
                <Card
                  key={trip.id}
                  className="p-3 flex flex-col gap-2"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded bg-border flex items-center justify-center flex-shrink-0">
                      {trip.route.includes("Kumasi") ? <Truck className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{trip.route}</p>
                      <p className="text-xs text-zinc-500">{trip.distance} • {trip.duration}</p>
                    </div>
                    <div>
                      <Badge variant="primary">{trip.price} GHS</Badge>
                      <span className="text-xs text-zinc-500">/ seat</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`
                        px-1.5 py-0.5 rounded text-capitalize
                        ${trip.status === "active" ? "bg-green-100 text-green-800" : trip.status === "completed" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}
                      `}
                    >
                      {trip.status}
                    </span>
                    <span className="text-zinc-500">
                      {trip.seatsAvailable}/{trip.totalSeats} seats
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </main>

          {/* Create Trip Modal */}
          {showCreate && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-none">
                <h3 className="text-xl font-bold mb-4">Create New Trip</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(form as any) as Record<string, string>
                    const newTrip: Trip = {
                      id: Date.now().toString(),
                      route: formData.route || "",
                      distance: formData.distance || "200 km",
                      duration: formData.duration || "3 hours",
                      price: Number(formData.price) || 35,
                      seatsAvailable: Number(formData.totalSeats) || 15,
                      totalSeats: Number(formData.totalSeats) || 15,
                      status: "active",
                      createdAt: new Date().toISOString(),
                    }
                    setTrips((prev) => [...prev, newTrip])
                    setShowCreate(false)
                    ;(e.target as any).reset()
                  }}
                >
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <Input
                      name="route"
                      placeholder="Route (e.g. Accra - Kumasi)"
                      required
                    />
                    <Input
                      name="distance"
                      placeholder="Distance (e.g. 200 km)"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Input
                      name="duration"
                      placeholder="Duration (e.g. 3 hours)"
                      required
                    />
                    <Input
                      type="number"
                      name="price"
                      placeholder="Price (GHS)"
                      min="0"
                      required
                    />
                    <Input
                      type="number"
                      name="totalSeats"
                      placeholder="Total seats"
                      min="1"
                      value={15}
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button type="submit">Create Trip</Button>
                    <Button
                      onClick={() => setShowCreate(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  )
}