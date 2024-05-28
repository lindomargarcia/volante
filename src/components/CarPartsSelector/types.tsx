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
  [SEVERITY_STATUS.CRITICAL]: "#ED553B", // Vermelho
  [SEVERITY_STATUS.SEVERE]: "#F6952F", // Laranja
  [SEVERITY_STATUS.MODERATE]: "#FFB800", // Amarelo
  [SEVERITY_STATUS.MINOR]: "#029cdf", // Azul
  [SEVERITY_STATUS.NEGLIGIBLE]: "#9cdf02", // Verde
};

export enum CAR_ACTIONS {
  DAMAGE = "damage",
  PAINT = "painting",
  POLISH = "polishing",
  FIX = "fixing",
}

export interface ICarAction {
  value: CAR_ACTIONS;
  option?: CAR_ACTIONS | SEVERITY_STATUS;
}

export interface IDamage {
  severity: SEVERITY_STATUS;
  car_parts: CAR_PARTS[];
}

export const DEFAULT_SELECTION = {
  [CAR_ACTIONS.DAMAGE]: [],
  painting: {
    type: "tricolt",
    car_parts: [],
  },
  polishing: {
    type: "basic",
    car_parts: [],
  },
};
