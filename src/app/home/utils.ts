import { SECTION_IDS } from "./constants";

export function clampIndex(value: number) {
  return Math.min(Math.max(value, 0), SECTION_IDS.length - 1);
}

export function getIndexFromHash(hash: string) {
  const index = SECTION_IDS.findIndex((id) => id === hash.replace("#", ""));
  return index >= 0 ? index : 0;
}

export function formatDateLabel(date: string) {
  return date.replaceAll("-", ".");
}

export function toDateValue(date: string) {
  return new Date(`${date}T00:00:00`).getTime();
}
