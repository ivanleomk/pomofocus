"use client";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSessions } from "./hooks/useSessions";
import { z } from "zod";
import { useSessionContext } from "./context/SessionContext";

function PomodoroLog() {
  const [filter, setFilter] = useState("");
  const { sessions, deleteSession } = useSessionContext();

  const filteredSessions =
    sessions.filter((session) =>
      session.description.toLowerCase().includes(filter.toLowerCase())
    ) ?? [];
  return (
    <div className="h-[90vh]">
      <div className="sticky top-10">
        <div className="mb-4">
          <Input
            placeholder="Search sessions..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="focus:outline-none focus:ring-0 focus:border-none focus:shadow-none"
          />
        </div>
      </div>
      <div className="py-10" />
      <div className="h-[calc(90vh-4rem)] overflow-y-auto">
        {filteredSessions
          .sort(
            (a, b) =>
              new Date(a.completedAt).getTime() -
              new Date(b.completedAt).getTime()
          )
          .map((session) => (
            <Card key={session.id} className="mb-4">
              <CardHeader>
                <CardTitle>Session {session.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{session.description}</CardDescription>
                <p className="text-sm mt-2">
                  Completed on:{" "}
                  {new Date(session.completedAt).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
              <CardFooter>
                {/* <Button className="mr-2">
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </Button> */}
                <Button
                  onClick={() => {
                    deleteSession(session.id);
                  }}
                  variant="outline"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default PomodoroLog;
