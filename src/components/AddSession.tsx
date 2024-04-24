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

type AddSessionProps = {
  setOpen: (v: boolean) => void;
  open: boolean;
};

const AddSession = ({ open, setOpen }: AddSessionProps) => {
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");
  const { sessions, addSession } = useSessionContext();

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = {
      id:
        sessions.length > 0
          ? sessions
              .map((item) => item.id)
              .reduce((prev, curr) => Math.max(curr, prev), 0) + 1
          : 1,
      title: sessionName,
      description: sessionDescription,
      completedAt: new Date().toISOString(),
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                className="col-span-3"
              />
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
