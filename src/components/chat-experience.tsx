"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, MoreVertical, Send } from "lucide-react";
import {
  getTrialHeartFillPercent,
  getVipHeartFillPercent,
  type HeartCollectionReason,
  type HeartDemoState
} from "@/lib/heart-collection";
import { companion, messages } from "@/lib/mock-data";
import { PhoneShell } from "./phone-shell";
import { AuthModal, OutOfStaminaModal } from "./modals";
import { WishBottle } from "./wish-bottle";
import { HeartCollectionOverlay, WishBottleDrawer, WishBottleIcon } from "./wish-bottle-collection";

const mockUser = {
  name: "Mumu",
  avatar: "/assets/user-avatar.png"
};

const usage = {
  // Demo the complete three-day bottle journey in one session.
  dailyFreeMessages: 30,
  monthlyCreditsPercent: 68,
  extraCreditsPercent: {
    free: 0,
    vip: 92
  }
};

const mockReplies = [
  "I’m here with you. Tell me what has been on your mind.",
  "That sounds like something worth holding onto. I’m listening.",
  "Then let’s make this moment a little softer together.",
  "I like hearing the little details. They make you feel closer somehow."
];

type LocalChatMessage = {
  id: string;
  sender: "user" | "companion";
  text: string;
  time: string;
};

type ParticlePath = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  deltaX: number;
  deltaY: number;
};

type PendingCollection = {
  reason: HeartCollectionReason;
  existingHeartCount: number;
  nextState: HeartDemoState;
};

