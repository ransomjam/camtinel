"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Loader2,
  MessageSquareText,
  Pause,
  Play,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { analyze, type AnalysisResult, type Verdict } from "@/lib/analyze";
import { cn } from "@/lib/cn";

type Sample = { sender: string; channel: string; text: string };

const feed: Sample[] = [
  {
    sender: "MTN",
    channel: "SMS",
    text: "MTN: Vous avez gagné 500,000 FCFA! Retirez votre gain sur https://mtn-cameroon-promo.co en confirmant votre code PIN.",
  },
  {
    sender: "Afriland First Bank",
    channel: "Email",
    text: "Afriland: Your account has been suspended. Verify immediately at http://afriland-verify.online/login to avoid permanent closure.",
  },
  {
    sender: "ENEO Cameroun",
    channel: "SMS",
    text: "Reminder: your electricity bill is due tomorrow. Pay via ENEO Online or the ENEO agent nearest to you. Do not share your PIN.",
  },
  {
    sender: "Orange Money",
    channel: "SMS",
    text: "Orange: Confirmez votre PIN pour débloquer votre compte MoMo dans les 24h ou il sera fermé: bit.ly/orange-verify",
  },
];

// Timings per message (ms). Total = 6000ms.
const T_INCOMING = 0;
const T_ANALYZING = 900;
const T_VERDICT = 1900;
const T_NEXT = 6500;

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

    const t1 = window.setTimeout(() => setPhase("analyzing"), T_ANALYZING - T_INCOMING);
    const t2 = window.setTimeout(() => setPhase("verdict"), T_VERDICT - T_INCOMING);
    const t3 = window.setTimeout(
      () => setIndex((i) => (i + 1) % feed.length),
      T_NEXT - T_INCOMING,
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

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Incoming feed */}
          <Card className="relative border-white/[0.1] p-6">
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

            <div className="mt-5 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-xl border border-white/[0.08] bg-ink-950 p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/10">
                      <MessageSquareText className="h-4 w-4 text-slate-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-white">
                          {current.sender}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
                          {current.channel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        just now
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-200">
                    {current.text}
                  </p>
                </motion.div>
              </AnimatePresence>

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

            <p className="mt-4 text-center text-[11px] text-slate-500">
              This demo runs entirely in your browser, no data leaves this page.
            </p>
          </Card>

          {/* Verdict panel */}
          <Card className="border-white/[0.1] p-6">
            <AnimatePresence mode="wait">
              {phase === "incoming" && (
                <motion.div
                  key="incoming"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full min-h-[380px] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/10">
                    <MessageSquareText className="h-7 w-7 text-slate-500" />
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
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
                  transition={{ duration: 0.2 }}
                  className="flex h-full min-h-[380px] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-cm-green" />
                  <div className="mt-4 text-sm text-slate-300">
                    Running Camtinel AI Engine…
                  </div>
                </motion.div>
              )}

              {phase === "verdict" && (
                <motion.div
                  key={"verdict-" + index}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VerdictBanner result={result} />

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Field label="Threat" value={result.threat} />
                    <Field
                      label="Brand"
                      value={result.brand ?? "None detected"}
                    />
                  </div>

                  <div className="mt-5">
                    <ul className="mt-3 space-y-2">
                      {result.reasons.map((r, i) => (
                        <motion.li
                          key={r + i}
                          initial={reduce ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-slate-200"
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
                  </div>

                  <div
                    className={cn(
                      "mt-5 rounded-xl border p-4 text-sm text-slate-200",
                      result.verdict === "safe" &&
                        "border-cm-green/25 bg-cm-green/[0.05]",
                      result.verdict === "medium" &&
                        "border-cm-yellow/25 bg-cm-yellow/[0.05]",
                      result.verdict === "high" &&
                        "border-cm-red/25 bg-cm-red/[0.05]",
                    )}
                  >
                    <div className="mt-1">{result.recommendation}</div>
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
    <div className={cn("rounded-xl p-5 ring-1", s.bg, s.ring)}>
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", s.color)} />
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            s.color,
          )}
        >
          {s.label}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-5xl font-semibold text-white">
              {result.score}
            </span>
            <span className={cn("text-xl font-semibold", s.color)}>%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${result.score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full", s.bar)}
        />
      </div>
    </div>
  );
}
