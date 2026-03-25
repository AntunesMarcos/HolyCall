"use client"

import { useState } from "react"
import {
    ArrowLeft,
    Search,
    Save,
    BookOpen,
    Mail,
    Phone,
    MoreHorizontal,
    Edit,
    Trash2,
    UserPlus,
    ShieldCheck,
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
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

// ── Dados Simulados ────────────────────────────────────────────────────────
const professoresIniciais = [
    {
        id: "P001",
        nome: "Carlos Eduardo Silva",
        email: "carlos.eduardo@escola.com",
        telefone: "(31) 99999-1111",
        disciplina: "Matemática",
        status: "Ativo",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: "P002",
        nome: "Ana Paula Souza",
        email: "ana.paula@escola.com",
        telefone: "(31) 98888-2222",
        disciplina: "História",
        status: "Ativo",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: "P003",
        nome: "Roberto Mendes",
        email: "roberto.mendes@escola.com",
        telefone: "(31) 97777-3333",
        disciplina: "Física",
        status: "Inativo",
        avatar: "/placeholder.svg?height=40&width=40"
    },
]

export default function CadastrarProfessorPage() {
    // Estados do formulário de cadastro
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [disciplina, setDisciplina] = useState("")

    // Estados da listagem
    const [busca, setBusca] = useState("")
    const [professores, setProfessores] = useState(professoresIniciais)

    // Filtra professores pela barra de pesquisa
    const professoresFiltrados = professores.filter((prof) =>
        prof.nome.toLowerCase().includes(busca.toLowerCase()) ||
        prof.disciplina.toLowerCase().includes(busca.toLowerCase())
    )

    // ============================================================================
    // LÓGICA DE GERAÇÃO DE ID E SENHA ÚNICA PARA O PROFESSOR
    // ============================================================================

    // Simula a criação de uma senha numérica aleatória de 6 dígitos.
    // No backend, essa função deve ser executada e a senha validada contra o banco
    // para garantir que não haja colisões (senhas iguais para usuários diferentes).
    const gerarSenhaUnica = () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    const handleSalvarProfessor = () => {
        if (!nome || !email || !disciplina) {
            alert("Por favor, preencha os campos obrigatórios (Nome, E-mail e Disciplina).")
            return
        }

        // Simula um banco de dados Auto Incrementando o ID.
        // Pega o número do último ID cadastrado (ex: "P003" -> 3) e soma 1.
        const ultimoIdNumero = professores.length > 0
            ? parseInt(professores[0].id.replace("P", ""))
            : 0;

        // Formata o novo ID para manter o padrão "P00X"
        const novoId = `P${String(ultimoIdNumero + 1).padStart(3, '0')}`;

        // Gera a senha numérica (que será enviada ao professor e criptografada no banco)
        const senhaGerada = gerarSenhaUnica();

        const novoProfessor = {
            id: novoId,
            nome,
            email,
            telefone,
            disciplina,
            status: "Ativo",
            avatar: "" // Sem avatar inicial
            // senha: senhaGerada -> Lembre-se de hashear (bcrypt) no backend
        }

        setProfessores([novoProfessor, ...professores])

        // Limpa o formulário
        setNome("")
        setEmail("")
        setTelefone("")
        setDisciplina("")

        // Alerta exibindo a senha gerada para o admin que está cadastrando
        alert(`Professor cadastrado com sucesso!\n\nID: ${novoId}\nSenha de Acesso: ${senhaGerada}\n\n(No sistema real, enviar esta senha por e-mail ou WhatsApp.)`)
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
                        <h1 className="text-2xl font-semibold text-gray-900">Professores</h1>
                        <p className="text-gray-600 mt-1 text-sm">Cadastre novos docentes e gerencie o corpo docente</p>
                    </div>
                </div>

                {/* ── Formulário de Cadastro ── */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader className="bg-white border-b border-gray-100 pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-purple-600" />
                            Novo Professor
                        </CardTitle>
                        <CardDescription>Insira os dados. A senha numérica de acesso será gerada automaticamente.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nome Completo */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nome Completo *</label>
                                <div className="relative">
                                    <Input
                                        placeholder="Ex: Carlos Eduardo Silva"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        className="bg-white"
                                    />
                                </div>
                            </div>

                            {/* Disciplina / Especialidade */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Disciplina Principal *</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Ex: Matemática, Biologia..."
                                        value={disciplina}
                                        onChange={(e) => setDisciplina(e.target.value)}
                                        className="pl-10 bg-white"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">E-mail Corporativo *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="email"
                                        placeholder="professor@escola.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-white"
                                    />
                                </div>
                            </div>

                            {/* Telefone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="(00) 00000-0000"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        className="pl-10 bg-white"
                                    />
                                </div>
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
                                onClick={handleSalvarProfessor}
                            >
                                <Save className="w-4 h-4" />
                                Cadastrar Professor
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Listagem de Professores ── */}
                <Card className="border-gray-200 shadow-sm overflow-hidden mt-8">
                    <CardHeader className="bg-white border-b border-gray-100 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                                    Corpo Docente
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Gerencie os professores cadastrados na instituição
                                </CardDescription>
                            </div>

                            {/* Barra de Busca */}
                            <div className="relative w-full sm:max-w-xs">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Buscar por nome ou disciplina..."
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
                                    <TableHead className="font-medium text-gray-700 pl-6 w-[35%]">Professor</TableHead>
                                    <TableHead className="font-medium text-gray-700">Contato</TableHead>
                                    <TableHead className="font-medium text-gray-700">Status</TableHead>
                                    <TableHead className="font-medium text-gray-700 text-right pr-6">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {professoresFiltrados.map((prof) => (
                                    <TableRow key={prof.id} className="transition-colors hover:bg-gray-50">

                                        {/* Coluna: ID */}
                                        <TableCell className="font-mono text-gray-500 text-sm">
                                            {prof.id}
                                        </TableCell>

                                        {/* Coluna: Avatar + Nome + Disciplina */}
                                        <TableCell className="pl-6">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border border-gray-200">
                                                    <AvatarImage src={prof.avatar || ""} />
                                                    <AvatarFallback className="bg-purple-100 text-purple-700 font-medium">
                                                        {prof.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-gray-900 text-sm">{prof.nome}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                        <BookOpen className="w-3 h-3" />
                                                        {prof.disciplina}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Coluna: Contato */}
                                        <TableCell>
                                            <div className="text-sm text-gray-600">{prof.email}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{prof.telefone || "Sem telefone"}</div>
                                        </TableCell>

                                        {/* Coluna: Status */}
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`font-medium ${
                                                    prof.status === "Ativo"
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : "bg-gray-50 text-gray-600 border-gray-200"
                                                }`}
                                            >
                                                {prof.status}
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
                                                        <ShieldCheck className="w-4 h-4 mr-2 text-gray-500" />
                                                        Gerenciar Turmas
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Key className="w-4 h-4 mr-2 text-gray-500" />
                                                        Gerar nova Senha
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Desativar Professor
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {/* Empty State */}
                                {professoresFiltrados.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-gray-500 bg-white hover:bg-white cursor-default">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search className="w-6 h-6 text-gray-300 mb-2" />
                                                <p>Nenhum professor encontrado.</p>
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