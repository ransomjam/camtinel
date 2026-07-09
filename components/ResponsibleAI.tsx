"use client";

import {
  EyeOff,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

type Principle = { icon: LucideIcon; title: string; text: string };

const principles: Principle[] = [
  {
    icon: EyeOff,
    title: "Privacy",
    text: "The model runs on the device. Your messages don't enter a pipeline, a queue or a log file.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    text: "We say what the app can and can't do. Shipped features and roadmap are clearly separated.",
  },
  {
    icon: Sparkles,
    title: "Explainable decisions",
    text: "Every verdict shows the signals behind it, no unchecked authority, no black box.",
  },
  {
    icon: BookOpen,
    title: "User education",
    text: "Beyond blocking, the app teaches the patterns so users can spot the same threats unaided.",
  },
  {
    icon: Scale,
    title: "Public awareness",
    text: "Camtinel doubles as an educational tool for how modern AI-driven attacks actually work.",
  },
];

export function ResponsibleAI() {
  return (
    <section
      id="responsible"
      className="section"
      aria-labelledby="responsible-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Responsible AI"
          title={
            <span id="responsible-title">
              The same models that scale attacks can scale defense.
            </span>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <Card hoverable>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cm-green/10 ring-1 ring-cm-green/25">
                  <p.icon className="h-5 w-5 text-cm-green" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                  {p.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
