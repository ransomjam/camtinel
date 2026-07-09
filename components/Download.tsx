"use client";

import {
  Download as DownloadIcon,
  Smartphone,
  WifiOff,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FlagPattern } from "./ui/FlagPattern";

const chips: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Smartphone,
    title: "Android APK",
    text: "Sideload directly. Play Store submission is in progress.",
  },
  {
    icon: WifiOff,
    title: "Offline AI",
    text: "The model ships in the app. Zero network round-trips.",
  },
  {
    icon: Sparkles,
    title: "Free for citizens",
    text: "Personal use will never cost anything.",
  },
];

export function Download() {
  return (
    <section id="download" className="section" aria-labelledby="download-title">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 md:p-16">
          <FlagPattern intensity={0.18} />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cm-green/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-cm-yellow/15 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <Reveal>
                <div className="eyebrow">
                  <span className="h-px w-6 bg-cm-green" />
                  Download
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 id="download-title" className="h2 mt-3">
                  Get Camtinel on your phone.
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="/camtinel.apk"
                    download
                    className="btn-primary text-base"
                  >
                    <DownloadIcon className="h-5 w-5" />
                    Download APK
                  </a>
                  <a href="#demo" className="btn-secondary text-base">
                    Try the demo first
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6 sm:grid-cols-4">
                  <MiniStat label="Version" value="1.2.0" />
                  <MiniStat label="Platform" value="Android 8+" />
                  <MiniStat label="Size" value="≈ 148 MB" />
                  <MiniStat label="Price" value="Free beta" />
                </dl>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {chips.map((c, i) => (
                <Reveal key={c.title} delay={0.15 + i * 0.06}>
                  <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur">
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-cm-green/10 ring-1 ring-cm-green/25">
                      <c.icon className="h-4 w-4 text-cm-green" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {c.title}
                      </div>
                      <div className="text-[12px] text-slate-400">{c.text}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}
