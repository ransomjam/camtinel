import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(0,165,80,0.15) 0%, rgba(252,209,22,0.05) 40%, transparent 80%)",
        }}
      />
      <div className="relative mx-auto max-w-md px-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Logo className="h-7 w-7" />
          <span
            className="text-[16px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Cam<span className="text-cm-green">tinel</span>
          </span>
        </Link>
        <div className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          404
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
          This page doesn't exist.
        </h1>
        <p className="mt-4 text-slate-400">
          The link may be broken or the page may have moved. Head back to the homepage.
        </p>
        <Link href="/" className="btn-secondary mt-8 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
