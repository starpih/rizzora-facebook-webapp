"use client";

import { type CSSProperties, useId } from "react";

const TOTAL_WISH_REPLIES = 30;
const HEART_VIEWBOX = "0 0 240 230";
const HEART_PATH = "M120 214C111 214 106 209 100 204C72 181 28 143 28 89C28 53 54 30 85 30C103 30 114 38 120 51C127 38 138 30 155 30C186 30 212 53 212 89C212 143 168 181 140 204C134 209 129 214 120 214Z";
const LIQUID_BOTTOM = 212;
const LIQUID_USABLE_HEIGHT = 157;

type WishBottleProps = {
  totalReplies: number;
  isReplyAnimating?: boolean;
  size?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getWishHeartState(totalReplies: number) {
  const replies = clamp(Number.isFinite(totalReplies) ? Math.floor(totalReplies) : 0, 0, TOTAL_WISH_REPLIES);
  const day = replies === 0 ? 1 : Math.ceil(replies / 10);
  // A reply always triggers the ritual; visible milestones stay calm at chat-header size.
  // Day three begins at the existing level so the liquid never appears to fall.
  const milestones: Array<[number, number]> = [
    [0, 0.055], [1, 0.1], [5, 0.2], [9, 1 / 3], [10, 1 / 3],
    [11, 0.4], [15, 0.5], [19, 2 / 3], [20, 2 / 3], [21, 2 / 3],
    [25, 0.8], [30, 0.9]
  ];
  const level = [...milestones].reverse().find(([reply]) => replies >= reply)?.[1] ?? 0.055;
  const liquidTop = LIQUID_BOTTOM - LIQUID_USABLE_HEIGHT * level;
  const liquidColor = day === 1 ? "#f681b7" : day === 2 ? "#dc4a94" : "#c93472";

  return { day, level, liquidTop, liquidColor, replies };
}

export function WishBottle({
  totalReplies,
  isReplyAnimating = false,
  size = 120,
  className = ""
}: WishBottleProps) {
  const id = `wish-heart-${useId().replace(/:/g, "")}`;
  const { day, level, liquidTop, liquidColor, replies } = getWishHeartState(totalReplies);
  const style = {
    "--wish-liquid": liquidColor,
    "--wish-fill": level
  } as CSSProperties;
  const liquidFloor = liquidTop + 6;
  const backWaveA = `M-24 ${liquidTop + 2}C20 ${liquidTop - 6} 72 ${liquidTop + 9} 120 ${liquidTop + 2}S214 ${liquidTop - 6} 264 ${liquidTop + 2}V230H-24Z`;
  const backWaveB = `M-24 ${liquidTop + 6}C24 ${liquidTop + 12} 80 ${liquidTop - 5} 120 ${liquidTop + 6}S210 ${liquidTop + 12} 264 ${liquidTop + 6}V230H-24Z`;
  const frontWaveA = `M-24 ${liquidTop}C24 ${liquidTop - 10} 74 ${liquidTop + 10} 120 ${liquidTop}S214 ${liquidTop - 10} 264 ${liquidTop}V230H-24Z`;
  const frontWaveB = `M-24 ${liquidTop + 7}C24 ${liquidTop + 15} 74 ${liquidTop - 8} 120 ${liquidTop + 7}S214 ${liquidTop + 15} 264 ${liquidTop + 7}V230H-24Z`;

  return (
    <div
      className={`wish-bottle wish-bottle-day-${day} ${isReplyAnimating ? "is-reply-animating" : ""} ${className}`}
      style={{ ...style, width: size, height: size }}
      aria-label={`Wish heart day ${day}, ${replies} of ${TOTAL_WISH_REPLIES} replies`}
    >
      <svg className="wish-bottle-sprite" viewBox={HEART_VIEWBOX} shapeRendering="geometricPrecision" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`${id}-clip`}>
            <path d={HEART_PATH} />
          </clipPath>
          <linearGradient id={`${id}-cavity`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f4cfdf" stopOpacity="0.45" />
            <stop offset="0.52" stopColor="#d18fae" stopOpacity="0.38" />
            <stop offset="1" stopColor="#8e4b70" stopOpacity="0.58" />
          </linearGradient>
          <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffacd0" stopOpacity="0.98" />
            <stop offset="0.42" stopColor="var(--wish-liquid)" stopOpacity="0.95" />
            <stop offset="1" stopColor="var(--wish-liquid)" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id={`${id}-rim`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e9bfd1" stopOpacity="0.72" />
            <stop offset="0.44" stopColor="#c88ea9" stopOpacity="0.7" />
            <stop offset="1" stopColor="#e0afc5" stopOpacity="0.74" />
          </linearGradient>
        </defs>
        <g transform="translate(0 9) scale(1 0.92)">
          <path className="wish-heart-cavity" d={HEART_PATH} fill={`url(#${id}-cavity)`} />
          <g className="wish-heart-liquid" clipPath={`url(#${id}-clip)`}>
            <rect x="20" y={liquidFloor} width="200" height={LIQUID_BOTTOM - liquidFloor + 4} fill={`url(#${id}-fill)`} />
            <path className="wish-bottle-liquid-wave wish-bottle-liquid-wave-back" d={backWaveA}>
              <animate attributeName="d" dur="2.45s" repeatCount="indefinite" values={`${backWaveA};${backWaveB};${backWaveA}`} />
            </path>
            <path className="wish-bottle-liquid-wave" d={frontWaveA}>
              <animate attributeName="d" dur="2.2s" repeatCount="indefinite" values={`${frontWaveA};${frontWaveB};${frontWaveA}`} />
            </path>
            <path className="wish-bottle-liquid-shine" d={`M53 ${liquidTop + 7}C84 ${liquidTop + 2} 112 ${liquidTop + 10} 151 ${liquidTop + 4}`} />
          </g>
          <path className="wish-heart-rim" d={HEART_PATH} fill="none" stroke={`url(#${id}-rim)`} />
          <path className="wish-heart-inner-rim" d={HEART_PATH} fill="none" />
          <path className="wish-heart-highlight" d="M48 85C50 63 66 48 85 46C96 45 104 48 110 55" />
          <path className="wish-heart-highlight wish-heart-highlight-small" d="M184 65C194 75 197 89 195 102" />
          <path className="wish-heart-bottom-glint" d="M100 196C108 201 114 206 120 208C126 206 132 201 140 196" />
        </g>
      </svg>
      <span className="wish-bottle-glow" aria-hidden="true" />
    </div>
  );
}
