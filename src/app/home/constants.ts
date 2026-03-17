export const SECTION_IDS = ["home", "works", "about-page", "notes"] as const;

export const WHEEL_THRESHOLD = 8;
export const SCROLL_LOCK_MS = 620;

export type SectionId = (typeof SECTION_IDS)[number];
