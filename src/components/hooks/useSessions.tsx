import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

import { z } from "zod";
import { useToast } from "../ui/use-toast";

const PomodoroSession = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  completedAt: z.string().datetime(),
});

export type PomodoroSession = z.infer<typeof PomodoroSession>;

const PomodoroSessionList = z.array(PomodoroSession);
export type PomodoroSessionListType = z.infer<typeof PomodoroSessionList>;

export const useSessions = () => {
  const [sessions, saveSessions] = useLocalStorage<PomodoroSessionListType>(
    "sessions",
    PomodoroSessionList,
    []
  );
  const { toast } = useToast();

  const setSessions = (v: any) => {
    try {
      const parsedSessions = PomodoroSessionList.parse(v);
      saveSessions(parsedSessions);
      toast({
        title: "Success",
        description: "Successfully updated sessions",
      });
    } catch (error) {
      toast({
        title: "Error Encountered",
        description: `Unable to save new session due to ${error}`,
      });
    }
  };

  return { sessions, setSessions };
};
