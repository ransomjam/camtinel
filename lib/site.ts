export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://camtinel.cm";

export const site = {
  name: "Camtinel",
  tagline: "Cameroon's offline AI cybersecurity assistant",
  description:
    "Camtinel detects phishing, Mobile Money fraud, brand impersonation and social-engineering attacks, running fully on your Android device without a network connection.",
  contact: "contact@camtinel.cm",
  github: "https://github.com",
  version: "1.2",
} as const;
