"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check, Trash2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";

const reasons = [
  "Requests password",
  "Suspicious domain (goog1e-verify.co)",
  "Urgency and time pressure",
  "Brand impersonation",
];

export function ExplainableAI() {
  const reduce = useReducedMotion();

  return (
    <section
      id="explainable"
      className="section"
      aria-labelledby="explainable-title"
    >
      <div className="container-page">
        <SectionHeader
          title={
            <span id="explainable-title">
              Every verdict shows the reasoning behind it.
            </span>
          }
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cm-green" />
                <span>
                  <strong className="text-white">Signal-level output.</strong>{" "}
                  Every verdict maps back to the concrete cues the model used.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cm-yellow" />
                <span>
                  <strong className="text-white">Calibrated scoring.</strong>{" "}
                  Risk scores are calibrated, not a softmax probability masquerading as one.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cm-red" />
                <span>
                  <strong className="text-white">Actionable next step.</strong>{" "}
                  Delete, report or verify. The app tells the user what to do, not just what happened.
                </span>
              </li>
            </ul>
          </div>

          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-cm-red/10 via-transparent to-cm-yellow/8 blur-2xl"
              />

              <Card className="border-white/[0.1] bg-ink-900/70 p-8 backdrop-blur">
                <div className="mt-6 flex items-end justify-between border-b border-white/[0.06] pb-6">
                  <div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-mono text-6xl font-semibold text-white">
                        96
                      </span>
                      <span className="text-2xl font-semibold text-cm-red">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mt-1 text-sm font-semibold text-cm-red">
                      High risk
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Field label="Threat" value="Credential phishing" />
                  <Field label="Impersonated brand" value="Google" />
                </div>

                <div className="mt-6">
                  <ul className="mt-3 space-y-2">
                    {reasons.map((r, i) => (
                      <motion.li
                        key={r}
                        initial={reduce ? false : { opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-slate-200"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cm-red/10 ring-1 ring-cm-red/25">
                          <Check className="h-3 w-3 text-cm-red" />
                        </span>
                        {r}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-cm-red/25 bg-cm-red/[0.05] p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-cm-red" />
                  <div>
                    <div className="text-sm text-slate-300">
                      Delete this message. Don't click any links or reply. Report the sender to your telecom.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cm-red py-3 text-sm font-semibold text-white transition hover:bg-cm-red-dark"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete immediately
                </button>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
