import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const crackSizes = [
  { name: "Red", color: "bg-red-500", hover: "hover:bg-red-600" },
  { name: "Yellow", color: "bg-yellow-400", hover: "bg-yellow-300" },
  { name: "Blue", color: "bg-blue-600", hover: "bg-blue-700" },
  { name: "Grey", color: "bg-neutral-300", hover: "bg-neutral-400" },
  { name: "Purple", color: "bg-purple-600", hover: "bg-purple-700" },
  { name: "Green", color: "bg-green-600", hover: "bg-green-700" },
]