import { CAR_PARTS } from "../CarMesh/types";

export enum SEVERITY_STATUS {
  CRITICAL = "crítico",
  SEVERE = "grave",
  MODERATE = "moderado",
  MINOR = "leve",
  NEGLIGIBLE = "ignorar",
  // TOTALED = "Perda Total"
}

export const SEVERITY_COLORS: Record<SEVERITY_STATUS, string> = {
  [SEVERITY_STATUS.CRITICAL]: "#c92d12", // Vermelho 1 
  [SEVERITY_STATUS.SEVERE]: "#eb4124", // Vermelho 2
  [SEVERITY_STATUS.MODERATE]: "#ef6952", // Laranja
  [SEVERITY_STATUS.MINOR]: "#FFB800", // Amarelo
  [SEVERITY_STATUS.NEGLIGIBLE]: "#029cdf", // Azul
  // [SEVERITY_STATUS.NEGLIGIBLE]: "#9cdf02", // Verde
};

export enum CAR_ACTIONS {
  DAMAGE = "damage",
  PAINT = "paint",
  POLISH = "polish",
  FIX = "fixing",
  RECOVER = "recover",
}

export interface ICarAction {
  value: CAR_ACTIONS;
  option?: string | SEVERITY_STATUS;
}

export interface IDamage {
  severity: SEVERITY_STATUS;
  car_parts: CAR_PARTS[];
}

export const DEFAULT_SELECTION = {
  [CAR_ACTIONS.DAMAGE]: [],
  [CAR_ACTIONS.PAINT]: {
    type: "tricolt",
    car_parts: [],
  },
  [CAR_ACTIONS.RECOVER]: {
    car_parts: [],
  },
};
