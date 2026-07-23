"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Brain, ChevronLeft, Database, EyeOff, KeyRound, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
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
    title: "Account Data",
    body: "Rizzora keeps only the account information needed to provide login, membership, and chat access.",
    status: "Limited"
  },
  {
    icon: EyeOff,
    title: "Private Information",
    body: "Sensitive personal information is not required for the MVP experience.",
    status: "Protected"
  }
];

const dataControls = [
  {
    key: "modelTraining",
    icon: Brain,
    title: "Allow Data for Model Training",
    body:
      "Let Rizzora use your conversations and feedback to improve AI model quality for all users. We apply privacy safeguards before data is used for training."
  },
  {
    key: "conversationPersonalization",
    icon: Sparkles,
    title: "Personalize With Conversation History",
    body:
      "Let Rizzora use your past conversations to remember your preferences, tone, and relationship context for a more personal experience."
  }
] as const;

type DataControlKey = (typeof dataControls)[number]["key"];

export function PrivacySecurityPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dataControlState, setDataControlState] = useState<Record<DataControlKey, boolean>>({
    modelTraining: false,
    conversationPersonalization: true
  });
  const [scrollHintState, setScrollHintState] = useState({
    hasTopOverflow: false,
    hasBottomOverflow: false
  });
  const [hasMounted, setHasMounted] = useState(false);

  function toggleDataControl(key: DataControlKey) {
    setDataControlState((current) => ({
      ...current,
      [key]: !current[key]
    }));
  }

  useEffect(() => {
    setHasMounted(true);

    function updateScrollHints() {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      setScrollHintState({
        hasTopOverflow: scrollTop > 4,
        hasBottomOverflow: scrollTop + clientHeight < scrollHeight - 4
      });
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    updateScrollHints();
    scrollContainer.addEventListener("scroll", updateScrollHints, { passive: true });
    window.addEventListener("resize", updateScrollHints);

    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollHints);
      window.removeEventListener("resize", updateScrollHints);
    };
  }, []);

  return (
    <PhoneShell>
      <div ref={scrollContainerRef} className="relative h-full overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.18),transparent_22rem)]" />
        <div
          className={`pointer-events-none sticky top-0 z-30 h-0 transition-opacity duration-300 ${
            hasMounted && scrollHintState.hasTopOverflow ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-8 bg-gradient-to-b from-[#191833] via-[#191833]/86 to-transparent shadow-[0_12px_24px_rgba(0,0,0,0.24)]" />
        </div>
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

        <main className="relative z-10 px-4 pb-24 pt-5">
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

          <section className="mt-5">
            <div className="mb-3 px-1">
              <h2 className="text-[14px] font-bold text-white">Data Controls</h2>
              <p className="mt-1 text-[12px] leading-[1.45] text-rizzora-muted">
                Choose how your conversations may be used beyond the core service.
              </p>
            </div>

            <div className="space-y-3">
              {dataControls.map((item) => {
                const Icon = item.icon;
                const isEnabled = dataControlState[item.key];

                return (
                  <article key={item.key} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rizzora-pink/14 text-rizzora-pink">
                        <Icon size={19} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[15px] font-bold leading-[1.25] text-white">{item.title}</h3>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isEnabled}
                            aria-label={item.title}
                            onClick={() => toggleDataControl(item.key)}
                            className={`relative h-7 w-12 shrink-0 rounded-full transition active:scale-95 ${
                              isEnabled
                                ? "border border-rizzora-pink/55 bg-rizzora-pink shadow-[0_0_18px_rgba(234,78,184,0.36)]"
                                : "bg-white/10"
                            }`}
                          >
                            <span
                              className={`absolute top-1 size-5 rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.3)] transition ${
                                isEnabled ? "left-6" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                        <p className="mt-2 text-[13px] leading-[1.5] text-rizzora-muted">{item.body}</p>
                        <p className="mt-2 text-[11px] font-semibold text-white/50">
                          {isEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <button className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#ff6b8f]/25 bg-[#ff6b8f]/8 text-[15px] font-bold text-[#ff8aa6] transition active:scale-[0.99]">
            <Trash2 size={18} />
            Delete Account
          </button>
        </main>

        <div
          className={`pointer-events-none sticky bottom-0 z-30 h-0 transition-opacity duration-300 ${
            hasMounted && scrollHintState.hasBottomOverflow ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="-translate-y-full">
            <div className="h-20 bg-gradient-to-t from-[#191833] via-[#191833]/82 to-transparent" />
            <div className="absolute bottom-4 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/18 shadow-[0_0_16px_rgba(234,78,184,0.28)]" />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
