"use client";

import {
  Users,
  Building,
  TrendingUp,
  Landmark,
  HandCoins,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureTile } from "@/components/ui/FeatureTile";
import { FlagPattern } from "./ui/FlagPattern";

type Pillar = { icon: LucideIcon; title: string; text: string; tone: "g" | "y" | "r" };

const pillars: Pillar[] = [
  {
    icon: Users,
    title: "Safer citizens",
    text: "Each household with Camtinel installed becomes measurably harder to defraud.",
    tone: "g",
  },
  {
    icon: Building,
    title: "Safer businesses",
    text: "SMEs and cooperatives lose less to invoice fraud and impersonation.",
    tone: "y",
  },
  {
    icon: TrendingUp,
    title: "Safer digital economy",
    text: "Trust in digital services is the prerequisite for their adoption at scale.",
    tone: "r",
  },
  {
    icon: HandCoins,
    title: "Trust in Mobile Money",
    text: "Cameroon runs on Mobile Money. Every blocked fraud protects the whole rail.",
    tone: "g",
  },
  {
    icon: Landmark,
    title: "Trust in public services",
    text: "Fewer fake government messages means the real ones actually get read.",
    tone: "y",
  },
];

const toneMap = {
  g: "green",
  y: "yellow",
  r: "red",
} as const;

export function DigitalPatriotism() {
  return (
    <section
      id="patriotism"
      className="section overflow-hidden"
      aria-labelledby="patriotism-title"
    >
      <FlagPattern intensity={0.16} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-flag opacity-40"
      />
      <div className="container-page relative">
        <SectionHeader
          title={
            <span id="patriotism-title">
              Protecting citizens online protects Cameroon's digital future.
            </span>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="h-full">
              <FeatureTile
                icon={p.icon}
                title={p.title}
                text={p.text}
                badge={`Impact ${String(i + 1).padStart(2, "0")}`}
                tone={toneMap[p.tone]}
                minHeight="min-h-[210px]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
