# Rizzora WebApp

This folder contains the mobile-first frontend for the Rizzora Facebook acquisition MVP.

The current product focuses on one promoted AI companion, Chris. Users enter from Facebook, log in, chat with Chris through text, use free messages, and convert through Premium membership or Extra Credits top-up.

## Product Flow

```text
Facebook traffic
↓
/m/c/main-character
↓
Chat with Chris
↓
Auth Modal
↓
Facebook Login or Continue with Google
↓
/m/chat/main-character
↓
30 Free Messages
↓
Free quota exhausted
↓
Premium prompt
↓
/m/vip
↓
Get Premium
↓
Back to Chat
```

## Current Monetization Model

Rizzora uses a fiat-to-Credits model.

User-facing:

- Free users receive `Free Messages`.
- Premium users receive `Monthly Credits`.
- All users may purchase `Extra Credits`.
- Premium users receive a discount on Extra Credits top-ups.
- User Center shows usage percentages, not raw Credits numbers.

Backend-facing:

- Credits map to internal AI/model token cost.
- Model tokens are internal accounting units.
- Do not expose token balance, token wallet, or token exchange concepts to users.

## Current Routes

```text
/m/c/main-character
/m/chat/main-character
/m/profile
/m/user-center
/m/user-center?state=vip
/m/vip
/m/recharge
/m/subscription-management
/m/subscription-management?tab=records
/m/privacy-security
/m/notifications
/m/notifications?state=empty
/m/legal?tab=privacy
/m/legal?tab=terms
/m/membership-legal?tab=benefits
/m/membership-legal?tab=renewal
```

## Key Screens

### Character Entry

Route: `/m/c/main-character`

Purpose:

- Receive Facebook mobile traffic.
- Show Chris immediately through the entry video.
- Gate the chat flow behind login.

Main behavior:

- `Chat with Chris` opens Auth Modal.
- Video uses a poster frame to avoid old-image flash.
- Sound can be toggled manually.

### Auth Modal

Purpose:

- Require login before chat.
- Explain that account creation helps Chris remember conversations.

Actions:

- `Login with Facebook`
- `Continue with Google`

Rules:

- Agreement checkbox is selected by default.
- If unchecked, login click triggers a light shake.
- Google auth reads `NEXT_PUBLIC_GOOGLE_AUTH_URL` when configured.

### Chat

Route: `/m/chat/main-character`

Purpose:

- Main text chat experience with Chris.
- Show account and usage state in the top-right menu.
- Convert free users after quota exhaustion.

Current behavior:

- Login is required.
- MVP supports text messages only.
- Free users start with 30 Free Messages.
- Each sent user message consumes one Free Message.
- Header shows Chris avatar and name only.
- Chris avatar opens `/m/profile`.
- The three-dot menu shows user account and usage state.

Free Account menu:

- User avatar, user name, `Free Account`, right arrow
- Free Messages remaining
- `Become Premium`
- Extra Credits remaining
- `Recharge`

Premium menu:

- User avatar, user name, `Premium`, right arrow
- Monthly Credits remaining
- Extra Credits remaining
- `Recharge`

Color rule:

- Free Messages: pink
- Monthly Credits: pink
- Extra Credits: gold

### VIP Membership Plan

Route: `/m/vip`

Purpose:

- Sell one Premium membership tier.
- Let users select monthly, quarterly, or yearly billing.

Important rule:

- There is one VIP tier.
- Monthly / Quarterly / Yearly are billing cycles, not different membership levels.

Benefit copy:

```text
50% off your first billing period. Renews at the regular price from the next cycle.
VIP membership - Auto-renews, cancel anytime
Generous monthly credits to keep chatting with Chris
VIP discount on extra Credit top-ups
Enhanced memory - Chris remembers you better over time
```

### User Center

Route: `/m/user-center`

Purpose:

- Show account state.
- Provide subscription, recharge, privacy, notifications, and logout entries.

Free Account state:

- Gray `Free Account` label
- `Free Plan` membership card
- `Become VIP`
- Extra Credits percentage and `Recharge Credits`

Premium state:

- Gold `Premium` label
- `VIP Plan · Quarterly Billing`
- Yellow `Crown.svg`
- `View Plan`
- `Manage Renewal`
- Monthly Credits percentage with `Resets on ***`
- Extra Credits percentage and `Recharge Credits`

Display rules:

- Do not show email.
- Do not show Account information.
- Do not show raw Credits or Points numbers.
- Do not show backend Tokens.

### Recharge Credits

Route: `/m/recharge`

Purpose:

- Let users buy Extra Credits.

Behavior:

- Users may freely enter a USD amount.
- Quick amount buttons are available.
- `Pay Now` creates checkout.
- `NEXT_PUBLIC_PAYMENT_CHECKOUT_URL` is used when configured.
- Local preview uses mock success if no checkout URL exists.

### Subscription Management

Route: `/m/subscription-management`

Purpose:

- Let Premium users manage renewal and view purchase records.

Tabs:

- Subscription
- Purchase Records

Subscription tab shows:

- Current plan
- Billing type
- Next renewal date
- Next renewal amount
- Payment method
- Cancel auto-renewal action

Purchase Records tab shows:

- Subscription type
- Price
- Charged time
- Order ID
- Payment method

## Local Preview

Install and run:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/m/c/main-character
```

Preview Free Account Chat:

```js
localStorage.removeItem("rizzora-vip")
localStorage.setItem("rizzora-authenticated", "true")
location.reload()
```

Preview Premium Chat:

```js
localStorage.setItem("rizzora-vip", "true")
localStorage.setItem("rizzora-authenticated", "true")
location.reload()
```

## Environment Variables

```text
NEXT_PUBLIC_GOOGLE_AUTH_URL=
NEXT_PUBLIC_PAYMENT_CHECKOUT_URL=
NEXT_PUBLIC_SHOW_HEART_DEMO=false
```

Set `NEXT_PUBLIC_SHOW_HEART_DEMO=true` in the Vercel Preview or Production environment when the heart collection demo controls should be visible there.

## Implementation Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Mobile-first WebApp layout
- Mock local state for login, Premium, quota, and payment preview

## Handoff Documents

```text
../docs/PRD_MVP.md
../docs/PRODUCT_DOCUMENTATION.md
../docs/PRODUCT_SPEC.md
```

## Next Backend Work

- Real Facebook Login
- Real Google OAuth
- User/session API
- Chat API
- Credits ledger
- Payment checkout
- Payment webhook
- Subscription management API
- Purchase record API
- Analytics events
