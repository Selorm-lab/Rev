"use client"

import { createContext, useContext, ReactContextType, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export type User = {
  id: string
  email: string | null
  name: string | null
}

export const AuthContext = createContext<User | null>(null)

export const useAuth = (): User | null => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Initialize auth state on client load
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}