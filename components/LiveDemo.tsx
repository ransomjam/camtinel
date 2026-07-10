"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Pause,
  Play,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { analyze, type AnalysisResult, type Verdict } from "@/lib/analyze";
import { cn } from "@/lib/cn";

type Sample = {
  sender: string;
  channel: string;
  initial: string;
  accent: string;
  onAccent: "black" | "white";
  text: string;
};

const feed: Sample[] = [
  {
    sender: "MTN",
    channel: "SMS",
    initial: "M",
    accent: "#FFCC00",
    onAccent: "black",
    text: "MTN: Vous avez gagné 500,000 FCFA! Retirez votre gain sur https://mtn-cameroon-promo.co en confirmant votre code PIN.",
  },
  {
    sender: "Afriland First Bank",
    channel: "SMS",
    initial: "A",
    accent: "#C8102E",
    onAccent: "white",
    text: "AFRILAND: Tentative de connexion suspecte détectée. Confirmez votre OTP 8492 sous 30 minutes ou votre compte sera suspendu: https://afriland-secure.link/verify",
  },
  {
    sender: "DHL Express",
    channel: "SMS",
    initial: "D",
    accent: "#D40511",
    onAccent: "white",
    text: "DHL: Your parcel #CM4520 is held at Douala customs. Pay 8,500 FCFA within 24h and confirm your card CVV to release: https://dhl-cm-clear.top/pay",
  },
  {
    sender: "Orange Money",
    channel: "SMS",
    initial: "O",
    accent: "#FF7900",
    onAccent: "white",
    text: "Orange: Confirmez votre PIN pour débloquer votre compte MoMo dans les 24h ou il sera fermé définitivement: https://orange-verify.online/unlock",
  },
];

// Faster cadence per message.
const T_ANALYZING = 500;
const T_VERDICT = 1200;
const T_NEXT = 4200;

type Phase = "incoming" | "analyzing" | "verdict";

const verdictStyle: Record<
  Verdict,
  {
    color: string;
    ring: string;
    bg: string;
    bar: string;
    label: string;
    icon: typeof AlertTriangle;
    dot: string;
  }
> = {
  high: {
    color: "text-cm-red",
    ring: "ring-cm-red/30",
    bg: "bg-cm-red/[0.08]",
    bar: "bg-cm-red",
    label: "High risk",
    icon: AlertTriangle,
    dot: "bg-cm-red",
  },
  medium: {
    color: "text-cm-yellow",
    ring: "ring-cm-yellow/30",
    bg: "bg-cm-yellow/[0.08]",
    bar: "bg-cm-yellow",
    label: "Suspicious",
    icon: AlertTriangle,
    dot: "bg-cm-yellow",
  },
  safe: {
    color: "text-cm-green",
    ring: "ring-cm-green/30",
    bg: "bg-cm-green/[0.08]",
    bar: "bg-cm-green",
    label: "Likely safe",
    icon: ShieldCheck,
    dot: "bg-cm-green",
  },
};

