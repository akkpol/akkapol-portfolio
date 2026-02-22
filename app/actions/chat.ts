"use server";

import { getGeminiModel } from "@/lib/ai/gemini";

export type MessageRole = "user" | "model";

export interface ChatMessage {
    role: MessageRole;
    text: string;
}

export async function generateChatReply(history: ChatMessage[], newMessage: string) {
    try {
        const model = getGeminiModel();

        // Format history for Gemini SDK
        const formattedHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        // Send the new message
        const result = await chat.sendMessage(newMessage);
        const text = result.response.text();

        return { success: true, text };
    } catch (error: any) {
        console.error("Gemini API Error in Server Action:", error);
        return {
            success: false,
            error: error.message?.includes("API_KEY")
                ? "ระบบ AI ยังไม่พร้อมใช้งาน (กรุณาตั้งค่า GEMINI_API_KEY)"
                : "ขออภัยครับ ระบบเกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง"
        };
    }
}
