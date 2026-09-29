"use client";

import { useId } from "react";

export type WishBottleDay = 1 | 2 | 3;

const TOTAL_BOTTLE_REPLIES = 30;
const SPRITE_COLUMNS = 5;
// The generated sheet has non-uniform row gutters. Use measured windows,
// not height / 6: that would cut the tips and make later rows drift.
const SPRITE_ROW_TOPS = [20, 233, 453, 677, 895, 1115];
const FRAME_WIDTH = 229;
const FRAME_HEIGHT = 220;
const ASSET_ROOT = "/assets/gifts/wish-bottle";
// Trims only debris OUTSIDE the glass. Liquid/reflections are baked into PNGs.
const GLASS_OUTLINE = "M117 47 C101 29 85 12 58 12 C27 9 9 39 9 67 C7 127 69 161 110 190 Q117 197 124 190 C168 158 223 121 223 70 C225 38 206 12 169 12 C147 11 131 40 117 47Z";

type WishBottleProps = {
  totalReplies: number;
  isReplyAnimating?: boolean;
  size?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function WishBottle({
  totalReplies,
  isReplyAnimating = false,
  size = 120,
  className = ""
}: WishBottleProps) {
  const clipId = `wish-glass-${useId().replace(/:/g, "")}`;
  const replies = clamp(Number.isFinite(totalReplies) ? Math.floor(totalReplies) : 0, 0, TOTAL_BOTTLE_REPLIES);
  const frame = Math.max(0, replies - 1);
  const spriteColumn = frame % SPRITE_COLUMNS;
  const spriteRow = Math.floor(frame / SPRITE_COLUMNS);

  return (
    <div
      className={`wish-bottle ${isReplyAnimating ? "is-reply-animating" : ""} ${className}`}
      style={{ width: size, height: size * FRAME_HEIGHT / FRAME_WIDTH }}
      aria-label={`Wish bottle progress ${replies} of ${TOTAL_BOTTLE_REPLIES} replies`}
    >
      <svg className="wish-bottle-sprite" viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId}><path d={GLASS_OUTLINE} /></clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {replies === 0 ? (
            <image href={`${ASSET_ROOT}/wish-bottle-heart-empty-v6.png`}
              x={-22.77} y={-25.86} width={277.55} height={257.85} preserveAspectRatio="none" />
          ) : (
            <image href={`${ASSET_ROOT}/wish-bottle-heart-30-states-v6.png`}
              x={-spriteColumn * FRAME_WIDTH} y={-SPRITE_ROW_TOPS[spriteRow]}
              width={1145} height={1374} />
          )}
        </g>
      </svg>
      <img
        className="wish-bottle-glow"
        src="/assets/gifts/wish-bottle/wish-bottle-glow.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
