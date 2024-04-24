"use client";
import { useState, useEffect } from "react";

import { z } from "zod";

export const useLocalStorage = <T extends unknown>(
  storageKey: string,
  schema: z.ZodType<T>,
  fallbackState: T
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(fallbackState);

  const saveValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(storageKey, JSON.stringify(newValue));
  };

  const handleStorageChange = (event: StorageEvent) => {
    console.log(event);
    if (event.key === storageKey && event.newValue !== null) {
      try {
        const parsedItem = JSON.parse(event.newValue);
        const validatedItem = schema.parse(parsedItem);
        setValue(validatedItem);
      } catch (error) {
        console.error("Failed to parse updated localStorage item:", error);
      }
    }
  };

  const initializeValue = () => {
    const item = localStorage.getItem(storageKey);
    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        const validatedItem = schema.parse(parsedItem);
        return validatedItem;
      } catch (error) {
        console.error("Failed to parse localStorage item on init:", error);
      }
    }
    return fallbackState;
  };

  useEffect(() => {
    setValue(initializeValue());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return [value, saveValue];
};
