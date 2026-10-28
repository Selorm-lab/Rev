"use client"

import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn("bg-white rounded-lg border border-border p-6 shadow-sm", className)}>{children}</div>
  )
}