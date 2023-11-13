import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Kanban Util Functions

export function generateId() {
  return Math.floor(Math.random() * 10001);
}
