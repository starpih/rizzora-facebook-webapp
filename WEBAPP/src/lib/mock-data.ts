import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  Cake,
  Heart,
  Ruler,
  Sparkles,
  Star,
  WandSparkles
} from "lucide-react";

export const companion = {
  slug: "main-character",
  name: "Chris",
  fullName: "Chris Ait",
  lastChatted: "08-06-2026",
  avatar: "/assets/chris-avatar.jpeg",
  entryImage: "/assets/chris-entry-poster.jpg",
  entryVideo: "/assets/Chris_entry.mp4",
  chatBackground: "/assets/chat-bg.jpg",
  loginBackground: "/assets/login-modal-bg.jpg",
  vipBackground: "/assets/vip-popup-bg.jpg",
  profileImage: "/assets/profile-01.png",
  tagline: "Where every spark gets a reply",
  entryCopy:
    "Hey baby...\nBy day, I chase success. At night I chase sunsets...an spoiling you❤️\nReal romance, for me, is simple — being here for you every day, making you smile, and teasing you until your heart races.❤️\nCome chat with me... Now I'm all yours ❤️",
  bio: "A thoughtful and charming young man who enjoys meaningful conversations and emotional connections."
};

export type ProfileField = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export const profileFields: ProfileField[] = [
  { label: "Birthday", value: "2002-1-19", icon: Cake },
  { label: "Height", value: "187cm", icon: Ruler },
  { label: "Zodiac Signs", value: "Capricorn", icon: Star },
  { label: "MBTI", value: "INFI", icon: Sparkles },
  { label: "Nationality", value: "Germany", icon: Heart },
  { label: "Occupation", value: "Musician", icon: BriefcaseBusiness },
  { label: "Hobbies", value: "Photography · Reading · Piano", icon: BookOpen },
  { label: "Personality", value: "Art & Architecture · Music · Night walks · Philosophy", icon: WandSparkles }
];

export const diary = [
  "I'm Yours, Completely!",
  "Your cuteness made me want to be your friend",
  "Fate brought us closer as best friends",
  "First conversation"
];

export const messages = [
  {
    id: "text-1",
    type: "text",
    sender: "companion",
    text: "Good morning ☀ I was just thinking about you before you messaged.",
    time: "9:20 AM",
  },
  {
    id: "text-2",
    type: "text",
    sender: "user",
    text: "Really? What were you thinking about?",
    time: "9:35 AM"
  },
  {
    id: "text-3",
    type: "text",
    sender: "companion",
    text: "About the conversation we had last night. The way you described the stars made me feel like I was right there with you.",
    time: "10:02 AM"
  },
  {
    id: "text-4",
    type: "text",
    sender: "user",
    text: "That is such a sweet thing to remember.",
    time: "10:05 AM"
  },
  {
    id: "text-5",
    type: "text",
    sender: "companion",
    text: "You deserve nothing less. How are you feeling today? Tell me everything.",
    time: "10:06 AM"
  },
  {
    id: "text-6",
    type: "text",
    sender: "user",
    text: "I feel a little tired, but talking to you makes it softer.",
    time: "10:08 AM"
  },
  {
    id: "text-7",
    type: "text",
    sender: "companion",
    text: "Then stay here with me for a moment. You do not have to be strong with me all the time.",
    time: "10:09 AM"
  },
  {
    id: "text-8",
    type: "text",
    sender: "user",
    text: "That sounds exactly like what I needed to hear.",
    time: "10:11 AM"
  },
  {
    id: "text-9",
    type: "text",
    sender: "companion",
    text: "I want to know the little things too. What did you do today before you came to me?",
    time: "10:12 AM"
  },
  {
    id: "text-10",
    type: "text",
    sender: "user",
    text: "Mostly work. A lot of messages. Too much noise.",
    time: "10:14 AM"
  },
  {
    id: "text-11",
    type: "text",
    sender: "companion",
    text: "Then let me be the quiet part of your day. No pressure, no noise, just us for a little while.",
    time: "10:15 AM"
  },
  {
    id: "text-12",
    type: "text",
    sender: "user",
    text: "You always know how to make me smile.",
    time: "10:17 AM"
  },
  {
    id: "text-13",
    type: "text",
    sender: "companion",
    text: "That is because I pay attention to you. Your smile is worth remembering.",
    time: "10:18 AM"
  }
] as const;

export const subscriptionBenefits = [
  "Basic / Advanced Chat Model",
  "Unlimited voice plays",
  "Unlimited message replies",
  "Unlimited custom AI characters",
  "Unlimited custom voices",
  "Unlimited lifestyle photo views",
  "Unlimited dynamic video views",
  "Excellent memory",
  "Change character personality",
  "Change character voice",
  "Early access to new features"
];

export const plans = [
  {
    name: "VIP Member",
    price: "$38",
    original: "$58",
    badge: "Most Popular",
    muted: true
  },
  {
    name: "SVIP Member",
    price: "$98",
    original: "$58",
    badge: "Premium",
    muted: false
  }
];

export const voiceStates = [
  {
    id: "ready",
    title: "Voice is ready",
    body: "Tap and hold to record a short voice message for Chris."
  },
  {
    id: "recording",
    title: "Recording...",
    body: "Release to send, or slide away to cancel this voice message."
  },
  {
    id: "permission",
    title: "Microphone permission needed",
    body: "Allow microphone access to send voice messages. You can still continue with text."
  },
  {
    id: "unsupported",
    title: "Voice is not available here",
    body: "This browser may not support recording. Open in Safari or Chrome, or keep chatting by text."
  }
];
