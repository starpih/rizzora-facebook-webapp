# Wish Heart & Wish Bottle — implementation handoff

This prototype demonstrates presentation and state transitions only. Production eligibility, subscription status and collected-heart history must be server-authoritative.

## State model

Persist one `heart_cycle` per user cycle with:

- `cycle_type`: `trial` or `vip`
- `cycle_started_at`, `cycle_ended_at`
- `fill_percent` and `status`: `active`, `awaiting_collection`, `collected`, `frozen`
- `collected_at`, `collection_reason`: `trial_upgrade`, `renewal`, or `resubscribe`
- an idempotency key based on user, cycle and collection reason

The client should render the returned state, not calculate eligibility from local time. The pure display helpers in `src/lib/heart-collection.ts` document the current visual rules and can be shared conceptually with backend rules.

## Fill rules

### Trial

- A new user can receive at most three days of ten free conversations.
- Count a turn only after the assistant reply has been successfully persisted.
- The trial heart starts with a small base fill and never exceeds 95% through its 30th reply.
- If the user starts VIP at any point in the trial, mark the current trial heart `awaiting_collection` at 100% and play the collection sequence. Create the new VIP heart only after the sequence completes.

### Active VIP month

Interpolate daily between these points: day 1 / 10%, day 3 / 20%, day 8 / 30%, day 10 / 40%, day 13 / 50%, day 18 / 60%, day 20 / 70%, day 23 / 80%, day 28 / 90%, day 31 / 98%.

- Extra chat-credit purchases must not change this fill.
- On a continuous renewal, complete the previous 98% heart, collect it on the new cycle's first day, then reveal the new heart at day 1 / 10%.
- On expiration without renewal, freeze the heart at 98%, show no collection animation and provide no free-message quota.
- On resubscription, complete and collect the frozen heart with the `resubscribe` copy, then start a fresh VIP heart at day 1 / 10%.

## Client events

The client needs server-sent or API state updates for these events:

1. `assistant_reply_persisted` — refreshes trial display progress only.
2. `subscription_activated` — returns a pending `trial_upgrade` collection if a trial heart exists.
3. `subscription_renewed` — returns a pending `renewal` collection on the first day of the next paid cycle.
4. `subscription_resumed` — returns a pending `resubscribe` collection for the frozen heart.
5. `heart_collection_acknowledged` — sent after the animation; server responds with the new active heart state.

If an animation is interrupted, retain `awaiting_collection` and replay it when the user next enters chat. The backend must ignore duplicate acknowledgement attempts using the collection idempotency key.

## Prototype surfaces

- The header wish-bottle icon opens the keepsake drawer and shows a collected-heart count.
- The centre animation opens the cork, introduces the filled heart, settles it into the bottle, closes the cork and shows restrained light.
- In development only, **Demo** exposes trial, active VIP, expired, upgrade, renewal and resubscribe states. It is deliberately excluded from production builds.

