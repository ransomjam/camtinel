"use client";

import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Product",
    links: [
      { href: "#capabilities", label: "Capabilities" },
      { href: "#ai", label: "AI Engine" },
      { href: "#explainable", label: "Explainable AI" },
      { href: "#roadmap", label: "Roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#patriotism", label: "About" },
      { href: "#responsible", label: "Responsible AI" },
      { href: "#pricing", label: "Business model" },
      { href: "#download", label: "Download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#demo", label: "Live demo" },
      { href: "#offline", label: "Why offline" },
      { href: "#cameroon", label: "Built for Cameroon" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-flag opacity-40"
      />
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span
                className="text-[16px] font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Cam<span className="text-cm-green">tinel</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {site.tagline}. Protecting citizens against phishing, Mobile Money fraud and AI-powered cyber threats.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/237676051976"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs"
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
            <span>
              © {new Date().getFullYear()} {site.name}.
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300"
              aria-label="Built in Cameroon"
            >
              Built in Cameroon <span aria-hidden>🇨🇲</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cm-green" />
            v{site.version} beta, all systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
