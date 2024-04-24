"use client";
import React, { createContext, useContext } from "react";
import { PomodoroSession, useSessions } from "../hooks/useSessions";

interface SessionContextType {
  sessions: PomodoroSession[];
  addSession: (session: unknown) => void;
  deleteSession: (sessionId: number) => void;
}

const SessionContext = createContext<SessionContextType>({
  sessions: [],
  addSession: () => {},
  deleteSession: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { sessions, setSessions } = useSessions();

  const addSession = (session: unknown) => {
    setSessions([...sessions, session]);
  };

  const deleteSession = (sessionId: number) => {
    setSessions(sessions.filter((session) => session.id !== sessionId));
  };

  return (
    <SessionContext.Provider value={{ sessions, addSession, deleteSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
