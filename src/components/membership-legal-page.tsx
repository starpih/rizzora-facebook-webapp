"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { paymentTermsSections, refundPolicySections } from "@/lib/legal-content";
import { PhoneShell } from "./phone-shell";

type MembershipLegalTab = "payment" | "refund";

export function MembershipLegalPage() {
  const [activeTab, setActiveTab] = useState<MembershipLegalTab>("payment");

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "payment" || tab === "refund") {
      setActiveTab(tab);
    }
  }, []);

  const sections = activeTab === "payment" ? paymentTermsSections : refundPolicySections;

  return (
    <PhoneShell>
      <div className="relative h-[100svh] overflow-hidden bg-rizzora-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,185,55,0.16),transparent_21rem)]" />
        <header className="relative z-20 border-b border-white/10 bg-[#1f1d3d]/80 px-4 pb-3 pt-4 backdrop-blur-[10px]">
          <div className="mb-4 flex h-10 items-center gap-3">
            <Link
              href="/m/vip"
              className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
              aria-label="Back to VIP"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold">Payment Terms / Refund Policy</h1>
              <p className="text-[11px] text-rizzora-muted">Review before purchase</p>
            </div>
          </div>
          <div className="grid h-11 grid-cols-2 rounded-xl bg-[#171632] p-1">
            <Link
              href="/m/membership-legal?tab=payment"
              onClick={() => setActiveTab("payment")}
              className={`flex items-center justify-center rounded-lg text-[12px] font-bold transition ${
                activeTab === "payment" ? "gold-gradient text-[#27192c]" : "text-rizzora-muted"
              }`}
            >
              Payment Terms
            </Link>
            <Link
              href="/m/membership-legal?tab=refund"
              onClick={() => setActiveTab("refund")}
              className={`flex items-center justify-center rounded-lg text-[12px] font-bold transition ${
                activeTab === "refund" ? "gold-gradient text-[#27192c]" : "text-rizzora-muted"
              }`}
            >
              Refund Policy
            </Link>
          </div>
        </header>

        <main className="relative z-10 h-[calc(100svh-122px)] overflow-y-auto px-4 pb-8 pt-5 hidden-scrollbar">
          <div className="space-y-5">
            {sections.map((section) => (
              <section key={section.title}>
                <h3 className="text-[15px] font-bold text-white">{section.title}</h3>
                <p className="mt-2 whitespace-pre-line text-[13px] leading-[1.6] text-rizzora-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </PhoneShell>
  );
}
