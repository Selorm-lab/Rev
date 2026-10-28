"use client"

import { cn } from "@/lib/utils"

interface ButtonProps {
  variant?: "default" | "primary" | "destructive" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export const Button = ({ 
  variant = "primary", 
  size = "default", 
  className, 
  onClick, 
  disabled, 
  asChild, 
  children 
}: ButtonProps) => {
  const variants = {
    default: "bg-background text-foreground hover:bg-opacity-90",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-border hover:bg-border",
    ghost: "hover:bg-border",
  }

  const sizes = {
    default: "",
    sm: "h-8 rounded-sm px-2 text-sm",
    lg: "h-10 rounded-lg px-8 text-base",
  }

  const className = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    className
  )

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}