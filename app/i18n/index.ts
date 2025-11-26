import en from "./en.json";
import cg from "./cg.json";

export const languages = {
  en,
  cg,
};

export type Lang = keyof typeof languages;
