import { z } from "zod";

export const PomodoroSession = z.object({
  id: z.number(),
  title: z.string().default(""),
  description: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
});

export type PomodoroSession = z.infer<typeof PomodoroSession>;

export const PomodoroSessionList = z.array(PomodoroSession);
export type PomodoroSessionListType = z.infer<typeof PomodoroSessionList>;
