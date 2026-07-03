import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Support() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      type: "user" | "ai" | "professor";
      content: string;
      timestamp: Date;
    }>
  >([
    {
      id: "1",
      type: "ai",
      content:
        "Olá! Bem-vindo ao suporte da Theos Academy Brasil. Sou um assistente de IA aqui para ajudar com suas dúvidas sobre os cursos. Como posso ajudá-lo?",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: `Obrigado pela sua pergunta: "${inputValue}". Estou processando sua dúvida. Se precisar de uma resposta mais específica, o professor será notificado para responder manualmente.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCreateTicket = () => {
    if (!subject.trim()) return;

    const ticketMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: subject,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, ticketMessage]);
    setSubject("");
    setShowNewTicket(false);
    setIsLoading(true);

    setTimeout(() => {
      const ticketResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: `Seu chamado foi registrado com sucesso. Ticket #${Math.floor(Math.random() * 10000)}. O professor será notificado e responderá em breve.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, ticketResponse]);
      setIsLoading(false);
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Acesso Restrito</h2>
          <p className="text-purple-300 mb-8">Você precisa estar logado para acessar o suporte.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Fundo cósmico */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/courses">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <MessageCircle className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Voltar aos Cursos</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Conteúdo principal */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Central de Suporte</h1>
              <p className="text-purple-300">Converse com nossa IA ou abra um chamado para o professor</p>
            </div>

            {/* Chat */}
            <Card className="bg-slate-900/50 border-purple-500/30 overflow-hidden flex flex-col h-96 md:h-[600px]">
              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                          : message.type === "professor"
                            ? "bg-green-600/20 border border-green-500/50 text-green-200"
                            : "bg-purple-600/20 border border-purple-500/50 text-purple-200"
                      }`}
                    >
                      {message.type === "professor" && (
                        <div className="flex items-center gap-1 mb-1 text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Professor
                        </div>
                      )}
                      {message.type === "ai" && (
                        <div className="flex items-center gap-1 mb-1 text-xs font-semibold">
                          <MessageCircle className="w-3 h-3" />
                          Assistente IA
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-purple-600/20 border border-purple-500/50 text-purple-200 px-4 py-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-purple-500/20 p-4 space-y-3">
                {!showNewTicket ? (
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Digite sua pergunta..."
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Descreva seu problema em detalhes..."
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400 resize-none h-20"
                      disabled={isLoading}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCreateTicket}
                        disabled={isLoading || !subject.trim()}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                      >
                        Criar Chamado
                      </Button>
                      <Button
                        onClick={() => setShowNewTicket(false)}
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setShowNewTicket(!showNewTicket)}
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {showNewTicket ? "Voltar ao Chat" : "Abrir Chamado para Professor"}
                </Button>
              </div>
            </Card>

            {/* Informações */}
            <Card className="bg-slate-900/50 border-purple-500/30 p-6 mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Como funciona nosso suporte?</h3>
              <ul className="space-y-3 text-purple-200 text-sm">
                <li className="flex gap-3">
                  <MessageCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>IA 24/7:</strong> Faça perguntas e receba respostas instantâneas de nossa inteligência artificial.
                  </span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Escalação Automática:</strong> Se a IA não conseguir resolver, o professor é notificado automaticamente.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Resposta do Professor:</strong> O professor responderá manualmente para dúvidas mais complexas.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
