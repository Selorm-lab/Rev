"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"

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

const isShortTrip = (trip: Trip) =>
  trip.distance <= "300 km" || trip.route.toLowerCase().includes("kumasi")

const isLongDistance = (trip: Trip) =>
  Number(trip.distance) > 300

export default function Home() {
  const { user } = useAuth()
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState<"all" | "short" | "long">("all")

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Rev</h1>
          <p className="text-gray-600 text-lg dark:text-gray-400">
            Please sign in to access the dashboard.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.href="/signin"}
          >
            Sign In
          </button>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="ml-64 min-h-screen p-6 overflow-x-hidden">
        <header className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Rev</h1>
          <p className="text-gray-600 text-sm dark:text-gray-400">Intercity Trip Platform</p>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Short Trips</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{filteredTrips.filter(isShortTrip).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Long Distance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{filteredTrips.filter(isLongDistance).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">128</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2,431</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            className={`
              px-4 py-2 rounded text-sm font-medium transition-colors
              ${filter === "all" ? "bg-primary-600 text-primary-foreground" : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"}
            `}
            onClick={() => setFilter("all")}
          >
            All Trips
          </button>
          <button
            className={`
              px-4 py-2 rounded text-sm font-medium transition-colors
              ${filter === "short" ? "bg-primary-600 text-primary-foreground" : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"}
            `}
            onClick={() => setFilter("short")}
          >
            Short Trips
          </button>
          <button
            className={`
              px-4 py-2 rounded text-sm font-medium transition-colors
              ${filter === "long" ? "bg-primary-600 text-primary-foreground" : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"}
            `}
            onClick={() => setFilter("long")}
          >
            Long Distance
          </button>
        </div>

        {/* Trips Overview */}
        <main className="mt-6 space-y-4">
          <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">Recent Trips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="
                  bg-white dark:bg-gray-800 rounded-lg p-3 flex flex-col gap-2
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                "
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-8 h-8 rounded bg-border flex items-center justify-center flex-shrink-0"
                  >
                    {trip.route.includes("Kumasi")
                      ? (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M2 12l4 8L9 8l5 5L2 12z" />
                        </svg>
                      )
                      : (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{trip.route}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{trip.distance} • {trip.duration}</p>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 dark:text-blue-400">{trip.price} GHS</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">/ seat</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`
                      px-1.5 py-0.5 rounded text-capitalize
                      ${trip.status === "active"
                        ? "bg-green-100 text-green-800"
                        : trip.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"}
                    `}
                  >
                    {trip.status}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {trip.seatsAvailable}/{trip.totalSeats} seats
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Create Trip Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl max-h-none">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Create New Trip</h3>

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
                  <input
                    type="text"
                    name="route"
                    placeholder="Route (e.g. Accra - Kumasi)"
                    required
                    className="
                      w-full px-3 py-2 rounded text-sm outline-none placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                    "
                    required
                  />
                  <input
                    type="text"
                    name="distance"
                    placeholder="Distance (e.g. 200 km)"
                    required
                    className="
                      w-full px-3 py-2 rounded text-sm outline-none placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                    "
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g. 3 hours)"
                    required
                    className="
                      w-full px-3 py-2 rounded text-sm outline-none placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                    "
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (GHS)"
                    min="0"
                    required
                    className="
                      w-full px-3 py-2 rounded text-sm outline-none placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                    "
                    required
                  />
                  <input
                    type="number"
                    name="totalSeats"
                    placeholder="Total seats"
                    min="1"
                    value={15}
                    className="
                      w-full px-3 py-2 rounded text-sm outline-none placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                    "
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="
                      flex-1 px-4 py-2 bg-primary-600 text-primary-foreground rounded hover:bg-primary-700
                    "
                  >
                    Create Trip
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="
                      flex-1 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600
                    "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}