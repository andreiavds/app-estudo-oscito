"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  Award,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  Stethoscope,
  Syringe,
  Users,
  Zap,
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  Target,
  BarChart3,
  GraduationCap,
  Microscope,
  Baby,
  UserCog,
  Eye,
  Ear,
  Droplet,
  AlertCircle,
  CheckSquare,
  Info,
} from "lucide-react";
import { useProgresso } from "@/hooks/useProgresso";
import { useSessaoUnica } from "@/hooks/useSessaoUnica";
import { semestreData } from "@/lib/data/semestres";

export default function Home() {
  const [semestreSelecionado, setSemestreSelecionado] = useState<number | null>(null);
  const [topicoSelecionado, setTopicoSelecionado] = useState<number | null>(null);
  const [visualizacao, setVisualizacao] = useState<"dashboard" | "semestres">("dashboard");
  
  const { progresso, loading, toggleItem, isItemChecked } = useProgresso(semestreSelecionado || undefined);
  const { estabelecerSessao } = useSessaoUnica();

  useEffect(() => {
    estabelecerSessao();
  }, [estabelecerSessao]);

  // Calcular estatísticas gerais
  const progressoMedio = Math.round(
    semestreData.reduce((acc, s) => acc + s.progresso, 0) / semestreData.length
  );
  const totalHoras = semestreData.reduce((acc, s) => acc + s.horasEstudo, 0);
  const totalAtividadesConcluidas = semestreData.reduce((acc, s) => acc + s.atividadesConcluidas, 0);
  const totalAtividades = semestreData.reduce((acc, s) => acc + s.totalAtividades, 0);

  // Visualização de tópico detalhado
  if (semestreSelecionado !== null && topicoSelecionado !== null) {
    const semestre = semestreData.find((s) => s.semestre === semestreSelecionado);
    if (!semestre) return null;

    const topico = semestre.conteudos[topicoSelecionado];
    if (!topico) return null;

    return (
      <div className="min-h-screen bg-black">
        <header className="border-b border-green-900/30 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTopicoSelecionado(null)}
                className="gap-2 text-green-400 hover:text-green-300 hover:bg-green-950"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-green-400">{topico.topico}</h1>
                <p className="text-sm text-green-600">{semestre.periodo}</p>
              </div>
              <Badge className="bg-green-900/50 text-green-400 border-green-700">
                {topico.categoria}
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-8">
              {topico.subtopicos.map((subtopico, subIdx) => {
                const subtopicoId = `${topicoSelecionado}-${subIdx}`;
                const checklistItems = subtopico.checklist || [];
                
                return (
                  <Card key={subIdx} className="bg-green-950/30 border-green-900/30">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-400">{subtopico.text}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Contextualização */}
                      {subtopico.contextualizacao && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-400 font-semibold">
                            <Info className="w-5 h-5" />
                            <h3>Contextualização</h3>
                          </div>
                          <p className="text-green-300 text-sm leading-relaxed pl-7">
                            {subtopico.contextualizacao}
                          </p>
                        </div>
                      )}

                      {/* Passo a Passo */}
                      {subtopico.passoAPasso && subtopico.passoAPasso.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-green-400 font-semibold">
                            <CheckSquare className="w-5 h-5" />
                            <h3>Passo a Passo OSCE</h3>
                          </div>
                          <div className="space-y-4 pl-7">
                            {subtopico.passoAPasso.map((passo, passoIdx) => (
                              <div key={passoIdx} className="space-y-2 p-4 rounded-lg bg-green-950/50 border border-green-900/30">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-black font-bold flex items-center justify-center">
                                    {passo.ordem}
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <h4 className="font-semibold text-green-300">{passo.titulo}</h4>
                                    <p className="text-sm text-green-400/80">{passo.descricao}</p>
                                    
                                    {passo.pontosCriticos && passo.pontosCriticos.length > 0 && (
                                      <div className="mt-2 space-y-1">
                                        <p className="text-xs font-semibold text-green-500">Pontos Críticos:</p>
                                        <ul className="text-xs text-green-400/70 space-y-1 pl-4">
                                          {passo.pontosCriticos.map((ponto, idx) => (
                                            <li key={idx} className="list-disc">{ponto}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {passo.errosComuns && passo.errosComuns.length > 0 && (
                                      <div className="mt-2 space-y-1">
                                        <p className="text-xs font-semibold text-red-400">Erros Comuns:</p>
                                        <ul className="text-xs text-red-400/70 space-y-1 pl-4">
                                          {passo.errosComuns.map((erro, idx) => (
                                            <li key={idx} className="list-disc">{erro}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Checklist OSCE */}
                      {checklistItems.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-green-400 font-semibold">
                            <Target className="w-5 h-5" />
                            <h3>Checklist de Pontuação OSCE</h3>
                          </div>
                          <div className="space-y-2 pl-7">
                            {checklistItems.map((item) => {
                              const isChecked = isItemChecked(
                                semestreSelecionado,
                                topicoSelecionado,
                                subtopicoId,
                                item.id
                              );

                              return (
                                <div
                                  key={item.id}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-green-950/50 hover:bg-green-900/30 transition-colors border border-green-900/20"
                                >
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={() => toggleItem(
                                      semestreSelecionado,
                                      topicoSelecionado,
                                      subtopicoId,
                                      item.id
                                    )}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm text-green-300">{item.texto}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                          item.categoria === 'obrigatorio'
                                            ? 'border-red-500 text-red-400'
                                            : item.categoria === 'importante'
                                            ? 'border-yellow-500 text-yellow-400'
                                            : 'border-blue-500 text-blue-400'
                                        }`}
                                      >
                                        {item.categoria}
                                      </Badge>
                                      <span className="text-xs text-green-600">
                                        {item.pontos} {item.pontos === 1 ? 'ponto' : 'pontos'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  // Visualização de semestre
  if (semestreSelecionado !== null) {
    const semestre = semestreData.find((s) => s.semestre === semestreSelecionado);
    if (!semestre) return null;

    return (
      <div className="min-h-screen bg-black">
        <header className="border-b border-green-900/30 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSemestreSelecionado(null)}
                className="gap-2 text-green-400 hover:text-green-300 hover:bg-green-950"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-400">
                    {semestre.semestre}º Semestre
                  </h1>
                  <p className="text-sm text-green-600">{semestre.periodo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-400">{semestre.progresso}%</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-green-950/30 border-green-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Progresso</p>
                    <p className="text-3xl font-bold text-green-400">{semestre.progresso}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <Progress value={semestre.progresso} className="h-2 mt-4 bg-green-950" />
              </CardContent>
            </Card>

            <Card className="bg-green-950/30 border-green-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Horas de Estudo</p>
                    <p className="text-3xl font-bold text-green-400">{semestre.horasEstudo}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-950/30 border-green-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Atividades</p>
                    <p className="text-3xl font-bold text-green-400">
                      {semestre.atividadesConcluidas}/{semestre.totalAtividades}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-green-400">
                Tópicos OSCE - {semestre.semestre}º Semestre
              </h2>
              <p className="text-green-600">
                Clique em um tópico para ver o conteúdo completo com passo a passo e checklist
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {semestre.conteudos.map((conteudo, idx) => (
                <Card
                  key={idx}
                  className="bg-green-950/30 border-green-900/30 hover:border-green-600/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-green-900/30"
                  onClick={() => setTopicoSelecionado(idx)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-green-400 mb-2">
                          {conteudo.topico}
                        </CardTitle>
                        <Badge className="bg-green-900/50 text-green-400 border-green-700">
                          {conteudo.categoria}
                        </Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Target className="w-4 h-4" />
                      <span>{conteudo.subtopicos.length} subtópicos</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={semestre.semestre === 1}
              onClick={() => setSemestreSelecionado(semestre.semestre - 1)}
              className="gap-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-black disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
              Semestre Anterior
            </Button>
            <Button
              variant="outline"
              disabled={semestre.semestre === 12}
              onClick={() => setSemestreSelecionado(semestre.semestre + 1)}
              className="gap-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-black disabled:opacity-30"
            >
              Próximo Semestre
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-green-900/30 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-12 h-12 text-green-500" />
              <h1 className="text-6xl font-bold text-green-400">OSCITO</h1>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-black text-sm font-medium">
              <Award className="w-4 h-4" />
              Preparação OSCE Completa
            </div>
            <p className="text-xl text-green-500 max-w-2xl mx-auto font-medium">
              Do 1º Semestre ao Internato
            </p>
            <p className="text-base text-green-600 max-w-2xl mx-auto">
              Todos os conteúdos e temas avaliados em OSCE de Medicina, organizados por
              semestre com material completo e atualizado
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={visualizacao} onValueChange={(v) => setVisualizacao(v as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-green-950/50 border border-green-900/30">
            <TabsTrigger
              value="dashboard"
              className="gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-black"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="semestres"
              className="gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-black"
            >
              <Calendar className="w-4 h-4" />
              Por Semestre
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {visualizacao === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-green-950/30 border-green-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Semestres</p>
                      <p className="text-3xl font-bold text-green-400">12</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-950/30 border-green-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Progresso Médio</p>
                      <p className="text-3xl font-bold text-green-400">{progressoMedio}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-950/30 border-green-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Total de Horas</p>
                      <p className="text-3xl font-bold text-green-400">{totalHoras}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-950/30 border-green-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Atividades</p>
                      <p className="text-3xl font-bold text-green-400">
                        {totalAtividadesConcluidas}/{totalAtividades}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-green-950/30 border-green-900/30">
              <CardHeader>
                <CardTitle className="text-green-400">Progresso por Ciclo</CardTitle>
                <CardDescription className="text-green-600">
                  Acompanhe sua evolução ao longo do curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-green-400">Ciclo Básico (1º-3º)</span>
                      </div>
                      <span className="text-sm font-semibold text-green-400">
                        {Math.round(
                          semestreData
                            .filter((s) => s.semestre <= 3)
                            .reduce((acc, s) => acc + s.progresso, 0) / 3
                        )}%
                      </span>
                    </div>
                    <Progress
                      value={
                        semestreData
                          .filter((s) => s.semestre <= 3)
                          .reduce((acc, s) => acc + s.progresso, 0) / 3
                      }
                      className="h-3 bg-green-950"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-green-400">Ciclo Clínico (4º-8º)</span>
                      </div>
                      <span className="text-sm font-semibold text-green-400">
                        {Math.round(
                          semestreData
                            .filter((s) => s.semestre >= 4 && s.semestre <= 8)
                            .reduce((acc, s) => acc + s.progresso, 0) / 5
                        )}%
                      </span>
                    </div>
                    <Progress
                      value={
                        semestreData
                          .filter((s) => s.semestre >= 4 && s.semestre <= 8)
                          .reduce((acc, s) => acc + s.progresso, 0) / 5
                      }
                      className="h-3 bg-green-950"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-green-400">Internato (9º-12º)</span>
                      </div>
                      <span className="text-sm font-semibold text-green-400">
                        {Math.round(
                          semestreData
                            .filter((s) => s.semestre >= 9)
                            .reduce((acc, s) => acc + s.progresso, 0) / 4
                        )}%
                      </span>
                    </div>
                    <Progress
                      value={
                        semestreData
                          .filter((s) => s.semestre >= 9)
                          .reduce((acc, s) => acc + s.progresso, 0) / 4
                      }
                      className="h-3 bg-green-950"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                Áreas de Conhecimento OSCE
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { nome: "Semiologia", icon: Stethoscope },
                  { nome: "Emergência", icon: Zap },
                  { nome: "Pediatria", icon: Baby },
                  { nome: "Gineco/Obs", icon: Heart },
                  { nome: "Cirurgia", icon: Syringe },
                  { nome: "Neurologia", icon: Brain },
                  { nome: "Psiquiatria", icon: Users },
                  { nome: "Infectologia", icon: Microscope },
                  { nome: "APS", icon: UserCog },
                  { nome: "ORL", icon: Ear },
                  { nome: "Oftalmologia", icon: Eye },
                  { nome: "Urologia", icon: Droplet },
                ].map((area, idx) => {
                  const Icon = area.icon;
                  return (
                    <Card
                      key={idx}
                      className="bg-green-950/30 border-green-900/30 hover:border-green-600/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-green-900/30"
                    >
                      <CardContent className="pt-6 text-center">
                        <Icon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-400">{area.nome}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {visualizacao === "semestres" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-green-400">
                Selecione um Semestre
              </h2>
              <p className="text-green-600">
                Explore os conteúdos OSCE organizados por semestre
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {semestreData.map((semestre) => (
                <Card
                  key={semestre.semestre}
                  className="cursor-pointer hover:shadow-2xl hover:shadow-green-900/50 transition-all duration-300 hover:-translate-y-1 group bg-green-950/30 border-green-900/30 hover:border-green-600/50"
                  onClick={() => setSemestreSelecionado(semestre.semestre)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-8 h-8 text-black" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-green-900/50 text-green-400 border-green-700"
                      >
                        <TrendingUp className="w-3 h-3" />
                        {semestre.progresso}%
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-green-400">
                      {semestre.semestre}º Semestre
                    </CardTitle>
                    <CardDescription className="text-green-600">
                      {semestre.periodo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-green-600">Progresso</span>
                          <span className="font-semibold text-green-400">
                            {semestre.progresso}%
                          </span>
                        </div>
                        <Progress value={semestre.progresso} className="h-2 bg-green-950" />
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-green-900/30">
                        <div className="flex items-center gap-1 text-green-600">
                          <Clock className="w-3 h-3" />
                          <span>{semestre.horasEstudo}h</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <Target className="w-3 h-3" />
                          <span>
                            {semestre.atividadesConcluidas}/{semestre.totalAtividades}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <FileText className="w-3 h-3" />
                          <span>{semestre.conteudos.length} temas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
