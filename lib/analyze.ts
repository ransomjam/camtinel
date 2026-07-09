export type Verdict = "high" | "medium" | "safe";

export type AnalysisResult = {
  score: number;
  verdict: Verdict;
  threat: string;
  brand?: string;
  reasons: string[];
  recommendation: string;
};

type Rule = {
  test: RegExp;
  weight: number;
  reason: string;
};

const rules: Rule[] = [
  {
    test: /(https?:\/\/|www\.)[a-z0-9-]+\.(co|xyz|online|top|tk|info|link|cc)/i,
    weight: 35,
    reason: "Suspicious domain / TLD",
  },
  {
    test: /\b(pin|password|mot de passe|code secret|otp|cvv)\b/i,
    weight: 30,
    reason: "Requests PIN or password",
  },
  {
    test: /\b(urgent|immédiat|immediat|suspend|expired?|expire|now|maintenant|24 ?h)\b/i,
    weight: 15,
    reason: "Urgency or time pressure",
  },
  {
    test: /(gagn[eé]|won|prize|winner|congratulation|f[cs]fa\s?\d{4,}|\d{5,}\s?fcfa)/i,
    weight: 20,
    reason: "Prize / windfall bait",
  },
];

const brandPattern =
  /\b(mtn|orange money|momo|afriland|bicec|ecobank|ecobabk|enéo|eneo|camtel|express union)\b/i;

export function analyze(text: string): AnalysisResult {
  let score = 15;
  const reasons: string[] = [];

  for (const rule of rules) {
    if (rule.test.test(text)) {
      score += rule.weight;
      reasons.push(rule.reason);
    }
  }

  const brandMatch = text.match(brandPattern);
  const brand = brandMatch?.[0].toUpperCase();
  if (brand && score >= 40) {
    reasons.push(`Brand impersonation (${brand})`);
  }

  score = Math.min(99, score);

  let verdict: Verdict = "safe";
  let threat = "No threat detected";
  if (score >= 70) {
    verdict = "high";
    threat = brand ? `${brand} impersonation / phishing` : "Credential phishing";
  } else if (score >= 40) {
    verdict = "medium";
    threat = "Suspicious message";
  }

  const recommendation =
    verdict === "high"
      ? "Delete the message. Don't click any links or reply. Report the sender to your telecom."
      : verdict === "medium"
        ? "Don't act on this message before verifying the sender through an official channel."
        : "No dangerous signals detected. Stay vigilant, and never share PIN codes or passwords.";

  if (verdict === "safe" && reasons.length === 0) {
    reasons.push(
      "No suspicious links",
      "No credential requests",
      "No urgency cues",
    );
  }

  return { score, verdict, threat, brand, reasons, recommendation };
}
