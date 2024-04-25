import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/context/SessionContext";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { PomodoroSession, PomodoroSessionList } from "@/types/session";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Pomofocus",
  description: "A simple pomodoro application that you can use",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  const db = getRequestContext().env.DB;
  const sessionsResponse = await db.prepare("SELECT * FROM sessions").all();
  const sessions = PomodoroSessionList.parse(sessionsResponse.results);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <SessionProvider sessions={sessions}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
