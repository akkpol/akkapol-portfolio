"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function LiffChatPage() {
    const [liffState, setLiffState] = useState<{
        init: boolean;
        error: string | null;
        profile: any | null;
    }>({
        init: false,
        error: null,
        profile: null,
    });

    useEffect(() => {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

        if (!liffId) {
            setLiffState((prev) => ({ ...prev, error: "LIFF ID is not defined." }));
            return;
        }

        liff
            .init({ liffId })
            .then(() => {
                if (liff.isLoggedIn()) {
                    liff.getProfile().then((profile) => {
                        setLiffState({ init: true, error: null, profile });
                    }).catch(err => {
                        setLiffState({ init: true, error: "Failed to get profile.", profile: null });
                    });
                } else {
                    setLiffState({ init: true, error: null, profile: null });
                    // Optional: liff.login();
                }
            })
            .catch((err: Error) => {
                setLiffState((prev) => ({ ...prev, error: err.message }));
            });
    }, []);

    if (liffState.error) {
        return (
            <div className="flex px-4 items-center justify-center min-h-screen">
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive">
                    <p className="font-bold">LIFF Initialization Error</p>
                    <p className="text-sm">{liffState.error}</p>
                </div>
            </div>
        );
    }

    if (!liffState.init) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="bg-card border-b border-border p-4 sticky top-0 z-10 flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-foreground">AK3 Assistant</h1>
                    <p className="text-xs text-muted-foreground">🟢 Online</p>
                </div>
                {liffState.profile && (
                    <img
                        src={liffState.profile.pictureUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-border"
                    />
                )}
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                        <p className="text-sm">สวัสดีครับคุณ {liffState.profile?.displayName || "ลูกค้า"} 👋</p>
                        <p className="text-sm mt-1">
                            ต้องการให้ AK3 Studio ช่วยตรวจสอบหรือให้คำปรึกษาเรื่องไหน พิมพ์สอบถามได้เลยครับ
                        </p>
                    </div>
                </div>
                {/* Messages placeholder */}
            </main>

            <footer className="p-4 bg-background border-t border-border sticky bottom-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="พิมพ์ข้อความ..."
                        className="flex-1 bg-muted text-foreground border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-full px-4 py-2 outline-none transition-all"
                        disabled
                    />
                    <button
                        className="bg-primary text-primary-foreground p-2 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
                        disabled
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                    </button>
                </div>
            </footer>
        </div>
    );
}
