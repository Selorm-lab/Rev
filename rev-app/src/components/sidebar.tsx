"use client"

import { useState } from "react"

interface NavItem {
  label: string
  href: string
  iconSvg: string
  description: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", iconSvg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z'/><path fill-rule='evenodd' d='M3 2.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 3 6zM3 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM3 13.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 3 13.5z'/></svg>", description: "Overview of trips and activity" },
  { label: "Short Trips", href: "/dashboard/short-trips", iconSvg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M8 1a2 2 0 0 1 2 2v3h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-3v3a2 2 0 0 1-4 0v-5a2 2 0 0 1 2-2h-3zm2 1a1 1 0 0 0 1 1v5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-3zm-5 .5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 1 0zm8 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5zm-5 .5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 1 0zm8 .5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5z'/></svg>", description: "Local university trips under 200km" },
  { label: "Long Distance", href: "/dashboard/long-distance", iconSvg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M12 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h9zm-5 4a.5.5 0 0 0-.5.5h9a.5.5 0 0 0 .5.5v4a.5.5 0 0 0 .5.5h-9a.5.5 0 0 0-.5.5v-4zm13-.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-4zM.5 9a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5v-4a.5.5 0 0 0-.5-.5H.5zM7 5.5a.5.5 0 0 1 .5.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm1 3.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5h-2a.5.5 0 0 0-.5-.5zm4 2.5a.5.5 0 0 0-.5.5h2a.5.5 0 0 0 .5.5h-2a.5.5 0 0 0-.5-.5zm5 .5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5z'/></svg>", description: "Intercity trips across regions" },
  { label: "Bookings", href: "/dashboard/bookings", iconSvg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M3.5 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V2zM2 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5zM6 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5H6v5zm2.5 3a.5.5 0 0 1-.5.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V8zm0-5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V3z'/></svg>", description: "Manage and view bookings" },
  { label: "Profile", href: "/dashboard/profile", iconSvg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1zm3.5 3a.5.5 0 0 0-1 0v4a.5.5 0 0 0 1 0V4zm2 5a.5.5 0 0 0 .5-.5h-7a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4zm2 .5v-5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H11z'/></svg>", description: "Your account settings" },
]

export const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const toggleSidebar = () => setOpen(!open)
  const closeSidebar = () => setOpen(false)

  return (
    <div class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-300 flex-shrink-0 p-4 transition-transform duration-300 ease-in-out transform rtl:rtl:translate-x-0 rtl:rtl:-translate-x-full rtl:dark:translate-x-0 rtl:dark:-translate-x-full shadow-xl" style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}>
      <div class="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Rev</h2>
        <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5M7 14l5-5 5-5"/></svg>
        </button>
      </div>

      <div className="space-y-1.5">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`
              flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors cursor-pointer select-none
              ${search && !item.label.toLowerCase().includes(search.toLowerCase()) ? 'opacity-40 cursor-not-allowed' : ''}
              ${item.label.toLowerCase().includes(search.toLowerCase()) ? 'bg-primary/5 text-primary' : ''}
              hover:bg-gray-100 dark:hover:bg-gray-700
            `}
            onClick={() => window.location.href = item.href}
          >
            <div className="min-w-8">
              {item.iconSvg}
            </div>
            <span className="truncate">{item.label}</span>
            <span className="text-xs capitalize opacity-60">{item.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-300">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2h-2V4a2 2 0 0 1 2-2h4zM14 4h2v2h-2V4zm0 5h2v2h-2v-2zm-7 4h2v2h-2v-2zm7-9v2h2v-2zm2 7h2v3h-2v-3zm2-7v2h2v-2zm7 4v2h2v-2zm-7-4H9v2h2v-2zm3 8h2v2h-2v-2zm-5-8v2h2v-2zm3 8h2v2h-2v-2z"/></svg>
          </input>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>
    </div>
  )
}