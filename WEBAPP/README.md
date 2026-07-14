# Rizzora WebApp

## 1. Project Purpose

This folder is reserved for the Rizzora WebApp frontend implementation.

The current MVP focuses on the Facebook acquisition flow. Users enter from Facebook profile links, posts, stories, reels, ads, or Messenger links, then land in a mobile-first WebApp experience and start chatting with one promoted AI companion.

Current MVP scope:

- Facebook traffic landing entry
- Single promoted companion
- Mobile-first WebApp pages
- Text chat
- Asynchronous voice message entry
- Free quota display and deduction
- Login / signup prompt
- Quota limit prompt
- Subscription prompt
- User center / profile state

Out of current MVP scope:

- Full desktop Web experience
- Multi-character marketplace
- Real-time voice call
- Real payment integration
- Full backend admin
- Full multilingual system

## 2. Product Flow

```text
Facebook
↓
WebApp Character Entry
↓
WebApp Chat
↓
Free text / voice quota
↓
Login or signup prompt
↓
More free quota or subscription prompt
↓
Continue chatting or stop
```

## 3. Planned Routes

```text
/m/c/main-character
/m/chat/main-character
/m/profile
```

Modal states:

```text
Auth Modal
Quota Limit Modal
Subscription Modal
Voice Permission Modal
Voice Unsupported State
```

## 4. Required Screens

### 4.1 WebApp Character Entry

Purpose:

- Receive Facebook mobile traffic
- Show the promoted companion immediately
- Let users start chatting without forced registration

Required UI:

- Promoted companion visual
- Rizzora branding
- Companion name
- Short romantic but safe value statement
- Primary CTA: `Start Voice Chat` or `Chat with Chris`
- Secondary CTA: `Text Him`
- Privacy reassurance

Important rules:

- Primary CTA must be visible in the first viewport
- CTA should respect mobile safe area
- Do not show complex navigation
- Do not force login before first interaction

### 4.2 WebApp Chat

Purpose:

- Main conversion and retention surface
- Let users experience text and voice interaction
- Trigger login, quota, and subscription moments naturally

Required UI:

- Companion header
- Chat message list
- Text composer
- Voice action button
- Message send button
- Remaining quota indicator
- Voice message bubble
- Companion profile entry

Required states:

- Empty / first message state
- Sending
- Send failed
- Voice recording
- Voice recording cancel
- Microphone permission denied
- Unsupported browser voice fallback
- Quota low
- Quota exhausted

### 4.3 Auth Modal

Purpose:

- Convert anonymous users after they have experienced value
- Preserve chat memory and relationship continuity

Recommended copy:

```text
Keep talking with Chris

Create an account so he can remember your conversations and get to know you better. Your account information is kept private.
```

Required actions:

- Login with Facebook
- Other sign in options
- Privacy agreement checkbox
- Terms and privacy links
- Close action

### 4.4 Quota Limit Modal

Purpose:

- Explain that free quota has been used
- Offer clear ways to continue

Recommended copy:

```text
Your free voice chats are used up.

Sign up to get more free chats, or upgrade to keep talking with Chris.
```

Required actions:

- `Sign up for more free chats`
- `Upgrade to keep talking`
- `Maybe later`

### 4.5 Subscription Modal

Purpose:

- Convert high-intent users after free quota is used
- Sell continued companionship, not a generic feature bundle

Recommended title:

```text
Choose Your Plan
```

Recommended subtitle:

```text
Build a deeper connection with your AI companion and continue your private voice moments.
```

Implementation notes:

- Avoid promising unlimited usage unless backend quota and cost controls support it
- Prefer clear voice credits or message quotas
- Show renewal and cancellation terms before payment
- MVP may use mock payment state

### 4.6 User Center / Profile

Purpose:

- Show account and subscription state
- Let users subscribe, manage subscription, or log out

Required UI:

- User avatar
- User name
- Membership state
- Remaining text quota
- Remaining voice quota
- Subscribe or manage subscription action
- Log out action

## 5. Voice Interaction Scope

MVP supports asynchronous voice messages, not real-time voice calls.

Recommended P0 behavior:

```text
Tap voice button
↓
Request microphone permission
↓
Record short voice message
↓
Send voice message
↓
AI returns text and/or playable voice reply
```

Fallback behavior:

- If microphone is denied, continue with text chat
- If browser does not support recording, show text fallback
- If opened inside an unstable in-app browser, suggest opening in Safari or Chrome

## 6. Analytics Events

Recommended events:

```text
facebook_link_clicked
webapp_entry_viewed
chat_page_entered
first_message_sent
voice_button_clicked
voice_permission_requested
voice_permission_denied
voice_message_sent
quota_low_shown
quota_exhausted
auth_modal_shown
signup_started
signup_completed
subscription_modal_shown
plan_selected
mock_payment_completed
payment_abandoned
```

## 7. Source Documents

Product and design references:

- `../docs/PRD_MVP.md`
- `../docs/PRODUCT_SPEC.md`
- `../docs/DESIGN_SYSTEM_BRIEF.md`
- `../docs/FIGMA_AUDIT_TASK.md`

Figma reference:

```text
WEB / 04 FB Screens
```

## 8. Design Direction

The WebApp should follow the Rizzora design direction:

- Romantic dark luxury
- Premium
- Emotional
- Female-friendly
- Private
- Safe
- Soft but not childish
- Attractive but not vulgar

Avoid:

- Cheap dating app style
- Live-streaming platform style
- Nightclub visual language
- Overly sexualized imagery or copy
- Heavy black-red adult style
- Random neon effects

## 9. Development Notes

Current frontend stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- TanStack Query reserved for API state integration
- Zustand reserved for shared client UI state if needed
- Browser Media APIs reserved for voice recording

Implementation direction:

- Mobile-first layout
- Fixed app viewport behavior
- Safe area support for iOS and Android browsers
- Keyboard-aware composer behavior
- Token-based colors, spacing, radius, and typography
- Componentized modal and message states
- Clear separation between mock data and future API integration

Current structure:

```text
WEBAPP/
  README.md
  package.json
  src/
    app/
    components/
    lib/
  public/
    assets/
```

## 10. Current Status

Status: initial WebApp frontend implemented with mock data.

Implemented:

- WebApp Character Entry
- WebApp Chat
- WebApp Profile for Chris Ait
- Auth Modal
- Quota Limit Modal
- Subscription Modal
- Voice state sheet
- Mock quota deduction
- Mock message sending

Next step:

- Connect backend APIs
- Connect Facebook Login
- Connect analytics events
- Replace mock quota and subscription state with real backend state
