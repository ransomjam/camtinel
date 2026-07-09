"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#capabilities", label: "Product" },
  { href: "#ai", label: "AI Engine" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded"
          aria-label="Camtinel home"
        >
          <Logo className="h-7 w-7" />
          <span
            className="text-[16px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Cam<span className="text-cm-green">tinel</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#demo" className="btn-secondary text-sm">
            Try demo
          </a>
          <a href="#download" className="btn-primary text-sm">
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>

        <button
          type="button"
          className="rounded p-1 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 text-sm"
            >
              <Download className="h-4 w-4" />
              Download APK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
