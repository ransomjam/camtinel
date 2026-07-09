"use client";

import { Shield, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const detects = [
  "Phishing SMS and emails",
  "Mobile Money fraud requests",
  "Impersonation attacks",
  "Fraudulent short links",
  "Social engineering",
  "Credential harvesting",
  "Fake prize and lottery bait",
  "Urgency and pressure tactics",
];

export function Solution() {
  return (
    <section id="solution" className="section" aria-labelledby="solution-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-flag opacity-40"
      />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="What we built"
              title={
                <span id="solution-title">
                  A cybersecurity assistant that runs on the phone in your pocket.
                </span>
              }
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#capabilities" className="btn-secondary text-sm">
                See what it does today
              </a>
              <a href="#demo" className="btn-primary text-sm">
                Try live analysis
              </a>
            </div>
          </div>

          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-cm-green/10 via-cm-yellow/5 to-cm-red/10 blur-2xl"
              />
              <Card className="border-white/[0.1] bg-ink-900/60 p-8 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cm-green via-cm-yellow to-cm-red">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      Currently detects
                    </div>
                    <div className="text-base font-semibold text-white">
                      Camtinel AI Engine
                    </div>
                  </div>
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {detects.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 flex-none text-cm-green" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-cm-green/25 bg-cm-green/[0.05] px-4 py-3 text-sm">
                  <span className="text-slate-300">Median analysis time</span>
                  <span className="font-mono text-cm-green">
                    ≈ 300 ms on-device
                  </span>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
