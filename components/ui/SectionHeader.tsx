"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

type Props = {
  title: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({
  title,
  align = "center",
}: Props) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
      )}
    >
      <Reveal delay={0.05}>
        <h2 className="h2 mt-3">{title}</h2>
      </Reveal>
    </div>
  );
}
