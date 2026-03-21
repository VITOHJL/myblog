"use client";

import { useEffect, useRef, useState } from "react";
import { useFullpageSections, useNotesBrowser } from "./home/hooks";
import { AboutSection, HomeSection, NotesSection, WorksSection } from "./home/sections";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const notesListRef = useRef<HTMLDivElement>(null);
  const [notesEnterKey, setNotesEnterKey] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("home");
  const [notesJustEntered, setNotesJustEntered] = useState(false);
  const lastSectionIdRef = useRef<string>("home");

  const { getParallaxLayerClass } = useFullpageSections({
    containerRef,
    notesListRef,
  });

  const {
    activeCategory,
    setActiveCategory,
    categoryItems,
    orderedNotes,
    selectedPost,
    setSelectedPostId,
  } = useNotesBrowser();

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const nextId = customEvent.detail?.id;
      if (!nextId) return;

      if (nextId === "notes" && lastSectionIdRef.current !== "notes") {
        setNotesEnterKey((v) => v + 1);
        setNotesJustEntered(true);
        window.setTimeout(() => setNotesJustEntered(false), 2400);
      }
      setActiveSectionId(nextId);
      lastSectionIdRef.current = nextId;
    };

    window.addEventListener("sectionchange", onSectionChange);
    return () => window.removeEventListener("sectionchange", onSectionChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fullpage-scroll h-full overflow-y-auto overscroll-y-contain snap-y snap-mandatory scroll-smooth"
    >
      <HomeSection animationClass={getParallaxLayerClass(0)} />
      <WorksSection animationClass={getParallaxLayerClass(1)} />
      <AboutSection animationClass={getParallaxLayerClass(2)} />
      <NotesSection
        animationClass={getParallaxLayerClass(3)}
        notesListRef={notesListRef}
        notesEnterKey={notesEnterKey}
        isActive={activeSectionId === "notes"}
        animateLists={notesJustEntered}
        categoryItems={categoryItems}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        orderedNotes={orderedNotes}
        selectedPost={selectedPost}
        onPostSelect={setSelectedPostId}
      />
    </div>
  );
}
