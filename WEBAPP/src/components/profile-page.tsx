"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Crown, LogOut, Sparkles } from "lucide-react";
import { companion, diary, profileFields } from "@/lib/mock-data";
import { PhoneShell } from "./phone-shell";

export function ProfilePage() {
  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b border-white/10 bg-[#1f1d3d]/95 px-4 backdrop-blur-xl">
          <Link href="/m/chat/main-character" className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-[16px] font-bold">{companion.fullName}</h1>
        </header>
        <section className="relative h-[320px]">
          <Image
            src={companion.profileImage}
            alt={companion.fullName}
            fill
            priority
            sizes="393px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rizzora-bg" />
          <button className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-[#201e3c]/80 text-white">
            <Sparkles size={18} />
          </button>
        </section>
        <section className="-mt-4 px-4 pb-8">
          <div className="flex gap-2 overflow-x-auto pb-4 hidden-scrollbar">
            {[companion.profileImage, companion.avatar, companion.entryImage].map((image, index) => (
              <div key={image} className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border ${index === 0 ? "border-rizzora-pink" : "border-white/10"}`}>
                <Image src={image} alt="" fill sizes="64px" className="object-cover" />
              </div>
            ))}
            <button className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-white/10 text-rizzora-muted">
              <Crown size={20} />
            </button>
          </div>
          <h2 className="font-display text-[34px] font-bold text-white">{companion.fullName}</h2>
          <p className="mt-1 text-[13px] text-rizzora-muted">Last chatted {companion.lastChatted}</p>
          <p className="mt-5 text-[14px] leading-[1.55] text-white/[0.76]">{companion.bio}</p>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
            {profileFields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.label} className={field.label === "Hobbies" || field.label === "Personality" ? "col-span-2" : ""}>
                  <div className="mb-1 flex items-center gap-2 text-[12px] text-rizzora-muted">
                    <span className="grid size-7 place-items-center rounded-lg bg-rizzora-pink/14 text-rizzora-pink">
                      <Icon size={15} />
                    </span>
                    {field.label}
                  </div>
                  <div className="pl-9 text-[14px] font-medium text-white/[0.86]">{field.value}</div>
                </div>
              );
            })}
          </div>

          <button className="primary-gradient aura-shadow mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold text-white">
            <Sparkles size={17} />
            Create by Myself
          </button>

          <section className="mt-7">
            <h3 className="mb-4 text-[16px] font-bold">Diary Line</h3>
            <div className="space-y-5 border-l border-rizzora-pink/45 pl-5">
              {diary.map((item, index) => (
                <div key={item} className="relative">
                  <span className="absolute -left-[30px] top-1 size-5 rounded-full bg-rizzora-pink" />
                  <p className="text-[14px] font-semibold text-white/[0.82]">{item}</p>
                  <p className="mt-1 text-[12px] text-rizzora-muted">
                    {index === 0 ? "September 10th, 2027" : index === 1 ? "May, 6th, 2028" : index === 2 ? "May 20th 2025" : "May 12"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10">
            <button className="flex h-16 w-full items-center justify-between px-4 text-left font-semibold">
              New Chat
              <ChevronRight size={18} />
            </button>
            <button className="flex h-16 w-full items-center justify-between px-4 text-left font-semibold">
              Pinned / History
              <ChevronRight size={18} />
            </button>
            <button className="flex h-16 w-full items-center justify-between px-4 text-left font-semibold">
              Voice
              <ChevronRight size={18} />
            </button>
            <button className="flex h-16 w-full items-center justify-between px-4 text-left font-semibold text-rizzora-muted">
              Log out
              <LogOut size={18} />
            </button>
          </div>
        </section>
      </div>
    </PhoneShell>
  );
}
