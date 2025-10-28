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
  bpm: "Tu BPM actual de 75 está dentro del rango normal para un adulto en reposo (60-100 BPM). Tu promedio semanal de 73 BPM indica una buena salud cardiovascular. ¿Te gustaría saber más sobre cómo mejorar tu frecuencia cardíaca?",
  elevado:
    "Noté que el 27 de enero registraste un BPM de 95, que está ligeramente elevado. Esto puede ser normal después de ejercicio, estrés o consumo de cafeína. Si experimentas BPM elevado frecuentemente en reposo, te recomiendo consultar con un médico.",
  ejercicio:
    "Para mejorar tu salud cardiovascular, te recomiendo: 1) 150 minutos de ejercicio moderado por semana, 2) Incluir ejercicios aeróbicos como caminar, nadar o ciclismo, 3) Mantener una rutina constante. ¿Quieres que te sugiera un plan de ejercicios personalizado?",
  dieta:
    "Una dieta saludable para el corazón incluye: 1) Frutas y verduras frescas, 2) Granos enteros, 3) Pescado rico en omega-3, 4) Reducir sal y grasas saturadas. ¿Te gustaría recibir recetas saludables para el corazón?",
  sueño:
    "El sueño de calidad es crucial para la salud cardíaca. Te recomiendo: 1) Dormir 7-9 horas por noche, 2) Mantener un horario regular, 3) Evitar pantallas antes de dormir. Un buen descanso puede reducir tu BPM en reposo hasta un 10%.",
  default:
    "Entiendo tu pregunta. Basándome en tus datos recientes, tu salud cardiovascular está en buen estado. Tu BPM promedio de 73 es saludable. ¿Hay algo específico sobre tus mediciones que te gustaría que analice?",
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

    if (lowerMessage.includes("bpm") || lowerMessage.includes("frecuencia")) {
      return mockResponses.bpm
    }
    if (lowerMessage.includes("elevado") || lowerMessage.includes("alto")) {
      return mockResponses.elevado
    }
    if (lowerMessage.includes("ejercicio") || lowerMessage.includes("actividad")) {
      return mockResponses.ejercicio
    }
    if (lowerMessage.includes("dieta") || lowerMessage.includes("comida") || lowerMessage.includes("alimentación")) {
      return mockResponses.dieta
    }
    if (lowerMessage.includes("sueño") || lowerMessage.includes("dormir") || lowerMessage.includes("descanso")) {
      return mockResponses.sueño
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
                  onClick={() => setInputValue("¿Cómo está mi BPM?")}
                >
                  ¿Cómo está mi BPM?
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setInputValue("Consejos de ejercicio")}
                >
                  Consejos de ejercicio
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setInputValue("Dieta saludable")}
                >
                  Dieta saludable
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
