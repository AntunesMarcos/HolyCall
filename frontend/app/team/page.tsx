"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Mail,
  User,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  GraduationCap,
  BookOpen,
  Plus,
  School,
  Info,
  Search,
  Users,
  Save,
  CheckCircle2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
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

// ── Dados Simulados ──────────────────────────────────────────────────────────

const professores = [
  { id: "p1", name: "Carlos Eduardo" },
  { id: "p2", name: "Ana Paula Souza" },
  { id: "p3", name: "Roberto Mendes" },
]

const todosAlunos = [
  { id: 1001, name: "Clara Blackwood",     email: "clara@aluno.com",    avatar: "/placeholder.svg" },
  { id: 1002, name: "Michael Whitmore",    email: "michael@aluno.com",  avatar: "/placeholder.svg" },
  { id: 1003, name: "Dennis Brightwood",   email: "dennis@aluno.com",   avatar: "/placeholder.svg" },
  { id: 1004, name: "Sarah Chen",          email: "sarah@aluno.com",    avatar: "/placeholder.svg" },
  { id: 1005, name: "Lucas Ferreira",      email: "lucas@aluno.com",    avatar: "/placeholder.svg" },
  { id: 1006, name: "João Pedro Lima",     email: "joao@aluno.com",     avatar: "/placeholder.svg" },
  { id: 1007, name: "Maria Eduarda Costa", email: "maria@aluno.com",    avatar: "/placeholder.svg" },
  { id: 1008, name: "Beatriz Almeida",     email: "beatriz@aluno.com",  avatar: "/placeholder.svg" },
]

const turmasData = [
  { id: 1, nome: "Turma A", descricao: "Catequese Infantil", totalAulas: 14, horario: "Sábado 09h" },
  { id: 2, nome: "Turma B", descricao: "Catequese Juvenil",  totalAulas: 14, horario: "Sábado 10h" },
  { id: 3, nome: "Turma C", descricao: "Crisma",             totalAulas: 14, horario: "Domingo 09h" },
]

const classMembers = [
  { id: 1,  name: "Carlos Eduardo",      turma: "Turma A", email: "carlos@escola.com",   avatar: "/placeholder.svg", isProfessor: true },
  { id: 2,  name: "Clara Blackwood",     turma: "Turma A", email: "clara@aluno.com",     avatar: "/placeholder.svg", isProfessor: false },
  { id: 3,  name: "Michael Whitmore",    turma: "Turma A", email: "michael@aluno.com",   avatar: "/placeholder.svg", isProfessor: false },
  { id: 4,  name: "Lucas Ferreira",      turma: "Turma A", email: "lucas@aluno.com",     avatar: "/placeholder.svg", isProfessor: false },
  { id: 5,  name: "Ana Paula Souza",     turma: "Turma B", email: "anapaula@escola.com", avatar: "/placeholder.svg", isProfessor: true },
  { id: 6,  name: "Dennis Brightwood",   turma: "Turma B", email: "dennis@aluno.com",    avatar: "/placeholder.svg", isProfessor: false },
  { id: 7,  name: "Sarah Chen",          turma: "Turma B", email: "sarah@aluno.com",     avatar: "/placeholder.svg", isProfessor: false },
  { id: 8,  name: "Roberto Mendes",      turma: "Turma C", email: "roberto@escola.com",  avatar: "/placeholder.svg", isProfessor: true },
  { id: 9,  name: "João Pedro Lima",     turma: "Turma C", email: "joao@aluno.com",      avatar: "/placeholder.svg", isProfessor: false },
  { id: 10, name: "Beatriz Almeida",     turma: "Turma C", email: "beatriz@aluno.com",   avatar: "/placeholder.svg", isProfessor: false },
]

type Aba = "membros" | "turmas"

// ── Modal: Cadastrar Nova Turma ──────────────────────────────────────────────

