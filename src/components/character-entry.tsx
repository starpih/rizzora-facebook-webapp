"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { companion } from "@/lib/mock-data";
import { PhoneShell } from "./phone-shell";
import { AuthModal } from "./modals";

export function CharacterEntry() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        video.muted = true;
        setMuted(true);
        void video.play();
      });
    }
  }, []);

  function toggleSound() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    void video.play();
  }

  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={companion.entryVideo}
          poster={companion.entryImage}
          autoPlay
          playsInline
          loop
          muted={muted}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#28133b]/80 via-transparent to-[#16142b]" />
        <button
          type="button"
          onClick={toggleSound}
          className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-white/15 bg-[#191833]/65 text-white shadow-panel backdrop-blur-md"
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
        >
          {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
        </button>
        <div className="absolute inset-x-0 top-8 z-10 flex flex-col items-center px-6 text-center">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-rizzora-pink text-3xl font-bold text-white">
              R
            </div>
            <h1 className="font-display text-[34px] font-bold tracking-wide text-rizzora-pink">
              RIZZORA
            </h1>
          </div>
          <p className="mt-2 font-display text-[20px] italic text-rizzora-rose">
            {companion.tagline}
          </p>
        </div>
        <div className="safe-bottom absolute inset-x-0 bottom-0 z-10 px-6">
          <div className="romantic-copy mb-4 whitespace-pre-line text-[16px] leading-[1.5] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {companion.entryCopy}
          </div>
          <button
            type="button"
            onClick={() => setShowAuthModal(true)}
            className="primary-gradient flex h-16 w-full translate-y-0.5 items-center justify-center gap-2 rounded-full text-[21px] font-bold italic text-white shadow-[0_0_34px_rgba(234,78,184,0.72),0_16px_34px_rgba(0,0,0,0.38)] transition duration-150 ease-out active:translate-y-1.5 active:scale-[0.985] active:shadow-[0_0_18px_rgba(234,78,184,0.5),0_8px_18px_rgba(0,0,0,0.32)]"
          >
            <MessageCircle size={21} />
            Chat with {companion.name}
          </button>
        </div>
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => {
              window.localStorage.setItem("rizzora-authenticated", "true");
              router.push("/m/chat/main-character");
            }}
          />
        )}
      </div>
    </PhoneShell>
  );
}
