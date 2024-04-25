"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { useSessionContext } from "./context/SessionContext";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";

type AddSessionProps = {
  setOpen: (v: boolean) => void;
  open: boolean;
  id?: number;
  title?: string;
  description?: string;
  start: Date;
  end: Date;
};

const AddSession = ({
  open,
  setOpen,
  id = -1,
  title = "",
  description = "",
  start,
  end,
}: AddSessionProps) => {
  const [sessionName, setSessionName] = useState(title);
  const [sessionDescription, setSessionDescription] = useState(description);
  const { sessions, addSession } = useSessionContext();

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = {
      id,
      title: sessionName,
      description: sessionDescription,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    addSession(newSession);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Session {sessions?.length + 1}</DialogTitle>
          <DialogDescription>
            Save your session and keep track of it
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleClose(e)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                onChange={(e) => setSessionName(e.target.value)}
                value={sessionName}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="username" className="text-right mt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Duration
              </Label>
              <Label className="text-left">
                {start ? format(start, "hh:mm") : "Not set"} -{" "}
                {end ? format(end, "hh:mm") : "Not set"}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSession;
