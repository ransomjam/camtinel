"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Play,
  Smartphone,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { FlagPattern } from "./ui/FlagPattern";

const credibilityBadges = [
  { icon: Smartphone, label: "Android Prototype" },
  { icon: WifiOff, label: "Offline AI" },
  { icon: MapPin, label: "Built in Cameroon" },
  { icon: Sparkles, label: "Explainable AI" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-14"
    >
      <FlagPattern intensity={0.22} />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-35" />
        <div
          className="absolute inset-x-0 top-0 h-[640px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(0,165,80,0.20) 0%, rgba(252,209,22,0.08) 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>

            <motion.h1
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="h1"
            >
              <span className="green-yellow">Offline AI</span> protecting
              Cameroonians from cybercrime.
            </motion.h1>

            <motion.p
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
            >
              Built and demonstrated in Cameroon, Camtinel runs fully on your
              Android device to detect phishing, Mobile Money fraud and brand
              impersonation without sending your messages to a server.
            </motion.p>

            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <a href="#download" className="btn-primary text-base">
                <Download className="h-4 w-4" />
                Download Android APK
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#demo" className="btn-secondary text-base">
                <Play className="h-4 w-4" />
                View Live Prototype
              </a>
            </motion.div>

            <motion.ul
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Product credentials"
            >
              {credibilityBadges.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300"
                >
                  <b.icon className="h-3 w-3 text-slate-400" strokeWidth={2} />
                  {b.label}
                </li>
              ))}
            </motion.ul>

          </div>

          <div className="relative">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
