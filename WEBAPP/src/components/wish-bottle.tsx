"use client";

import { CSSProperties } from "react";

export type WishBottleDay = 1 | 2 | 3;

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
  const replies = clamp(totalReplies, 0, 30);
  const day: WishBottleDay = replies < 10 ? 1 : replies < 20 ? 2 : 3;
  const spriteRow = day - 1;
  const dayReplies = day === 1 ? replies : day === 2 ? replies - 10 : replies - 20;
  const spriteColumn = replies >= 30 ? 4 : Math.min(4, Math.floor(dayReplies / 2.5));
  const style = {
    "--wish-sprite-x": `${spriteColumn * 25}%`,
    "--wish-sprite-y": `${spriteRow * 50}%`
  } as CSSProperties;

  return (
    <div
      className={`wish-bottle ${isReplyAnimating ? "is-reply-animating" : ""} ${className}`}
      style={{ ...style, width: size, height: size * 1.755 }}
      aria-label={`Wish bottle progress ${replies} of 30 replies`}
    >
      <div className="wish-bottle-sprite" role="img" aria-hidden="true" />
      <img
        className="wish-bottle-glow"
        src="/assets/gifts/wish-bottle/wish-bottle-glow.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
