import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, AlertCircle, CheckCircle2, Clock, Send } from "lucide-react";
import { useState } from "react";

type Ticket = {
  id: number;
  studentName: string;
  subject: string;
  message: string;
  status: string;
  aiResponse: string | null;
  professorResponse: string | null;
  createdAt: string;
  escalated: boolean;
};

export default function AdminSupport() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      studentName: "Maria Silva",
      subject: "Dúvida sobre Cristologia",
      message: "Qual é a diferença entre a natureza divina e humana de Cristo?",
      status: "in_progress_ai",
      aiResponse:
        "A natureza divina de Cristo refere-se à sua divindade como Filho de Deus, enquanto a natureza humana refere-se à sua encarnação como homem.",
      professorResponse: null,
      createdAt: "2 horas atrás",
      escalated: false,
    },
    {
      id: 2,
      studentName: "João Santos",
      subject: "Problema ao acessar aula",
      message: "Não consigo acessar a terceira aula do curso de Teologia.",
      status: "in_progress_professor",
      aiResponse: null,
      professorResponse: "Vou verificar seu acesso. Qual é seu email cadastrado?",
      createdAt: "30 minutos atrás",
      escalated: true,
    },
    {
      id: 3,
      studentName: "Ana Costa",
      subject: "Certificado do curso",
      message: "Como obtenho o certificado após concluir o curso?",
      status: "closed",
      aiResponse:
        "Após concluir 100% do curso, o certificado é automaticamente disponibilizado em sua área de downloads.",
      professorResponse: null,
      createdAt: "1 dia atrás",
      escalated: false,
    },
    {
      id: 4,
      studentName: "Pedro Oliveira",
      subject: "Interpretação de Romanos 3:23",
      message: "Qual é o significado exato de Romanos 3:23 no contexto original?",
      status: "open",
      aiResponse: null,
      professorResponse: null,
      createdAt: "3 horas atrás",
      escalated: false,
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responseText, setResponseText] = useState("");

  const handleRespond = (): void => {
    if (!selectedTicket || !responseText.trim()) return;

    setTickets(
      tickets.map((t: Ticket) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: "closed",
              professorResponse: responseText,
            }
          : t
      )
    );

    setSelectedTicket(null);
    setResponseText("");
  };

  const handleEscalate = (ticketId: number): void => {
    setTickets(
      tickets.map((t: Ticket) =>
        t.id === ticketId
          ? {
              ...t,
              status: "in_progress_professor",
              escalated: true,
            }
          : t
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500/20 text-red-300";
      case "in_progress_ai":
        return "bg-yellow-500/20 text-yellow-300";
      case "in_progress_professor":
        return "bg-blue-500/20 text-blue-300";
      case "closed":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in_progress_ai":
        return <Clock className="w-4 h-4" />;
      case "in_progress_professor":
        return <MessageSquare className="w-4 h-4" />;
      case "closed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Aberto";
      case "in_progress_ai":
        return "IA Respondendo";
      case "in_progress_professor":
        return "Professor Respondendo";
      case "closed":
        return "Fechado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-purple-500/30 p-4">
          <p className="text-purple-400 text-sm mb-1">Total de Chamados</p>
          <p className="text-2xl font-bold text-white">{tickets.length}</p>
        </Card>
        <Card className="bg-slate-900/50 border-purple-500/30 p-4">
          <p className="text-purple-400 text-sm mb-1">Abertos</p>
          <p className="text-2xl font-bold text-red-400">{tickets.filter((t: Ticket) => t.status === "open").length}</p>
        </Card>
        <Card className="bg-slate-900/50 border-purple-500/30 p-4">
          <p className="text-purple-400 text-sm mb-1">Em Progresso</p>
          <p className="text-2xl font-bold text-yellow-400">
            {tickets.filter((t: Ticket) => t.status.includes("in_progress")).length}
          </p>
        </Card>
        <Card className="bg-slate-900/50 border-purple-500/30 p-4">
          <p className="text-purple-400 text-sm mb-1">Fechados</p>
          <p className="text-2xl font-bold text-green-400">{tickets.filter((t: Ticket) => t.status === "closed").length}</p>
        </Card>
      </div>

      {/* Lista de Chamados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {tickets.map((ticket: Ticket) => (
            <Card
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`bg-slate-900/50 border-purple-500/30 p-4 cursor-pointer transition hover:border-cyan-400/50 ${
                selectedTicket?.id === ticket.id ? "border-cyan-400 bg-slate-900/70" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-bold">{ticket.subject}</h4>
                  <p className="text-purple-300 text-sm">De: {ticket.studentName}</p>
                </div>
                <Badge className={`${getStatusColor(ticket.status)} border-0 flex items-center gap-1`}>
                  {getStatusIcon(ticket.status)}
                  {getStatusLabel(ticket.status)}
                </Badge>
              </div>

              <p className="text-purple-200 text-sm mb-2 line-clamp-2">{ticket.message}</p>

              <p className="text-purple-400 text-xs">{ticket.createdAt}</p>
            </Card>
          ))}
        </div>

        {/* Detalhes do Chamado */}
        {selectedTicket && (
          <Card className="bg-slate-900/50 border-purple-500/30 p-6 sticky top-24 h-fit overflow-y-auto max-h-[calc(100vh-150px)]">
            <h3 className="text-xl font-bold text-white mb-4">Detalhes do Chamado</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-purple-400 text-sm mb-1">Assunto</p>
                <p className="text-white font-semibold">{selectedTicket.subject}</p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Aluno</p>
                <p className="text-white font-semibold">{selectedTicket.studentName}</p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Status</p>
                <Badge className={`${getStatusColor(selectedTicket.status)} border-0 flex items-center gap-1 w-fit`}>
                  {getStatusIcon(selectedTicket.status)}
                  {getStatusLabel(selectedTicket.status)}
                </Badge>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Mensagem</p>
                <p className="text-white text-sm bg-slate-800/50 p-3 rounded">{selectedTicket.message}</p>
              </div>

              {selectedTicket.aiResponse && (
                <div>
                  <p className="text-purple-400 text-sm mb-1">Resposta da IA</p>
                  <p className="text-white text-sm bg-slate-800/50 p-3 rounded border border-purple-500/20">
                    {selectedTicket.aiResponse}
                  </p>
                </div>
              )}

              {selectedTicket.professorResponse && (
                <div>
                  <p className="text-purple-400 text-sm mb-1">Sua Resposta</p>
                  <p className="text-white text-sm bg-slate-800/50 p-3 rounded border border-green-500/20">
                    {selectedTicket.professorResponse}
                  </p>
                </div>
              )}
            </div>

            {/* Ações */}
            {selectedTicket.status !== "closed" && (
              <div className="space-y-2">
                {selectedTicket.status === "in_progress_ai" && (
                  <Button
                    onClick={() => handleEscalate(selectedTicket.id)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                  >
                    Escalar para Professor
                  </Button>
                )}

                {selectedTicket.status === "open" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                        <Send className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-purple-500/30 text-white">
                      <DialogHeader>
                        <DialogTitle>Responder Chamado</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          placeholder="Digite sua resposta..."
                          className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400 resize-none h-32"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleRespond}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                          >
                            Enviar Resposta
                          </Button>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
                            >
                              Cancelar
                            </Button>
                          </DialogTrigger>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
