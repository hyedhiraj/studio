"use client";
import type { ProvideKaizenGuidanceInput, ProvideKaizenGuidanceOutput } from "@/ai/flows/provide-kaizen-guidance";
import { provideKaizenGuidance } from "@/ai/flows/provide-kaizen-guidance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, User, Zap } from "lucide-react";
import { useState, FormEvent, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function ValueStreamMappingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const methodology = "Value Stream Mapping";

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage: Message = { id: Date.now().toString(), text: userInput, sender: "user" };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const input: ProvideKaizenGuidanceInput = {
        kaizenMethodology: methodology,
        userQuestion: userInput,
      };
      const output: ProvideKaizenGuidanceOutput = await provideKaizenGuidance(input);
      
      const aiResponse: Message = { id: (Date.now() + 1).toString(), text: output.guidance, sender: "ai" };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error("Error getting AI guidance:", error);
      toast({
        title: "Error",
        description: "Failed to get AI guidance. Please try again.",
        variant: "destructive",
      });
      const errorResponse: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I encountered an error. Please try again.", sender: "ai" };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Initial AI message
    setMessages([{
      id: "init",
      text: `Welcome to ${methodology}! How can I assist you today? Feel free to ask questions about creating a VSM, identifying waste, or improving flow.`,
      sender: "ai"
    }]);
  }, []);


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center justify-center">
          <Zap className="h-8 w-8 mr-2 text-accent" />
          Value Stream Mapping
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Visualize, analyze, and improve the flow of value to your customers.
        </p>
      </header>

      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>VSM Guidance Chat</CardTitle>
          <CardDescription>Ask questions and get AI-powered guidance for your Value Stream Mapping process.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}>
                  {msg.sender === "ai" && <Bot className="h-6 w-6 text-accent flex-shrink-0" />}
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  {msg.sender === "user" && <User className="h-6 w-6 text-primary-foreground bg-primary rounded-full p-0.5 flex-shrink-0" />}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-end gap-2">
                  <Bot className="h-6 w-6 text-accent flex-shrink-0" />
                  <div className="max-w-[75%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask about Value Stream Mapping..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
