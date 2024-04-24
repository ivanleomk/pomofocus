"use client";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useTimer } from "./hooks/useTimer";

const PomodoroTimer = () => {
  const {
    secondsLeft,
    isActive,
    intervalType,
    toggleActive,
    resetTimer,
    toggleInterval,
  } = useTimer();
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressValue =
    intervalType === "Work"
      ? (1 - secondsLeft / (25 * 60)) * 100
      : (1 - secondsLeft / (5 * 60)) * 100;
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold">{intervalType} Time</h1>
      <div className="text-4xl font-mono my-2">
        {`${minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}:${seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}`}
      </div>
      <Progress value={progressValue} className="w-full" />
      <div className="flex space-x-4 mt-4">
        <Button onClick={toggleActive}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer}>Reset</Button>
        <Button onClick={toggleInterval}>
          {intervalType === "Work" ? "Switch to Break" : "Switch to Work"}
        </Button>
      </div>
      <div className="mt-2">
        {isActive && <Bell className="h-6 w-6 animate-pulse" />}
      </div>
    </div>
  );
};

export default PomodoroTimer;
