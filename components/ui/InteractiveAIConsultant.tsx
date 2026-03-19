"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { generateChatReply, ChatMessage } from "@/app/actions/chat";

export default function InteractiveAIConsultant() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "model",
            text: "สวัสดีครับ! ผมคือ AK3 Assistant พัฒนาขึ้นโดยคุณอรรถพล เพื่อเป็นผู้ช่วยให้คำปรึกษาด้าน IT & Business Automation เบื้องต้นครับ คุณมีเป้าหมายในการนำเทคโนโลยีมาใช้กับธุรกิจอย่างไรบ้างครับ?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setIsLoading(true);

        const newMessages: ChatMessage[] = [...messages, { role: "user", text: userMsg }];
        setMessages(newMessages);

        try {
            const response = await generateChatReply(newMessages, userMsg);
            if (response.success && response.text) {
                setMessages([...newMessages, { role: "model", text: response.text }]);
            } else {
                setMessages([...newMessages, { role: "model", text: response.error || "เกิดข้อผิดพลาด" }]);
            }
        } catch (e) {
            setMessages([...newMessages, { role: "model", text: "ขออภัยครับ ระบบเครือข่ายมีปัญหา" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] md:h-[600px] bg-background/80 md:bg-white/80 dark:md:bg-black/80 backdrop-blur-xl border border-border shadow-lg rounded-3xl overflow-hidden relative">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-red-500/10 border-b border-border p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-foreground flex items-center gap-1.5">
                            AK3 Assistant <Sparkles className="w-4 h-4 text-purple-500" />
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium">Powered by Gemini 2.5 Flash</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    Online
                </div>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth z-10"
                role="log"
                aria-live="polite"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
                        >
                            {msg.role === "model" && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                            )}

                            <div
                                className={`max-w-[80%] md:max-w-[70%] px-5 py-3.5 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === "user"
                                    ? "bg-foreground text-background rounded-tr-sm shadow-md"
                                    : "bg-card text-card-foreground border border-border rounded-tl-sm shadow-sm"
                                    }`}
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                {msg.text}
                            </div>

                            {msg.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mt-1">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-start gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-card text-card-foreground border border-border px-5 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                                <span className="text-sm font-medium text-muted-foreground animate-pulse">กำลังวิเคราะห์ข้อมูล...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/50 border-t border-border z-10 backdrop-blur-md">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative flex items-center"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder={isLoading ? "Please wait..." : "พิมพ์ข้อความที่นี่..."}
                        aria-label="พิมพ์ข้อความที่นี่..."
                        className="w-full bg-input text-foreground border border-border rounded-full pl-6 pr-14 py-3.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm placeholder:text-muted-foreground disabled:opacity-60"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        aria-label={isLoading ? "กำลังส่งข้อความ" : "ส่งข้อความ"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 disabled:opacity-50 disabled:hover:bg-foreground transition-all shrink-0"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4 translate-x-px" />
                        )}
                    </button>
                </form>
                <p className="text-center text-[10px] text-muted-foreground mt-3 font-medium">
                    คำตอบจาก AI อาจมีความคลาดเคลื่อน โปรดตรวจสอบข้อมูลและติดต่อคุณอรรถพลเพื่อยืนยันอีกครั้ง
                </p>
            </div>
        </div>
    );
}
