"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { PhoneShell } from "./phone-shell";

type LegalTab = "privacy" | "terms";

const privacySections = [
  {
    title: "1. Information We Use",
    body: "Rizzora uses basic account information, such as your display name, avatar, login provider identifier, and subscription status, to provide a private and personal companion experience. If you log in with Facebook, we may receive the information you authorize through Facebook Login."
  },
  {
    title: "2. Conversation Memory",
    body: "When you create an account, Chris can remember your conversations and get to know you better over time. This memory is used to keep the experience continuous, personal, and emotionally relevant."
  },
  {
    title: "3. Private Information",
    body: "We do not ask for sensitive private information such as government IDs, financial account numbers, health records, or precise location for this MVP experience. Please avoid sending sensitive personal information in chat."
  },
  {
    title: "4. How We Protect Your Experience",
    body: "We use reasonable technical and organizational measures to protect account access, conversation continuity, subscription state, and product analytics from unauthorized access or misuse."
  },
  {
    title: "5. Product Analytics",
    body: "We may collect product events such as page views, message actions, quota prompts, login prompts, and subscription prompts to understand whether the Facebook acquisition flow is working and to improve the WebApp experience."
  },
  {
    title: "6. Your Choices",
    body: "You can stop using the service at any time, log out from the user center, or manage subscription renewal where available. Future versions may include fuller account deletion and memory management controls."
  }
];

const termsSections = [
  {
    title: "1. Service Description",
    body: "Rizzora is an AI virtual companion WebApp. The current MVP provides a mobile-first experience where users can enter from Facebook, chat with one promoted companion, create an account, and view subscription prompts."
  },
  {
    title: "2. Eligibility",
    body: "You should only use Rizzora if you are legally allowed to use online digital services in your location. You are responsible for complying with local laws and platform rules."
  },
  {
    title: "3. AI Companion Content",
    body: "Responses are generated for companionship and entertainment. They should not be treated as professional advice, medical advice, legal advice, financial advice, or emergency support."
  },
  {
    title: "4. User Conduct",
    body: "You agree not to use Rizzora to submit illegal, harmful, abusive, exploitative, or privacy-invasive content. The service is designed to feel romantic, private, and emotionally supportive while remaining respectful and safe."
  },
  {
    title: "5. Free Quota and Subscription",
    body: "The MVP may provide free message quota and subscription prompts. Pricing, renewal terms, benefits, and cancellation controls should be reviewed before purchase when real payment is enabled."
  },
  {
    title: "6. Changes to the Service",
    body: "Rizzora may adjust features, quota rules, subscription benefits, companion behavior, or available pages as the MVP evolves. Material changes should be reflected in the product and supporting documents."
  }
];

export function LegalPage() {
  const [activeTab, setActiveTab] = useState<LegalTab>("privacy");

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "terms" || tab === "privacy") {
      setActiveTab(tab);
    }
  }, []);

  const sections = activeTab === "privacy" ? privacySections : termsSections;

  return (
    <PhoneShell>
      <div className="relative h-[100svh] overflow-hidden bg-rizzora-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.18),transparent_21rem)]" />
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
              <h1 className="text-[16px] font-bold">Legal Agreements</h1>
              <p className="text-[11px] text-rizzora-muted">Review before continuing</p>
            </div>
          </div>
          <div className="grid h-11 grid-cols-2 rounded-xl bg-[#171632] p-1">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`rounded-lg text-[13px] font-bold transition ${activeTab === "privacy" ? "primary-gradient text-white" : "text-rizzora-muted"}`}
            >
              Privacy Agreement
            </button>
            <button
              onClick={() => setActiveTab("terms")}
              className={`rounded-lg text-[13px] font-bold transition ${activeTab === "terms" ? "primary-gradient text-white" : "text-rizzora-muted"}`}
            >
              Terms of User
            </button>
          </div>
        </header>

        <main className="relative z-10 h-[calc(100svh-122px)] overflow-y-auto px-4 pb-8 pt-5 hidden-scrollbar">
          <section className="glass-panel rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-rizzora-pink/16 text-rizzora-pink">
                <ShieldCheck size={20} />
              </span>
              <div>
                <h2 className="text-[18px] font-bold">
                  {activeTab === "privacy" ? "Privacy Agreement" : "Terms of User"}
                </h2>
                <p className="text-[12px] text-rizzora-muted">Rizzora MVP WebApp</p>
              </div>
            </div>
            <p className="text-[13px] leading-[1.55] text-white/[0.78]">
              This page is a product-facing MVP draft and should be reviewed by legal counsel before production launch.
            </p>
          </section>

          <div className="mt-4 space-y-3">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
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
