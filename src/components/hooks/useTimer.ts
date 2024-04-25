import { useState, useEffect } from "react";

export type IntervalType = "Work" | "Break";

const WorkDuration = 25 * 60;
const BreakDuration = 5 * 60;

export const useTimer = (initialState = WorkDuration) => {
  const [secondsLeft, setSecondsLeft] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [intervalType, setIntervalType] = useState<IntervalType>("Work"); // 'Work' or 'Break'

  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setSecondsLeft((seconds) => {
          if (seconds === 1) {
            setIsActive(false);
            setEnd(new Date());
          }
          return seconds - 1;
        });
      }, 1000);
    }
  }, [isActive, secondsLeft, intervalType]);

  const toggleActive = () => {
    if (!isActive && intervalType == "Work" && secondsLeft == WorkDuration) {
      // We are toggling this to work
      setStart(new Date());
    }
    setIsActive(!isActive);
  };
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(intervalType === "Work" ? WorkDuration : BreakDuration);
  };
  const toggleInterval = () => {
    setIntervalType((prev) => (prev === "Work" ? "Break" : "Work"));
    setSecondsLeft(intervalType === "Work" ? BreakDuration : WorkDuration);
  };
  return {
    start,
    end,
    secondsLeft,
    isActive,
    intervalType,
    toggleActive,
    resetTimer,
    toggleInterval,
  };
};
