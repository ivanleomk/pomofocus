"use server";

import { PomodoroSession, PomodoroSessionList } from "@/types/session";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const insertActionIntoDB = async (action: unknown) => {
  try {
    const item = PomodoroSession.parse(action);
    const statement = await getRequestContext()
      .env.DB.prepare(
        "INSERT INTO sessions (title, description, start, end) VALUES (?1, ?2,?3,?4)"
      )
      .bind(item.title, item.description, item.start, item.end)
      .all();
    if (statement.error) {
      throw Error(statement.error);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteSessionFromDB = async (sessionId: number) => {
  try {
    const statement = await getRequestContext()
      .env.DB.prepare("DELETE FROM sessions WHERE id = ?1")
      .bind(sessionId)
      .run();
    if (statement.error) {
      throw Error(statement.error);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchAllSessionsFromDB = async () => {
  try {
    const statement = await getRequestContext()
      .env.DB.prepare("SELECT * FROM sessions")
      .all();
    if (statement.error) {
      throw Error(statement.error);
    }
    return PomodoroSessionList.parse(statement.results);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
