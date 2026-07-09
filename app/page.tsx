import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Capabilities } from "@/components/Capabilities";
import { Roadmap } from "@/components/Roadmap";
import { AISection } from "@/components/AISection";
import { ExplainableAI } from "@/components/ExplainableAI";
import { WhyOffline } from "@/components/WhyOffline";
import { BuiltForCameroon } from "@/components/BuiltForCameroon";
import { DigitalPatriotism } from "@/components/DigitalPatriotism";
import { ResponsibleAI } from "@/components/ResponsibleAI";
import { BusinessModel } from "@/components/BusinessModel";
import { LiveDemo } from "@/components/LiveDemo";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <Problem />
        <Solution />
        <Capabilities />
        <Roadmap />
        <AISection />
        <ExplainableAI />
        <WhyOffline />
        <BuiltForCameroon />
        <DigitalPatriotism />
        <ResponsibleAI />
        <BusinessModel />
        <LiveDemo />
        <Download />
      </main>
      <Footer />
    </>
  );
}
