export type HeartMode = "trial" | "vip_active" | "vip_expired";
export type HeartCollectionReason = "trial_upgrade" | "renewal" | "resubscribe";

export type HeartDemoState = {
  mode: HeartMode;
  fillPercent: number;
  trialMessagesUsed: number;
  vipCycleDay: number | null;
  storedHeartCount: number;
  pendingRecoveryHeart: boolean;
};

export const VIP_HEART_MILESTONES = [
  [1, 10], [3, 20], [8, 30], [10, 40], [13, 50],
  [18, 60], [20, 70], [23, 80], [28, 90], [31, 98]
] as const;

export function getVipHeartFillPercent(cycleDay: number) {
  const day = Math.max(1, Math.min(31, cycleDay));
  const milestones = VIP_HEART_MILESTONES;

  for (let index = 1; index < milestones.length; index += 1) {
    const [previousDay, previousFill] = milestones[index - 1];
    const [nextDay, nextFill] = milestones[index];
    if (day <= nextDay) {
      const progress = (day - previousDay) / (nextDay - previousDay);
      return Number((previousFill + (nextFill - previousFill) * progress).toFixed(1));
    }
  }

  return 98;
}

export function getTrialHeartFillPercent(replies: number) {
  const milestones: Array<[number, number]> = [
    [0, 5.5], [1, 10], [5, 20], [9, 33.3], [10, 33.3],
    [11, 40], [15, 50], [19, 66.7], [20, 66.7], [21, 66.7],
    [25, 80], [30, 95]
  ];
  const clampedReplies = Math.max(0, Math.min(30, Math.floor(replies)));
  return [...milestones].reverse().find(([reply]) => clampedReplies >= reply)?.[1] ?? 5.5;
}

export const HEART_COLLECTION_COPY: Record<HeartCollectionReason, { title: string; detail: string }> = {
  trial_upgrade: { title: "A wish has found its home.", detail: "Your first heart is safely kept." },
  renewal: { title: "Another month, another wish.", detail: "Your devotion has become a keepsake." },
  resubscribe: { title: "Your wish was waiting for you.", detail: "Welcome back to where it belongs." }
};
