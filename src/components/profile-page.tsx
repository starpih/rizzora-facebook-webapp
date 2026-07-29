"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { companion, profileFields } from "@/lib/mock-data";
import { PhoneShell } from "./phone-shell";

export function ProfilePage() {
  return (
    <PhoneShell>
      <div className="relative h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <section className="relative h-[340px]">
          <Image
            src={companion.profileImage}
            alt={companion.fullName}
            fill
            priority
            sizes="393px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-rizzora-bg via-rizzora-bg/50 to-transparent" />
          <div className="absolute left-4 top-4 z-20 flex items-center gap-3">
            <Link
              href="/m/chat/main-character"
              className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink backdrop-blur-[10px] transition active:scale-95"
              aria-label="Back to chat"
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-[16px] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              {companion.name}
            </h1>
          </div>
        </section>
        <section className="px-4 pb-8 pt-5">
          <h2 className="font-display text-[36px] font-bold leading-none text-white/75">{companion.fullName}</h2>
          <p className="mt-1 text-[13px] text-rizzora-muted">Last chatted {companion.lastChatted}</p>
          <p className="mt-1 text-[14px] leading-[1.45] text-white/[0.76]">{companion.bio}</p>

          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
            {profileFields.map((field) => {
              const Icon = field.icon;
              const isWide = field.label === "Hobbies" || field.label === "Personality";
              const chips = field.label === "Personality" ? field.value.split(" · ") : [];

              return (
                <div key={field.label} className={isWide ? "col-span-2" : ""}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-rizzora-pink/20 bg-rizzora-pink/14 text-rizzora-pink">
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] text-rizzora-muted">{field.label}</div>
                      {field.label === "Personality" ? (
                        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 hidden-scrollbar">
                          {chips.map((chip) => (
                            <span
                              key={chip}
                              className="shrink-0 rounded-full border border-white/10 bg-rizzora-pink/10 px-4 py-1.5 text-[12px] text-white/75"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-1 text-[14px] font-medium text-white/[0.86]">{field.value}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PhoneShell>
  );
}
