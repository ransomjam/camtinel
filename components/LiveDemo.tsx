"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { analyze, type AnalysisResult, type Verdict } from "@/lib/analyze";
import { cn } from "@/lib/cn";

const samples: { label: string; text: string }[] = [
  {
    label: "Fake MTN",
    text: "MTN: Vous avez gagné 500,000 FCFA! Retirez votre gain sur https://mtn-cameroon-promo.co en confirmant votre code PIN.",
  },
  {
    label: "Bank phishing",
    text: "Afriland: Your account has been suspended. Verify immediately at http://afriland-verify.online/login to avoid permanent closure.",
  },
  {
    label: "Legitimate reminder",
    text: "Reminder: your electricity bill is due tomorrow. Pay via ENEO Online or the ENEO agent nearest to you. Do not share your PIN.",
  },
];

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
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const reduce = useReducedMotion();

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 800));
    setResult(analyze(text));
    setLoading(false);
  };

  return (
    <section id="demo" className="section" aria-labelledby="demo-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-flag opacity-40"
      />
      <div className="container-page">
        <SectionHeader
          eyebrow="Live demo"
          title={<span id="demo-title">Try the engine on a real message.</span>}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="border-white/[0.1] p-6">
            <label
              htmlFor="demo-input"
              className="text-xs uppercase tracking-wider text-slate-500"
            >
              Suspicious message
            </label>
            <textarea
              id="demo-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a suspicious SMS, email or message here..."
              rows={7}
              className="mt-3 w-full resize-none rounded-xl border border-white/[0.08] bg-ink-950 p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cm-green/50 focus:outline-none focus:ring-2 focus:ring-cm-green/20"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-500">
                Try:
              </span>
              {samples.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => {
                    setText(s.text);
                    setResult(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={run}
              disabled={!text.trim() || loading}
              className="btn-primary mt-6 w-full text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze message
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-[11px] text-slate-500">
              This demo runs entirely in your browser, no data leaves this page.
            </p>
          </Card>

          <Card className="border-white/[0.1] p-6">
            {!result && !loading && (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/10">
                  <ShieldCheck className="h-7 w-7 text-slate-500" />
                </div>
                <div className="mt-4 text-sm text-slate-400">
                  Results will appear here after analysis.
                </div>
              </div>
            )}

            {loading && (
              <div
                className="flex h-full min-h-[380px] flex-col items-center justify-center text-center"
                role="status"
                aria-live="polite"
              >
                <Loader2 className="h-8 w-8 animate-spin text-cm-green" />
                <div className="mt-4 text-sm text-slate-300">
                  Running Camtinel AI Engine…
                </div>
              </div>
            )}

            {result && !loading && (
              <motion.div
                key={result.score + "-" + result.verdict}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <div className="text-xs uppercase tracking-wider text-slate-500">
                    Detection reasons
                  </div>
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
                  <div className="text-xs uppercase tracking-wider text-slate-400">
                    Recommendation
                  </div>
                  <div className="mt-1">{result.recommendation}</div>
                </div>
              </motion.div>
            )}
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
          <div className="text-[10px] uppercase tracking-wider text-slate-500">
            Risk score
          </div>
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
