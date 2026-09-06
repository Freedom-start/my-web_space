"use client";

import { Code, Mail, MessageCircle, Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { githubUrl, githubHandle, email, wechat } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";

type CopyStatus = "idle" | "copied" | "error";

/** 复制到剪贴板：成功与失败都给出明确反馈（小彩蛋） */
function CopyValue({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1600);
    } catch {
      // 剪贴板不可用（权限/未聚焦）时明确告知用户，不静默吞错
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3200);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group/copy flex min-h-11 items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
      aria-label={`复制${label}`}
      aria-live="polite"
    >
      {status === "copied" ? (
        <>
          <Check size={13} className="text-accent-3" />
          <span className="text-accent-3">copied!</span>
          <Sparkles size={13} className="animate-pulse-dot text-accent-3" />
        </>
      ) : status === "error" ? (
        <span className="text-accent-2">Copy failed — please copy manually.</span>
      ) : (
        <>
          {value}
          <Copy
            size={13}
            className="opacity-0 transition-opacity group-hover/copy:opacity-100"
          />
        </>
      )}
    </button>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pt-36"
    >
      <SectionHeading
        eyebrow="Contact / 05"
        title="Let's build something"
        accent={["build", "something"]}
        align="center"
      />

      <Reveal delay={0.15}>
        <p className="mx-auto mt-6 max-w-md text-center text-[15px] leading-relaxed text-muted sm:text-base">
          无论是项目合作、实习机会，还是单纯想聊聊技术与算法，都欢迎联系我。
        </p>
      </Reveal>

      <Reveal delay={0.25} className="mt-8 flex justify-center">
        <GlowButton href={`mailto:${email}`}>
          Send me a message <Mail size={16} />
        </GlowButton>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
        <Reveal delay={0.1}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="glow-ring group flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
          >
            <Code size={22} className="text-accent transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium">GitHub</span>
            <span className="font-mono text-xs text-muted">{githubHandle}</span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glow-ring group flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
            <Mail size={22} className="text-accent-2 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium">Email</span>
            <CopyValue value={email} label="邮箱" />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="glow-ring group flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
            <MessageCircle size={22} className="text-accent-3 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium">WeChat</span>
            <CopyValue value={wechat} label="微信号" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
