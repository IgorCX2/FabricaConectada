import '../../globals.css'
import React from "react"
import AdminShortcut from '../components/securanca/AdminShortcut'

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <AdminShortcut/>
      {children}
    </html>
  )
}