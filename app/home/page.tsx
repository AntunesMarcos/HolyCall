"use client"

import { useState } from "react"
import {
  Home,
  BarChart3,
  Settings,
  AlertTriangle,
  FolderSearch,
  MoreHorizontal,
  Filter,
  School,
  CheckCircle,
  XCircle,
  Plus,
  Users,
  Check,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const workflowData = [
  {
    id: 1001,
    user: { name: "Clara Blackwood", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 99999-0001",
    presenca: 12,
    falta: 2,
    cargaHoraria: "14h",
  },
  {
    id: 1002,
    user: { name: "Michael Whitmore", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 98888-0002",
    presenca: 10,
    falta: 4,
    cargaHoraria: "14h",
  },
  {
    id: 1003,
    user: { name: "Dennis Brightwood", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "away" },
    contato: "(31) 97777-0003",
    presenca: 14,
    falta: 0,
    cargaHoraria: "14h",
  },
  {
    id: 1004,
    user: { name: "Sarah Chen", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 96666-0004",
    presenca: 8,
    falta: 6,
    cargaHoraria: "14h",
  },
  {
    id: 1005,
    user: { name: "Lucas Ferreira", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 95555-0005",
    presenca: 13,
    falta: 1,
    cargaHoraria: "14h",
  },
  {
    id: 1006,
    user: { name: "Ana Paula Souza", role: "Turma C", avatar: "/placeholder.svg?height=32&width=32", status: "away" },
    contato: "(31) 94444-0006",
    presenca: 6,
    falta: 8,
    cargaHoraria: "14h",
  },
  {
    id: 1007,
    user: { name: "João Pedro Lima", role: "Turma C", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 93333-0007",
    presenca: 11,
    falta: 3,
    cargaHoraria: "14h",
  },
  {
    id: 1008,
    user: { name: "Maria Eduarda Costa", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 92222-0008",
    presenca: 9,
    falta: 5,
    cargaHoraria: "14h",
  },
  {
    id: 1009,
    user: { name: "Pedro Henrique Rocha", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 91111-0009",
    presenca: 7,
    falta: 7,
    cargaHoraria: "14h",
  },
  {
    id: 1010,
    user: { name: "Beatriz Almeida", role: "Turma C", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 90000-0010",
    presenca: 14,
    falta: 0,
    cargaHoraria: "14h",
  },
  {
    id: 1011,
    user: { name: "Rafael Oliveira", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "away" },
    contato: "(31) 98765-0011",
    presenca: 5,
    falta: 9,
    cargaHoraria: "14h",
  },
  {
    id: 1012,
    user: { name: "Isabela Martins", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 97654-0012",
    presenca: 11,
    falta: 3,
    cargaHoraria: "14h",
  },
  {
    id: 1013,
    user: { name: "Gustavo Pereira", role: "Turma C", avatar: "/placeholder.svg?height=32&width=32", status: "away" },
    contato: "(31) 96543-0013",
    presenca: 4,
    falta: 10,
    cargaHoraria: "14h",
  },
  {
    id: 1014,
    user: { name: "Larissa Campos", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 95432-0014",
    presenca: 13,
    falta: 1,
    cargaHoraria: "14h",
  },
  {
    id: 1015,
    user: { name: "Felipe Nascimento", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 94321-0015",
    presenca: 10,
    falta: 4,
    cargaHoraria: "14h",
  },
  {
    id: 1016,
    user: { name: "Camila Torres", role: "Turma C", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 93210-0016",
    presenca: 12,
    falta: 2,
    cargaHoraria: "14h",
  },
  {
    id: 1017,
    user: { name: "Thiago Carvalho", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "away" },
    contato: "(31) 92109-0017",
    presenca: 8,
    falta: 6,
    cargaHoraria: "14h",
  },
  {
    id: 1018,
    user: { name: "Fernanda Lima", role: "Turma A", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 91098-0018",
    presenca: 14,
    falta: 0,
    cargaHoraria: "14h",
  },
  {
    id: 1019,
    user: { name: "Bruno Souza", role: "Turma C", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 90987-0019",
    presenca: 6,
    falta: 8,
    cargaHoraria: "14h",
  },
  {
    id: 1020,
    user: { name: "Juliana Ribeiro", role: "Turma B", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
    contato: "(31) 99876-0020",
    presenca: 9,
    falta: 5,
    cargaHoraria: "14h",
  },
]

const navItems = [
  { href: "/home", icon: Home, label: "Início" },
  { href: "/attendance", icon: Plus, label: "Registrar Chamada" },
  { href: "/attendance/consultar", icon: FolderSearch, label: "Consultar Chamada" },
  { href: "/team", icon: Users, label: "Turmas" },
  { href: "/analytics", icon: BarChart3, label: "Relatórios" },
  { href: "/settings", icon: Settings, label: "Configurações" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filtros, setFiltros] = useState({
    turmaA: false,
    turmaB: false,
    turmaC: false,
    comFaltas: false,
    semFaltas: false,
  })

  const toggleFiltro = (key: keyof typeof filtros) => {
    setFiltros((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const workflowFiltrado = workflowData.filter((workflow) => {
    const turmaSelecionada = filtros.turmaA || filtros.turmaB || filtros.turmaC
    const presencaSelecionada = filtros.comFaltas || filtros.semFaltas

    const passaTurma = !turmaSelecionada || (
        (filtros.turmaA && workflow.user.role === "Turma A") ||
        (filtros.turmaB && workflow.user.role === "Turma B") ||
        (filtros.turmaC && workflow.user.role === "Turma C")
    )

    const passaPresenca = !presencaSelecionada || (
        (filtros.comFaltas && workflow.falta > 0) ||
        (filtros.semFaltas && workflow.falta === 0)
    )

    return passaTurma && passaPresenca
  })

  return (
      <div className="h-screen flex flex-col bg-white">

        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-between flex-shrink-0 z-30">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Botão hamburguer — só no mobile */}
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
              <span className="font-semibold text-gray-900 text-xl">HolyCall</span>
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
                ${href === "/home"
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

            {/* Título */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Visão Geral</h1>
                  <p className="text-sm text-gray-600 mt-1">Acompanhe a frequência e o desempenho das turmas</p>
                </div>
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                <Card className="p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Plus className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">Registrar Chamada</h3>
                      <p className="text-xs md:text-sm text-gray-500">Registre a presença de hoje</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderSearch className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">Consultar Chamada</h3>
                      <p className="text-xs md:text-sm text-gray-500">Veja o histórico de presenças</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <School className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">Cadastrar Turma</h3>
                      <p className="text-xs md:text-sm text-gray-500">Adicione ou gerencie turmas</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Tabela */}
            <Card className="border-gray-200">
              <CardHeader className="pb-4 px-4 md:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base md:text-lg font-semibold">Lista Geral de Alunos</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Frequência e carga horária por aluno</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrar
                        {Object.values(filtros).some(Boolean) && (
                            <span className="ml-2 w-2 h-2 bg-purple-600 rounded-full" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Turma</DropdownMenuLabel>
                      {[
                        { key: "turmaA", label: "Turma A" },
                        { key: "turmaB", label: "Turma B" },
                        { key: "turmaC", label: "Turma C" },
                      ].map(({ key, label }) => (
                          <div
                              key={key}
                              onClick={() => toggleFiltro(key as keyof typeof filtros)}
                              className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm mx-1"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                filtros[key as keyof typeof filtros] ? "bg-purple-600 border-purple-600" : "border-gray-300"
                            }`}>
                              {filtros[key as keyof typeof filtros] && <Check className="w-3 h-3 text-white" />}
                            </div>
                            {label}
                          </div>
                      ))}

                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Presença</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {[
                        { key: "comFaltas", label: "Com Faltas" },
                        { key: "semFaltas", label: "Sem Faltas" },
                      ].map(({ key, label }) => (
                          <div
                              key={key}
                              onClick={() => toggleFiltro(key as keyof typeof filtros)}
                              className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm mx-1"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                filtros[key as keyof typeof filtros] ? "bg-purple-600 border-purple-600" : "border-gray-300"
                            }`}>
                              {filtros[key as keyof typeof filtros] && <Check className="w-3 h-3 text-white" />}
                            </div>
                            {label}
                          </div>
                      ))}

                      <DropdownMenuSeparator />
                      <div
                          onClick={(e) => {
                            e.stopPropagation()
                            setFiltros({ turmaA: false, turmaB: false, turmaC: false, comFaltas: false, semFaltas: false })
                          }}
                          className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-sm mx-1"
                      >
                        Limpar filtros
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              {/* Tabela com scroll horizontal no mobile */}
              <CardContent className="p-0 overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      {/*Remover ID quando for fazer o CRUD*/}
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm">ID</TableHead>
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm">Nome</TableHead>
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm min-w-[140px]">Contato</TableHead>
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm">Presença</TableHead>
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm">Falta</TableHead>
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm min-w-[100px]">% Faltas</TableHead>
                      <TableHead className="font-medium text-gray-700 text-xs md:text-sm">C.H.</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflowFiltrado.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-gray-500 py-8 text-sm">
                            Nenhum aluno encontrado com os filtros selecionados.
                          </TableCell>
                        </TableRow>
                    ) : (
                        workflowFiltrado.map((workflow) => (
                            <TableRow key={workflow.id} className="hover:bg-gray-50">
                              <TableCell className="font-mono text-xs md:text-sm">{workflow.id}</TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="relative flex-shrink-0">
                                    <Avatar className="w-7 h-7">
                                      <AvatarImage src={workflow.user?.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs">
                                        {workflow.user?.name.split(" ").map((n) => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-medium text-xs md:text-sm text-gray-900 truncate max-w-[100px] md:max-w-none">
                                      {workflow.user?.name}
                                    </div>
                                    <div className="text-xs text-gray-500">{workflow.user?.role}</div>
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="text-gray-600 text-xs md:text-sm">{workflow.contato}</TableCell>

                              <TableCell>
                                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {workflow.presenca}
                                </Badge>
                              </TableCell>

                              <TableCell>
                                {workflow.falta === 0 ? (
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">0</Badge>
                                ) : workflow.falta <= 3 ? (
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                                      <AlertTriangle className="w-3 h-3 mr-1" />
                                      {workflow.falta}
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                                      <XCircle className="w-3 h-3 mr-1" />
                                      {workflow.falta}
                                    </Badge>
                                )}
                              </TableCell>

                              <TableCell className="text-gray-600 text-xs md:text-sm">
                                {((workflow.falta / parseInt(workflow.cargaHoraria)) * 100).toFixed(1)}%
                              </TableCell>

                              <TableCell className="text-gray-600 text-xs md:text-sm">{workflow.cargaHoraria}</TableCell>

                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
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
          </main>
        </div>
      </div>
  )
}