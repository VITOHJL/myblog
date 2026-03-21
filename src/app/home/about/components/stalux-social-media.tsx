"use client";

import { useEffect, useMemo } from "react";
import { animate } from "animejs";
import type { SimpleIcon } from "simple-icons";
import * as simpleIcons from "simple-icons";

type MediaLink = {
  icon: string;
  link: string;
  label?: string;
};

function getIconByTitle(iconName: string): SimpleIcon | undefined {
  const normalizedName = iconName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const iconKey = `si${normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1)}`;
  const direct = (simpleIcons as any)[iconKey] as SimpleIcon | undefined;
  if (direct) return direct;

  // Handle common acronyms / casing-sensitive keys in simple-icons (e.g. siQq)
  const upperAcronymKey = `si${normalizedName.toUpperCase()}`;
  const acronym = (simpleIcons as any)[upperAcronymKey] as SimpleIcon | undefined;
  if (acronym) return acronym;

  // QQ is exported as `siQq` (not `siTencentqq`) in simple-icons
  if (normalizedName === "tencentqq" || normalizedName === "qq") {
    return (simpleIcons as any).siQq as SimpleIcon | undefined;
  }

  return undefined;
}

export function StaluxSocialMedia() {
  const mediaLinks: MediaLink[] = useMemo(
    () => [
      { icon: "github", link: "https://github.com/VITOHJL", label: "GitHub" },
      // TODO: 你给我 B 站主页链接后我再替换
      { icon: "bilibili", link: "https://space.bilibili.com/446780085?spm_id_from=333.1387.0.0", label: "BiliBili" },
      // QQ：使用 Web 方式唤起（比 tencent:// 更安全/兼容；不会触发系统协议弹窗）
      { icon: "qq", link: "https://wpa.qq.com/msgrd?v=3&uin=2336354361&site=qq&menu=yes", label: "QQ" },
      { icon: "maildotru", link: "mailto:2336354360@qq.com", label: "Email" },
    ],
    [],
  );

  useEffect(() => {
    // stalux 原版：循环“弹跳上去 + 回弹落下”并带 rotate
    const animation = animate(".stalux-social-icon", {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: { from: "-1turn", delay: 0 },
      delay: (_: unknown, i: number) => i * 50,
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="stalux-social-links">
      <ul>
        {mediaLinks.map((item) => {
          const icon = item.icon ? getIconByTitle(item.icon) : undefined;
          const isExternal = /^https?:\/\//.test(item.link);
          return (
            <li key={`${item.icon}-${item.link}`} className="stalux-social-icon">
              <a
                href={item.link}
                aria-label={item.label ?? item.icon}
                rel={isExternal ? "noopener noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
                title={item.label ?? item.icon}
              >
                {icon ? (
                  <span className="stalux-icon-container" aria-hidden>
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <title>{icon.title}</title>
                      <path d={icon.path} />
                    </svg>
                  </span>
                ) : (
                  <span className="stalux-custom-icon" aria-hidden>
                    {item.icon ? item.icon.charAt(0).toUpperCase() : ""}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

