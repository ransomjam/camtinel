"use client";

import { Signal, Phone, Coins, Languages, Radio, Shield, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureTile } from "@/components/ui/FeatureTile";

type LocalSignal = { icon: LucideIcon; label: string; sub: string; tone: "g" | "y" | "r" };

const localSignals: LocalSignal[] = [
  { icon: Signal, label: "MTN", sub: "Cameroon", tone: "y" },
  { icon: Radio, label: "Orange", sub: "Cameroon", tone: "r" },
  { icon: Coins, label: "FCFA", sub: "Currency", tone: "g" },
  { icon: Phone, label: "+237", sub: "Country code", tone: "y" },
  { icon: Languages, label: "EN / FR", sub: "Bilingual", tone: "g" },
  { icon: Shield, label: "Mobile Money", sub: "Fraud patterns", tone: "r" },
];

const toneMap = {
  g: "green",
  y: "yellow",
  r: "red",
} as const;

export function BuiltForCameroon() {
  return (
    <section
      id="cameroon"
      className="section"
      aria-labelledby="cameroon-title"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Built for Cameroon"
              title={
                <span id="cameroon-title">
                  Local context is a detection signal, not decoration.
                </span>
              }
            />

            <ul className="mt-6 space-y-3 text-slate-300">
              <Bullet color="green">
                Recognizes MTN, Orange, Afriland, BICEC, Ecobank, Express Union, Camtel and other local brands used in impersonation attacks.
              </Bullet>
              <Bullet color="yellow">
                Understands Mobile Money flows, from PIN prompts to agent numbers and transaction codes, and how scams abuse them.
              </Bullet>
              <Bullet color="red">
                Handles Cameroonian English, French, and messages that code-switch mid-sentence.
              </Bullet>
              <Bullet color="green">
                Tuned to +237 numbering, FCFA amounts, and local scam narratives (fake ANIF, DGI, MINDEF, MINPOSTEL messages).
              </Bullet>
            </ul>
          </div>

          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-cm-green/10 via-cm-yellow/6 to-cm-red/10 blur-2xl"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {localSignals.map((s) => (
                  <FeatureTile
                    key={s.label}
                    icon={s.icon}
                    title={s.label}
                    text={s.sub}
                    tone={toneMap[s.tone]}
                    compact
                    minHeight="min-h-[130px]"
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Bullet({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "yellow" | "red";
}) {
  const bg = {
    green: "bg-cm-green",
    yellow: "bg-cm-yellow",
    red: "bg-cm-red",
  }[color];
  return (
    <li className="flex gap-3">
      <span aria-hidden className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${bg}`} />
      <span>{children}</span>
    </li>
  );
}
