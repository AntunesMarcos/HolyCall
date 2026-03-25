"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  Mail,
  User,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  GraduationCap,
  BookOpen
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"

// ── Dados Simulados ────────────────────────────────────────────────────────
const turmas = ["Turma A", "Turma B", "Turma C"]

const classMembers = [
  // Turma A
  { id: 1, name: "Carlos Eduardo", role: "Professor", turma: "Turma A", email: "carlos@escola.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: true },
  { id: 2, name: "Clara Blackwood", role: "Aluno", turma: "Turma A", email: "clara@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },
  { id: 3, name: "Michael Whitmore", role: "Aluno", turma: "Turma A", email: "michael@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },
  { id: 4, name: "Lucas Ferreira", role: "Aluno", turma: "Turma A", email: "lucas@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },

  // Turma B
  { id: 5, name: "Ana Paula Souza", role: "Professor", turma: "Turma B", email: "anapaula@escola.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: true },
  { id: 6, name: "Dennis Brightwood", role: "Aluno", turma: "Turma B", email: "dennis@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },
  { id: 7, name: "Sarah Chen", role: "Aluno", turma: "Turma B", email: "sarah@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },

  // Turma C
  { id: 8, name: "Roberto Mendes", role: "Professor", turma: "Turma C", email: "roberto@escola.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: true },
  { id: 9, name: "João Pedro Lima", role: "Aluno", turma: "Turma C", email: "joao@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },
  { id: 10, name: "Beatriz Almeida", role: "Aluno", turma: "Turma C", email: "beatriz@aluno.com", avatar: "/placeholder.svg?height=40&width=40", isProfessor: false },
]

export default function ClassManagementPage() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("Turma A")

  // Filtra os membros pela turma selecionada e ordena colocando o Professor primeiro
  const filteredMembers = classMembers
      .filter((member) => member.turma === turmaSelecionada)
      .sort((a, b) => {
        if (a.isProfessor && !b.isProfessor) return -1
        if (!a.isProfessor && b.isProfessor) return 1
        return 0
      })

  const totalAlunos = filteredMembers.filter(m => !m.isProfessor).length
  const professor = filteredMembers.find(m => m.isProfessor)

  return (
      <DashboardLayout>
        <div className="space-y-8">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Membros da Turma</h1>
              <p className="text-gray-600 mt-1">Gerencie os professores e alunos matriculados</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-white">
                <Settings className="w-4 h-4" />
                Configurações
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <UserPlus className="w-4 h-4" />
                Adicionar Membro
              </Button>
            </div>
          </div>

          {/* ── Filtro de Turma ── */}
          <div className="flex items-center gap-4">
            <div className="w-full sm:max-w-xs">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Selecione a Turma</label>
              <Select value={turmaSelecionada} onValueChange={setTurmaSelecionada}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Selecione uma turma..." />
                </SelectTrigger>
                <SelectContent>
                  {turmas.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Resumo da Turma ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Professor Responsável</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {professor ? professor.name : "Não atribuído"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Total de Alunos</div>
                  <div className="text-lg font-semibold text-gray-900">{totalAlunos} Matriculados</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Tabela de Membros ── */}
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Relação de Membros — {turmaSelecionada}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50 pointer-events-none">
                    <TableHead className="font-medium text-gray-600 pl-6 w-[50%]">Nome</TableHead>
                    <TableHead className="font-medium text-gray-600">Cargo</TableHead>
                    <TableHead className="font-medium text-gray-600 text-right pr-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                      <TableRow
                          key={member.id}
                          className={`transition-colors hover:bg-gray-50 ${member.isProfessor ? "bg-purple-50/30" : ""}`}
                      >
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar className={`w-9 h-9 border ${member.isProfessor ? "border-purple-200" : "border-gray-200"}`}>
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className={`text-xs ${member.isProfessor ? "bg-purple-100 text-purple-700" : "bg-gray-100"}`}>
                                {member.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 flex items-center gap-2">
                                {member.name}
                                {member.isProfessor && <BookOpen className="w-3.5 h-3.5 text-purple-600" />}
                              </div>
                              <div className="text-xs text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                              variant="secondary"
                              className={
                                member.isProfessor
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-100 font-normal"
                              }
                          >
                            {member.role}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500 hover:text-gray-900">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2 text-gray-500" />
                                Ver Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                Enviar Mensagem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2 text-gray-500" />
                                Editar Cadastro
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remover da Turma
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}

                  {filteredMembers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center text-gray-500">
                          Nenhum membro encontrado nesta turma.
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>
      </DashboardLayout>
  )
}