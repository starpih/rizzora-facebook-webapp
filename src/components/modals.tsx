"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Facebook, Heart, ShieldCheck, X } from "lucide-react";
import { companion } from "@/lib/mock-data";

type ModalProps = {
  onClose: () => void;
};

function ModalFrame({
  children,
  onClose,
  compact = false,
  wide = false
}: ModalProps & {
  children: React.ReactNode;
  compact?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center bg-[#111025]/55 ${wide ? "px-4 py-6" : "px-8"} backdrop-blur-md`}>
      <div className={`glass-panel relative w-full overflow-hidden rounded-[10px] ${wide ? "max-w-[361px] max-h-[calc(100svh-48px)]" : "max-w-[329px]"} ${compact || wide ? "" : "min-h-[497px]"}`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full text-white/80"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

type BillingCycle = "monthly" | "quarter" | "yearly";
type SubscriptionPlanId = "vip" | "svip";

const billingOptions: Array<{ id: BillingCycle; label: string; unit: string }> = [
  { id: "monthly", label: "Monthly", unit: "mo" },
  { id: "quarter", label: "Quarter", unit: "qtr" },
  { id: "yearly", label: "Yearly", unit: "yr" }
];

const subscriptionPlans: Array<{
  id: SubscriptionPlanId;
  name: string;
  badge: string;
  prices: Record<BillingCycle, { price: string; original: string }>;
}> = [
  {
    id: "vip",
    name: "VIP Member",
    badge: "Most Popular",
    prices: {
      monthly: { price: "$38", original: "$58" },
      quarter: { price: "$98", original: "$168" },
      yearly: { price: "$298", original: "$668" }
    }
  },
  {
    id: "svip",
    name: "SVIP Member",
    badge: "Premium",
    prices: {
      monthly: { price: "$98", original: "$158" },
      quarter: { price: "$258", original: "$468" },
      yearly: { price: "$798", original: "$1688" }
    }
  }
];

const planBenefits: Record<SubscriptionPlanId, string[]> = {
  vip: [
    "Basic / Advanced Chat Model",
    "200 voice plays / day",
    "500 message replies / day",
    "20 custom AI characters",
    "20 custom voices",
    "200 lifestyle photo views / month",
    "50 lifestyle photo views / month",
    "Good memory",
    "Change character personality",
    "Change character voice",
    "Early access to new features"
  ],
  svip: [
    "Basic / Advanced Chat Model",
    "Unlimited voice plays",
    "Unlimited message replies",
    "Unlimited custom AI characters",
    "Unlimited custom voices",
    "Unlimited lifestyle photo views",
    "Unlimited dynamic video views",
    "Excellent memory",
    "Change character personality",
    "Change character voice",
    "Early access to new features"
  ]
};

export function AuthModal({ onClose }: ModalProps) {
  const [agreementChecked, setAgreementChecked] = useState(true);
  const [shakeAgreement, setShakeAgreement] = useState(false);

  function handleFacebookLogin() {
    if (agreementChecked) {
      return;
    }

    setShakeAgreement(false);
    window.setTimeout(() => setShakeAgreement(true), 0);
    window.setTimeout(() => setShakeAgreement(false), 320);
  }

  return (
    <ModalFrame onClose={onClose}>
      <div className="relative min-h-[497px] px-6 pb-8 pt-7 text-center">
        <Image
          src={companion.loginBackground}
          alt={companion.name}
          fill
          sizes="329px"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#1b1833]/30 to-[#151328]/95" />
        <div className="relative z-10 flex min-h-[450px] flex-col justify-end">
          <h2 className="mb-4 text-[24px] font-bold leading-tight">Keep talking with {companion.name}</h2>
          <p className="mx-auto mb-7 max-w-[244px] text-[14px] leading-[1.35] text-white">
            Create an account so he can remember your conversations and get to know you better. Your
            private information is never stored.
          </p>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="mb-7 flex h-12 items-center justify-center gap-3 rounded-full bg-white text-[16px] font-bold text-[#181725] transition active:scale-[0.98]"
          >
            <span className="grid size-6 place-items-center rounded-full bg-[#4267B2] text-white">
              <Facebook size={15} fill="white" />
            </span>
            Login with Facebook
          </button>
          <label
            className={`flex items-start gap-3 text-left text-[13px] leading-[1.35] text-white ${shakeAgreement ? "agreement-shake" : ""}`}
          >
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(event) => setAgreementChecked(event.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-rizzora-pink"
            />
            <span>
              I agree to the{" "}
              <Link className="font-bold text-rizzora-pink" href="/m/legal?tab=privacy">
                Privacy Agreement
              </Link>{" "}
              and{" "}
              <Link className="font-bold text-rizzora-pink" href="/m/legal?tab=terms">
                Terms of User
              </Link>
            </span>
          </label>
        </div>
      </div>
    </ModalFrame>
  );
}

export function QuotaLimitModal({
  onClose,
  onUpgrade,
  onAuth
}: ModalProps & {
  onUpgrade: () => void;
  onAuth: () => void;
}) {
  return (
    <ModalFrame onClose={onClose} compact>
      <div className="px-5 pb-6 pt-10 text-center">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink aura-shadow">
          <Heart size={28} fill="currentColor" />
        </div>
        <h2 className="text-[24px] font-bold leading-tight">Your free voice chats are used up</h2>
        <p className="mx-auto mt-3 max-w-[250px] text-[14px] leading-[1.45] text-rizzora-muted">
          Sign up to get more free chats, or upgrade to keep talking with {companion.name}.
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={onAuth}
            className="primary-gradient h-12 w-full rounded-xl text-[15px] font-bold text-white"
          >
            Sign up for more free chats
          </button>
          <button
            onClick={onUpgrade}
            className="gold-gradient h-12 w-full rounded-xl text-[15px] font-bold text-[#27192c]"
          >
            Upgrade to keep talking
          </button>
          <button onClick={onClose} className="h-10 w-full text-[14px] text-rizzora-muted">
            Maybe later
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-rizzora-muted">
          <ShieldCheck size={14} />
          Private. Safe. Just between you two.
        </div>
      </div>
    </ModalFrame>
  );
}

export function SubscriptionModal({ onClose }: ModalProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>("svip");
  const [agreementChecked, setAgreementChecked] = useState(true);
  const [shakeAgreement, setShakeAgreement] = useState(false);
  const unit = billingOptions.find((option) => option.id === billingCycle)?.unit ?? "mo";
  const selectedBenefits = planBenefits[selectedPlan];
  const selectedAccent = selectedPlan === "vip" ? "pink" : "gold";

  function handlePremiumClick() {
    if (agreementChecked) {
      return;
    }

    setShakeAgreement(false);
    window.setTimeout(() => setShakeAgreement(true), 0);
    window.setTimeout(() => setShakeAgreement(false), 320);
  }

  return (
    <ModalFrame onClose={onClose} wide>
      <div className="max-h-[calc(100svh-48px)] overflow-y-auto px-4 pb-5 pt-10 hidden-scrollbar">
        <p className="mx-auto max-w-[280px] text-center text-[13px] leading-[1.45] text-white/85">
          Build a deeper connection with your AI companion and unlock unlimited possibilities
        </p>
        <div className="mt-4 grid h-12 grid-cols-3 rounded-lg bg-[#171632] p-1 text-[13px] text-rizzora-muted">
          {billingOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setBillingCycle(option.id)}
              className={`rounded-lg transition ${billingCycle === option.id ? "bg-[#5b5283] text-white shadow-[0_0_14px_rgba(234,78,184,0.22)]" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {subscriptionPlans.map((plan) => {
            const active = selectedPlan === plan.id;
            const price = plan.prices[billingCycle];
            const activeIsVip = active && plan.id === "vip";
            const activeIsSvip = active && plan.id === "svip";

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border p-3 text-left transition duration-150 active:scale-[0.98] ${
                  activeIsVip
                    ? "border-rizzora-pink bg-rizzora-pink/10 shadow-[0_0_18px_rgba(234,78,184,0.2)]"
                    : activeIsSvip
                      ? "border-rizzora-gold bg-rizzora-gold/8 shadow-[0_0_18px_rgba(245,185,55,0.18)]"
                      : "border-white/[0.08] bg-white/[0.07] opacity-60"
                }`}
            >
              <div
                className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[10px] ${
                  activeIsVip
                    ? "border-rizzora-pink bg-rizzora-pink/12 text-rizzora-pink"
                    : activeIsSvip
                      ? "border-rizzora-gold text-rizzora-gold"
                      : "border-white/20 text-white/70"
                }`}
              >
                {plan.badge}
              </div>
              <h3
                className={`text-[16px] font-bold ${
                  activeIsVip ? "text-rizzora-pink" : activeIsSvip ? "text-rizzora-gold" : "text-white/70"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-[12px] text-white/50 line-through">{price.original}</span>
                <span
                  className={`text-[28px] font-bold ${
                    activeIsVip ? "text-rizzora-pink" : activeIsSvip ? "text-rizzora-gold" : "text-white/70"
                  }`}
                >
                  {price.price}
                </span>
                <span className="mb-1 text-[12px] text-white/60">/{unit}</span>
              </div>
            </button>
            );
          })}
        </div>
        <ul className="mt-4 max-h-[258px] space-y-2 overflow-y-auto pr-1 text-[13px] hidden-scrollbar">
          {selectedBenefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-white/[0.82]">
              <span
                className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                  selectedAccent === "pink" ? "bg-rizzora-pink/25 text-rizzora-pink" : "bg-rizzora-gold/25 text-rizzora-gold"
                }`}
              >
                <Check size={11} />
              </span>
              <span>
                {benefit.startsWith("Unlimited") ? (
                  <>
                    <b className={selectedAccent === "pink" ? "text-rizzora-pink" : "text-rizzora-gold"}>Unlimited</b>
                    {benefit.replace("Unlimited", "")}
                  </>
                ) : (
                  benefit
                )}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={handlePremiumClick}
          className={`mt-4 h-12 w-full rounded-xl text-[15px] font-bold transition active:scale-[0.98] ${
            selectedPlan === "vip" ? "primary-gradient text-white" : "gold-gradient text-[#27192c]"
          }`}
        >
          {selectedPlan === "vip" ? "Subscribe Now" : "Get Premium"}
        </button>
        <label className={`mt-4 flex items-start gap-3 text-[12px] leading-[1.35] text-white/80 ${shakeAgreement ? "agreement-shake" : ""}`}>
          <input
            type="checkbox"
            checked={agreementChecked}
            onChange={(event) => setAgreementChecked(event.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-rizzora-pink"
          />
          <span>
            I agree to the{" "}
            <Link href="/m/membership-legal?tab=benefits" className="font-bold text-rizzora-pink">
              VIP Membership Benefits Agreement
            </Link>{" "}
            and{" "}
            <Link href="/m/membership-legal?tab=renewal" className="font-bold text-rizzora-pink">
              Automatic renewal Agreement
            </Link>
          </span>
        </label>
      </div>
    </ModalFrame>
  );
}