export function LiveDemo() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("incoming");
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timers = useRef<number[]>([]);

  const current = feed[index];
  const result = useMemo<AnalysisResult>(() => analyze(current.text), [current]);

  useEffect(() => {
    if (paused) return;

    setPhase("incoming");
    const clearAll = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };

    const t1 = window.setTimeout(() => setPhase("analyzing"), T_ANALYZING);
    const t2 = window.setTimeout(() => setPhase("verdict"), T_VERDICT);
    const t3 = window.setTimeout(
      () => setIndex((i) => (i + 1) % feed.length),
      T_NEXT,
    );
    timers.current = [t1, t2, t3];

    return clearAll;
  }, [index, paused]);

  return (
    <section id="demo" className="section" aria-labelledby="demo-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-flag opacity-40"
      />
      <div className="container-page">
        <SectionHeader
          title={
            <span id="demo-title">
              Watch the engine catch scams in real time.
            </span>
          }
        />

        <div className="mt-8 grid gap-4 md:gap-6 lg:mt-10 lg:grid-cols-2">
          {/* Incoming feed — SMS-style */}
          <Card className="relative border-white/[0.1] p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full rounded-full opacity-75",
                      paused ? "bg-slate-500" : "bg-cm-green animate-ping",
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex h-2 w-2 rounded-full",
                      paused ? "bg-slate-500" : "bg-cm-green",
                    )}
                  />
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400">
                  {paused ? "Paused" : "Live feed"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06]"
                aria-label={paused ? "Resume feed" : "Pause feed"}
              >
                {paused ? (
                  <>
                    <Play className="h-3 w-3" /> Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-3 w-3" /> Pause
                  </>
                )}
              </button>
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* Conversation header */}
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-semibold shadow-sm"
                      style={{
                        backgroundColor: current.accent,
                        color: current.onAccent === "black" ? "#0A0C18" : "#fff",
                      }}
                    >
                      {current.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[14px] font-semibold text-white">
                          {current.sender}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-slate-400">
                          {current.channel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Unknown sender · just now
                      </div>
                    </div>
                  </div>

                  {/* SMS bubble */}
                  <div className="mt-3 flex">
                    <div className="max-w-[95%] rounded-[18px] rounded-tl-md bg-[#1E2235] px-4 py-3 text-[13.5px] leading-relaxed text-slate-100 shadow-sm ring-1 ring-white/[0.04]">
                      {current.text}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="mt-5 flex items-center justify-center gap-1.5">
                {feed.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all",
                      i === index ? "w-6 bg-cm-green" : "w-1.5 bg-white/15",
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-500">
              Runs entirely in your browser, no data leaves this page.
            </p>
          </Card>

          {/* Verdict panel */}
          <Card className="border-white/[0.1] p-4 sm:p-5 lg:p-6">
            <AnimatePresence mode="wait">
              {phase === "incoming" && (
                <motion.div
                  key="incoming"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex min-h-[220px] flex-col items-center justify-center text-center lg:min-h-[380px]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/10 lg:h-14 lg:w-14">
                    <AlertTriangle className="h-6 w-6 text-slate-500 lg:h-7 lg:w-7" />
                  </div>
                  <div className="mt-3 text-sm text-slate-400">
                    Message received…
                  </div>
                </motion.div>
              )}

              {phase === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex min-h-[220px] flex-col items-center justify-center text-center lg:min-h-[380px]"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2 className="h-7 w-7 animate-spin text-cm-green lg:h-8 lg:w-8" />
                  <div className="mt-3 text-sm text-slate-300">
                    Running Camtinel AI Engine…
                  </div>
                </motion.div>
              )}

              {phase === "verdict" && (
                <motion.div
                  key={"verdict-" + index}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <VerdictBanner result={result} />

                  <div className="mt-3 grid grid-cols-2 gap-2 lg:mt-5 lg:gap-3">
                    <Field label="Threat" value={result.threat} />
                    <Field
                      label="Brand"
                      value={result.brand ?? "None detected"}
                    />
                  </div>

                  <ul className="mt-3 space-y-1.5 lg:mt-5 lg:space-y-2">
                    {result.reasons.map((r, i) => (
                      <motion.li
                        key={r + i}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] text-slate-200 lg:py-2.5 lg:text-sm"
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 flex-none rounded-full",
                            verdictStyle[result.verdict].dot,
                          )}
                        />
                        {r}
                      </motion.li>
                    ))}
                  </ul>

                  <div
                    className={cn(
                      "mt-3 rounded-xl border p-3 text-[13px] leading-relaxed text-slate-200 lg:mt-5 lg:p-4 lg:text-sm",
                      result.verdict === "safe" &&
                        "border-cm-green/25 bg-cm-green/[0.05]",
                      result.verdict === "medium" &&
                        "border-cm-yellow/25 bg-cm-yellow/[0.05]",
                      result.verdict === "high" &&
                        "border-cm-red/25 bg-cm-red/[0.05]",
                    )}
                  >
                    {result.recommendation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  );
}

function VerdictBanner({ result }: { result: AnalysisResult }) {
  const s = verdictStyle[result.verdict];
  const Icon = s.icon;

  return (
    <div
      className={cn("rounded-xl p-4 ring-1 lg:p-5", s.bg, s.ring)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", s.color)} />
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-wider",
              s.color,
            )}
          >
            {s.label}
          </span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="font-mono text-3xl font-semibold text-white lg:text-5xl">
            {result.score}
          </span>
          <span className={cn("text-base font-semibold lg:text-xl", s.color)}>
            %
          </span>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${result.score}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn("h-full rounded-full", s.bar)}
        />
      </div>
    </div>
  );
}
