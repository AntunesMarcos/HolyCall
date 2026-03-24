"use client"

import { useState } from "react"

import {
  User,
  CheckCircle,
  XCircle,
  Check,
  Filter,
  Users,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"

// ── Dados ──────────────────────────────────────────────────────────────────
const studentsData = [
  { id: 1001, name: "Clara Blackwood",      turma: "Turma A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1002, name: "Michael Whitmore",     turma: "Turma A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1003, name: "Dennis Brightwood",    turma: "Turma B", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1004, name: "Sarah Chen",           turma: "Turma B", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1005, name: "Lucas Ferreira",       turma: "Turma A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1006, name: "Ana Paula Souza",      turma: "Turma C", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1007, name: "João Pedro Lima",      turma: "Turma C", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1008, name: "Maria Eduarda Costa",  turma: "Turma B", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1009, name: "Pedro Henrique Rocha", turma: "Turma A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1010, name: "Beatriz Almeida",      turma: "Turma C", avatar: "/placeholder.svg?height=32&width=32" },
]

const turmas = ["Turma A", "Turma B", "Turma C"]

// ── Componente ─────────────────────────────────────────────────────────────
export default function AttendancePage() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("")
  const [presence, setPresence] = useState<Record<number, boolean>>({})

  const togglePresence = (id: number) => {
    setPresence((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())

  // Alunos filtrados pela turma selecionada no select
  const alunosDaTurma = turmaSelecionada
      ? studentsData.filter((s) => s.turma === turmaSelecionada)
      : []

  const totalTurma   = alunosDaTurma.length
  const presentCount = alunosDaTurma.filter((s) => presence[s.id]).length
  const absentCount  = totalTurma - presentCount

  return (
      <DashboardLayout>
        <div></div>
      </DashboardLayout>
  )
}