export function ChatExperience() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [dailyMessagesLeft, setDailyMessagesLeft] = useState(usage.dailyFreeMessages);
  const [staminaModalOpen, setStaminaModalOpen] = useState(false);
  const [showWishHint, setShowWishHint] = useState(true);
  const [isBottlePressed, setIsBottlePressed] = useState(false);
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<LocalChatMessage[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const [bottleReplies, setBottleReplies] = useState(0);
  const [isBottleAnimating, setIsBottleAnimating] = useState(false);
  const [wishBottleOpen, setWishBottleOpen] = useState(false);
  const [demoPanelOpen, setDemoPanelOpen] = useState(false);
  const [demoState, setDemoState] = useState<HeartDemoState | null>(null);
  const [pendingCollection, setPendingCollection] = useState<PendingCollection | null>(null);
  const pageRootRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLElement>(null);
  const bottleAnchorRef = useRef<HTMLDivElement>(null);
  const latestAssistantRef = useRef<HTMLDivElement>(null);
  const [particlePath, setParticlePath] = useState<ParticlePath | null>(null);

  const hasChatAccess = isVip || dailyMessagesLeft > 0;
  const canSend = !isReplying;
  const showComposer = true;
  const freeMessagesPercent = Math.max(0, Math.round((dailyMessagesLeft / usage.dailyFreeMessages) * 100));
  const extraCreditsPercent = isVip ? usage.extraCreditsPercent.vip : usage.extraCreditsPercent.free;
  const isDemoEnabled = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_HEART_DEMO === "true";
  const defaultHeartState: HeartDemoState = {
    mode: isVip ? "vip_active" : "trial",
    fillPercent: isVip ? getVipHeartFillPercent(1) : getTrialHeartFillPercent(bottleReplies),
    trialMessagesUsed: bottleReplies,
    vipCycleDay: isVip ? 1 : null,
    storedHeartCount: 0,
    pendingRecoveryHeart: false
  };
  const activeHeartState = demoState ?? defaultHeartState;

  useEffect(() => {
    if (window.localStorage.getItem("rizzora-authenticated") !== "true") {
      setAuthModalOpen(true);
    }
    setIsVip(window.localStorage.getItem("rizzora-vip") === "true");
  }, []);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const container = chatScrollRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "auto"
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [localMessages.length, isReplying]);

  useLayoutEffect(() => {
    if (!isBottleAnimating) {
      setParticlePath(null);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const source = latestAssistantRef.current?.getBoundingClientRect();
      const target = bottleAnchorRef.current?.getBoundingClientRect();
      const root = pageRootRef.current?.getBoundingClientRect();
      if (!source || !target || !root) return;

      setParticlePath({
        startX: source.left + source.width * 0.76 - root.left,
        startY: source.top + 8 - root.top,
        targetX: target.left + target.width * 0.5 - root.left,
        targetY: target.top + target.height * 0.58 - root.top,
        deltaX: target.left + target.width * 0.5 - (source.left + source.width * 0.76),
        deltaY: target.top + target.height * 0.58 - (source.top + 8)
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isBottleAnimating, localMessages.length]);

  function sendText() {
    if (!isVip && dailyMessagesLeft <= 0) {
      setStaminaModalOpen(true);
      return;
    }

    if (!hasChatAccess) {
      router.push("/m/vip");
      return;
    }
    if (isReplying) return;

    const next = draft.trim() || "I've been thinking about you all morning honestly 🙂";
    setLocalMessages((items) => [
      ...items,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: next,
        time: "Now"
      }
    ]);
    setDraft("");

    if (!isVip) setDailyMessagesLeft((remaining) => Math.max(0, remaining - 1));

    setIsReplying(true);

    window.setTimeout(() => {
      setLocalMessages((items) => [
        ...items,
        {
          id: `mock-reply-${Date.now()}`,
          sender: "companion",
          text: mockReplies[items.filter((item) => item.sender === "companion").length % mockReplies.length],
          time: "Just now"
        }
      ]);
      setIsReplying(false);
      setBottleReplies((replies) => Math.min(30, replies + 1));
      setIsBottleAnimating(true);
      window.setTimeout(() => setIsBottleAnimating(false), 1500);
    }, 850);
  }

  function handleBottleClick() {
    setShowWishHint(false);
    setIsBottlePressed(true);
    window.setTimeout(() => setIsBottlePressed(false), 320);
  }

  function startCollection(reason: HeartCollectionReason, sourceState = activeHeartState) {
    const completedState = { ...sourceState, fillPercent: 100 };
    setDemoState(completedState);
    setPendingCollection({
      reason,
      existingHeartCount: sourceState.storedHeartCount,
      nextState: {
        mode: "vip_active",
        fillPercent: getVipHeartFillPercent(1),
        trialMessagesUsed: 0,
        vipCycleDay: 1,
        storedHeartCount: sourceState.storedHeartCount + 1,
        pendingRecoveryHeart: false
      }
    });
  }

  function finishCollection() {
    if (!pendingCollection) return;
    setDemoState(pendingCollection.nextState);
    setPendingCollection(null);
    setStaminaModalOpen(false);
    setIsVip(true);
  }

  return (
    <PhoneShell>
      <div ref={pageRootRef} className="relative flex h-[100svh] flex-col overflow-hidden bg-rizzora-bg">
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
            </div>
          </div>
          <div className="flex items-center gap-2 text-rizzora-muted">
            <WishBottleIcon
              storedHeartCount={activeHeartState.storedHeartCount}
              hasPendingHeart={activeHeartState.pendingRecoveryHeart}
              onClick={() => setWishBottleOpen(true)}
            />
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
            <HeaderMenu
              isVip={isVip}
              freeMessagesLeft={dailyMessagesLeft}
              freeMessagesPercent={freeMessagesPercent}
              monthlyCreditsPercent={usage.monthlyCreditsPercent}
              extraCreditsPercent={extraCreditsPercent}
            />
          )}
        </header>

        <div
          ref={bottleAnchorRef}
          className="absolute right-4 top-[78px] z-20 drop-shadow-[0_8px_20px_rgba(220,70,160,0.28)]"
        >
          {showWishHint && (
            <button
              type="button"
              onClick={() => setShowWishHint(false)}
              className="wish-bottle-hint absolute right-[44px] top-0 z-10 w-[178px] rounded-xl bg-[#CAC5D6] px-3 py-2 text-left text-[10px] leading-[1.35] text-[#000] shadow-[0_6px_18px_rgba(10,8,25,0.38)]"
            >
              <span className="block font-semibold text-[#000]">A little wish begins here.</span>
              <span className="mt-0.5 block text-[#000]">Chat with me to fill your heart.</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleBottleClick}
            className={`wish-bottle-button ${isBottlePressed ? "is-pressed" : ""}`}
            aria-label="View wish heart progress"
          >
            {isBottlePressed && (
              <span className="wish-bottle-tap-sparks" aria-hidden="true">
                <span className="wish-bottle-tap-spark wish-bottle-tap-spark-one" />
                <span className="wish-bottle-tap-spark wish-bottle-tap-spark-two" />
                <span className="wish-bottle-tap-spark wish-bottle-tap-spark-three" />
                <span className="wish-bottle-tap-spark wish-bottle-tap-spark-four" />
              </span>
            )}
            <WishBottle
              totalReplies={activeHeartState.trialMessagesUsed}
              fillPercent={activeHeartState.fillPercent}
              mode={activeHeartState.mode}
              isReplyAnimating={isBottleAnimating}
              size={46}
            />
          </button>
        </div>

        {particlePath && <ReplyParticleBurst path={particlePath} />}

        <section
          ref={chatScrollRef}
          className="relative z-10 h-full overflow-y-auto px-4 pb-28 pt-[84px] hidden-scrollbar"
          aria-live="polite"
        >
          <div className="mb-6 flex items-center gap-3 text-center text-[12px] text-rizzora-muted">
            <span className="h-px flex-1 bg-white/10" />
            Yesterday
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-5">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {localMessages.map((message) => (
              <div
                key={message.id}
                ref={message.sender === "companion" ? latestAssistantRef : undefined}
              >
                <MessageBubble message={message} />
              </div>
            ))}
            {isReplying && <TypingIndicator />}
            <div className="h-px w-full" aria-hidden="true" />
          </div>
        </section>

        <footer className="safe-bottom absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#201e3c]/80 px-4 pt-4 backdrop-blur-[10px]">
          {showComposer ? (
            <div className={`flex h-[62px] items-center rounded-xl border border-white/10 bg-[#343052]/80 px-3 backdrop-blur-[10px] transition duration-150 focus-within:border-rizzora-pink/45 focus-within:bg-[#474166]/90 focus-within:shadow-[0_0_22px_rgba(234,78,184,0.22)] ${isReplying ? "opacity-80" : ""}`}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={isReplying}
                placeholder={isReplying ? `${companion.name} is replying...` : `Message ${companion.name}...`}
                className="min-w-0 flex-1 bg-transparent px-2 text-[15px] text-white outline-none placeholder:text-rizzora-muted"
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendText();
                }}
              />
              <button
                onClick={sendText}
                disabled={!canSend}
                className="primary-gradient ml-1 grid size-10 place-items-center rounded-full text-white aura-shadow transition disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/m/vip")}
              className="flex h-[62px] w-full items-center justify-center rounded-xl border border-[#f2b84b]/30 bg-[#343052]/90 px-4 text-center text-[15px] font-bold text-[#f2b84b] shadow-[0_0_22px_rgba(242,184,75,0.18)] backdrop-blur-[10px] transition active:scale-[0.98]"
            >
              Become VIP to keep chatting with {companion.name}
            </button>
          )}
        </footer>
        {authModalOpen && (
          <AuthModal
            onClose={() => router.push("/m/c/main-character")}
            onSuccess={() => {
              window.localStorage.setItem("rizzora-authenticated", "true");
              setAuthModalOpen(false);
            }}
          />
        )}
        {staminaModalOpen && (
          <OutOfStaminaModal
            onClose={() => setStaminaModalOpen(false)}
            onUnlock={() => isDemoEnabled ? startCollection("trial_upgrade") : router.push("/m/vip")}
            onSupplement={() => router.push("/m/recharge")}
          />
        )}
        {wishBottleOpen && (
          <WishBottleDrawer
            storedHeartCount={activeHeartState.storedHeartCount}
            hasPendingHeart={activeHeartState.pendingRecoveryHeart}
            onClose={() => setWishBottleOpen(false)}
          />
        )}
        {pendingCollection && (
          <HeartCollectionOverlay
            reason={pendingCollection.reason}
            existingHeartCount={pendingCollection.existingHeartCount}
            onComplete={finishCollection}
          />
        )}
        {isDemoEnabled && (
          <>
            <button
              type="button"
              onClick={() => setDemoPanelOpen((open) => !open)}
              className="heart-demo-trigger"
              aria-label="Open heart collection demo controls"
            >
              Demo
            </button>
            {demoPanelOpen && (
              <HeartDemoPanel
                currentState={activeHeartState}
                onSetState={setDemoState}
                onCollect={startCollection}
              />
            )}
          </>
        )}
      </div>
    </PhoneShell>
  );
}

