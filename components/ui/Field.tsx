import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: React.ReactNode;
  tone?: "default" | "danger";
  className?: string;
};

export function Field({ label, value, tone = "default", className }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5",
        className,
      )}
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-sm font-medium",
          tone === "danger" ? "text-red-300" : "text-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}
