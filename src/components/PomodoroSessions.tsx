"use client";
import { Trash2 } from "lucide-react";
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
import { useSessionContext } from "./context/SessionContext";

function PomodoroLog() {
  const [filter, setFilter] = useState("");
  const { sessions, deleteSession } = useSessionContext();

  const filteredSessions =
    sessions?.filter((session) =>
      session.description.toLowerCase().includes(filter.toLowerCase())
    ) ?? [];
  return (
    <div className="h-[90vh]">
      <div className="sticky">
        <div className="py-4">
          <Input
            placeholder="Search sessions..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="focus:outline-none focus:ring-0 focus:border-none focus:shadow-none"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 overflow-y-scroll h-full">
        {filteredSessions
          .sort(
            (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
          )
          .map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>
                  {session.title.length > 0
                    ? session.title
                    : `Session ${session.id}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{session.description}</CardDescription>
                <p className="text-sm mt-2">
                  Completed on:{" "}
                  {new Date(session.end).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
              <CardFooter>
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
        <div className="py-10"></div> {/* Placeholder for the last element */}
      </div>
    </div>
  );
}

export default PomodoroLog;
