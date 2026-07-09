"use client";

import {
  BadgeCheck,
  CircleGauge,
  CloudOff,
  FileSearch,
  Languages,
  MapPinned,
  MessageSquareText,
  ScanSearch,
  ShieldCheck,
  SmartphoneNfc,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type Tone = "green" | "yellow" | "red";
type Item = {
  icon: LucideIcon;
  title: string;
  text: string;
  metric: string;
  tone: Tone;
};

const items: Item[] = [
  {
    icon: CloudOff,
    title: "On-device detection",
    text: "The full detection model runs locally. Your messages don't leave the phone.",
    metric: "Private",
    tone: "green",
  },
  {
    icon: MessageSquareText,
    title: "SMS protection",
    text: "Analyzes text messages, short links and short codes against known fraud patterns.",
    metric: "SMS",
    tone: "yellow",
  },
  {
    icon: FileSearch,
    title: "Email analysis",
    text: "Paste any suspicious email to get a full breakdown of the signals it triggers.",
    metric: "Email",
    tone: "red",
  },
  {
    icon: ShieldCheck,
    title: "Brand impersonation",
    text: "Recognizes fake MTN, Orange, Afriland, BICEC and government-branded content.",
    metric: "Brands",
    tone: "green",
  },
  {
    icon: CircleGauge,
    title: "Calibrated risk score",
    text: "Every message gets a 0 to 100 score so users act on evidence, not intuition.",
    metric: "0-100",
    tone: "yellow",
  },
  {
    icon: ScanSearch,
    title: "Explainable output",
    text: "Each verdict lists the exact signals, from urgency to credential requests.",
    metric: "Signals",
    tone: "red",
  },
  {
    icon: Languages,
    title: "English and French",
    text: "Trained on Cameroonian bilingual data, including code-switched messages.",
    metric: "EN / FR",
    tone: "green",
  },
  {
    icon: MapPinned,
    title: "Local intelligence",
    text: "Tuned to local telecoms, currencies, phone-number formats and scam narratives.",
    metric: "+237",
    tone: "yellow",
  },
  {
    icon: SmartphoneNfc,
    title: "Android application",
    text: "Native Android app, battery-friendly, ships on mid-range devices.",
    metric: "Android",
    tone: "green",
  },
];

const toneStyles: Record<
  Tone,
  { bar: string; chip: string; icon: string; wash: string }
> = {
  green: {
    bar: "bg-cm-green",
    chip: "border-cm-green/30 bg-cm-green/[0.08] text-cm-green",
    icon: "bg-cm-green/10 text-cm-green ring-cm-green/25",
    wash: "from-cm-green/[0.14]",
  },
  yellow: {
    bar: "bg-cm-yellow",
    chip: "border-cm-yellow/30 bg-cm-yellow/[0.08] text-cm-yellow",
    icon: "bg-cm-yellow/10 text-cm-yellow ring-cm-yellow/25",
    wash: "from-cm-yellow/[0.14]",
  },
  red: {
    bar: "bg-cm-red",
    chip: "border-cm-red/30 bg-cm-red/[0.08] text-cm-red",
    icon: "bg-cm-red/10 text-cm-red ring-cm-red/25",
    wash: "from-cm-red/[0.14]",
  },
};

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="section"
      aria-labelledby="capabilities-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Shipped - v1.2"
          title={
            <span id="capabilities-title">What Camtinel does today.</span>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.04}>
              <Card
                hoverable
                className="group flex min-h-[210px] overflow-hidden rounded-lg p-0"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 top-0 h-[2px]",
                    toneStyles[it.tone].bar,
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-gradient-to-br to-transparent blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-70",
                    toneStyles[it.tone].wash,
                  )}
                />

                <div className="relative flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg ring-1 transition-transform duration-300 group-hover:-translate-y-0.5",
                        toneStyles[it.tone].icon,
                      )}
                    >
                      <it.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-cm-green/30 bg-cm-green/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cm-green">
                      <BadgeCheck className="h-2.5 w-2.5" strokeWidth={2.2} />
                      Live
                    </span>
                  </div>

                  <div className="mt-5">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                        toneStyles[it.tone].chip,
                      )}
                    >
                      {it.metric}
                    </span>
                    <h3 className="mt-2.5 text-[15px] font-medium leading-snug text-white">
                      {it.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                      {it.text}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
