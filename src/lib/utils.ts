import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseInput(raw: string): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}
