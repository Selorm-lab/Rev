/**
 * Mock Supabase client for development and demonstration.
 * In production, replace with real Supabase credentials via environment variables.
 */

// Mock user session state
let mockSession = {
  user: {
    id: 'user-123',
    email: 'student@university.edu',
    name: 'University Student',
  },
  expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
}

// Mock profile data
let mockProfile = {
  id: 'user-123',
  full_name: 'University Student',
  email: 'student@university.edu',
  created_at: new Date().toISOString(),
}

// Mock trips data
const mockTrips: any[] = [
  {
    id: '1',
    route: 'Accra - Kumasi',
    distance: '200 km',
    duration: '3 hours',
    price: 35,
    seats_available: 3,
    total_seats: 15,
    status: 'active',
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: '2',
    route: 'Accra - Tamale',
    distance: '450 km',
    duration: '6 hours',
    price: 65,
    seats_available: 8,
    total_seats: 15,
    status: 'active',
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: '3',
    route: 'Accra - Nairobi',
    distance: '1800 km',
    duration: '18 hours',
    price: 180,
    seats_available: 12,
    total_seats: 15,
    status: 'active',
    created_at: '2026-01-05T00:00:00Z',
  },
  {
    id: '4',
    route: 'Accra - Lagos',
    distance: '1200 km',
    duration: '15 hours',
    price: 200,
    seats_available: 5,
    total_seats: 15,
    status: 'active',
    created_at: '2026-01-20T00:00:00Z',
  },
  {
    id: '5',
    route: 'Accra - Ouagadougou',
    distance: '800 km',
    duration: '10 hours',
    price: 120,
    seats_available: 10,
    total_seats: 15,
    status: 'completed',
    created_at: '2026-01-01T00:00:00Z',
  },
]

export function createSupabaseClient() {
  return {
    // Auth methods
    auth: {
      getSession: async () => ({ data: { session: mockSession }, error: null }),
      onAuthStateChange: (
        callback: (event: string, session: any) => void
      ) => {
        const unsubscribe = () => {}
        return { data: { subscription: { unsubscribe } }, error: null }
      },
      signIn: async () => ({ data: { user: mockSession.user }, error: null }),
      signUp: async () => ({ data: { user: mockSession.user }, error: null }),
      signOut: async () => ({ data: { user: null }, error: null }),
    },

    // Database methods
    from: (table: string) => ({
      select: async (columns = '*') => Promise.resolve({
        data: mockTrips.filter((t) => t.status !== 'cancelled'),
        error: null,
        count: mockTrips.length,
      }),
      insert: async (data: any) => Promise.resolve({
        data: { ...data, id: Date.now().toString(), created_at: new Date().toISOString() },
        error: null,
      }),
      update: async (data: any) => Promise.resolve({
        data: mockTrips.map((t) => (t.id === data.id ? { ...t, ...data } : t)),
        error: null,
      }),
      eq: () => this,
      single: async () => ({ data: mockTrips[0], error: null }),
    }),

    // Storage methods
    storage: {
      from: () => ({
        upload: async () => ({ data: {}, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' }, error: null }),
        remove: async () => ({ data: {}, error: null }),
      }),
    },

    // Rpc method
    rpc: async () => ({ data: {}, error: null }),

    channel: () => ({
      on: () => ({ }),
      subscribe: () => {},
      unsubscribe: () => {},
    }),
  }
}

export const supabase = createSupabaseClient()