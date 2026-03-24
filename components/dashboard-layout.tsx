"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Home,
  BarChart3,
  School,
  GraduationCap,
  Settings,
  Users,
  Plus,
  FolderSearch,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/home", icon: Home, label: "Início" },
  { href: "/attendance", icon: Plus, label: "Registrar Chamada" },
  { href: "/attendance/consultar", icon: FolderSearch, label: "Consultar Chamada" },
  { href: "/team", icon: School, label: "Turmas" },
  { href: "/students", icon: Users, label: "Alunos" },
  { href: "/settings", icon: Settings, label: "Configurações" },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
      <div className="h-screen flex flex-col bg-white">

        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-between flex-shrink-0 z-30">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-16 h-16" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center">
                <Avatar className="w-full h-full">
                  <AvatarImage src="/logo-basilica.png" />
                </Avatar>
              </div>
              <span className="font-bold text-2xl tracking-wide">HolyCall</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AE</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Alex Evans</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full cursor-pointer text-red-600">
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Overlay mobile */}
        {sidebarOpen && (
            <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
            />
        )}

        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
          <aside className={`
          fixed top-0 left-0 z-50 md:static md:z-auto
          w-64 md:w-60 h-full md:h-full
          border-r border-gray-200 bg-white flex-shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
            <div className="p-4">
              <div className="flex justify-end mb-2 md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="space-y-1">
                {navItems.map(({ href, icon: Icon, label }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center w-full justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${pathname === href
                            ? "bg-purple-50 text-purple-700 hover:bg-purple-100"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      {label}
                    </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 min-w-0">
            {children}
          </main>

        </div>
      </div>
  )
}