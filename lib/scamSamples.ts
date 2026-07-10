export type ScamSample = {
  sender: string;
  channel: string;
  initial: string;
  accent: string;
  onAccent: "black" | "white";
  text: string;
};

export const scamSamples: ScamSample[] = [
  {
    sender: "MTN",
    channel: "SMS",
    initial: "M",
    accent: "#FFCC00",
    onAccent: "black",
    text: "MTN: Vous avez gagné 500,000 FCFA! Retirez votre gain sur https://mtn-cameroon-promo.co en confirmant votre code PIN.",
  },
  {
    sender: "Afriland First Bank",
    channel: "SMS",
    initial: "A",
    accent: "#C8102E",
    onAccent: "white",
    text: "AFRILAND: Tentative de connexion suspecte détectée. Confirmez votre OTP 8492 sous 30 minutes ou votre compte sera suspendu: https://afriland-secure.link/verify",
  },
  {
    sender: "DHL Express",
    channel: "SMS",
    initial: "D",
    accent: "#D40511",
    onAccent: "white",
    text: "DHL: Your parcel #CM4520 is held at Douala customs. Pay 8,500 FCFA within 24h and confirm your card CVV to release: https://dhl-cm-clear.top/pay",
  },
  {
    sender: "Orange Money",
    channel: "SMS",
    initial: "O",
    accent: "#FF7900",
    onAccent: "white",
    text: "Orange: Confirmez votre PIN pour débloquer votre compte MoMo dans les 24h ou il sera fermé définitivement: https://orange-verify.online/unlock",
  },
];
