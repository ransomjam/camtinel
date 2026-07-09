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
import { FeatureTile } from "@/components/ui/FeatureTile";

type Item = {
  icon: LucideIcon;
  title: string;
  text: string;
  quarter: string;
  tone: "green" | "yellow" | "red";
};

const items: Item[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp protection",
    text: "Analyze forwarded messages and detect fake broadcasts in-thread.",
    quarter: "Q3 2026",
    tone: "green",
  },
  {
    icon: Send,
    title: "Telegram protection",
    text: "Bot and channel-level scanning for phishing and impersonation.",
    quarter: "Q4 2026",
    tone: "yellow",
  },
  {
    icon: Globe,
    title: "Browser protection",
    text: "Real-time URL analysis when opening links from any app.",
    quarter: "Q4 2026",
    tone: "red",
  },
  {
    icon: QrCode,
    title: "QR code scanner",
    text: "Verify QR destinations before you hand over money.",
    quarter: "Q1 2027",
    tone: "green",
  },
  {
    icon: Mic,
    title: "Voice scam detection",
    text: "Live-call analysis for vishing and impersonation calls.",
    quarter: "2027",
    tone: "yellow",
  },
  {
    icon: Video,
    title: "Deepfake detection",
    text: "Flag AI-generated audio and video shared through messaging apps.",
    quarter: "2027",
    tone: "red",
  },
  {
    icon: Cloud,
    title: "Threat intelligence",
    text: "Opt-in shared telemetry for faster nation-wide response.",
    quarter: "2027",
    tone: "green",
  },
  {
    icon: LayoutDashboard,
    title: "Enterprise dashboard",
    text: "Central console for banks, telecoms and government agencies.",
    quarter: "2027",
    tone: "yellow",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="container-page">
        <SectionHeader
          title={<span id="roadmap-title">What's coming next.</span>}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.04} className="h-full">
              <FeatureTile
                icon={it.icon}
                title={it.title}
                text={it.text}
                badge={it.quarter}
                tone={it.tone}
                variant="dashed"
                minHeight="min-h-[200px]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
