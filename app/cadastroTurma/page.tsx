"use client"

import { useState } from "react"
import {
    ArrowLeft,
    Search,
    Users,
    Save,
    BookOpen,
    CheckCircle2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"

// ── Dados Simulados ────────────────────────────────────────────────────────
const professores = [
    { id: "p1", name: "Carlos Eduardo" },
    { id: "p2", name: "Ana Paula Souza" },
    { id: "p3", name: "Roberto Mendes" },
]

// Lista de alunos (simulando alunos que estão sem turma ou todos os alunos do sistema)
const todosAlunos = [
    { id: 1001, name: "Clara Blackwood",      email: "clara@aluno.com",   avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1002, name: "Michael Whitmore",     email: "michael@aluno.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1003, name: "Dennis Brightwood",    email: "dennis@aluno.com",  avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1004, name: "Sarah Chen",           email: "sarah@aluno.com",   avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1005, name: "Lucas Ferreira",       email: "lucas@aluno.com",   avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1006, name: "João Pedro Lima",      email: "joao@aluno.com",    avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1007, name: "Maria Eduarda Costa",  email: "maria@aluno.com",   avatar: "/placeholder.svg?height=32&width=32" },
    { id: 1008, name: "Beatriz Almeida",      email: "beatriz@aluno.com", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function CadastrarTurmaPage() {
    // Estados do formulário
    const [nomeTurma, setNomeTurma] = useState("")
    const [professorId, setProfessorId] = useState("")
    const [buscaAluno, setBuscaAluno] = useState("")
    const [alunosSelecionados, setAlunosSelecionados] = useState<Record<number, boolean>>({})

    // Filtra alunos pela barra de pesquisa
    const alunosFiltrados = todosAlunos.filter((aluno) =>
        aluno.name.toLowerCase().includes(buscaAluno.toLowerCase()) ||
        aluno.email.toLowerCase().includes(buscaAluno.toLowerCase())
    )

    // Contagem de selecionados
    const totalSelecionados = Object.values(alunosSelecionados).filter(Boolean).length

    // Funções de seleção
    const toggleAluno = (id: number) => {
        setAlunosSelecionados((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const toggleTodos = () => {
        const todosEstaoSelecionados = alunosFiltrados.every((a) => alunosSelecionados[a.id])
        const novoEstado = { ...alunosSelecionados }

        alunosFiltrados.forEach((a) => {
            novoEstado[a.id] = !todosEstaoSelecionados
        })

        setAlunosSelecionados(novoEstado)
    }

    // Função de salvar (simulando um redirecionamento)
    const handleSalvarTurma = () => {
        if (!nomeTurma || !professorId || totalSelecionados === 0) {
            alert("Por favor, preencha o nome da turma, selecione um professor e adicione pelo menos 1 aluno.")
            return
        }

        console.log("Salvando turma...", { nomeTurma, professorId, alunosSelecionados })
        alert(`Turma "${nomeTurma}" cadastrada com sucesso com ${totalSelecionados} alunos! Redirecionando...`)
        // Aqui você colocaria a lógica de roteamento do Next.js: router.push('/turmas')
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl mx-auto">

                {/* ── Header e Voltar ── */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Cadastrar Nova Turma</h1>
                        <p className="text-gray-600 mt-1 text-sm">Crie uma turma, atribua um professor e selecione os alunos</p>
                    </div>
                </div>

                {/* ── Formulário Principal (Dados da Turma) ── */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader className="bg-white border-b border-gray-100 pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                            Informações da Turma
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome da Turma */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Nome da Turma</label>
                                <Input
                                    placeholder="Ex: Turma do 3º Ano B"
                                    value={nomeTurma}
                                    onChange={(e) => setNomeTurma(e.target.value)}
                                    className="bg-white"
                                />
                            </div>

                            {/* Seleção de Professor */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Professor Responsável</label>
                                <Select value={professorId} onValueChange={setProfessorId}>
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Selecione o professor..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {professores.map((prof) => (
                                            <SelectItem key={prof.id} value={prof.id}>{prof.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Seleção de Alunos ── */}
                <Card className="border-gray-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-100 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    Alunos da Turma
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Selecione quais alunos farão parte desta nova turma
                                </CardDescription>
                            </div>

                            {/* Barra de Busca de Alunos */}
                            <div className="relative w-full sm:max-w-xs">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Buscar aluno por nome..."
                                    value={buscaAluno}
                                    onChange={(e) => setBuscaAluno(e.target.value)}
                                    className="pl-9 bg-white"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    {/* Cabeçalho de Seleção em Lote */}
                    <div className="bg-gray-50/80 p-3 px-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={alunosFiltrados.length > 0 && alunosFiltrados.every((a) => alunosSelecionados[a.id])}
                                onCheckedChange={toggleTodos}
                                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <span className="text-sm font-medium text-gray-700">Selecionar Todos</span>
                        </div>
                        {totalSelecionados > 0 && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 gap-1 border-purple-200 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {totalSelecionados} selecionados
                            </Badge>
                        )}
                    </div>

                    <CardContent className="p-0 overflow-x-auto max-h-[400px] overflow-y-auto">
                        <Table>
                            <TableBody>
                                {alunosFiltrados.map((aluno) => {
                                    const isSelected = !!alunosSelecionados[aluno.id];
                                    return (
                                        <TableRow
                                            key={aluno.id}
                                            className={`transition-colors cursor-pointer hover:bg-gray-50 ${isSelected ? "bg-purple-50/40" : ""}`}
                                            onClick={() => toggleAluno(aluno.id)}
                                        >
                                            <TableCell className="pl-6 w-12">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={() => toggleAluno(aluno.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8 border border-gray-200">
                                                        <AvatarImage src={aluno.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                                                            {aluno.name.substring(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-gray-900 text-sm">{aluno.name}</div>
                                                        <div className="text-xs text-gray-500">{aluno.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right pr-6">
                                                <Badge variant="outline" className="text-gray-500 font-normal">
                                                    Aluno
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                                {alunosFiltrados.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center text-gray-500 bg-white hover:bg-white cursor-default">
                                            Nenhum aluno encontrado com "{buscaAluno}".
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* ── Footer de Ações ── */}
                <div className="flex items-center justify-end gap-3 pt-2 pb-8">
                    <Button variant="outline" className="bg-white">
                        Cancelar
                    </Button>
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 gap-2 px-6"
                        onClick={handleSalvarTurma}
                    >
                        <Save className="w-4 h-4" />
                        Salvar Turma
                    </Button>
                </div>

            </div>
        </DashboardLayout>
    )
}