function HeartDemoPanel({
  currentState,
  onSetState,
  onCollect
}: {
  currentState: HeartDemoState;
  onSetState: (state: HeartDemoState) => void;
  onCollect: (reason: HeartCollectionReason, sourceState: HeartDemoState) => void;
}) {
  const makeState = (state: Partial<HeartDemoState>): HeartDemoState => ({
    ...currentState,
    ...state
  });

  const trialAt = (messages: number) => makeState({
    mode: "trial",
    fillPercent: getTrialHeartFillPercent(messages),
    trialMessagesUsed: messages,
    vipCycleDay: null,
    pendingRecoveryHeart: false
  });

  const vipAt = (day: number) => makeState({
    mode: "vip_active",
    fillPercent: getVipHeartFillPercent(day),
    trialMessagesUsed: 0,
    vipCycleDay: day,
    pendingRecoveryHeart: false
  });

  const expiredState = makeState({
    mode: "vip_expired",
    fillPercent: 98,
    trialMessagesUsed: 0,
    vipCycleDay: 31,
    pendingRecoveryHeart: true
  });

  return (
    <aside className="heart-demo-panel" aria-label="Heart collection demo controls">
      <p>HEART FLOW DEMO</p>
      <div className="heart-demo-section">
        <button type="button" onClick={() => onSetState(trialAt(20))}>Trial · 20 / 30</button>
        <button type="button" onClick={() => onSetState(trialAt(30))}>Trial · 30 / 30</button>
        <button type="button" onClick={() => onSetState(vipAt(10))}>VIP · Day 10</button>
        <button type="button" onClick={() => onSetState(vipAt(31))}>VIP · Day 31</button>
        <button type="button" onClick={() => onSetState(expiredState)}>Membership expired</button>
      </div>
      <div className="heart-demo-divider" />
      <div className="heart-demo-section heart-demo-actions">
        <button type="button" onClick={() => onCollect("trial_upgrade", trialAt(30))}>Simulate first VIP</button>
        <button type="button" onClick={() => onCollect("renewal", vipAt(31))}>Simulate renewal</button>
        <button type="button" onClick={() => onCollect("resubscribe", expiredState)}>Simulate return</button>
      </div>
    </aside>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" aria-label="Chris is replying">
      <Image
        src={companion.avatar}
        alt={companion.name}
        width={34}
        height={34}
        className="size-[34px] rounded-full object-cover"
      />
      <div className="flex h-[42px] items-center gap-1 rounded-2xl bg-[#393656] px-4">
        <span className="reply-dot" />
        <span className="reply-dot reply-dot-delay-1" />
        <span className="reply-dot reply-dot-delay-2" />
      </div>
    </div>
  );
}

