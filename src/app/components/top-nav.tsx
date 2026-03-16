"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#home", label: "首页", id: "home" },
  { href: "#works", label: "作品", id: "works" },
  { href: "#about-page", label: "了解我", id: "about-page" },
  { href: "#notes", label: "随笔", id: "notes" },
] as const;

function normalizeHash(hash: string) {
  return hash.replace("#", "") || "home";
}

export default function TopNav() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const updateActiveFromHash = () => {
      setActiveId(normalizeHash(window.location.hash));
    };

    const updateActiveFromSection = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const nextId = customEvent.detail?.id;

      if (nextId) {
        setActiveId(nextId);
      }
    };

    updateActiveFromHash();
    window.addEventListener("hashchange", updateActiveFromHash);
    window.addEventListener("sectionchange", updateActiveFromSection);

    return () => {
      window.removeEventListener("hashchange", updateActiveFromHash);
      window.removeEventListener("sectionchange", updateActiveFromSection);
    };
  }, []);

  return (
    <div className="flex flex-1 items-center justify-end gap-20 text-sm font-medium text-slate-500">
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            className={isActive ? "text-sky-600" : "hover:text-slate-900"}
          >
            {item.label}
          </a>
        );
      })}
      <div className="hidden items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-400 shadow-sm sm:flex">
        <span className="mr-2 text-slate-400">⌕</span>
        <span>搜索</span>
      </div>
    </div>
  );
}
