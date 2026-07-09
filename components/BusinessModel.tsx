"use client";

import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Tier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "0 FCFA",
    description: "For every Cameroonian citizen. Always.",
    features: [
      "Offline SMS and message analysis",
      "Risk scoring and explanations",
      "English and French support",
      "Personal use, no ads",
    ],
    cta: "Download APK",
    highlight: false,
  },
  {
    name: "Premium",
    price: "Soon",
    description: "Extra protection layers for power users.",
    features: [
      "WhatsApp and Telegram protection",
      "Browser and QR-code protection",
      "Priority model updates",
      "Family plan (up to 5 devices)",
    ],
    cta: "Join the waitlist",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For banks, telecoms and public agencies.",
    features: [
      "Central threat dashboard",
      "Bulk endpoint deployment",
      "Custom brand-impersonation rules",
      "Developer API access",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export function BusinessModel() {
  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="container-page">
        <SectionHeader
          title={
            <span id="pricing-title">
              Free for citizens. Paid where it belongs.
            </span>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-colors",
                  t.highlight
                    ? "border-cm-green/45 bg-cm-green/[0.05]"
                    : "border-white/[0.08] bg-white/[0.02]",
                )}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-8 rounded-full border border-cm-green/40 bg-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cm-green">
                    Coming next
                  </div>
                )}

                <div className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {t.name}
                </div>
                <div className="mt-2 text-3xl font-bold text-white">
                  {t.price}
                </div>
                <p className="mt-2 text-sm text-slate-400">{t.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-200"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-none text-cm-green" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={cn(
                    "mt-8 w-full",
                    t.highlight ? "btn-primary" : "btn-secondary",
                  )}
                >
                  {t.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Partnership conversations in progress. Telecom, government, banking, developer API.
        </div>
      </div>
    </section>
  );
}
