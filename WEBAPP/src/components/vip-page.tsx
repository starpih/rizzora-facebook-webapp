"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneShell } from "./phone-shell";

const vipPlans = [
  {
    id: "monthly-basic",
    label: "Monthly",
    price: "$9.95",
    original: "$19.9",
    featured: false,
    withFire: false
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "$24.95",
    original: "$58",
    featured: true,
    withFire: true
  },
  {
    id: "monthly-premium",
    label: "Monthly",
    price: "$89.95",
    original: "$179.9",
    featured: false,
    withFire: false
  }
];

const vipBenefits = [
  {
    id: "discount",
    content: "50% off your first billing period. Renews at the regular price from the next cycle."
  },
  {
    id: "renewal",
    content: "VIP membership - Auto-renews, cancel anytime"
  },
  {
    id: "monthly-credits",
    content: "Generous monthly credits to keep chatting with Chris"
  },
  {
    id: "top-up-discount",
    content: "VIP discount on extra Credit top-ups"
  },
  {
    id: "memory",
    content: "Enhanced memory - Chris remembers you better over time"
  }
];

export function VipPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [shakeAgreement, setShakeAgreement] = useState(false);

  function handleGetPremium() {
    if (agreementChecked) {
      window.localStorage.setItem("rizzora-vip", "true");
      router.push("/m/chat/main-character");
      return;
    }

    setShakeAgreement(false);
    window.setTimeout(() => setShakeAgreement(true), 0);
    window.setTimeout(() => setShakeAgreement(false), 320);
  }

  return (
    <PhoneShell>
      <main className="relative min-h-[100svh] overflow-y-auto bg-[rgba(52,48,79,0.8)] backdrop-blur-[5px] hidden-scrollbar">
        <section className="relative min-h-[100svh] bg-[linear-gradient(166deg,#36345a_5%,#1d1e39_72%)] px-4 pb-8 pt-4">
          <header className="relative flex h-8 items-center justify-center">
            <Link
              href="/m/chat/main-character"
              aria-label="Back to chat"
              className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border border-[#e858af]/30 bg-[#e858af]/15 transition active:scale-95"
            >
              <span className="relative grid size-4 rotate-90 place-items-center">
                <Image src="/assets/vip-back.svg" alt="" fill sizes="16px" className="object-contain" />
              </span>
            </Link>
            <h1 className="text-center text-[16px] font-semibold leading-6 text-[#f5f2fa]">
              VIP Membership Plan
            </h1>
          </header>

          <div className="mt-12 grid grid-cols-3 gap-2">
            {vipPlans.map((plan) => {
              const selected = selectedPlan === plan.id;

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex min-w-0 flex-col items-center justify-center rounded-2xl border bg-[rgba(169,162,186,0.1)] px-2 pb-3 pt-5 transition active:scale-[0.98] ${
                    selected ? "border-[#e858af]" : "border-[#403d66]"
                  }`}
                >
                  <span className="absolute left-1/2 top-[-13px] flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-[rgba(169,162,186,0.27)] bg-[#e858af] px-[9px] py-[3px] text-[12px] leading-[18px] text-white">
                    {plan.withFire && (
                      <span className="relative size-4">
                        <Image src="/assets/vip-fire.svg" alt="" fill sizes="16px" className="object-contain" />
                      </span>
                    )}
                    50% OFF
                  </span>
                  <div className="pb-1 text-center font-mono text-[14px] font-semibold leading-[21px] text-[#766f91]">
                    {plan.label}
                  </div>
                  <div
                    className={`mt-1 text-center text-[24px] font-semibold leading-8 ${
                      selected ? "text-[#e858af]" : "text-[#a9a2ba]"
                    }`}
                  >
                    {plan.price}
                  </div>
                  <div className={`text-center text-[14px] leading-[21px] line-through ${selected ? "text-[#a9a2ba]" : "text-[#766f91]"}`}>
                    {plan.original}
                  </div>
                </button>
              );
            })}
          </div>

          <ul className="mt-8 space-y-[10px]">
            {vipBenefits.map((benefit) => (
              <li key={benefit.id} className="flex items-start gap-[10px] text-[12px] leading-[18px] text-[#a9a2ba]">
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#f2b84b]/13">
                  <span className="relative size-[9px]">
                    <Image src="/assets/vip-check.svg" alt="" fill sizes="9px" className="object-contain" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">{benefit.content}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleGetPremium}
            className="mt-4 h-[51px] w-full rounded-[10px] bg-[linear-gradient(171deg,#f2b84b_2%,#d4943a_98%)] text-center text-[14px] font-semibold leading-5 text-[#1a1200] shadow-[0_4px_8px_rgba(242,184,75,0.25)] transition active:scale-[0.98]"
          >
            Get Premium
          </button>

          <label
            className={`mt-4 flex min-h-10 items-start gap-2 text-[12px] leading-4 text-[#f5f2fa] ${shakeAgreement ? "agreement-shake" : ""}`}
          >
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(event) => setAgreementChecked(event.target.checked)}
              className="mt-1 size-5 shrink-0 appearance-none border-2 border-[#403d66] bg-[#1d1e39] checked:border-[#e858af] checked:bg-[#e858af]"
            />
            <span className="min-w-0 flex-1">
              I agree to the{" "}
              <Link href="/m/membership-legal?tab=benefits" className="font-bold text-[#ff5fbd]">
                VIP Membership Benefits Agreement
              </Link>{" "}
              and{" "}
              <Link href="/m/membership-legal?tab=renewal" className="font-bold text-[#ff5fbd]">
                Automatic renewal Agreement
              </Link>
            </span>
          </label>
        </section>
      </main>
    </PhoneShell>
  );
}
