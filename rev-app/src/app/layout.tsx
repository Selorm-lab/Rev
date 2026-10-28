import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rev - Intercity Trip Platform",
  description: "Full-stack Bolt/Uber clone for university students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased bg-background text-foreground"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}