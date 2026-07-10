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
  href: string;
  download?: boolean;
  external?: boolean;
};

const WA_NUMBER = "237676051976";
const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

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
    href: "/camtinel.apk",
    download: true,
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
    href: waLink("Hi Camtinel, I'd like to join the Premium waitlist."),
    external: true,
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
    href: waLink(
      "Hi Camtinel, I'd like to discuss an enterprise partnership.",
    ),
    external: true,
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

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-slate-400 md:text-base">
          Camtinel stays free for every Cameroonian citizen, sustained through
          enterprise partnerships with banks, telecoms and public agencies.
        </p>

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

                <a
                  href={t.href}
                  {...(t.download ? { download: "" } : {})}
                  {...(t.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={cn(
                    "mt-8 w-full",
                    t.highlight ? "btn-primary" : "btn-secondary",
                  )}
                >
                  {t.cta}
                </a>
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
