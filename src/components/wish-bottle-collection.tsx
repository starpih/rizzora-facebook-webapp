"use client";

import { useEffect, type CSSProperties } from "react";
import { X } from "lucide-react";
import { HEART_COLLECTION_COPY, type HeartCollectionReason } from "@/lib/heart-collection";

const WISH_JAR_IMAGE = "/assets/gifts/wish-bottle/wish-bottle-collection-v7.png";
const WISH_JAR_BODY_IMAGE = "/assets/gifts/wish-bottle/wish-jar-body-v1.png";
const WISH_JAR_CORK_IMAGE = "/assets/gifts/wish-bottle/wish-jar-cork-v1.png";
const WISH_JAR_FULL_HEART_IMAGE = "/assets/gifts/wish-bottle/wish-jar-full-heart-v1.png";

type WishBottleIconProps = {
  storedHeartCount: number;
  hasPendingHeart?: boolean;
  onClick: () => void;
};

export function WishBottleIcon({ storedHeartCount, hasPendingHeart = false, onClick }: WishBottleIconProps) {
  return (
    <button
      type="button"
      className={`wish-jar-entry ${hasPendingHeart ? "is-awaiting" : ""}`}
      onClick={onClick}
      aria-label={`Open wish bottle. ${storedHeartCount} hearts collected.`}
    >
      <WishBottleArtwork storedHeartCount={storedHeartCount} compact />
    </button>
  );
}

export function WishBottleDrawer({
  storedHeartCount,
  hasPendingHeart,
  onClose
}: {
  storedHeartCount: number;
  hasPendingHeart: boolean;
  onClose: () => void;
}) {
  return (
    <div className="wish-jar-drawer" role="dialog" aria-modal="true" aria-label="Wish bottle collection">
      <button type="button" className="wish-jar-drawer-backdrop" onClick={onClose} aria-label="Close wish bottle" />
      <section className="wish-jar-drawer-sheet">
        <button type="button" onClick={onClose} className="wish-jar-close" aria-label="Close">
          <X size={18} />
        </button>
        <div className="wish-jar-drawer-aura" aria-hidden="true">
          <span className="wish-jar-drawer-star star-one" />
          <span className="wish-jar-drawer-star star-two" />
          <span className="wish-jar-drawer-star star-three" />
          <span className="wish-jar-drawer-star star-four" />
        </div>
        <div className="wish-jar-drawer-art"><WishBottleArtwork storedHeartCount={storedHeartCount} /></div>
        <div className="wish-jar-drawer-copy">
          <p className="wish-jar-eyebrow">YOUR WISH BOTTLE</p>
          <h2>{storedHeartCount === 0 ? "Your first wish is waiting." : `${storedHeartCount} wish${storedHeartCount === 1 ? "" : "es"} kept safe.`}</h2>
          <p>{hasPendingHeart ? "A nearly full heart is waiting for your return." : "Every completed heart becomes a keepsake here."}</p>
        </div>
      </section>
    </div>
  );
}

export function HeartCollectionOverlay({
  reason,
  existingHeartCount,
  onComplete
}: {
  reason: HeartCollectionReason;
  existingHeartCount: number;
  onComplete: () => void;
}) {
  const copy = HEART_COLLECTION_COPY[reason];

  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="heart-collection-overlay" role="status" aria-live="polite">
      <div className="heart-collection-aura" aria-hidden="true" />
      <div className="heart-collection-scene" aria-hidden="true">
        <span className="heart-collection-spark spark-one" />
        <span className="heart-collection-spark spark-two" />
        <span className="heart-collection-spark spark-three" />
        <span className="heart-collection-spark spark-four" />
        <CollectionBottleScene existingHeartCount={existingHeartCount} />
      </div>
      <div className="heart-collection-copy">
        <p>{copy.title}</p>
        <span>{copy.detail}</span>
      </div>
    </div>
  );
}

function WishBottleArtwork({ storedHeartCount, compact = false }: { storedHeartCount: number; compact?: boolean }) {
  const hearts = compact ? Math.min(3, storedHeartCount) : storedHeartCount;

  return (
    <div className={`wish-jar-art ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <img src={WISH_JAR_IMAGE} alt="" />
      {hearts > 0 && <div className="wish-jar-stored-hearts">
        {Array.from({ length: hearts }, (_, index) => (
          <img
            key={index}
            className={`wish-jar-stored-heart heart-${index + 1}`}
            style={storedHeartStyle(index, hearts)}
            src={WISH_JAR_FULL_HEART_IMAGE}
            alt=""
          />
        ))}
      </div>}
      {compact && <span className="wish-jar-inline-count">{formatHeartCount(storedHeartCount)}</span>}
    </div>
  );
}

function formatHeartCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

function storedHeartStyle(index: number, total: number): CSSProperties {
  if (total === 1) {
    return { left: "26%", bottom: "2%", width: "48%", transform: "rotate(-3deg)" };
  }

  const naturalLayout = [
    [42, 0, -4, 1.06], [3, 1, -17, 0.96], [65, 2, 15, 1],
    [25, 7, 8, 1.04], [53, 7, -12, 1], [7, 9, 13, 0.98],
    [69, 11, -7, 1], [33, 16, 16, 0.96], [51, 17, -14, 0.94],
    [13, 21, -3, 0.92], [67, 22, 10, 0.9], [38, 26, -9, 0.88],
    [1, 29, 18, 0.86], [73, 30, -15, 0.86], [22, 35, 6, 0.82],
    [53, 36, -11, 0.8], [37, 43, 12, 0.78], [6, 45, -8, 0.76],
    [68, 46, 15, 0.76], [23, 52, -14, 0.72]
  ] as const;
  const [left, bottom, rotation, scale] = naturalLayout[index % naturalLayout.length];
  const size = total <= 4 ? 44 : total <= 9 ? 38 : total <= 16 ? 29 : total <= 30 ? 22 : 16;

  return {
    left: `${left}%`,
    bottom: `${bottom}%`,
    width: `${size}%`,
    zIndex: Math.round(bottom) + 1,
    transform: `rotate(${rotation}deg) scale(${scale})`,
    transformOrigin: "50% 90%"
  };
}

function CollectionBottleScene({ existingHeartCount }: { existingHeartCount: number }) {
  const existingHearts = Math.min(99, Math.max(0, existingHeartCount));

  return (
    <div className="heart-collection-bottle" aria-hidden="true">
      <img className="heart-collection-cap" src={WISH_JAR_CORK_IMAGE} alt="" />
      {existingHearts > 0 && (
        <div className="heart-collection-stored-hearts">
          {Array.from({ length: existingHearts }, (_, index) => (
            <img
              key={index}
              className="heart-collection-stored-heart"
              style={storedHeartStyle(index, existingHearts)}
              src={WISH_JAR_FULL_HEART_IMAGE}
              alt=""
            />
          ))}
        </div>
      )}
      <div className="heart-collection-inner-light" />
      <img className="heart-collection-heart" src={WISH_JAR_FULL_HEART_IMAGE} alt="" />
      <img className="heart-collection-jar" src={WISH_JAR_BODY_IMAGE} alt="" />
    </div>
  );
}
