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
import { FeatureTile } from "@/components/ui/FeatureTile";

type Principle = {
  icon: LucideIcon;
  title: string;
  text: string;
  tone: "green" | "yellow" | "red";
};

const principles: Principle[] = [
  {
    icon: EyeOff,
    title: "Privacy",
    text: "The model runs on the device. Your messages don't enter a pipeline, a queue or a log file.",
    tone: "green",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    text: "We say what the app can and can't do. Shipped features and roadmap are clearly separated.",
    tone: "yellow",
  },
  {
    icon: Sparkles,
    title: "Explainable decisions",
    text: "Every verdict shows the signals behind it, no unchecked authority, no black box.",
    tone: "red",
  },
  {
    icon: BookOpen,
    title: "User education",
    text: "Beyond blocking, the app teaches the patterns so users can spot the same threats unaided.",
    tone: "green",
  },
  {
    icon: Scale,
    title: "Public awareness",
    text: "Camtinel doubles as an educational tool for how modern AI-driven attacks actually work.",
    tone: "yellow",
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="h-full">
              <FeatureTile
                icon={p.icon}
                title={p.title}
                text={p.text}
                badge={`Principle ${String(i + 1).padStart(2, "0")}`}
                tone={p.tone}
                minHeight="min-h-[210px]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
