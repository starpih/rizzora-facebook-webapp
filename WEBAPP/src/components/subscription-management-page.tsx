"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, ChevronLeft, CreditCard, FileText, ShieldCheck, XCircle } from "lucide-react";
import { PhoneShell } from "./phone-shell";

type SubscriptionTab = "overview" | "records";

const currentSubscription = {
  planType: "VIP Membership",
  billingType: "Continuous quarterly plan",
  nextRenewalDate: "Aug 23, 2026",
  nextRenewalAmount: "$24.95",
  paymentMethod: "Visa ending in 4242",
  renewalStatus: "Auto-renewal active"
};

const purchaseRecords = [
  {
    subscriptionType: "Continuous quarterly plan",
    price: "$24.95",
    chargedAt: "Jul 23, 2026 10:42",
    orderId: "RZ-VIP-Q-20260723-0001",
    paymentMethod: "Visa ending in 4242"
  },
  {
    subscriptionType: "Extra Credits top-up",
    price: "$10.00",
    chargedAt: "Jul 20, 2026 18:16",
    orderId: "RZ-CRD-20260720-0048",
    paymentMethod: "Google Pay"
  },
  {
    subscriptionType: "Continuous monthly plan",
    price: "$9.95",
    chargedAt: "Jun 23, 2026 09:35",
    orderId: "RZ-VIP-M-20260623-0021",
    paymentMethod: "Visa ending in 4242"
  }
];

export function SubscriptionManagementPage() {
  const [activeTab, setActiveTab] = useState<SubscriptionTab>("overview");
  const [autoRenewalCancelled, setAutoRenewalCancelled] = useState(false);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "records" || tab === "overview") {
      setActiveTab(tab);
    }
  }, []);

  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,185,55,0.16),transparent_22rem)]" />
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1f1d3d]/80 px-4 pb-3 pt-4 backdrop-blur-[10px]">
          <div className="mb-4 flex h-10 items-center gap-3">
            <Link
              href="/m/user-center?state=vip"
              className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
              aria-label="Back to user center"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold">Subscription Management</h1>
              <p className="text-[11px] text-rizzora-muted">Manage VIP renewal and billing records</p>
            </div>
          </div>
          <div className="grid h-11 grid-cols-2 rounded-xl bg-[#171632] p-1">
            <Link
              href="/m/subscription-management"
              onClick={() => setActiveTab("overview")}
              className={`flex items-center justify-center rounded-lg text-[13px] font-bold transition ${
                activeTab === "overview" ? "gold-gradient text-[#27192c]" : "text-rizzora-muted"
              }`}
            >
              Subscription
            </Link>
            <Link
              href="/m/subscription-management?tab=records"
              onClick={() => setActiveTab("records")}
              className={`flex items-center justify-center rounded-lg text-[13px] font-bold transition ${
                activeTab === "records" ? "gold-gradient text-[#27192c]" : "text-rizzora-muted"
              }`}
            >
              Purchase Records
            </Link>
          </div>
        </header>

        <main className="relative z-10 px-4 pb-8 pt-5">
          {activeTab === "overview" ? (
            <SubscriptionOverview
              autoRenewalCancelled={autoRenewalCancelled}
              onCancel={() => setAutoRenewalCancelled(true)}
            />
          ) : (
            <PurchaseRecords />
          )}
        </main>
      </div>
    </PhoneShell>
  );
}

function SubscriptionOverview({
  autoRenewalCancelled,
  onCancel
}: {
  autoRenewalCancelled: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <section className="glass-panel rounded-2xl p-4">
        <div className="mb-4 flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rizzora-gold/18 text-rizzora-gold">
            <ShieldCheck size={21} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] text-rizzora-muted">Current Plan</p>
            <h2 className="mt-1 text-[20px] font-bold text-rizzora-gold">{currentSubscription.planType}</h2>
            <p className="mt-1 text-[13px] text-rizzora-muted">{currentSubscription.billingType}</p>
          </div>
        </div>
        <div className="rounded-xl bg-[#191733] p-3 text-[13px] leading-[1.45] text-rizzora-muted">
          {autoRenewalCancelled ? (
            <span>
              Auto-renewal: <b className="text-[#ff8aa6]">Cancelled</b>. Your VIP benefits remain available until the
              current paid period ends.
            </span>
          ) : (
            <span>
              Auto-renewal: <b className="text-white">{currentSubscription.renewalStatus}</b>
            </span>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        <InfoRow icon={CalendarClock} label="Next renewal date" value={currentSubscription.nextRenewalDate} />
        <InfoRow icon={FileText} label="Next renewal amount" value={currentSubscription.nextRenewalAmount} />
        <InfoRow icon={CreditCard} label="Payment method" value={currentSubscription.paymentMethod} last />
      </section>

      <button
        type="button"
        onClick={onCancel}
        disabled={autoRenewalCancelled}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#ff6b8f]/25 bg-[#ff6b8f]/8 text-[15px] font-bold text-[#ff8aa6] transition active:scale-[0.99] disabled:opacity-45"
      >
        <XCircle size={18} />
        {autoRenewalCancelled ? "Auto-renewal Cancelled" : "Cancel Auto-renewal"}
      </button>

      <p className="px-2 text-center text-[12px] leading-[1.5] text-rizzora-muted">
        Cancellation stops future renewal charges. It does not remove VIP access already granted for the current paid
        period.
      </p>
    </div>
  );
}

function PurchaseRecords() {
  return (
    <div className="space-y-3">
      {purchaseRecords.map((record) => (
        <article key={record.orderId} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-bold text-white">{record.subscriptionType}</h2>
              <p className="mt-1 text-[12px] text-rizzora-muted">{record.chargedAt}</p>
            </div>
            <span className="shrink-0 text-[18px] font-bold text-rizzora-gold">{record.price}</span>
          </div>
          <div className="space-y-2 rounded-xl bg-[#191733] p-3">
            <RecordRow label="Order ID" value={record.orderId} />
            <RecordRow label="Payment method" value={record.paymentMethod} />
          </div>
        </article>
      ))}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  last = false
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 py-3 ${last ? "" : "border-b border-white/10"}`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-rizzora-gold/18 text-rizzora-gold">
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] text-rizzora-muted">{label}</p>
        <p className="mt-1 text-[14px] font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function RecordRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-[12px]">
      <span className="shrink-0 text-rizzora-muted">{label}</span>
      <span className="min-w-0 text-right font-semibold text-white/85">{value}</span>
    </div>
  );
}
