"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Save,
  UserPlus,
  Users,
  Mail,
  Phone,
  BookOpen,
  MoreHorizontal,
  Edit,
  Trash2,
  Key
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import Link from "next/link"

// ── Dados Simulados ────────────────────────────────────────────────────────
const turmas = ["Turma A", "Turma B", "Turma C", "Sem Turma"]

const alunosIniciais = [
  { id: 1001, name: "Clara Blackwood",      email: "clara@aluno.com",   telefone: "(31) 99999-0001", turma: "Turma A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1002, name: "Michael Whitmore",     email: "michael@aluno.com", telefone: "(31) 98888-0002", turma: "Turma A", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 1003, name: "Dennis Brightwood",    email: "dennis@aluno.com",  telefone: "(31) 97777-0003", turma: "Sem Turma", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function CadastrarAlunoPage() {
  // Estados do formulário de cadastro
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [turma, setTurma] = useState("Sem Turma") // Opção para colocar em turma ou deixar sem

  // Estados da listagem e dados
  const [busca, setBusca] = useState("")
  const [alunos, setAlunos] = useState(alunosIniciais)

  // Filtra alunos pela barra de pesquisa
  const alunosFiltrados = alunos.filter((aluno) =>
      aluno.name.toLowerCase().includes(busca.toLowerCase()) ||
      aluno.email.toLowerCase().includes(busca.toLowerCase()) ||
      aluno.turma.toLowerCase().includes(busca.toLowerCase())
  )

  // ============================================================================
  // LÓGICA DE GERAÇÃO DE ID E SENHA ÚNICA (APENAS NÚMEROS)
  // ============================================================================

  // Função que será executada no Backend para garantir que a senha seja única
  // Aqui está simulada no frontend apenas para visualização do fluxo
  const gerarSenhaUnica = () => {
    // Math.random() gera um número decimal.
    // Multiplicamos por 900000 e somamos 100000 para garantir que tenha sempre 6 dígitos.
    // Math.floor arredonda para baixo (ex: 456789)
    const novaSenha = Math.floor(100000 + Math.random() * 900000).toString()

    // No Backend real, você faria uma query no banco:
    // const senhaExiste = await db.users.findOne({ password: novaSenha })
    // if (senhaExiste) return gerarSenhaUnica() // Chama de novo se existir (Recursividade)

    return novaSenha
  }

  const handleSalvarAluno = () => {
    if (!nome || !email || !telefone) {
      alert("Por favor, preencha o Nome, E-mail e Telefone (WhatsApp).")
      return
    }

    // Gerando um ID incremental simulado (Pegando o último ID e somando 1)
    // No Backend, o banco de dados (ex: PostgreSQL com SERIAL ou MongoDB com ObjectId) faz isso sozinho
    const novoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1000

    // Gerando a senha numérica única
    const senhaGerada = gerarSenhaUnica()

    const novoAluno = {
      id: novoId,
      name: nome,
      email: email,
      telefone: telefone,
      turma: turma, // Pode ser "Sem Turma" ou "Turma A", etc.
      avatar: "", // Sem avatar no cadastro inicial
      // senha: senhaGerada -> Esta senha seria criptografada (ex: bcrypt) antes de ir pro banco
    }

    // Adiciona o novo aluno na lista
    setAlunos([novoAluno, ...alunos])

    // Limpa o formulário
    setNome("")
    setEmail("")
    setTelefone("")
    setTurma("Sem Turma")

    // Mostra o ID e a Senha para o usuário que acabou de cadastrar
    alert(`Aluno cadastrado com sucesso!\n\nID: ${novoId}\nSenha de acesso gerada: ${senhaGerada}\n\n(No sistema real, enviaríamos essa senha por e-mail/WhatsApp)`)
  }
  // ============================================================================

  return (
      <DashboardLayout>
        <div className="space-y-6 max-w-6xl mx-auto">

          {/* ── Header e Voltar ── */}
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Alunos</h1>
              <p className="text-gray-600 mt-1 text-sm">Cadastre novos estudantes e gerencie suas turmas</p>
            </div>
          </div>

          {/* ── Formulário de Cadastro ── */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600" />
                Novo Aluno
              </CardTitle>
              <CardDescription>Insira os dados. A senha de acesso (numérica) será gerada automaticamente.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nome Completo */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nome Completo *</label>
                  <div className="relative">
                    <Input
                        placeholder="Ex: João Silva Mendes"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="bg-white"
                    />
                  </div>
                </div>

                {/* Telefone / WhatsApp */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">WhatsApp / Celular *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="(00) 90000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="pl-10 bg-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        type="email"
                        placeholder="aluno@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white"
                    />
                  </div>
                </div>

                {/* Seleção de Turma */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Turma Inicial (Opcional)</label>
                  <Select value={turma} onValueChange={setTurma}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Selecione a turma..." />
                    </SelectTrigger>
                    <SelectContent>
                      {turmas.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>

              {/* Ações do Formulário */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Key className="w-4 h-4" />
                  Senha numérica única será gerada ao salvar.
                </div>
                <Button
                    className="bg-purple-600 hover:bg-purple-700 gap-2 px-6"
                    onClick={handleSalvarAluno}
                >
                  <Save className="w-4 h-4" />
                  Cadastrar Aluno
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ── Listagem de Alunos ── */}
          <Card className="border-gray-200 shadow-sm overflow-hidden mt-8">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Alunos Matriculados
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Gerencie todos os alunos cadastrados no sistema
                  </CardDescription>
                </div>

                {/* Barra de Busca */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                      placeholder="Buscar por nome, e-mail ou turma..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-9 bg-white"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-medium text-gray-700 w-16">ID</TableHead>
                    <TableHead className="font-medium text-gray-700 pl-4 w-[35%]">Aluno</TableHead>
                    <TableHead className="font-medium text-gray-700">Contato</TableHead>
                    <TableHead className="font-medium text-gray-700">Turma</TableHead>
                    <TableHead className="font-medium text-gray-700 text-right pr-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alunosFiltrados.map((aluno) => (
                      <TableRow key={aluno.id} className="transition-colors hover:bg-gray-50">

                        {/* Coluna: ID */}
                        <TableCell className="font-mono text-gray-500 text-sm">
                          #{aluno.id}
                        </TableCell>

                        {/* Coluna: Avatar + Nome */}
                        <TableCell className="pl-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 border border-gray-200">
                              <AvatarImage src={aluno.avatar || ""} />
                              <AvatarFallback className="bg-purple-100 text-purple-700 font-medium text-xs">
                                {aluno.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{aluno.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{aluno.email}</div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Coluna: Contato/Telefone */}
                        <TableCell>
                          <div className="text-sm text-gray-600 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {aluno.telefone}
                          </div>
                        </TableCell>

                        {/* Coluna: Turma */}
                        <TableCell>
                          <Badge
                              variant="outline"
                              className={`font-medium ${
                                  aluno.turma === "Sem Turma"
                                      ? "bg-gray-50 text-gray-500 border-gray-200"
                                      : "bg-blue-50 text-blue-700 border-blue-200"
                              }`}
                          >
                            {aluno.turma !== "Sem Turma" && <BookOpen className="w-3 h-3 mr-1" />}
                            {aluno.turma}
                          </Badge>
                        </TableCell>

                        {/* Coluna: Ações */}
                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500 hover:text-gray-900">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="w-4 h-4 mr-2 text-gray-500" />
                                Editar Dados
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                                Alterar Turma
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Key className="w-4 h-4 mr-2 text-gray-500" />
                                Gerar nova Senha
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir Aluno
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}

                  {/* Empty State */}
                  {alunosFiltrados.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-gray-500 bg-white hover:bg-white cursor-default">
                          <div className="flex flex-col items-center justify-center">
                            <Search className="w-6 h-6 text-gray-300 mb-2" />
                            <p>Nenhum aluno encontrado.</p>
                          </div>
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