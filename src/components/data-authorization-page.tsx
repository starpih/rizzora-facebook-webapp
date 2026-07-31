"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { dataAuthorizationSections } from "@/lib/legal-content";
import { PhoneShell } from "./phone-shell";

export function DataAuthorizationPage() {
  return (
    <PhoneShell>
      <div className="relative h-[100svh] overflow-hidden bg-rizzora-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,78,184,0.18),transparent_21rem)]" />
        <header className="relative z-20 border-b border-white/10 bg-[#1f1d3d]/80 px-4 pb-3 pt-4 backdrop-blur-[10px]">
          <div className="flex h-10 items-center gap-3">
            <Link
              href="/m/c/main-character"
              className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
              aria-label="Back to entry"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold">Data Authorization Statement</h1>
              <p className="text-[11px] text-rizzora-muted">Data use and consent details</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 h-[calc(100svh-68px)] overflow-y-auto px-4 pb-8 pt-5 hidden-scrollbar">
          <div className="space-y-5">
            {dataAuthorizationSections.map((section) => (
              <section key={section.title}>
                <h3 className="text-[15px] font-bold text-white">{section.title}</h3>
                <p className="mt-2 whitespace-pre-line text-[13px] leading-[1.6] text-rizzora-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </PhoneShell>
  );
}
