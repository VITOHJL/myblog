"use client";

import { useEffect, useRef, useState } from "react";

function isHomeHash(hash: string) {
  const id = (hash || "#home").replace("#", "") || "home";
  return id === "home";
}

export function GlobalHeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const update = (nextEnabled: boolean) => {
      setEnabled(nextEnabled);
      document.body.classList.toggle("hero-video-on", nextEnabled);
    };

    update(isHomeHash(window.location.hash));

    const onHashChange = () => update(isHomeHash(window.location.hash));

    const onSectionChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const id = customEvent.detail?.id;
      if (!id) return;
      update(id === "home");
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("sectionchange", onSectionChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("sectionchange", onSectionChange);
      document.body.classList.remove("hero-video-on");
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const safeSeekStart = () => {
      // 避免某些浏览器在 loop 回到 0 的瞬间闪一下：跳过 0 帧
      if (Number.isFinite(video.duration) && video.duration > 0.2) {
        video.currentTime = 0.01;
      }
    };

    const onEnded = async () => {
      safeSeekStart();
      try {
        await video.play();
      } catch {
        // ignore autoplay restrictions; video is muted so should be OK
      }
    };

    const onLoadedMetadata = () => {
      safeSeekStart();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`global-hero-video ${enabled ? "opacity-100" : "opacity-0"}`}
    >
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
    </div>
  );
}

