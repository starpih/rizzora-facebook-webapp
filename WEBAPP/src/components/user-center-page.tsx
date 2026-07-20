"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LogOut,
  ShieldCheck
} from "lucide-react";
import { PhoneShell } from "./phone-shell";

const mockUser = {
  name: "Mumu",
  avatar: "/assets/user-avatar.png",
  plan: "Free",
  renewal: "Not active"
};

export function UserCenterPage() {
  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.2),transparent_20rem)]" />
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b border-white/10 bg-[#1f1d3d]/70 px-4 backdrop-blur-[10px]">
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
                <div className="mt-2 inline-flex rounded-full border border-rizzora-pink/30 bg-rizzora-pink/12 px-3 py-1 text-[12px] font-semibold text-rizzora-pink">
                  {mockUser.plan} Account
                </div>
              </div>
            </div>
          </section>

          <section className="glass-panel mt-4 rounded-2xl p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-rizzora-muted">Subscription</p>
                <h3 className="mt-1 text-[18px] font-bold">{mockUser.plan} Plan</h3>
              </div>
              <div className="grid size-11 place-items-center rounded-xl bg-rizzora-gold/18 text-rizzora-gold">
                <CreditCard size={20} />
              </div>
            </div>
            <div className="rounded-xl bg-[#191733] p-3 text-[13px] text-rizzora-muted">
              Automatic renewal: <span className="font-semibold text-white">{mockUser.renewal}</span>
            </div>
            <Link
              href="/m/vip"
              className="gold-gradient mt-4 flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-bold text-[#27192c]"
            >
              Manage Automatic Renewal
            </Link>
          </section>

          <section className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
            <MenuItem icon={ShieldCheck} label="Privacy & Security" />
            <MenuItem icon={Bell} label="Notifications" />
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

function MenuItem({
  icon: Icon,
  label
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <button className="flex h-14 w-full items-center gap-3 border-b border-white/10 px-4 text-left last:border-b-0">
      <span className="grid size-9 place-items-center rounded-xl bg-rizzora-pink/14 text-rizzora-pink">
        <Icon size={18} />
      </span>
      <span className="flex-1 text-[14px] font-semibold">{label}</span>
      <ChevronRight size={17} className="text-rizzora-muted" />
    </button>
  );
}
