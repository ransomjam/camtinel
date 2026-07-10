"use client";

import {
  Download as DownloadIcon,
  Smartphone,
  WifiOff,
  Sparkles,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FlagPattern } from "./ui/FlagPattern";

const installSteps = [
  {
    title: "Uninstall any previous Camtinel first",
    body: "If you installed an earlier build (from Android Studio or a colleague), remove it. Otherwise Android will refuse the new install with \"App not installed\" because the signatures don't match.",
  },
  {
    title: "Allow install from your browser",
    body: "When you tap the APK, Android may ask to allow installs from Chrome or your file manager. Enable it once — you can turn it off after installing.",
  },
  {
    title: "Tap \"Install anyway\" on the Play Protect prompt",
    body: "Camtinel is signed by us but isn't on Play Store yet, so Play Protect shows a warning on first install. Tap \"More details\" then \"Install anyway\".",
  },
];

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
                  <MiniStat value="1.2.0" />
                  <MiniStat value="Android 8+" />
                  <MiniStat value="≈ 9 MB" />
                  <MiniStat value="Free beta" />
                </dl>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-6 rounded-2xl border border-cm-yellow/25 bg-cm-yellow/[0.04] p-5">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-cm-yellow" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-cm-yellow">
                      Install steps
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                    Camtinel installs directly from the APK. Android shows a
                    Play Protect warning on first install because we're not on
                    Play Store yet — this is expected.
                  </p>
                  <ol className="mt-4 space-y-3">
                    {installSteps.map((s, i) => (
                      <li key={s.title} className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cm-yellow/15 text-[11px] font-semibold text-cm-yellow">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium text-white">
                            {s.title}
                          </div>
                          <div className="mt-0.5 text-[12px] leading-relaxed text-slate-400">
                            {s.body}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
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

function MiniStat({ value }: { value: string }) {
  return (
    <div>
      <dd className="text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}
