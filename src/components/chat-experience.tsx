"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, Send } from "lucide-react";
import { companion, messages } from "@/lib/mock-data";
import { PhoneShell } from "./phone-shell";
import { AuthModal, QuotaLimitModal } from "./modals";

type ModalState = "auth" | "quota" | null;

export function ChatExperience() {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>(null);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [textQuota, setTextQuota] = useState(3);
  const [draft, setDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const quotaLabel = useMemo(() => `${textQuota} messages left`, [textQuota]);

  function sendText() {
    if (textQuota <= 0) {
      setModal("quota");
      return;
    }
    const next = draft.trim() || "I've been thinking about you all morning honestly 🙂";
    setSentMessages((items) => [...items, next]);
    setDraft("");
    const remaining = textQuota - 1;
    setTextQuota(remaining);
    if (remaining === 0) {
      setModal("quota");
    }
  }

  return (
    <PhoneShell>
      <div className="relative flex h-[100svh] flex-col overflow-hidden bg-rizzora-bg">
        <Image
          src={companion.chatBackground}
          alt=""
          fill
          sizes="393px"
          className="object-cover opacity-[0.36]"
        />
        <div className="absolute inset-0 bg-[#16152f]/76" />
        <header className="absolute inset-x-0 top-0 z-30 flex h-[68px] items-center justify-between border-b border-white/10 bg-[#1f1d3d]/80 px-4 backdrop-blur-[10px]">
          <div className="flex items-center gap-3">
            <Link
              href="/m/profile"
              aria-label={`Open ${companion.name} profile`}
              className="primary-gradient block rounded-full p-[2px] shadow-[0_0_16px_rgba(234,78,184,0.32)] transition duration-150 ease-out active:scale-95 active:opacity-80 active:shadow-[0_0_8px_rgba(245,185,55,0.32)]"
            >
              <Image
                src={companion.avatar}
                alt={companion.name}
                width={42}
                height={42}
                className="size-[42px] rounded-full object-cover"
              />
            </Link>
            <div>
              <h1 className="text-[17px] font-bold">{companion.name}</h1>
              <p className="text-[11px] text-rizzora-muted">
                {quotaLabel}
                <button
                  type="button"
                  onClick={() => setModal("quota")}
                  className="ml-1 font-semibold text-rizzora-pink"
                >
                  · Get more credits
                </button>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-rizzora-muted">
            <button
              type="button"
              onClick={() => setShowHeaderMenu((visible) => !visible)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-full transition duration-150 active:scale-95 active:bg-white/10"
            >
              <MoreVertical size={22} />
            </button>
          </div>
          {showHeaderMenu && (
            <div className="absolute right-4 top-[58px] z-50 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#2d2a50]/95 p-1 shadow-panel backdrop-blur-[10px]">
              <Link
                href="/m/user-center"
                className="block rounded-lg px-3 py-3 text-[14px] font-semibold text-white transition active:bg-white/10"
              >
                User Center
              </Link>
            </div>
          )}
        </header>

        <section className="relative z-10 h-full overflow-y-auto px-4 pb-28 pt-[84px] hidden-scrollbar">
          <div className="mb-6 flex items-center gap-3 text-center text-[12px] text-rizzora-muted">
            <span className="h-px flex-1 bg-white/10" />
            Yesterday
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-5">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {sentMessages.map((message, index) => (
              <div key={`${message}-${index}`} className="flex justify-end">
                <div>
                  <div className="max-w-[292px] rounded-2xl bg-gradient-to-r from-[#cf4e9c] to-[#8649bb] px-4 py-3 text-[14px] leading-[1.45] text-white shadow-[0_4px_8px_rgba(232,88,175,0.25)]">
                    {message}
                  </div>
                  <div className="mt-1 text-right text-[11px] text-rizzora-muted">Now</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="safe-bottom absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#201e3c]/80 px-4 pt-4 backdrop-blur-[10px]">
          <div className="flex h-[62px] items-center rounded-xl border border-white/10 bg-[#343052]/80 px-3 backdrop-blur-[10px] transition duration-150 focus-within:border-rizzora-pink/45 focus-within:bg-[#474166]/90 focus-within:shadow-[0_0_22px_rgba(234,78,184,0.22)]">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Message ${companion.name}...`}
              className="min-w-0 flex-1 bg-transparent px-2 text-[15px] text-white outline-none placeholder:text-rizzora-muted"
            />
            <button
              onClick={sendText}
              className="primary-gradient ml-1 grid size-10 place-items-center rounded-full text-white aura-shadow"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </div>
        </footer>

        {modal === "auth" && <AuthModal onClose={() => setModal(null)} />}
        {modal === "quota" && (
          <QuotaLimitModal
            onClose={() => setModal(null)}
            onUpgrade={() => router.push("/m/vip")}
            onAuth={() => setModal("auth")}
          />
        )}
      </div>
    </PhoneShell>
  );
}

function MessageBubble({
  message
}: {
  message: (typeof messages)[number];
}) {
  const isUser = message.sender === "user";

  return isUser ? (
    <div className="flex justify-end">
      <div>
        <div className="max-w-[292px] rounded-2xl bg-gradient-to-r from-[#cf4e9c] to-[#8649bb] px-4 py-3 text-[14px] leading-[1.45] text-white shadow-[0_4px_8px_rgba(232,88,175,0.25)]">
          {message.text}
        </div>
        <div className="mt-1 text-right text-[11px] text-rizzora-muted">{message.time}</div>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex items-end gap-2">
        <Image
          src={companion.avatar}
          alt={companion.name}
          width={34}
          height={34}
          className="size-[34px] rounded-full object-cover"
        />
        <div className="max-w-[292px] rounded-2xl bg-[#393656] px-4 py-3 text-[14px] leading-[1.45] text-white">
          {message.text}
        </div>
      </div>
      <div className="ml-[42px] mt-1 text-[11px] text-rizzora-muted">{message.time}</div>
    </div>
  );
}
