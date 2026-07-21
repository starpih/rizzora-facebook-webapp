"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PhoneShell } from "./phone-shell";

type MembershipLegalTab = "benefits" | "renewal";

const benefitsSections = [
  {
    title: "1. Membership Benefits",
    body: "VIP and SVIP membership benefits may include expanded access to chat replies, voice plays, custom AI characters, custom voices, lifestyle photo views, dynamic video views, memory features, and early access to new features. The exact benefits shown at checkout apply to the selected plan."
  },
  {
    title: "2. Plan Differences",
    body: "Different membership tiers may provide different levels of access, priority, content availability, companion customization, and memory depth. Rizzora may update plan names, benefits, or limits as the MVP evolves."
  },
  {
    title: "3. Availability",
    body: "Some benefits depend on device compatibility, browser support, regional availability, backend capacity, AI model availability, and payment status. If a feature is temporarily unavailable, Rizzora may provide a reasonable product adjustment where applicable."
  },
  {
    title: "4. Usage Rules",
    body: "Membership benefits are intended for personal use only. Users may not resell, share, abuse, automate, or exploit access in a way that harms the service, other users, or platform stability."
  },
  {
    title: "5. Changes to Benefits",
    body: "Rizzora may modify membership benefits during the MVP period to improve product quality, control operating cost, comply with platform rules, or support future versions. Material changes should be reflected in product UI or supporting documents."
  }
];

const renewalSections = [
  {
    title: "1. Automatic Renewal",
    body: "If you choose a membership plan with automatic renewal, your selected payment method may be charged at the end of each billing period unless renewal is cancelled before the next charge date."
  },
  {
    title: "2. Billing Cycle",
    body: "Billing cycles may be monthly, quarterly, or yearly depending on your selected plan. The plan page displays the selected cycle, price, and unit before purchase."
  },
  {
    title: "3. Renewal Management",
    body: "You may manage automatic renewal from the user center where available. If payment is handled by an app store, payment provider, or third-party platform, cancellation may need to be completed through that provider."
  },
  {
    title: "4. Failed Payment",
    body: "If a renewal payment fails, membership benefits may be paused, downgraded, or cancelled until payment is completed. Rizzora may retry payment according to payment provider rules."
  },
  {
    title: "5. Price or Benefit Changes",
    body: "If pricing, billing cycle, or key benefits change materially, Rizzora should provide notice in the product or through a reasonable communication method before applying those changes where required."
  },
  {
    title: "6. Cancellation",
    body: "Cancellation stops future renewal charges. It does not necessarily refund past payments or remove access already granted for the current billing period unless required by applicable law or platform policy."
  }
];

export function MembershipLegalPage() {
  const [activeTab, setActiveTab] = useState<MembershipLegalTab>("benefits");

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "benefits" || tab === "renewal") {
      setActiveTab(tab);
    }
  }, []);

  const sections = activeTab === "benefits" ? benefitsSections : renewalSections;

  return (
    <PhoneShell>
      <div className="relative h-[100svh] overflow-hidden bg-rizzora-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,185,55,0.16),transparent_21rem)]" />
        <header className="relative z-20 border-b border-white/10 bg-[#1f1d3d]/80 px-4 pb-3 pt-4 backdrop-blur-[10px]">
          <div className="mb-4 flex h-10 items-center gap-3">
            <Link
              href="/m/chat/main-character"
              className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
              aria-label="Back to chat"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold">Membership Agreements</h1>
              <p className="text-[11px] text-rizzora-muted">Review before purchase</p>
            </div>
          </div>
          <div className="grid h-11 grid-cols-2 rounded-xl bg-[#171632] p-1">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`rounded-lg text-[12px] font-bold transition ${activeTab === "benefits" ? "gold-gradient text-[#27192c]" : "text-rizzora-muted"}`}
            >
              VIP Benefits
            </button>
            <button
              onClick={() => setActiveTab("renewal")}
              className={`rounded-lg text-[12px] font-bold transition ${activeTab === "renewal" ? "gold-gradient text-[#27192c]" : "text-rizzora-muted"}`}
            >
              Auto Renewal
            </button>
          </div>
        </header>

        <main className="relative z-10 h-[calc(100svh-122px)] overflow-y-auto px-4 pb-8 pt-5 hidden-scrollbar">
          <div className="space-y-5">
            {sections.map((section) => (
              <section key={section.title}>
                <h3 className="text-[15px] font-bold text-white">{section.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-rizzora-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </PhoneShell>
  );
}
