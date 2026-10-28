"use client"

import { cn } from "@/lib/utils"

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  required?: boolean
}

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onInput,
  className,
  disabled,
  required,
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onInput?.(e)
  }

  const classes = cn(
    "bg-input px-3 py-2 rounded text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50",
    className
  )

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      className={classes}
    />
  )
}