"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { DateRange } from "react-day-picker"

import {
  Users,
  CalendarIcon,
  Download,
  Percent,
  AlertTriangle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { format, eachDayOfInterval } from "date-fns"
import { ptBR } from "date-fns/locale"
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

// ── Dados Simulado ─────────────────────────────────────────────────────────
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
export default function ConsultAttendancePage() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("")

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })

  const alunosDaTurma = turmaSelecionada
      ? studentsData.filter((s) => s.turma === turmaSelecionada)
      : []

  const diasNoIntervalo = dateRange?.from && dateRange?.to
      ? eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
      : dateRange?.from ? [dateRange.from] : []

  const totalAulas = diasNoIntervalo.length

  const checkPresenceStatus = (studentId: number, date: Date) => {
    return (studentId + date.getDate()) % 5 !== 0;
  }

  const getRelatorioAluno = (studentId: number) => {
    let presencas = 0
    diasNoIntervalo.forEach((dia) => {
      if (checkPresenceStatus(studentId, dia)) presencas++
    })
    const faltas = totalAulas - presencas
    const frequencia = totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0

    return { presencas, faltas, frequencia }
  }

  const totalTurma = alunosDaTurma.length
  let presencasTotaisTurma = 0
  alunosDaTurma.forEach(aluno => {
    presencasTotaisTurma += getRelatorioAluno(aluno.id).presencas
  })
  const frequenciaMediaTurma = totalTurma > 0 && totalAulas > 0
      ? Math.round((presencasTotaisTurma / (totalTurma * totalAulas)) * 100)
      : 0

  // ── Função de Exportação para PDF ──
  const handleExportPDF = () => {
    if (!turmaSelecionada || alunosDaTurma.length === 0 || !dateRange?.from) return

    const doc = new jsPDF()
    const dataInicioFormatada = format(dateRange.from, "dd/MM/yyyy")
    const dataFimFormatada = dateRange.to ? format(dateRange.to, "dd/MM/yyyy") : dataInicioFormatada

    doc.setFontSize(18)
    doc.text(`Relatório de Frequência - ${turmaSelecionada}`, 14, 22)
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text(`Período: ${dataInicioFormatada} até ${dataFimFormatada} (${totalAulas} dias letivos)`, 14, 30)
    doc.text(`Total de Alunos: ${totalTurma} | Frequência Média: ${frequenciaMediaTurma}%`, 14, 36)

    const tableColumn = ["ID", "Nome do Aluno", "Presenças", "Faltas", "Frequência (%)"]
    const tableRows = alunosDaTurma.map((student) => {
      const relatorio = getRelatorioAluno(student.id)
      return [
        student.id.toString(),
        student.name,
        relatorio.presencas.toString(),
        relatorio.faltas.toString(),
        `${relatorio.frequencia}%`
      ]
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [147, 51, 234] },
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 20 },
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: function(data) {
        if (data.section === 'body' && data.column.index === 4) {
          const rawValue = String(data.cell.raw || "0");
          const valorFrequencia = parseInt(rawValue.replace('%', ''));

          if (valorFrequencia < 70) {
            data.cell.styles.textColor = [185, 28, 28]; // Vermelho
          }
        }
      } // <- Correção: Faltava fechar essa chave antes de fechar o autoTable
    })

    const nomeArquivo = `relatorio-${turmaSelecionada.replace(" ", "-").toLowerCase()}-${format(dateRange.from, "dd-MM")}-a-${format(dateRange.to || dateRange.from, "dd-MM")}.pdf`
    doc.save(nomeArquivo)
  }

  return (
      <DashboardLayout>
        <div className="space-y-8">

          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Consultar Frequência</h1>
              <p className="text-gray-600 mt-1">Visualize o histórico e gere relatórios por período</p>
            </div>
          </div>

          {/* ── Filtros ── */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:max-w-xs">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Turma</label>
              <Select onValueChange={setTurmaSelecionada}>
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

            <div className="w-full sm:max-w-[340px]">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Período Letivo</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd LLL, y", { locale: ptBR })} -{" "}
                              {format(dateRange.to, "dd LLL, y", { locale: ptBR })}
                            </>
                        ) : (
                            format(dateRange.from, "dd LLL, y", { locale: ptBR })
                        )
                    ) : (
                        <span>Selecione um período</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      locale={ptBR}
                      disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* ── Conteúdo da Consulta ── */}
          {turmaSelecionada ? (
              <>
                {/* ── Cards de resumo consolidado ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{totalTurma}</div>
                          <div className="text-sm text-gray-500">Total Alunos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{totalAulas}</div>
                          <div className="text-sm text-gray-500">Dias Avaliados</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <Percent className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{frequenciaMediaTurma}%</div>
                          <div className="text-sm text-gray-500">Frequência Média da Turma</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ── Tabela de Leitura ── */}
                <Card className="border-gray-200 shadow-sm overflow-hidden">
                  <CardHeader className="bg-white border-b border-gray-100 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          Desempenho da {turmaSelecionada}
                        </CardTitle>
                        <CardDescription>
                          Histórico consolidado do período selecionado
                        </CardDescription>
                      </div>
                      <Button
                          variant="outline"
                          className="gap-2 text-sm bg-white hover:bg-gray-50 transition-colors"
                          onClick={handleExportPDF}
                          disabled={totalAulas === 0}
                      >
                        <Download className="w-4 h-4" /> Baixar PDF
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 overflow-x-auto">
                    <Table className="min-w-[600px]">
                      <TableHeader>
                        <TableRow className="bg-gray-50/50 pointer-events-none">
                          <TableHead className="font-medium text-gray-600 pl-6 w-[40%]">Aluno</TableHead>
                          <TableHead className="font-medium text-gray-600 text-center">Presenças</TableHead>
                          <TableHead className="font-medium text-gray-600 text-center">Faltas</TableHead>
                          <TableHead className="font-medium text-gray-600 text-center pr-6">Frequência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alunosDaTurma.map((student) => {
                          const relatorio = getRelatorioAluno(student.id);
                          const isAbaixoMedia = relatorio.frequencia < 70;

                          return (
                              <TableRow key={student.id} className="hover:bg-gray-50 pointer-events-none transition-colors">
                                <TableCell className="pl-6">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8 flex-shrink-0 border border-gray-200">
                                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                                        {student.name.substring(0, 2).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-gray-900">
                                    {student.name}
                                  </span>
                                  </div>
                                </TableCell>

                                <TableCell className="text-center font-medium text-gray-700">
                                  {relatorio.presencas}
                                </TableCell>

                                <TableCell className="text-center font-medium text-gray-700">
                                  {relatorio.faltas}
                                </TableCell>

                                <TableCell className="text-center pr-6">
                                  <Badge
                                      variant="outline"
                                      className={`gap-1.5 w-[70px] justify-center py-1 ${
                                          isAbaixoMedia
                                              ? 'bg-red-50 text-red-700 border-red-200'
                                              : 'bg-green-50 text-green-700 border-green-200'
                                      }`}
                                  >
                                    {isAbaixoMedia && <AlertTriangle className="w-3 h-3" />}
                                    {relatorio.frequencia}%
                                  </Badge>
                                </TableCell>
                              </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
          ) : (
              /* ── Estado vazio ── */
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/30 mt-8">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Selecione uma turma</h3>
                <p className="text-sm text-gray-500">Escolha uma turma nos filtros acima para consultar o histórico.</p>
              </div>
          )}

        </div>
      </DashboardLayout>
  )
}