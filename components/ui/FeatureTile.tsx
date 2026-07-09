"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type Tone = "green" | "yellow" | "red";

type Props = {
  icon: LucideIcon;
  title: string;
  text?: string;
  badge?: ReactNode;
  tone?: Tone;
  compact?: boolean;
  minHeight?: string;
  variant?: "default" | "muted" | "dashed";
  className?: string;
  children?: ReactNode;
};

const toneStyles: Record<
  Tone,
  { bar: string; chip: string; icon: string; halo: string }
> = {
  green: {
    bar: "bg-cm-green",
    chip: "border-cm-green/30 bg-cm-green/[0.08] text-cm-green",
    icon: "bg-cm-green/10 text-cm-green ring-cm-green/25",
    halo: "from-cm-green/[0.14]",
  },
  yellow: {
    bar: "bg-cm-yellow",
    chip: "border-cm-yellow/30 bg-cm-yellow/[0.08] text-cm-yellow",
    icon: "bg-cm-yellow/10 text-cm-yellow ring-cm-yellow/25",
    halo: "from-cm-yellow/[0.14]",
  },
  red: {
    bar: "bg-cm-red",
    chip: "border-cm-red/30 bg-cm-red/[0.08] text-cm-red",
    icon: "bg-cm-red/10 text-cm-red ring-cm-red/25",
    halo: "from-cm-red/[0.14]",
  },
};

export function FeatureTile({
  icon: Icon,
  title,
  text,
  badge,
  tone = "green",
  compact = false,
  minHeight,
  variant = "default",
  className,
  children,
}: Props) {
  const styles = toneStyles[tone];
  const resolvedMinHeight =
    minHeight ?? (compact ? "min-h-[150px]" : "min-h-[200px]");

  return (
    <Card
      hoverable
      variant={variant}
      className={cn(
        "group flex h-full overflow-hidden rounded-lg p-0",
        resolvedMinHeight,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-[2px]", styles.bar)}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-12 rounded-full bg-gradient-to-br to-transparent blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-70",
          compact ? "h-24 w-24" : "h-28 w-28",
          styles.halo,
        )}
      />

      <div
        className={cn(
          "relative flex flex-1 flex-col",
          compact ? "p-4" : "p-5",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg ring-1 transition-transform duration-300 group-hover:-translate-y-0.5",
              compact ? "h-9 w-9" : "h-10 w-10",
              styles.icon,
            )}
          >
            <Icon
              className={cn(compact ? "h-4 w-4" : "h-[18px] w-[18px]")}
              strokeWidth={1.75}
            />
          </div>

          {badge && (
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                styles.chip,
              )}
            >
              {badge}
            </span>
          )}
        </div>

        <div className={cn(compact ? "mt-4" : "mt-5")}>
          <h3
            className={cn(
              "font-medium leading-snug text-white",
              compact ? "text-[13px]" : "text-[15px]",
            )}
          >
            {title}
          </h3>
          {text && (
            <p
              className={cn(
                "leading-relaxed text-slate-400",
                compact ? "mt-1.5 text-[12px]" : "mt-2 text-[13px]",
              )}
            >
              {text}
            </p>
          )}
          {children}
        </div>
      </div>
    </Card>
  );
}
