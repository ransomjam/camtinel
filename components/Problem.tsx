"use client";

import {
  BadgeAlert,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Fingerprint,
  MailWarning,
  MegaphoneOff,
  MessageSquareWarning,
  SmartphoneNfc,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type Tone = "red" | "yellow" | "green";
type Threat = { icon: LucideIcon; title: string; text: string; tone: Tone };

const threats: Threat[] = [
  {
    icon: MessageSquareWarning,
    title: "Phishing SMS",
    text: "AI-generated messages imitating trusted senders to harvest credentials.",
    tone: "red",
  },
  {
    icon: SmartphoneNfc,
    title: "Mobile Money fraud",
    text: "Fake MTN and Orange Money requests targeting unsuspecting subscribers.",
    tone: "yellow",
  },
  {
    icon: MailWarning,
    title: "Fraudulent emails",
    text: "Convincing fake bank notifications and account-verification traps.",
    tone: "red",
  },
  {
    icon: MegaphoneOff,
    title: "Fake announcements",
    text: "Bogus government and agency broadcasts spread through WhatsApp and SMS.",
    tone: "yellow",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Investment scams",
    text: "Ponzi and crypto schemes promising unrealistic returns.",
    tone: "red",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job scams",
    text: "Fake recruiters harvesting personal data and processing fees.",
    tone: "yellow",
  },
  {
    icon: Fingerprint,
    title: "Identity theft",
    text: "Stolen documents used for financial and account takeover attacks.",
    tone: "red",
  },
  {
    icon: Building2,
    title: "Brand impersonation",
    text: "Copycat sites of banks, telecoms and payment providers.",
    tone: "green",
  },
];

const toneStyles: Record<
  Tone,
  { bar: string; chip: string; icon: string; halo: string }
> = {
  red: {
    bar: "bg-cm-red",
    chip: "border-cm-red/30 bg-cm-red/[0.08] text-cm-red",
    icon: "bg-cm-red/10 text-cm-red ring-cm-red/25",
    halo: "from-cm-red/[0.16]",
  },
  yellow: {
    bar: "bg-cm-yellow",
    chip: "border-cm-yellow/30 bg-cm-yellow/[0.08] text-cm-yellow",
    icon: "bg-cm-yellow/10 text-cm-yellow ring-cm-yellow/25",
    halo: "from-cm-yellow/[0.14]",
  },
  green: {
    bar: "bg-cm-green",
    chip: "border-cm-green/30 bg-cm-green/[0.08] text-cm-green",
    icon: "bg-cm-green/10 text-cm-green ring-cm-green/25",
    halo: "from-cm-green/[0.14]",
  },
};

export function Problem() {
  return (
    <section id="problem" className="section" aria-labelledby="problem-title">
      <div className="container-page lg:max-w-[1420px] lg:px-12">
        <SectionHeader
          title={
            <span id="problem-title">
              Cybercrime has never been this easy to run at scale.
            </span>
          }
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-9 lg:gap-y-6 xl:gap-x-10">
          {threats.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.04}>
              <Card
                hoverable
                className="group flex min-h-[270px] overflow-hidden rounded-lg p-0 lg:min-h-[315px]"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 top-0 h-1",
                    toneStyles[t.tone].bar,
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-80",
                    toneStyles[t.tone].halo,
                  )}
                />

                <div className="relative flex flex-1 flex-col p-5 lg:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-lg ring-1 transition-transform duration-300 group-hover:-translate-y-0.5",
                        toneStyles[t.tone].icon,
                      )}
                    >
                      <t.icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider",
                        toneStyles[t.tone].chip,
                      )}
                    >
                      Risk {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className="text-lg font-semibold leading-tight text-white">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {t.text}
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
