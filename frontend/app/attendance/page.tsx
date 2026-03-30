"use client"

import { useState } from "react"

import {
  User,
  CheckCircle,
  XCircle,
  Check,
  Filter,
  Users,
  ChevronDown, Save,
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
        <div className="space-y-8">

          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Registrar Chamada</h1>
              <p className="text-gray-600 mt-1">Selecione uma turma e marque a presença dos alunos</p>
            </div>
          </div>

          {/* ── Select de Turma ── */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:max-w-xs">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Turma</label>
              <Select onValueChange={(val) => {
                setTurmaSelecionada(val)
                setPresence({})
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma turma..." />
                </SelectTrigger>
                <SelectContent>
                  {turmas.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:max-w-xs">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Data da Chamada</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal gap-2"
                  >
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    {dataSelecionada
                        ? format(dataSelecionada, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                        : "Selecione uma data..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                      mode="single"
                      selected={dataSelecionada}
                      onSelect={(date) => date && setDataSelecionada(date)}
                      locale={ptBR}
                      initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* ── Conteúdo só aparece após selecionar turma ── */}
          {turmaSelecionada ? (
              <>
                {/* ── Cards de resumo ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-gray-900">{totalTurma}</div>
                          <div className="text-sm text-gray-600">Total Alunos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-gray-900">{presentCount}</div>
                          <div className="text-sm text-gray-600">Presentes</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-gray-900">{absentCount}</div>
                          <div className="text-sm text-gray-600">Ausentes</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ── Tabela de chamada ── */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base md:text-lg font-semibold">
                          Registro de Chamada — {turmaSelecionada}
                        </CardTitle>
                        <CardDescription className="text-xs md:text-sm">
                          Marque a presença dos alunos
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 overflow-x-auto">
                    <Table className="min-w-[400px]">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-medium text-gray-700 text-xs md:text-sm">Nome</TableHead>
                          <TableHead className="font-medium text-gray-700 text-xs md:text-sm">Turma</TableHead>
                          <TableHead className="font-medium text-gray-700 text-xs md:text-sm text-center w-28">
                            Presente
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alunosDaTurma.map((student) => (
                            <TableRow
                                key={student.id}
                                className={`transition-colors cursor-pointer ${
                                    presence[student.id] ? "bg-green-50 hover:bg-green-100" : "hover:bg-gray-50"
                                }`}
                                onClick={() => togglePresence(student.id)}
                            >
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-7 h-7 flex-shrink-0">
                                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {student.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-xs md:text-sm text-gray-900">
                              {student.name}
                            </span>
                                </div>
                              </TableCell>

                              <TableCell>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                                  {student.turma}
                                </Badge>
                              </TableCell>

                              <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                    checked={!!presence[student.id]}
                                    onCheckedChange={() => togglePresence(student.id)}
                                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mx-auto"
                                />
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <div className="flex justify-end p-4 border-t border-gray-100">
                    <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                      <Save className="w-4 h-4" />
                      Salvar Chamada
                    </Button>
                  </div>
                </Card>
              </>
          ) : (
              /* ── Estado vazio ── */
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/30 mt-8">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Selecione uma turma</h3>
                <p className="text-sm text-gray-500 text-center">Selecione uma turma acima para iniciar o registro de chamada.</p>
              </div>
          )}
        </div>
      </DashboardLayout>
  )
}