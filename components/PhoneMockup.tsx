"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Trash2, ShieldAlert, Signal, Wifi, Battery } from "lucide-react";

const reasons = [
  "Requests PIN code",
  "Suspicious short link",
  "Brand impersonation (MTN)",
];

export function PhoneMockup() {
  const reduce = useReducedMotion();

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
        <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950" />

        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-ink-950 p-4">
          <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <Signal className="h-2.5 w-2.5" />
              <Wifi className="h-2.5 w-2.5" />
              <Battery className="h-3 w-3" />
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cm-green via-cm-yellow to-cm-red">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white">
                Camtinel
              </div>
              <div className="text-[9px] text-slate-500">
                Analysis complete, 0.3s
              </div>
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-4 rounded-xl border border-cm-red/30 bg-cm-red/[0.09] p-3"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-cm-red" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cm-red">
                High Risk
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-[10px] text-slate-400">Risk score</span>
              <span className="font-mono text-3xl font-semibold text-white">
                97<span className="text-lg text-cm-red">%</span>
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                initial={reduce ? { width: "97%" } : { width: 0 }}
                animate={{ width: "97%" }}
                transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
                className="h-full rounded-full bg-cm-red"
              />
            </div>
          </motion.div>

          <div className="mt-3 space-y-2">
            <Row label="Threat" value="Mobile Money fraud" />
            <Row label="Impersonated brand" value="MTN" danger />
          </div>

          <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
              Reasons
            </div>
            <ul className="mt-2 space-y-1.5">
              {reasons.map((r, i) => (
                <motion.li
                  key={r}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 + i * 0.12 }}
                  className="flex items-start gap-1.5 text-[10px] text-slate-300"
                >
                  <span className="mt-1 h-1 w-1 flex-none rounded-full bg-cm-green" />
                  {r}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-3">
            <button className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 text-[10px] text-slate-300">
              Report
            </button>
            <button className="flex flex-[1.4] items-center justify-center gap-1 rounded-lg bg-cm-red py-2 text-[10px] font-semibold text-white">
              <Trash2 className="h-3 w-3" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -left-4 top-32 hidden rounded-xl border border-white/10 bg-ink-800/90 px-3 py-2 shadow-xl backdrop-blur sm:block"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-cm-green">
          <span className="h-1.5 w-1.5 rounded-full bg-cm-green" />
          Offline
        </div>
        <div className="text-[10px] text-slate-400">Runs on-device</div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -right-3 bottom-32 hidden rounded-xl border border-white/10 bg-ink-800/90 px-3 py-2 shadow-xl backdrop-blur sm:block"
      >
        <div className="text-[10px] font-semibold text-cm-yellow">Explainable</div>
        <div className="text-[10px] text-slate-400">3 signals shown</div>
      </motion.div>
    </div>
  );
}

function Row({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span
        className={`text-[11px] font-medium ${
          danger ? "text-cm-red" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