function ModalNovaTurma({ onClose }: { onClose: () => void }) {
  const [nomeTurma, setNomeTurma]                   = useState("")
  const [horario, setHorario]                       = useState("")
  const [descricao, setDescricao]                   = useState("")
  const [professorId, setProfessorId]               = useState("")
  const [buscaAluno, setBuscaAluno]                 = useState("")
  const [alunosSelecionados, setAlunosSelecionados] = useState<Record<number, boolean>>({})

  const alunosFiltrados = todosAlunos.filter(
      (a) =>
          a.name.toLowerCase().includes(buscaAluno.toLowerCase()) ||
          a.email.toLowerCase().includes(buscaAluno.toLowerCase())
  )

  const totalSelecionados = Object.values(alunosSelecionados).filter(Boolean).length
  const todosSelecioandos =
      alunosFiltrados.length > 0 && alunosFiltrados.every((a) => alunosSelecionados[a.id])

  const toggleAluno = (id: number) =>
      setAlunosSelecionados((prev) => ({ ...prev, [id]: !prev[id] }))

  const toggleTodos = () => {
    const novoEstado = { ...alunosSelecionados }
    alunosFiltrados.forEach((a) => { novoEstado[a.id] = !todosSelecioandos })
    setAlunosSelecionados(novoEstado)
  }

  const handleSalvar = () => {
    if (!nomeTurma || !professorId || totalSelecionados === 0) {
      alert("Preencha o nome, selecione um professor e adicione pelo menos 1 aluno.")
      return
    }
    alert(`Turma "${nomeTurma}" cadastrada com ${totalSelecionados} alunos!`)
    onClose()
  }

  return (
      /* Backdrop */
      <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        {/* Modal */}
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

          {/* Header do modal */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                <School className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Cadastrar Nova Turma</h2>
                <p className="text-xs text-gray-500">Preencha as informações e selecione os alunos</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-gray-700" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Corpo com scroll */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            {/* Informações da Turma */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-800">Informações da Turma</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Nome da Turma</label>
                  <Input
                      placeholder="Ex: Turma A"
                      value={nomeTurma}
                      onChange={(e) => setNomeTurma(e.target.value)}
                      className="bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Professor Responsável</label>
                  <Select value={professorId} onValueChange={setProfessorId}>
                    <SelectTrigger className="w-full bg-white text-sm">
                      <SelectValue placeholder="Selecione o professor..." />
                    </SelectTrigger>
                    <SelectContent>
                      {professores.map((prof) => (
                          <SelectItem key={prof.id} value={prof.id}>{prof.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Horário</label>
                  <Input
                      placeholder="Ex: Sábado 09h"
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                      className="bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Descrição</label>
                  <Input
                      placeholder="Ex: Catequese Infantil"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="bg-white text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Seleção de Alunos */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-800">Alunos da Turma</span>
                </div>
                {totalSelecionados > 0 && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 gap-1 font-medium text-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      {totalSelecionados} selecionados
                    </Badge>
                )}
              </div>

              {/* Busca */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder="Buscar aluno por nome ou e-mail..."
                    value={buscaAluno}
                    onChange={(e) => setBuscaAluno(e.target.value)}
                    className="pl-9 bg-white text-sm"
                />
              </div>

              {/* Tabela de alunos */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Selecionar todos */}
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center gap-3">
                  <Checkbox
                      checked={todosSelecioandos}
                      onCheckedChange={toggleTodos}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <span className="text-xs font-medium text-gray-600">Selecionar todos</span>
                </div>

                {/* Lista com scroll interno */}
                <div className="max-h-52 overflow-y-auto divide-y divide-gray-100">
                  {alunosFiltrados.length === 0 ? (
                      <div className="py-8 text-center text-sm text-gray-400">
                        Nenhum aluno encontrado para "{buscaAluno}".
                      </div>
                  ) : (
                      alunosFiltrados.map((aluno) => {
                        const isSelected = !!alunosSelecionados[aluno.id]
                        return (
                            <div
                                key={aluno.id}
                                onClick={() => toggleAluno(aluno.id)}
                                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-gray-50 ${isSelected ? "bg-purple-50/40" : "bg-white"}`}
                            >
                              <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleAluno(aluno.id)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 flex-shrink-0"
                              />
                              <Avatar className="w-7 h-7 border border-gray-200 flex-shrink-0">
                                <AvatarImage src={aluno.avatar} />
                                <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                                  {aluno.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-gray-900 truncate">{aluno.name}</div>
                                <div className="text-xs text-gray-500 truncate">{aluno.email}</div>
                              </div>
                            </div>
                        )
                      })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer do modal */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <Button variant="outline" className="bg-white text-sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button
                className="bg-purple-600 hover:bg-purple-700 gap-2 text-sm"
                onClick={handleSalvar}
            >
              <Save className="w-4 h-4" />
              Salvar Turma
            </Button>
          </div>
        </div>
      </div>
  )
}

// ── Componente Principal ─────────────────────────────────────────────────────

export default function ClassManagementPage() {
  const [abaAtiva, setAbaAtiva]               = useState<Aba>("membros")
  const [turmaSelecionada, setTurmaSelecionada] = useState("Turma A")
  const [modalAberto, setModalAberto]         = useState(false)

  const filteredMembers = classMembers
      .filter((m) => m.turma === turmaSelecionada)
      .sort((a, b) => (a.isProfessor === b.isProfessor ? 0 : a.isProfessor ? -1 : 1))

  const totalAlunos = filteredMembers.filter((m) => !m.isProfessor).length
  const professor   = filteredMembers.find((m) => m.isProfessor)

  return (
      <DashboardLayout>
        {/* Modal */}
        {modalAberto && <ModalNovaTurma onClose={() => setModalAberto(false)} />}

        <div className="space-y-6">

          {/* ── Cabeçalho ── */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Turmas e Alunos</h1>
              <p className="text-sm text-gray-600 mt-1">Gerencie turmas, professores e alunos matriculados</p>
            </div>

            {abaAtiva === "turmas" ? (
                <Button
                    className="bg-purple-600 hover:bg-purple-700 gap-2 text-sm"
                    onClick={() => setModalAberto(true)}
                >
                  <Plus className="w-4 h-4" />
                  Nova Turma
                </Button>
            ) : (
                <Button className="bg-purple-600 hover:bg-purple-700 gap-2 text-sm">
                  <UserPlus className="w-4 h-4" />
                  Adicionar Aluno
                </Button>
            )}
          </div>

          {/* ── Abas ── */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-0 -mb-px">
              {(["membros", "turmas"] as Aba[]).map((aba) => (
                  <button
                      key={aba}
                      onClick={() => setAbaAtiva(aba)}
                      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                          abaAtiva === aba
                              ? "border-purple-600 text-purple-700"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    {aba === "membros" ? "Membros" : "Turmas"}
                  </button>
              ))}
            </nav>
          </div>

          {/* ══════════════════════════════════════════════
            ABA: MEMBROS
        ══════════════════════════════════════════════ */}
          {abaAtiva === "membros" && (
              <div className="space-y-6">

                {/* Dica contextual */}
                <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 border border-purple-100 rounded-lg px-4 py-2.5">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>
                Para criar ou editar turmas, acesse a aba{" "}
                    <button
                        onClick={() => setAbaAtiva("turmas")}
                        className="font-medium underline underline-offset-2 hover:text-purple-900"
                    >
                  Turmas
                </button>
                .
              </span>
                </div>

                {/* Seletor de turma */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Turma:</label>
                  <Select value={turmaSelecionada} onValueChange={setTurmaSelecionada}>
                    <SelectTrigger className="w-48 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {turmasData.map((t) => (
                          <SelectItem key={t.id} value={t.nome}>{t.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cards de resumo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Professor responsável</div>
                        <div className="text-base font-semibold text-gray-900 mt-0.5">
                          {professor ? professor.name : "Não atribuído"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Total de alunos</div>
                        <div className="text-base font-semibold text-gray-900 mt-0.5">
                          {totalAlunos} matriculados
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela de membros */}
                <Card className="border-gray-200 shadow-sm overflow-hidden">
                  <CardHeader className="bg-white border-b border-gray-100 pb-4">
                    <CardTitle className="text-base font-semibold text-gray-900">
                      Relação de membros — {turmaSelecionada}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 pointer-events-none">
                          <TableHead className="font-medium text-gray-600 pl-6 w-[55%]">Nome</TableHead>
                          <TableHead className="font-medium text-gray-600">Cargo</TableHead>
                          <TableHead className="font-medium text-gray-600 text-right pr-6">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={3} className="h-24 text-center text-sm text-gray-500">
                                Nenhum membro encontrado nesta turma.
                              </TableCell>
                            </TableRow>
                        ) : (
                            filteredMembers.map((member) => (
                                <TableRow
                                    key={member.id}
                                    className={`hover:bg-gray-50 transition-colors ${member.isProfessor ? "bg-purple-50/30" : ""}`}
                                >
                                  <TableCell className="pl-6">
                                    <div className="flex items-center gap-3">
                                      <Avatar className={`w-8 h-8 border ${member.isProfessor ? "border-purple-200" : "border-gray-200"}`}>
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback className={`text-xs ${member.isProfessor ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                                          {member.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                                          {member.name}
                                          {member.isProfessor && <BookOpen className="w-3 h-3 text-purple-500" />}
                                        </div>
                                        <div className="text-xs text-gray-500">{member.email}</div>
                                      </div>
                                    </div>
                                  </TableCell>

                                  <TableCell>
                                    <Badge
                                        variant="secondary"
                                        className={member.isProfessor
                                            ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                                            : "bg-gray-100 text-gray-600 font-normal hover:bg-gray-100"
                                        }
                                    >
                                      {member.isProfessor ? "Professor" : "Aluno"}
                                    </Badge>
                                  </TableCell>

                                  <TableCell className="text-right pr-6">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-gray-700">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <User className="w-4 h-4 mr-2 text-gray-500" /> Ver Perfil
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Mail className="w-4 h-4 mr-2 text-gray-500" /> Enviar Mensagem
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="w-4 h-4 mr-2 text-gray-500" /> Editar Cadastro
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                          <Trash2 className="w-4 h-4 mr-2" /> Remover da Turma
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
          )}

          {/* ══════════════════════════════════════════════
            ABA: TURMAS
        ══════════════════════════════════════════════ */}
          {abaAtiva === "turmas" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {turmasData.map((turma) => {
                  const membros    = classMembers.filter((m) => m.turma === turma.nome)
                  const alunos     = membros.filter((m) => !m.isProfessor).length
                  const prof       = membros.find((m) => m.isProfessor)

                  return (
                      <Card key={turma.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <School className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{turma.nome}</div>
                                <div className="text-xs text-gray-500">{turma.descricao}</div>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-gray-700">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2 text-gray-500" /> Editar Turma
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                  <Trash2 className="w-4 h-4 mr-2" /> Excluir Turma
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Horário</span>
                              <span className="text-gray-700">{turma.horario}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Professor</span>
                              <span className="text-gray-700">{prof ? prof.name : "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Alunos</span>
                              <span className="text-gray-700">{alunos} matriculados</span>
                            </div>
                          </div>

                          <button
                              onClick={() => { setTurmaSelecionada(turma.nome); setAbaAtiva("membros") }}
                              className="w-full text-xs text-purple-600 hover:text-purple-800 font-medium border border-purple-200 hover:border-purple-400 rounded-md py-1.5 transition-colors"
                          >
                            Ver membros →
                          </button>
                        </CardContent>
                      </Card>
                  )
                })}

                {/* Card Nova Turma */}
                <Card
                    className="border-dashed border-gray-300 shadow-none hover:border-purple-400 hover:bg-purple-50/30 transition-colors cursor-pointer"
                    onClick={() => setModalAberto(true)}
                >
                  <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[180px] gap-2 text-gray-400 hover:text-purple-600 transition-colors">
                    <div className="w-10 h-10 border-2 border-dashed border-current rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Nova Turma</span>
                  </CardContent>
                </Card>
              </div>
          )}

        </div>
      </DashboardLayout>
  )
}