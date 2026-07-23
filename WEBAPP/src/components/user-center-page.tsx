"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  LogOut,
  PlusCircle,
  ShieldCheck
} from "lucide-react";
import { PhoneShell } from "./phone-shell";

type AccountState = "free" | "vip";

const mockUser = {
  name: "Mumu",
  avatar: "/assets/user-avatar.png",
  free: {
    plan: "Free",
    extraCreditsRemainingPercent: 0
  },
  vip: {
    plan: "VIP",
    monthlyCreditsRemainingPercent: 68,
    monthlyResetLabel: "Resets on Aug 1",
    extraCreditsRemainingPercent: 92,
    billingCycle: "Quarterly"
  }
};

export function UserCenterPage() {
  const [accountState, setAccountState] = useState<AccountState>("free");
  const isVip = accountState === "vip";
  const accountLabel = isVip ? "Premium" : `${mockUser.free.plan} Account`;

  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get("state");
    if (state === "vip" || window.localStorage.getItem("rizzora-vip") === "true") {
      setAccountState("vip");
    }
  }, []);

  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.2),transparent_20rem)]" />
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 px-4">
          <Link
            href="/m/chat/main-character"
            className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
            aria-label="Back to chat"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-[16px] font-bold">User Center</h1>
        </header>

        <main className="relative z-10 px-4 pb-8 pt-6">
          <section className="glass-panel rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="primary-gradient rounded-full p-[2px]">
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  width={72}
                  height={72}
                  className="size-[72px] rounded-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-[22px] font-bold">{mockUser.name}</h2>
                <div
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-[12px] font-semibold ${
                    isVip
                      ? "border-rizzora-gold/35 bg-rizzora-gold/12 text-rizzora-gold"
                      : "border-white/10 bg-white/[0.06] text-rizzora-muted"
                  }`}
                >
                  {accountLabel}
                </div>
              </div>
            </div>
          </section>

          {isVip ? <VipMembershipCard /> : <FreeMembershipCard />}

          <div className="mt-4 space-y-3">
            {isVip && (
              <CreditUsageCard
                icon={MessageCircle}
                title="Monthly Credits"
                percent={mockUser.vip.monthlyCreditsRemainingPercent}
                description={mockUser.vip.monthlyResetLabel}
                accent="pink"
              />
            )}
            <CreditUsageCard
              icon={PlusCircle}
              title="Extra Credits"
              percent={isVip ? mockUser.vip.extraCreditsRemainingPercent : mockUser.free.extraCreditsRemainingPercent}
              description="Extra Credits are purchased separately and do not reset monthly."
              accent="gold"
              actionHref="/m/recharge"
              actionLabel="Recharge Credits"
            />
          </div>

          <section className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
            <MenuItem href="/m/privacy-security" icon={ShieldCheck} label="Privacy & Security" />
            <MenuItem href="/m/notifications" icon={Bell} label="Notifications" />
          </section>

          <button className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] text-[15px] font-bold text-rizzora-muted transition active:scale-[0.99]">
            <LogOut size={18} />
            Log out
          </button>
        </main>
      </div>
    </PhoneShell>
  );
}

function FreeMembershipCard() {
  return (
    <section className="glass-panel mt-4 rounded-2xl p-4">
      <div className="mb-4">
        <p className="text-[12px] text-rizzora-muted">Membership</p>
        <h3 className="mt-1 text-[18px] font-bold">Free Plan</h3>
      </div>
      <div className="rounded-xl bg-[#191733] p-3 text-[13px] leading-[1.45] text-rizzora-muted">
        Become VIP to get generous monthly credits, better memory, and discounts on extra Credit top-ups.
      </div>
      <Link
        href="/m/vip"
        className="gold-gradient mt-4 flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-bold text-[#27192c]"
      >
        Become VIP
      </Link>
    </section>
  );
}

function VipMembershipCard() {
  return (
    <section className="glass-panel mt-4 rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-rizzora-muted">Membership</p>
          <h3 className="mt-1 truncate text-[18px] font-bold text-rizzora-gold">
            VIP Plan <span className="text-[13px] font-semibold text-rizzora-muted">· {mockUser.vip.billingCycle} Billing</span>
          </h3>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rizzora-gold/18">
          <Image src="/assets/Crown.svg" alt="" width={24} height={24} className="size-6 object-contain" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          href="/m/vip"
          className="flex h-11 items-center justify-center rounded-xl border border-rizzora-gold/30 bg-rizzora-gold/12 text-[13px] font-bold text-rizzora-gold transition active:scale-[0.98]"
        >
          View Plan
        </Link>
        <Link
          href="/m/subscription-management"
          className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[13px] font-bold text-white/85 transition active:scale-[0.98]"
        >
          Manage Renewal
        </Link>
      </div>
    </section>
  );
}

function CreditUsageCard({
  icon: Icon,
  title,
  percent,
  description,
  accent,
  actionHref,
  actionLabel
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  percent: number;
  description: string;
  accent: "pink" | "gold";
  actionHref?: string;
  actionLabel?: string;
}) {
  const isGold = accent === "gold";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-start gap-3">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${
            isGold ? "bg-rizzora-gold/18 text-rizzora-gold" : "bg-rizzora-pink/14 text-rizzora-pink"
          }`}
        >
          <Icon size={19} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-bold text-white">{title}</h3>
            <span className={`text-[13px] font-bold ${isGold ? "text-rizzora-gold" : "text-rizzora-pink"}`}>
              {percent}% remaining
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full ${isGold ? "gold-gradient" : "primary-gradient"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-3 text-[13px] leading-[1.45] text-rizzora-muted">{description}</p>
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className="mt-4 flex h-11 w-full items-center justify-center rounded-xl border border-rizzora-gold/30 bg-rizzora-gold/12 text-[14px] font-bold text-rizzora-gold transition active:scale-[0.98]"
            >
              {actionLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function MenuItem({
  href,
  icon: Icon,
  label
}: {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <Link href={href} className="flex h-14 w-full items-center gap-3 border-b border-white/10 px-4 text-left last:border-b-0">
      <span className="grid size-9 place-items-center rounded-xl bg-rizzora-pink/14 text-rizzora-pink">
        <Icon size={18} />
      </span>
      <span className="flex-1 text-[14px] font-semibold">{label}</span>
      <ChevronRight size={17} className="text-rizzora-muted" />
    </Link>
  );
}