function ReplyParticleBurst({ path }: { path: ParticlePath }) {
  const particles = [
    { x: -18, y: 4, delay: 0, scale: 1.15 },
    { x: -11, y: -8, delay: 70, scale: 0.82 },
    { x: -3, y: 5, delay: 140, scale: 1 },
    { x: 7, y: -7, delay: 210, scale: 0.74 },
    { x: 16, y: 3, delay: 280, scale: 1.2 },
    { x: 23, y: -4, delay: 350, scale: 0.86 },
    { x: 4, y: 13, delay: 420, scale: 0.68 },
    { x: -12, y: 14, delay: 490, scale: 0.92 },
    { x: 13, y: 12, delay: 560, scale: 0.76 },
    { x: -5, y: -15, delay: 630, scale: 0.62 }
  ];

  return (
    <div className="wish-reply-particle-layer" aria-hidden="true">
      <span
        className="wish-reply-particle-source"
        style={{ left: path.startX, top: path.startY } as CSSProperties}
      />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="wish-reply-particle"
          style={
            {
              left: path.startX + particle.x,
              top: path.startY + particle.y,
              animationDelay: `${particle.delay}ms`,
              "--wish-particle-x": `${path.deltaX}px`,
              "--wish-particle-y": `${path.deltaY}px`,
              "--wish-particle-offset-x": `${particle.x}px`,
              "--wish-particle-offset-y": `${particle.y}px`,
              "--wish-particle-scale": particle.scale
            } as CSSProperties
          }
        />
      ))}
      <span
        className="wish-reply-particle-arrival"
        style={{ left: path.targetX, top: path.targetY } as CSSProperties}
      />
    </div>
  );
}

