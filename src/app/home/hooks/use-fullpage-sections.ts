"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { SCROLL_LOCK_MS, SECTION_IDS, WHEEL_THRESHOLD } from "../constants";
import { clampIndex, getIndexFromHash } from "../utils";

type UseFullpageSectionsOptions = {
  containerRef: RefObject<HTMLDivElement | null>;
  notesListRef: RefObject<HTMLDivElement | null>;
};

type UseFullpageSectionsResult = {
  getParallaxLayerClass: (index: number) => string;
};

export function useFullpageSections({
  containerRef,
  notesListRef,
}: UseFullpageSectionsOptions): UseFullpageSectionsResult {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    return getIndexFromHash(window.location.hash || "#home");
  });
  const previousIndexRef = useRef(activeIndex);
  const lastReportedIndexRef = useRef(activeIndex);
  const scrollLockRef = useRef(false);
  const [motionDirection, setMotionDirection] = useState<1 | -1>(1);
  const [hasPageTransition, setHasPageTransition] = useState(false);
  const notesIndex = SECTION_IDS.indexOf("notes");

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const nextTop = clampIndex(index) * container.clientHeight;
      container.scrollTo({ top: nextTop, behavior });
    },
    [containerRef],
  );

  const getCurrentIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientHeight === 0) {
      return 0;
    }

    return clampIndex(Math.round(container.scrollTop / container.clientHeight));
  }, [containerRef]);

  const emitSectionChange = useCallback((index: number) => {
    const id = SECTION_IDS[index];
    const targetHash = `#${id}`;

    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, "", targetHash);
    }

    window.dispatchEvent(new CustomEvent("sectionchange", { detail: { id } }));
  }, []);

  const scrollToHash = useCallback(
    (hash: string, behavior: ScrollBehavior = "smooth") => {
      const target = hash.replace("#", "");
      const targetIndex = SECTION_IDS.findIndex((id) => id === target);

      if (targetIndex < 0) {
        return;
      }

      scrollToIndex(targetIndex, behavior);
    },
    [scrollToIndex],
  );

  const scrollByDirection = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = getCurrentIndex();
      const nextIndex = clampIndex(currentIndex + direction);

      if (nextIndex === currentIndex) {
        return;
      }

      scrollLockRef.current = true;
      scrollToIndex(nextIndex);

      window.setTimeout(() => {
        scrollLockRef.current = false;
      }, SCROLL_LOCK_MS);
    },
    [getCurrentIndex, scrollToIndex],
  );

  const getParallaxLayerClass = useCallback(
    (index: number) => {
      if (!hasPageTransition || activeIndex !== index) {
        return "";
      }

      return motionDirection === 1
        ? "section-content-enter-up"
        : "section-content-enter-down";
    },
    [activeIndex, hasPageTransition, motionDirection],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        return;
      }

      const notesList = notesListRef.current;
      const currentIndex = getCurrentIndex();
      if (
        currentIndex === notesIndex &&
        notesList &&
        event.target instanceof Node &&
        notesList.contains(event.target)
      ) {
        const canScrollDown =
          event.deltaY > 0 &&
          notesList.scrollTop + notesList.clientHeight < notesList.scrollHeight - 1;
        const canScrollUp = event.deltaY < 0 && notesList.scrollTop > 0;

        if (canScrollDown || canScrollUp) {
          return;
        }
      }

      event.preventDefault();

      if (scrollLockRef.current) {
        return;
      }

      scrollByDirection(event.deltaY > 0 ? 1 : -1);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [containerRef, getCurrentIndex, notesIndex, notesListRef, scrollByDirection]);

  useEffect(() => {
    const initialHash = window.location.hash || "#home";
    const initialIndex = getIndexFromHash(initialHash);
    previousIndexRef.current = initialIndex;
    lastReportedIndexRef.current = initialIndex;
    emitSectionChange(initialIndex);
    scrollToHash(initialHash, "auto");

    const handleHashChange = () => {
      scrollToHash(window.location.hash || "#home", "smooth");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [emitSectionChange, scrollToHash]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onScroll = () => {
      const currentIndex = getCurrentIndex();

      if (currentIndex !== lastReportedIndexRef.current) {
        emitSectionChange(currentIndex);
        lastReportedIndexRef.current = currentIndex;
      }

      if (currentIndex !== previousIndexRef.current) {
        setHasPageTransition(true);
        setMotionDirection(currentIndex > previousIndexRef.current ? 1 : -1);
        setActiveIndex(currentIndex);
        previousIndexRef.current = currentIndex;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, emitSectionChange, getCurrentIndex]);

  useEffect(() => {
    const onResize = () => {
      scrollToIndex(getCurrentIndex(), "auto");
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [getCurrentIndex, scrollToIndex]);

  return { getParallaxLayerClass };
}
