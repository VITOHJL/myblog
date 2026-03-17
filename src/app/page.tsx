"use client";

import { useRef } from "react";
import { useFullpageSections, useNotesBrowser } from "./home/hooks";
import { AboutSection, HomeSection, NotesSection, WorksSection } from "./home/sections";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const notesListRef = useRef<HTMLDivElement>(null);

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
