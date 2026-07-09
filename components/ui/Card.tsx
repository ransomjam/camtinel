import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "muted" | "dashed";
  hoverable?: boolean;
};

export function Card({
  variant = "default",
  hoverable = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6 transition-colors duration-300",
        variant === "default" && "border-white/[0.08] bg-white/[0.02]",
        variant === "muted" && "border-white/[0.06] bg-white/[0.015]",
        variant === "dashed" && "border-dashed border-white/[0.1] bg-white/[0.015]",
        hoverable && "hover:border-white/[0.14] hover:bg-white/[0.035]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
