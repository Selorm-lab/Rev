"use client"

import { cn } from "@/lib/utils"

interface BadgeProps {
  variant?: "default" | "primary" | "secondary" | "destructive" | "outline"
  className?: string
  children: React.ReactNode
}

export const Badge = ({ variant, className, children }: BadgeProps) => {
  const settledVariant = variant || "default"
  const variants = {
    default: "bg-background/20 text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary/20 text-secondary/60",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-border text-foreground",
  }

  const variantClass = variants[settledVariant] || variants.default

  const className = cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
    variantClass,
    className
  )

  return <span className={className}>{children}</span>
}