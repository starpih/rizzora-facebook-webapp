"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronLeft, Crown, Heart, Inbox, MessageCircle } from "lucide-react";
import { PhoneShell } from "./phone-shell";

type NotificationState = "list" | "empty";

const notifications = [
  {
    icon: MessageCircle,
    title: "Chris replied to you",
    body: "He is waiting for your next message in chat.",
    time: "2 min ago",
    tone: "pink"
  },
  {
    icon: Heart,
    title: "Your free quota was updated",
    body: "You have 30 free messages available before VIP is required.",
    time: "Today",
    tone: "pink"
  },
  {
    icon: Crown,
    title: "VIP membership available",
    body: "Unlock unlimited heartwarming message replies.",
    time: "Yesterday",
    tone: "gold"
  }
];

export function NotificationsPage() {
  const [state, setState] = useState<NotificationState>("list");

  useEffect(() => {
    const queryState = new URLSearchParams(window.location.search).get("state");
    if (queryState === "empty" || queryState === "list") {
      setState(queryState);
    }
  }, []);

  const isEmpty = state === "empty";

  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.18),transparent_22rem)]" />
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1f1d3d]/80 px-4 pb-3 pt-4 backdrop-blur-[10px]">
          <div className="mb-4 flex h-10 items-center gap-3">
            <Link
              href="/m/user-center"
              className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
              aria-label="Back to user center"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold">Notifications</h1>
              <p className="text-[11px] text-rizzora-muted">Updates from Rizzora and Chris</p>
            </div>
          </div>
          <div className="grid h-11 grid-cols-2 rounded-xl bg-[#171632] p-1">
            <Link
              href="/m/notifications"
              onClick={() => setState("list")}
              className={`flex items-center justify-center rounded-lg text-[13px] font-bold transition ${
                !isEmpty ? "primary-gradient text-white" : "text-rizzora-muted"
              }`}
            >
              List
            </Link>
            <Link
              href="/m/notifications?state=empty"
              onClick={() => setState("empty")}
              className={`flex items-center justify-center rounded-lg text-[13px] font-bold transition ${
                isEmpty ? "primary-gradient text-white" : "text-rizzora-muted"
              }`}
            >
              Empty
            </Link>
          </div>
        </header>

        <main className="relative z-10 px-4 pb-8 pt-5">
          {isEmpty ? <NotificationsEmptyState /> : <NotificationsList />}
        </main>
      </div>
    </PhoneShell>
  );
}

function NotificationsList() {
  return (
    <div className="space-y-3">
      {notifications.map((item) => {
        const Icon = item.icon;
        const isGold = item.tone === "gold";

        return (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-start gap-3">
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                  isGold ? "bg-rizzora-gold/18 text-rizzora-gold" : "bg-rizzora-pink/14 text-rizzora-pink"
                }`}
              >
                <Icon size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[15px] font-bold text-white">{item.title}</h2>
                  <span className="shrink-0 text-[11px] text-rizzora-muted">{item.time}</span>
                </div>
                <p className="mt-2 text-[13px] leading-[1.5] text-rizzora-muted">{item.body}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function NotificationsEmptyState() {
  return (
    <section className="flex min-h-[calc(100svh-154px)] flex-col items-center justify-center text-center">
      <div className="grid size-20 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-rizzora-pink shadow-[0_0_34px_rgba(234,78,184,0.18)]">
        <Inbox size={32} />
      </div>
      <h2 className="mt-5 text-[22px] font-bold text-white">No notifications yet</h2>
      <p className="mt-2 max-w-[280px] text-[13px] leading-[1.55] text-rizzora-muted">
        Important account updates, chat reminders, and VIP messages will appear here.
      </p>
      <Link
        href="/m/chat/main-character"
        className="primary-gradient mt-6 flex h-12 w-full max-w-[260px] items-center justify-center gap-2 rounded-xl text-[15px] font-bold text-white transition active:scale-[0.98]"
      >
        <Bell size={17} />
        Back to Chat
      </Link>
    </section>
  );
}
