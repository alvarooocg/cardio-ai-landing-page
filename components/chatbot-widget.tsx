"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hola, soy tu asistente de salud cardíaca de CardioAI. Puedo ayudarte a interpretar tus datos de BPM, responder preguntas sobre tu salud cardiovascular y darte consejos personalizados. ¿En qué puedo ayudarte hoy?",
    timestamp: new Date(),
  },
]

const mockResponses: Record<string, string> = {
  bpm: "Tu BPM actual de 75 está dentro del rango normal. Sin embargo, basándome en tu perfil (45 años, fumador, hipertensión), te recomiendo mantener un monitoreo constante y seguir las recomendaciones de tu médico.",
  riesgo:
    "Según el análisis de IA, tu riesgo cardiovascular es moderado (35%). Los principales factores son: edad, tabaquismo e hipertensión. La buena noticia es que puedes reducir este riesgo significativamente dejando de fumar y controlando tu presión arterial.",
  fumar:
    "Dejar de fumar es la acción más importante que puedes tomar para tu salud cardíaca. Reducirá tu riesgo cardiovascular en un 50% en los próximos 2 años. ¿Te gustaría que te recomiende recursos para dejar de fumar?",
  hipertension:
    "Para controlar tu hipertensión, te recomiendo: 1) Reducir el consumo de sal a menos de 2g al día, 2) Hacer ejercicio regular, 3) Mantener un peso saludable, 4) Tomar tu medicación según prescripción médica. ¿Necesitas ayuda con alguno de estos puntos?",
  ejercicio:
    "Basándome en tu perfil, te recomiendo comenzar con ejercicio moderado: caminatas de 30 minutos, 5 días a la semana. Esto ayudará a controlar tu presión arterial y reducir tu riesgo cardiovascular. Siempre consulta con tu médico antes de comenzar un nuevo programa de ejercicios.",
  anomalia:
    "La IA detectó una taquicardia el 27 de enero (125 BPM en reposo). Esto puede ser causado por estrés, cafeína o actividad física reciente. Si experimentas palpitaciones frecuentes, dolor en el pecho o mareos, consulta inmediatamente con un médico.",
  default:
    "Entiendo tu pregunta. Basándome en tu perfil de salud (45 años, fumador, hipertensión), es importante que sigas las recomendaciones médicas y mantengas un estilo de vida saludable. ¿Hay algo específico sobre tu salud cardíaca que te preocupe?",
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("riesgo") || lowerMessage.includes("predicción")) {
      return mockResponses.riesgo
    }
    if (lowerMessage.includes("fumar") || lowerMessage.includes("tabaco") || lowerMessage.includes("cigarrillo")) {
      return mockResponses.fumar
    }
    if (lowerMessage.includes("hipertensión") || lowerMessage.includes("presión")) {
      return mockResponses.hipertension
    }
    if (
      lowerMessage.includes("anomalía") ||
      lowerMessage.includes("taquicardia") ||
      lowerMessage.includes("irregular")
    ) {
      return mockResponses.anomalia
    }
    if (lowerMessage.includes("bpm") || lowerMessage.includes("frecuencia")) {
      return mockResponses.bpm
    }
    if (lowerMessage.includes("ejercicio") || lowerMessage.includes("actividad")) {
      return mockResponses.ejercicio
    }

    return mockResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getResponse(inputValue),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Abrir chat asistente</span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] shadow-2xl border-border">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Asistente CardioAI</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                  <CardDescription className="text-xs">En línea</CardDescription>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar chat</span>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {message.timestamp.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted border border-border">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe tu pregunta..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="shrink-0"
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Enviar mensaje</span>
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setInputValue("¿Cuál es mi nivel de riesgo?")}
                >
                  Mi nivel de riesgo
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setInputValue("¿Cómo dejo de fumar?")}
                >
                  Dejar de fumar
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setInputValue("Controlar hipertensión")}
                >
                  Controlar hipertensión
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
