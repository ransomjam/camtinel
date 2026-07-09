"use client";

import {
  WifiOff,
  Zap,
  EyeOff,
  Timer,
  MapPinned,
  Users,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

type Benefit = { icon: LucideIcon; title: string; text: string };

const benefits: Benefit[] = [
  {
    icon: WifiOff,
    title: "Works without internet",
    text: "Detection runs the same in rural areas, on public Wi-Fi, or with mobile data off.",
  },
  {
    icon: Zap,
    title: "Faster",
    text: "No round-trip to a data centre, analysis completes in a few hundred milliseconds.",
  },
  {
    icon: EyeOff,
    title: "Private",
    text: "Your messages never leave the phone. There's no server to breach and no log to subpoena.",
  },
  {
    icon: Timer,
    title: "Instant feedback",
    text: "Scam decisions are made in seconds. The engine matches that timescale.",
  },
  {
    icon: MapPinned,
    title: "Rural-ready",
    text: "Designed for regions where connectivity is inconsistent or expensive.",
  },
  {
    icon: Users,
    title: "Digital inclusion",
    text: "Every Cameroonian on an Android phone gets the same protection.",
  },
];

export function WhyOffline() {
  return (
    <section id="offline" className="section" aria-labelledby="offline-title">
      <div className="container-page">
        <SectionHeader
          eyebrow="On-device AI"
          title={<span id="offline-title">Why offline changes everything.</span>}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.04}>
              <Card hoverable>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cm-green/10 ring-1 ring-cm-green/25">
                  <b.icon className="h-5 w-5 text-cm-green" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {b.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Card className="mt-6 flex items-start gap-4 border-cm-green/25 bg-cm-green/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cm-green/15 ring-1 ring-cm-green/30">
              <Leaf className="h-5 w-5 text-cm-green" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Responsible by default
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                On-device inference removes an entire category of risk. There's no pipeline to secure, no third party to trust, and no ongoing cloud cost passed down to the user.
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
