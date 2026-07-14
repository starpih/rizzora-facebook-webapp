"use client";

import { Mic, MicOff, Send, X } from "lucide-react";
import { voiceStates } from "@/lib/mock-data";

type VoiceStateSheetProps = {
  state: number;
  onStateChange: (state: number) => void;
  onClose: () => void;
};

export function VoiceStateSheet({ state, onStateChange, onClose }: VoiceStateSheetProps) {
  const current = voiceStates[state];

  return (
    <div className="absolute inset-x-4 bottom-[104px] z-30 rounded-2xl border border-white/10 bg-[#2d2a50]/95 p-4 shadow-panel backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-rizzora-pink text-white aura-shadow">
            {current.id === "unsupported" ? <MicOff size={22} /> : <Mic size={22} />}
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white">{current.title}</h3>
            <p className="mt-1 text-[13px] leading-[1.4] text-rizzora-muted">{current.body}</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close voice state" className="text-white/70">
          <X size={20} />
        </button>
      </div>
      {current.id === "recording" && (
        <div className="mt-4 flex items-center gap-1 rounded-full bg-[#191733] px-4 py-3">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-rizzora-pink"
              style={{ height: `${8 + ((index * 7) % 22)}px` }}
            />
          ))}
          <span className="ml-auto text-[12px] text-rizzora-muted">0:08</span>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => onStateChange((state + 1) % voiceStates.length)}
          className="h-10 rounded-xl bg-white/10 text-[13px] font-semibold text-white"
        >
          Next State
        </button>
        <button className="primary-gradient flex h-10 items-center justify-center gap-2 rounded-xl text-[13px] font-semibold text-white">
          <Send size={14} />
          Send Voice
        </button>
      </div>
    </div>
  );
}
