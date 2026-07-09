"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Play } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { FlagPattern } from "./ui/FlagPattern";

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
              className="h1 mt-3 md:mt-4"
            >
              Cameroon's{" "}
              <span className="green-yellow">offline AI</span> cybersecurity
              assistant.
            </motion.h1>

            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 flex flex-wrap gap-3 md:mt-7"
            >
              <a href="#download" className="btn-primary text-base">
                <Download className="h-4 w-4" />
                Download for Android
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#demo" className="btn-secondary text-base">
                <Play className="h-4 w-4" />
                Try the live demo
              </a>
            </motion.div>

          </div>

          <div className="relative">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
