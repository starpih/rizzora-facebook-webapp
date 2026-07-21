"use client";

import Link from "next/link";
import { ChevronLeft, Database, EyeOff, KeyRound, ShieldCheck, Trash2 } from "lucide-react";
import { PhoneShell } from "./phone-shell";

const securityItems = [
  {
    icon: KeyRound,
    title: "Sign-in Methods",
    body: "Facebook Login and Google authorization are enabled for this WebApp flow.",
    status: "Active"
  },
  {
    icon: Database,
    title: "Conversation Memory",
    body: "Chris can remember account-based conversations to keep the experience continuous.",
    status: "On"
  },
  {
    icon: EyeOff,
    title: "Private Information",
    body: "Sensitive personal information is not required for the MVP experience.",
    status: "Protected"
  }
];

export function PrivacySecurityPage() {
  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.18),transparent_22rem)]" />
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 px-4">
          <Link
            href="/m/user-center"
            className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
            aria-label="Back to user center"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-[16px] font-bold">Privacy & Security</h1>
            <p className="text-[11px] text-rizzora-muted">Manage account safety and data controls</p>
          </div>
        </header>

        <main className="relative z-10 px-4 pb-8 pt-5">
          <section className="glass-panel rounded-2xl p-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-rizzora-pink/16 text-rizzora-pink">
                <ShieldCheck size={22} />
              </span>
              <div>
                <h2 className="text-[18px] font-bold">Your account is protected</h2>
                <p className="text-[12px] text-rizzora-muted">MVP security overview</p>
              </div>
            </div>
            <p className="text-[13px] leading-[1.55] text-white/[0.78]">
              Rizzora uses authorized social login, limited account data, and privacy-first product controls to keep
              the companion experience personal without asking for sensitive private information.
            </p>
          </section>

          <section className="mt-4 space-y-3">
            {securityItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rizzora-pink/14 text-rizzora-pink">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[15px] font-bold text-white">{item.title}</h3>
                        <span className="shrink-0 rounded-full border border-rizzora-pink/25 bg-rizzora-pink/10 px-2.5 py-1 text-[11px] font-semibold text-rizzora-pink">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-[13px] leading-[1.5] text-rizzora-muted">{item.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <button className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#ff6b8f]/25 bg-[#ff6b8f]/8 text-[15px] font-bold text-[#ff8aa6] transition active:scale-[0.99]">
            <Trash2 size={18} />
            Delete Account
          </button>
        </main>
      </div>
    </PhoneShell>
  );
}
