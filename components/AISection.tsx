"use client";

import {
  Fingerprint,
  Lock,
  ShieldCheck,
  Zap,
  Brain,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { cn } from "@/lib/cn";

const trainedFor = [
  "Phishing detection",
  "Scam classification",
  "Brand impersonation",
  "Financial fraud",
  "Social engineering",
  "Credential theft",
];

type CardItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  wide?: boolean;
};

const cards: CardItem[] = [
  {
    icon: Zap,
    title: "Local inference",
    text: "Every analysis runs inside the Android app, nothing is sent to a server.",
  },
  {
    icon: Lock,
    title: "Private by construction",
    text: "Your messages never leave the device. There is nothing to intercept, nothing to leak.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable",
    text: "Verdicts come with the specific signals that triggered them.",
  },
  {
    icon: Fingerprint,
    title: "Locally tuned",
    text: "Trained on Cameroonian bilingual data: MTN, Orange, Mobile Money, +237 numbers, FCFA.",
  },
  {
    icon: Layers,
    title: "Layered detection",
    text: "Combines linguistic analysis, URL heuristics, brand recognition and behavioural signals.",
    wide: true,
  },
];

export function AISection() {
  return (
    <section id="ai" className="section" aria-labelledby="ai-title">
      <div className="container-page">
        <SectionHeader
          eyebrow="The engine"
          title={<span id="ai-title">Meet the Camtinel AI Engine.</span>}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <Reveal>
            <Card className="border-white/[0.1] p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cm-green via-cm-yellow to-cm-red">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">
                    Trained specifically for
                  </div>
                  <div className="text-base font-semibold text-white">
                    Cybersecurity detection
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {trainedFor.map((t) => (
                  <div
                    key={t}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-slate-200"
                  >
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-6">
                <Stat label="Median latency" value="≈ 300 ms" />
                <Stat label="Runs on" value="Android 8+" />
                <Stat label="Network" value="Not needed" />
              </div>
            </Card>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.05}
                className={cn(c.wide && "sm:col-span-2")}
              >
                <Card hoverable>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/10">
                    <c.icon className="h-4 w-4 text-cm-yellow" />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                    {c.text}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
