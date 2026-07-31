"use client";

import Link from "next/link";
import { ChevronLeft, Heart, LockKeyhole, MessageCircle } from "lucide-react";
import { PhoneShell } from "./phone-shell";

const aboutSections = [
  {
    icon: Heart,
    title: "Emotional companionship, designed with care",
    body:
      "Rizzora creates AI-powered virtual companion experiences for adults who want private, warm and emotionally supportive conversations."
  },
  {
    icon: MessageCircle,
    title: "Text-first experience",
    body:
      "The current WebApp focuses on text-based interaction with Chris, a promoted AI companion designed for gentle, personal and respectful conversations."
  },
  {
    icon: LockKeyhole,
    title: "Private and safe",
    body:
      "We design Rizzora around privacy, safety and user control. The experience should feel romantic and premium without becoming vulgar or unsafe."
  }
];

export function AboutUsPage() {
  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.2),transparent_22rem)]" />
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b border-white/10 bg-[#1f1d3d]/72 px-4 backdrop-blur-[10px]">
          <Link
            href="/m/c/main-character"
            className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
            aria-label="Back to entry"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-[16px] font-bold">About Us</h1>
        </header>

        <main className="relative z-10 px-4 pb-8 pt-6">
          <section className="glass-panel rounded-2xl p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-rizzora-pink">Rizzora</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-white">
              A private AI companion experience for meaningful conversations.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.6] text-rizzora-muted">
              Rizzora is operated by VOCOSMOS PTE. LTD., a Singapore-registered company. Our current MVP is a
              mobile-first WebApp experience centered on Chris, an AI virtual male companion for adult users.
            </p>
          </section>

          <div className="mt-4 space-y-3">
            {aboutSections.map((section) => {
              const Icon = section.icon;

              return (
                <article key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rizzora-pink/14 text-rizzora-pink">
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold text-white">{section.title}</h3>
                      <p className="mt-2 text-[13px] leading-[1.55] text-rizzora-muted">{section.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-[13px] leading-[1.6] text-rizzora-muted">
            <p>Contact: support@rizzora.ai</p>
            <p>Company: VOCOSMOS PTE. LTD.</p>
            <p>Location: Singapore</p>
          </section>
        </main>
      </div>
    </PhoneShell>
  );
}
