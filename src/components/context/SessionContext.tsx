"use client";
import { PomodoroSession, PomodoroSessionListType } from "@/types/session";
import React, { createContext, useContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import {
  deleteSessionFromDB,
  fetchAllSessionsFromDB,
  insertActionIntoDB,
} from "@/lib/db";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSION_KEY } from "../constants/session";

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
  sessions: initialSessions,
}: {
  children: React.ReactElement;
  sessions: PomodoroSessionListType;
}) => {
  const queryClient = useQueryClient();
  const { data: sessions } = useQuery({
    queryKey: [SESSION_KEY],
    queryFn: () => fetchAllSessionsFromDB(),
    initialData: initialSessions,
  });

  const addSessionMutation = useMutation({
    mutationFn: (session: unknown) => insertActionIntoDB(session),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_KEY],
      });
      toast({
        title: "Session Added",
        description: "The new session has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Add Session",
        description: `Error: ${error.message}`,
      });
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: (sessionId: number) => deleteSessionFromDB(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_KEY],
      });
      toast({
        title: "Session Deleted",
        description: "The new session has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to remove Session",
        description: `Error: ${error.message}`,
      });
    },
  });

  const { toast } = useToast();

  return (
    <SessionContext.Provider
      value={{
        sessions,
        addSession: addSessionMutation.mutate,
        deleteSession: deleteSessionMutation.mutate,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
