"use client";
import { PomodoroSession, PomodoroSessionListType } from "@/types/session";
import React, { createContext, useContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { deleteSessionFromDB, insertActionIntoDB } from "@/lib/db";

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
  sessions,
}: {
  children: React.ReactElement;
  sessions: PomodoroSessionListType;
}) => {
  const [currSessions, setSessions] = useState(sessions);
  const { toast } = useToast();

  const addSession = (session: unknown) => {
    insertActionIntoDB(session)
      .then((res) => {
        toast({
          title: "Success!",
          description: "Succesfully updated new session into our db",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Unable to save action into DB",
        });
        console.log(err);
      });
  };

  const deleteSession = (sessionId: number) => {
    deleteSessionFromDB(sessionId)
      .then((res) => {
        toast({
          title: "Success!",
          description: "Succesfully delete session from db",
        });
        setSessions(currSessions.filter((item) => item.id != sessionId));
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Unable to delete session from DB",
        });
        console.log(err);
      });
  };

  return (
    <SessionContext.Provider
      value={{ sessions: currSessions, addSession, deleteSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
