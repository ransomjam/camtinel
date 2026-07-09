"use client";

import {
  MessageCircle,
  Send,
  Globe,
  QrCode,
  Mic,
  Video,
  Cloud,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

type Item = {
  icon: LucideIcon;
  title: string;
  text: string;
  quarter: string;
};

const items: Item[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp protection",
    text: "Analyze forwarded messages and detect fake broadcasts in-thread.",
    quarter: "Q3 2026",
  },
  {
    icon: Send,
    title: "Telegram protection",
    text: "Bot and channel-level scanning for phishing and impersonation.",
    quarter: "Q4 2026",
  },
  {
    icon: Globe,
    title: "Browser protection",
    text: "Real-time URL analysis when opening links from any app.",
    quarter: "Q4 2026",
  },
  {
    icon: QrCode,
    title: "QR code scanner",
    text: "Verify QR destinations before you hand over money.",
    quarter: "Q1 2027",
  },
  {
    icon: Mic,
    title: "Voice scam detection",
    text: "Live-call analysis for vishing and impersonation calls.",
    quarter: "2027",
  },
  {
    icon: Video,
    title: "Deepfake detection",
    text: "Flag AI-generated audio and video shared through messaging apps.",
    quarter: "2027",
  },
  {
    icon: Cloud,
    title: "Threat intelligence",
    text: "Opt-in shared telemetry for faster nation-wide response.",
    quarter: "2027",
  },
  {
    icon: LayoutDashboard,
    title: "Enterprise dashboard",
    text: "Central console for banks, telecoms and government agencies.",
    quarter: "2027",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="container-page">
        <SectionHeader
          eyebrow="Roadmap"
          title={<span id="roadmap-title">What's coming next.</span>}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.04}>
              <Card variant="dashed">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] ring-1 ring-white/10">
                    <it.icon className="h-4 w-4 text-slate-300" />
                  </div>
                  <span className="rounded-full border border-cm-yellow/25 bg-cm-yellow/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cm-yellow">
                    {it.quarter}
                  </span>
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                  {it.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
