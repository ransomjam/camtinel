import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Camtinel handles data: analysis runs on-device, message content never leaves your phone.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <section className="section" aria-labelledby="privacy-title">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <div className="mt-8 text-xs uppercase tracking-wider text-slate-500">
                Privacy statement
              </div>
              <h1
                id="privacy-title"
                className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl"
              >
                Your messages stay on your phone.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
                Camtinel is an on-device Android application. All analysis
                happens locally, no message content is sent to a server, and
                there is no user account.
              </p>

              <div className="mt-10 space-y-8">
                <Block title="What Camtinel processes">
                  When notification access is enabled, Camtinel reads incoming
                  notification text (sender, title, message body) so the
                  detection engine can score it. This happens entirely inside
                  the app, on your device.
                </Block>

                <Block title="What stays on the device">
                  Only a short preview of a flagged message and a hash of its
                  content are kept in the local Threat Log. Nothing is uploaded.
                  Clearing the app data removes the entire log.
                </Block>

                <Block title="What is never sent off the device">
                  Message content, sender identifiers, contacts, phone numbers
                  and any personally identifiable data. The detection model
                  itself runs inside the app, so there is no network round-trip
                  during analysis.
                </Block>

                <Block title="Permissions used">
                  Notification access to scan incoming alerts, and post
                  notifications to warn you about high-risk messages. Camtinel
                  requests no other permissions.
                </Block>

                <Block title="No analytics, no ads, no tracking">
                  Camtinel does not include third-party analytics SDKs,
                  advertising SDKs or crash-reporting services that transmit
                  personal data.
                </Block>

                <Block title="Website">
                  This marketing site collects no cookies and runs no analytics.
                  If that changes, this page will be updated first.
                </Block>

                <Block title="Contact">
                  Questions about privacy or a request to inspect the source
                  behavior can be sent to{" "}
                  <a
                    href={`mailto:${site.contact}`}
                    className="text-cm-green hover:underline"
                  >
                    {site.contact}
                  </a>
                  .
                </Block>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.contact}`}
                  className="btn-secondary text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Contact us
                </a>
                <Link href="/" className="btn-secondary text-sm">
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
              </div>

              <div className="mt-10 text-xs text-slate-500">
                Last updated: July 2026.
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-white md:text-lg">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-[15px]">
        {children}
      </p>
    </div>
  );
}
