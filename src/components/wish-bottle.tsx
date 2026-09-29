"use client";

import { type CSSProperties, useId } from "react";

const TOTAL_BOTTLE_REPLIES = 30;
const BOTTLE_ASSET = "/assets/gifts/wish-bottle/wish-bottle-glass-cork-v7.png";
const BOTTLE_VIEWBOX = "0 0 240 260";
const LIQUID_BOTTOM = 219;
const LIQUID_USABLE_HEIGHT = 117;

type WishBottleProps = {
  totalReplies: number;
  isReplyAnimating?: boolean;
  size?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getBottleState(totalReplies: number) {
  const replies = clamp(Number.isFinite(totalReplies) ? Math.floor(totalReplies) : 0, 0, TOTAL_BOTTLE_REPLIES);
  const day = replies === 0 ? 1 : Math.ceil(replies / 10);
  const dayReply = replies === 0 ? 0 : ((replies - 1) % 10) + 1;
  // A tiny pool makes the untouched bottle feel like a wish has already begun,
  // while message one still maps to the full first 10% progress step.
  const level = replies === 0 ? 0.06 : dayReply / 10;
  const liquidTop = LIQUID_BOTTOM - LIQUID_USABLE_HEIGHT * level;
  const liquidColor = day === 1 ? "#f7a9c7" : day === 2 ? "#e65a93" : "#c92f55";

  return { day, dayReply, level, liquidTop, liquidColor, replies };
}

export function WishBottle({
  totalReplies,
  isReplyAnimating = false,
  size = 120,
  className = ""
}: WishBottleProps) {
  const clipId = `wish-liquid-${useId().replace(/:/g, "")}`;
  const { day, dayReply, level, liquidTop, liquidColor, replies } = getBottleState(totalReplies);
  const style = {
    "--wish-liquid": liquidColor,
    "--wish-liquid-top": `${liquidTop}px`,
    "--wish-fill": level
  } as CSSProperties;
  const liquidFloor = liquidTop + 6;
  const backWaveA = `M-24 ${liquidTop + 2} C18 ${liquidTop - 7}, 72 ${liquidTop + 10}, 120 ${liquidTop + 2} S214 ${liquidTop - 7}, 264 ${liquidTop + 2} V260 H-24Z`;
  const backWaveB = `M-24 ${liquidTop + 6} C24 ${liquidTop + 13}, 80 ${liquidTop - 6}, 120 ${liquidTop + 6} S210 ${liquidTop + 13}, 264 ${liquidTop + 6} V260 H-24Z`;
  const frontWaveA = `M-24 ${liquidTop} C24 ${liquidTop - 11}, 74 ${liquidTop + 11}, 120 ${liquidTop} S214 ${liquidTop - 11}, 264 ${liquidTop} V260 H-24Z`;
  const frontWaveB = `M-24 ${liquidTop + 7} C24 ${liquidTop + 16}, 74 ${liquidTop - 9}, 120 ${liquidTop + 7} S214 ${liquidTop + 16}, 264 ${liquidTop + 7} V260 H-24Z`;

  return (
    <div
      className={`wish-bottle wish-bottle-day-${day} ${isReplyAnimating ? "is-reply-animating" : ""} ${className}`}
      style={{ ...style, width: size, height: size * 1.08 }}
      aria-label={`Wish bottle day ${day}, ${dayReply} of 10 messages, ${replies} of ${TOTAL_BOTTLE_REPLIES} total replies`}
    >
      <svg className="wish-bottle-liquid" viewBox={BOTTLE_VIEWBOX} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId}>
            <path d="M30 97 C30 71 50 57 77 57 C97 57 109 70 120 84 C131 70 144 57 164 57 C191 57 210 72 210 98 C210 147 163 190 126 219 C123 221 117 221 114 219 C77 190 30 147 30 97Z" />
          </clipPath>
          <linearGradient id={`${clipId}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--wish-liquid)" stopOpacity="0.96" />
            <stop offset="1" stopColor="var(--wish-liquid)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect className="wish-bottle-liquid-fill" x="20" y={liquidFloor} width="200" height={LIQUID_BOTTOM - liquidFloor + 4} fill={`url(#${clipId}-fill)`} />
          {level > 0 && <>
            <path className="wish-bottle-liquid-wave wish-bottle-liquid-wave-back" d={backWaveA}>
              <animate attributeName="d" dur="2.45s" repeatCount="indefinite" values={`${backWaveA};${backWaveB};${backWaveA}`} />
            </path>
            <path className="wish-bottle-liquid-wave" d={frontWaveA}>
              <animate attributeName="d" dur="2.2s" repeatCount="indefinite" values={`${frontWaveA};${frontWaveB};${frontWaveA}`} />
            </path>
            <path className="wish-bottle-liquid-shine" d={`M43 ${liquidTop + 8} C78 ${liquidTop + 2}, 102 ${liquidTop + 9}, 134 ${liquidTop + 5}`} />
          </>}
        </g>
      </svg>
      <img className="wish-bottle-frame" src={BOTTLE_ASSET} alt="" aria-hidden="true" />
      <img className="wish-bottle-glow" src="/assets/gifts/wish-bottle/wish-bottle-glow.svg" alt="" aria-hidden="true" />
    </div>
  );
}
