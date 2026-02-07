"use client";

import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import {
  Send,
  Bot,
  User,
  LogOut,
  Sparkles,
  Menu,
} from "lucide-react";

interface Message {
  role: string;
  content: string;
}

export default function Chat({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.map((m: Message) => ({ role: m.role, content: m.content }))
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });

    const data = await res.json();
    setMessages((m) => [...m, { role: "assistant", content: data.text }]);
    setLoading(false);
  };

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300`}
      >
        {/* TOP FIXED HEADER */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Sparkles className="text-indigo-400 shrink-0" />
            {sidebarOpen && (
              <span className="font-semibold tracking-wide whitespace-nowrap">
                 AI
              </span>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-slate-800 shrink-0"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* CENTER CONTENT */}
        {sidebarOpen && (
          <div className="flex-1 px-4 py-6 text-sm text-slate-400">
            AI assistant 
          </div>
        )}

        {/* BOTTOM-LOCKED LOGOUT */}
        <div className="mt-auto p-4">
          <button
            onClick={() => signOut()}
            className={`w-full flex items-center ${
              sidebarOpen ? "justify-start gap-2 px-4" : "justify-center"
            } py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-sm`}
          >
            <LogOut className="w-4 h-4 text-red-400 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 px-8 flex items-center border-b border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-400">Conversation</h2>
        </header>

        <section className="flex-1 overflow-y-auto px-8 py-10 space-y-8">
          {messages.map((m: Message, i: number) => (
            <div
              key={i}
              className={`flex gap-4 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[60%] px-5 py-4 rounded-xl text-sm leading-relaxed border ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-slate-800 border-slate-700 text-slate-200"
                }`}
              >
                {m.content}
              </div>

              {m.role === "user" && (
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-800 border border-slate-700 px-5 py-4 rounded-xl">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </section>

        <footer className="px-8 py-6 border-t border-slate-800 bg-slate-900">
          <form onSubmit={onSubmit} className="flex gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask Magpiie AI..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-5 py-4 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-4 rounded-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}
