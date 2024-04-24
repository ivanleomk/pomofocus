import { useState, useEffect } from "react";

export type IntervalType = "Work" | "Break";

export const useTimer = (initialState = 25 * 60) => {
  const [secondsLeft, setSecondsLeft] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [intervalType, setIntervalType] = useState<IntervalType>("Work"); // 'Work' or 'Break'
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (!isActive && currentTimeout) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        setSecondsLeft((seconds) => {
          if (seconds === 1) {
            setIsActive(false);
            return intervalType === "Work" ? 5 * 60 : 25 * 60;
          }
          return seconds - 1;
        });
      }, 1000);
      setCurrentTimeout(timeout);
    }
  }, [isActive, secondsLeft, intervalType]);

  const toggleActive = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(intervalType === "Work" ? 25 * 60 : 5 * 60);
  };
  const toggleInterval = () => {
    setIntervalType((prev) => (prev === "Work" ? "Break" : "Work"));
    setSecondsLeft(intervalType === "Work" ? 5 * 60 : 25 * 60);
  };
  return {
    secondsLeft,
    isActive,
    intervalType,
    toggleActive,
    resetTimer,
    toggleInterval,
  };
};