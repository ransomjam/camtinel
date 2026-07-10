"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Signal,
  Wifi,
  Battery,
  MessageSquareText,
} from "lucide-react";
import { analyze } from "@/lib/analyze";
import { scamSamples } from "@/lib/scamSamples";
import { cn } from "@/lib/cn";

// Fast cadence: notification → analysis → verdict → next.
const T_ANALYZING = 350;
const T_VERDICT = 900;
const T_NEXT = 3400;

type Phase = "incoming" | "analyzing" | "verdict";

export function PhoneMockup() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("incoming");
  const timers = useRef<number[]>([]);

  const current = scamSamples[index];
  const result = useMemo(() => analyze(current.text), [current]);

  useEffect(() => {
    setPhase("incoming");
    const clearAll = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
    const t1 = window.setTimeout(() => setPhase("analyzing"), T_ANALYZING);
    const t2 = window.setTimeout(() => setPhase("verdict"), T_VERDICT);
    const t3 = window.setTimeout(
      () => setIndex((i) => (i + 1) % scamSamples.length),
      T_NEXT,
    );
    timers.current = [t1, t2, t3];
    return clearAll;
  }, [index]);

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="pointer-events-none absolute -inset-16 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cm-green/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cm-yellow/10 blur-[80px]" />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative aspect-[9/19] rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-3 shadow-2xl"
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950" />

        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-ink-950 p-4">
          {/* Status bar */}
          <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <Signal className="h-2.5 w-2.5" />
              <Wifi className="h-2.5 w-2.5" />
              <Battery className="h-3 w-3" />
            </span>
          </div>

          {/* Incoming SMS notification (top of lock-screen style) */}
          <div className="mt-4 min-h-[64px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={"noti-" + index}
                initial={reduce ? false : { opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-2.5 shadow-xl backdrop-blur"
              >
                <div className="flex items-start gap-2">
                  <div
                    aria-hidden
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-md text-[11px] font-semibold"
                    style={{
                      backgroundColor: current.accent,
                      color: current.onAccent === "black" ? "#0A0C18" : "#fff",
                    }}
                  >
                    {current.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-semibold text-white">
                        {current.sender}
                      </span>
                      <span className="flex-none text-[9px] uppercase tracking-wide text-slate-400">
                        now
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-slate-300">
                      {current.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Camtinel identity + status */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cm-green via-cm-yellow to-cm-red">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-white">
                Camtinel
              </div>
              <div className="text-[9px] text-slate-500">
                {phase === "incoming" && "New message detected"}
                {phase === "analyzing" && "Analyzing on-device…"}
                {phase === "verdict" && "Analysis complete · 0.3s"}
              </div>
            </div>
          </div>

          {/* Verdict area */}
          <div className="mt-3 flex-1">
            <AnimatePresence mode="wait">
              {phase !== "verdict" ? (
                <motion.div
                  key={"loading-" + phase + "-" + index}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cm-green opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cm-green" />
                  </div>
                  <span className="text-[10px] text-slate-300">
                    {phase === "incoming"
                      ? "Message received"
                      : "Running detection engine…"}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={"verdict-" + index}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="rounded-xl border border-cm-red/30 bg-cm-red/[0.09] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-cm-red" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-cm-red">
                          High risk
                        </span>
                      </div>
                      <span className="font-mono text-2xl font-semibold text-white leading-none">
                        {result.score}
                        <span className="text-sm text-cm-red">%</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-cm-red"
                      />
                    </div>
                  </div>

                  <div className="mt-2 space-y-1.5">
                    <Row value={result.threat} />
                    {result.brand && <Row value={result.brand} danger />}
                  </div>

                  <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <ul className="space-y-1">
                      {result.reasons.slice(0, 3).map((r, i) => (
                        <motion.li
                          key={r + i}
                          initial={reduce ? false : { opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + i * 0.05 }}
                          className="flex items-start gap-1.5 text-[10px] leading-snug text-slate-300"
                        >
                          <span
                            className={cn(
                              "mt-1 h-1 w-1 flex-none rounded-full",
                              result.verdict === "high"
                                ? "bg-cm-red"
                                : "bg-cm-yellow",
                            )}
                          />
                          {r}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center gap-2 pt-2">
            <button
              type="button"
              className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 text-[10px] text-slate-300"
            >
              Report
            </button>
            <button
              type="button"
              className="flex flex-[1.4] items-center justify-center gap-1 rounded-lg bg-cm-red py-2 text-[10px] font-semibold text-white"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating side notification chips (populate the space around the phone) */}
      <FloatingNotification
        side="left"
        top="top-24"
        delay={0.6}
        sender="Camtinel"
        text="Scam blocked · MTN impersonation"
        icon={<ShieldAlert className="h-3 w-3 text-cm-green" />}
      />
      <FloatingNotification
        side="right"
        top="bottom-40"
        delay={0.9}
        sender="SMS"
        text="Suspicious link filtered"
        icon={<MessageSquareText className="h-3 w-3 text-cm-yellow" />}
      />
    </div>
  );
}

function Row({ value, danger }: { value: string; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
      <span
        className={`text-[10px] font-medium ${
          danger ? "text-cm-red" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function FloatingNotification({
  side,
  top,
  delay,
  sender,
  text,
  icon,
}: {
  side: "left" | "right";
  top: string;
  delay: number;
  sender: string;
  text: string;
  icon: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "absolute hidden max-w-[190px] rounded-xl border border-white/10 bg-ink-800/90 px-3 py-2 shadow-xl backdrop-blur sm:block",
        top,
        side === "left" ? "-left-6" : "-right-4",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/10">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[10px] font-semibold text-white">
            {sender}
          </div>
          <div className="truncate text-[9px] text-slate-400">{text}</div>
        </div>
      </div>
    </motion.div>
  );
}
