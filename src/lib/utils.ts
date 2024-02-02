import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormat = (value: number, style?:string, currency: string = "BRL") => new Intl.NumberFormat('pt-BR', {
  style,
  currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value)