function HeaderMenu({
  isVip,
  freeMessagesLeft,
  freeMessagesPercent,
  monthlyCreditsPercent,
  extraCreditsPercent
}: {
  isVip: boolean;
  freeMessagesLeft: number;
  freeMessagesPercent: number;
  monthlyCreditsPercent: number;
  extraCreditsPercent: number;
}) {
  return (
    <div className="absolute right-4 top-[58px] z-50 w-[236px] overflow-hidden rounded-xl border border-white/10 bg-[#2d2a50]/95 p-1 shadow-panel backdrop-blur-[10px]">
      <Link
        href="/m/user-center"
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-white transition active:bg-white/10"
      >
        <Image
          src={mockUser.avatar}
          alt={mockUser.name}
          width={30}
          height={30}
          className="size-[30px] rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold">{mockUser.name}</p>
          <span
            className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
              isVip
                ? "border-rizzora-gold/35 bg-rizzora-gold/12 text-rizzora-gold"
                : "border-white/10 bg-white/[0.06] text-rizzora-muted"
            }`}
          >
            {isVip ? "Premium" : "Free Account"}
          </span>
        </div>
        <ChevronRight size={16} className="shrink-0 text-rizzora-muted" />
      </Link>

      <div className="border-t border-white/10">
        {isVip ? (
          <UsageMenuRow
            title="Monthly Credits"
            value={`${monthlyCreditsPercent}% remaining`}
            percent={monthlyCreditsPercent}
            tone="pink"
          />
        ) : (
          <UsageMenuRow
            title="Free Messages"
            value={`${freeMessagesLeft} left`}
            percent={freeMessagesPercent}
            tone="pink"
            actionHref="/m/vip"
            actionLabel="Become Premium"
          />
        )}

        <UsageMenuRow
          title="Extra Credits"
          value={`${extraCreditsPercent}% remaining`}
          percent={extraCreditsPercent}
          tone="gold"
          actionHref="/m/recharge"
          actionLabel="Recharge"
        />
      </div>
    </div>
  );
}

function UsageMenuRow({
  title,
  value,
  percent,
  tone,
  actionHref,
  actionLabel
}: {
  title: string;
  value: string;
  percent: number;
  tone: "pink" | "gold";
  actionHref?: string;
  actionLabel?: string;
}) {
  const isGold = tone === "gold";

  return (
    <div className="px-3 py-3">
      <div className="flex items-start justify-between gap-3 text-[12px] leading-[1.25]">
        <div className="min-w-0">
          <p className="truncate text-rizzora-muted">{title}</p>
          <p className={`mt-1 font-bold ${isGold ? "text-rizzora-gold" : "text-rizzora-pink"}`}>{value}</p>
        </div>
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className={`shrink-0 whitespace-nowrap text-[12px] font-bold ${
              isGold ? "text-rizzora-gold" : "text-rizzora-pink"
            }`}
          >
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${isGold ? "gold-gradient" : "primary-gradient"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function MessageBubble({
  message
}: {
  message: LocalChatMessage;
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
