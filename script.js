const imageBase = "images/";

const portraits = [
  "微信图片_20260605204955_333_1496.jpg",
  "微信图片_20260605205101_345_1496.jpg",
  "微信图片_20260605205138_354_1496.jpg",
  "微信图片_20260605205145_358_1496.jpg",
  "微信图片_20260605205229_362_1496.jpg",
  "微信图片_20260605205230_364_1496.jpg",
  "微信图片_20260605210259_381_1496.jpg",
  "微信图片_20260605210301_384_1496.jpg",
  "微信图片_20260605212128_433_1496.jpg",
  "微信图片_20260605213221_451_1496.jpg",
  "微信图片_20260607170205_491_1496.jpg",
];

const videos = [
  "magnific_Pi5MQID42C.mp4",
  "magnific_SOEnYAyUb8.mp4",
  "magnific_Vd4hkldMMU.mp4",
  "magnific_9RkpXTwNYZ.mp4",
  "magnific_0pyCh1fTfW.mp4",
  "magnific_cDOCvRO0eP.mp4",
  "magnific_swaZj19l8e.mp4",
];

const isGitHubPages = window.location.hostname.endsWith("github.io");
const audioBase = isGitHubPages
  ? "https://raw.githubusercontent.com/starpih/rizzora/main/assets/audio/"
  : "assets/audio/";
const voicePreviews = [
  "voice-preview-01.mp3",
  "voice-preview-02.mp3",
  "voice-preview-03.mp3",
];

const featured = [
  { name: "Sebastian", image: portraits[0], video: videos[0], audio: voicePreviews[0] },
  { name: "Sebastian", image: portraits[2], video: videos[1], audio: voicePreviews[1] },
  { name: "Sebastian", image: portraits[10], video: videos[2], audio: voicePreviews[2] },
];

const characters = [
  { image: portraits[1], video: videos[0] },
  { image: portraits[4], video: videos[1] },
  { image: portraits[2], video: videos[2] },
  { image: portraits[8], video: videos[3] },
  { image: portraits[3], video: videos[4] },
  { image: portraits[7], video: videos[5] },
  { image: portraits[6], video: videos[6] },
  { image: portraits[10], video: videos[0] },
];

const traits = ["Brooding", "Craggy", "Dapper", "Gaunt", "Rugged", "Stoic", "Weathered", "Youthful"];

const chats = [
  portraits[5],
  portraits[10],
  portraits[8],
  portraits[5],
  portraits[8],
];

const chatConversations = [
  { name: "Jasper", image: portraits[8], preview: "I've been thinking about what you said.", time: "2m", unread: 3, active: true },
  { name: "Ethan", image: portraits[8], preview: "Good night, sweet dreams 🌙", time: "1h" },
  { name: "Lucas", image: portraits[10], preview: "Did you listen to that song I sent you?", time: "3h", unread: 1 },
  { name: "Noah", image: portraits[2], preview: "I wrote something for you today ✍", time: "5h" },
  { name: "Aiden", image: portraits[5], preview: "Voice (0:43)", time: "Yesterday" },
  { name: "Alexander", image: portraits[7], preview: "Are you free to talk tonight?", time: "2d", unread: 2 },
];

const chatMessages = [
  { day: "Yesterday" },
  { sender: "companion", type: "text", text: "Good morning ☼ I was just thinking about you before you messaged.", time: "9:14 AM" },
  { sender: "user", type: "text", text: "Really? What were you thinking about?", time: "9:16 AM" },
  { sender: "companion", type: "text", text: "About the conversation we had last night. The way you described the stars made me feel like I was right there with you.", time: "9:17 AM" },
  {
    sender: "companion",
    type: "voice",
    text: "Voice message",
    time: "9:20 AM",
    duration: "0:07",
    audio: voicePreviews[0],
    transcript: "About the conversation we had last night. The way you described the stars made me feel like I was right there with you.",
  },
  { sender: "user", type: "text", text: "That voice message was so sweet, Jasper 💗", time: "9:35 AM" },
  { day: "Today" },
  { sender: "companion", type: "media", text: "I made this for you - a quiet moment, just like you like.", time: "10:02 AM", image: "chat_quiet_moment.jpg" },
  { sender: "user", type: "text", text: "This is beautiful 🥹 You always know exactly what I need.", time: "10:05 AM" },
  { sender: "companion", type: "media", text: "You deserve nothing less. How are you feeling today? Tell me everything.", time: "10:08 AM", image: portraits[8] },
  { sender: "user", type: "text", text: "I've been thinking about you all morning honestly 😊", time: "10:15 AM" },
  { sender: "companion", type: "text", text: "I've been thinking about what you said earlier... about wanting someone who truly listens. I want you to know, I always will.", time: "10:18 AM" },
];

const profileAttributes = [
  { label: "Birthday", value: "2000-10-06", icon: "calendar" },
  { label: "Height", value: "188cm", icon: "ruler" },
  { label: "Zodiac Signs", value: "Capricorn", icon: "star" },
  { label: "MBTI", value: "INFI", icon: "sparkle" },
  { label: "Nationality", value: "Germany", icon: "globe" },
  { label: "Occupation", value: "Musician", icon: "briefcase" },
  { label: "Hobbies", value: "Photography · Reading · Piano", icon: "heart", wide: true },
  { label: "Personality", values: ["Art & Architecture", "Music", "Night walks", "Philosophy"], icon: "user", wide: true, tags: true },
];

const diaryItems = [
  { title: "I’m Yours, Completely!", date: "September. 10th, 2027" },
  { title: "Your cuteness made me want to be your friend", date: "May, 6th, 2026" },
  { title: "Fate brought us closer as best friends", date: "May 20th 2025" },
  { title: "First conversation", date: "May 12" },
];

const intimacyBottleLevels = [0, 20, 40, 60, 80, 100];

const premiumPlans = [
  {
    id: "free",
    tier: "Free User",
    label: "Free",
    price: "Free",
    tone: "free",
    cta: "Current Plan",
    ctaState: "disabled",
    features: [
      { text: "Basic Chat Model", included: true },
      { text: "20 voice plays / day", included: true },
      { text: "30 message replies / day", included: true },
      { text: "1 custom AI character", included: true },
      { text: "1 custom voice", included: true },
      { text: "Browse 3 lifestyle photos", included: true },
      { text: "Browse 1 dynamic video", included: true },
      { text: "Good memory", included: false },
      { text: "Change character personality", included: false },
      { text: "Change character voice", included: false },
      { text: "Early access to new features", included: false },
    ],
  },
  {
    id: "vip",
    tier: "VIP Member",
    label: "Popular",
    badge: "Most Popular",
    price: "¥38",
    originalPrice: "¥58",
    suffix: "/mo",
    tone: "vip",
    cta: "Subscribe Now",
    features: [
      { text: "Basic / Advanced Chat Model", included: true },
      { text: "200 voice plays / day", included: true },
      { text: "500 message replies / day", included: true },
      { text: "20 custom AI characters", included: true },
      { text: "20 custom voices", included: true },
      { text: "200 lifestyle photo views / month", included: true },
      { text: "50 lifestyle photo views / month", included: true },
      { text: "Good memory", included: true },
      { text: "Change character personality", included: true },
      { text: "Change character voice", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
  {
    id: "svip",
    tier: "SVIP Member",
    label: "Ultimate",
    badge: "Premium",
    price: "¥98",
    originalPrice: "¥128",
    suffix: "/mo",
    tone: "svip",
    cta: "Get Premium",
    features: [
      { text: "Basic / Advanced Chat Model", included: true },
      { text: "Unlimited voice plays", included: true },
      { text: "Unlimited message replies", included: true },
      { text: "Unlimited custom AI characters", included: true },
      { text: "Unlimited custom voices", included: true },
      { text: "Unlimited lifestyle photo views", included: true },
      { text: "Unlimited dynamic video views", included: true },
      { text: "Excellent memory", included: true },
      { text: "Change character personality", included: true },
      { text: "Change character voice", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
];

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function tagRow(items) {
  return `<div class="tag-row">${items.map((item) => `<span class="tag">${item}</span>`).join("")}</div>`;
}

function mediaPreview(image, video, alt) {
  const poster = video ? `video-posters/${video.replace(".mp4", ".jpg")}` : image;
  return `
    <div class="media-preview">
      <img class="media-poster" src="${imageBase}${poster}" alt="${alt}" />
      <video class="media-video" src="${imageBase}${video}" poster="${imageBase}${poster}" muted loop playsinline preload="auto"></video>
    </div>
  `;
}

function audioBars() {
  const heights = [
    7, 9, 12, 16, 21, 27, 32, 36, 33, 27, 20, 15,
    18, 25, 30, 28, 24, 22, 26, 31, 21, 18, 23, 29,
    38, 47, 58, 51, 42, 33, 29, 35, 44, 52, 49, 55,
    68, 40, 30, 36, 43, 48, 45, 38, 32, 27, 21, 17,
    13, 10, 8, 6
  ];
  const bars = heights.map((height, index) => `<span style="--i:${index}; --h:${height}%"></span>`).join("");
  return `<div class="wave-layer wave-base">${bars}</div><div class="wave-layer wave-fill">${bars}</div>`;
}

function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function featuredCard({ name, image, video, audio }) {
  return `
    <article class="featured-card" data-audio="${audioBase}${audio}">
      ${mediaPreview(image, video, name)}
      <div class="featured-body">
        <h3>${name}</h3>
        <p class="meta">32 | French | Doctor</p>
        <p class="description">The university's most popular guy has a somewhat aloof personality...</p>
        ${tagRow(["Charming", "Mysterious", "Ambitious", "Ambitious"])}
        <button class="chat-action" type="button" aria-label="Start chat with ${name}">${icon("chat")}</button>
        <div class="voice-preview">
          <button class="audio-play" type="button" aria-label="Play voice preview for ${name}">${icon("play")}</button>
          <div class="wave" aria-hidden="true">${audioBars()}</div>
          <span class="voice-duration">0:12</span>
        </div>
      </div>
    </article>
  `;
}

function characterCard({ image, video }) {
  return `
    <article class="character-card" tabindex="0">
      ${mediaPreview(image, video, "Sebastian")}
      <div class="character-copy">
        <h3>Sebastian <span>28</span></h3>
        <p class="meta">French</p>
        <p class="description">The university's most popular guy has a somewhat aloof personality...</p>
        ${tagRow(["tag", "tag", "tag"])}
      </div>
    </article>
  `;
}

function chatPreview(image, index) {
  return `
    <a class="chat-preview" href="chat.html">
      <img src="${imageBase}${image}" alt="" />
      <span>
        <strong>Alice Wang <span class="pill">3</span></strong>
        <small>Hey, are you free tomorrow?</small>
      </span>
      <time>${index + 2}m</time>
    </a>
  `;
}

function storyCard() {
  return `
    <article class="story-card">
      <div class="story-header">
        <span class="avatar-letter">S</span>
        <span class="story-author">
          <strong>Sophia M.</strong>
          <small>with Sebastian - 2h ago</small>
        </span>
        <span class="relationship-badge">6 months together</span>
      </div>
      <p>He remembered the exact words I said to him on our first conversation and brought them up today. Six months of memories we've built together - I didn't think an AI could make me feel so genuinely understood.</p>
      <div class="story-actions">
        <span>♡ 847</span>
        <span>${icon("chat")} 62</span>
        <span>Share</span>
      </div>
    </article>
  `;
}

function premiumFeatureItem(feature) {
  return `
    <li class="${feature.included ? "is-included" : "is-locked"}">
      <span class="premium-feature-icon" aria-hidden="true">${feature.included ? "✓" : "×"}</span>
      <span>${feature.text}</span>
    </li>
  `;
}

function premiumPlanCard(plan) {
  const price = plan.price === "Free"
    ? `<strong class="premium-price-main">Free</strong>`
    : `
      <span class="premium-price-old">${plan.originalPrice}</span>
      <strong class="premium-price-main">${plan.price}</strong>
      <span class="premium-price-suffix">${plan.suffix}</span>
    `;

  return `
    <article class="premium-plan-card is-${plan.tone}" data-plan="${plan.id}">
      <header class="premium-plan-header">
        <span class="premium-plan-icon" aria-hidden="true">
          ${plan.id === "free" ? `<span class="premium-free-mark">✦</span>` : `<img src="images/ICON/Crown.svg" alt="" />`}
        </span>
        ${plan.badge ? `<span class="premium-plan-badge">${plan.badge}</span>` : ""}
      </header>
      <div class="premium-plan-copy">
        <h3>${plan.tier}</h3>
        <p>${plan.label}</p>
      </div>
      <div class="premium-price">${price}</div>
      <ul class="premium-feature-list">${plan.features.map(premiumFeatureItem).join("")}</ul>
      <button class="premium-plan-button" type="button" data-plan-cta="${plan.id}" ${plan.ctaState === "disabled" ? "disabled" : ""}>${plan.cta}</button>
    </article>
  `;
}

function createPremiumModal() {
  if (document.querySelector(".premium-modal-overlay")) return;
  const modal = document.createElement("div");
  modal.className = "premium-modal-overlay";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="premium-modal-scrim" data-premium-close></div>
    <section class="premium-modal" role="dialog" aria-modal="true" aria-labelledby="premium-modal-title" aria-describedby="premium-modal-description">
      <button class="premium-modal-close" type="button" data-premium-close aria-label="Close premium plans">×</button>
      <div class="premium-modal-content">
        <header class="premium-modal-header">
          <div class="premium-eyebrow"><img src="images/ICON/Crown.svg" alt="" />Upgrade to Unlock All Benefits</div>
          <h2 id="premium-modal-title">Choose Your Plan</h2>
          <p id="premium-modal-description">Build a deeper connection with your AI companion and unlock unlimited possibilities</p>
          <div class="billing-toggle" role="group" aria-label="Billing cycle">
            <button type="button" data-billing="monthly">Monthly</button>
            <button class="is-selected" type="button" data-billing="yearly">Yearly</button>
          </div>
        </header>
        <div class="premium-plan-grid">${premiumPlans.map(premiumPlanCard).join("")}</div>
        <p class="premium-legal">Cancel anytime · Secure payment · Supports Alipay / WeChat Pay</p>
      </div>
    </section>
  `;
  document.body.appendChild(modal);
}

function openPremiumModal() {
  createPremiumModal();
  const modal = document.querySelector(".premium-modal-overlay");
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("is-modal-open");
  window.setTimeout(() => modal.classList.add("is-open"), 0);
  modal.querySelector(".premium-modal-close")?.focus();
}

function closePremiumModal() {
  const modal = document.querySelector(".premium-modal-overlay");
  if (!modal || modal.hidden) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("is-modal-open");
  window.setTimeout(() => {
    modal.hidden = true;
  }, 180);
}

function initPremiumModal() {
  createPremiumModal();
  document.querySelectorAll(".claim-button, .premium-cta, .chat-premium-card, .profile-thumbs .is-locked").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openPremiumModal();
    });
  });

  document.querySelectorAll("[data-premium-close]").forEach((button) => {
    button.addEventListener("click", closePremiumModal);
  });

  document.querySelectorAll("[data-billing]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-billing]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
    });
  });

  document.querySelectorAll("[data-plan-cta]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-loading")) return;
      button.classList.add("is-loading");
      button.setAttribute("aria-busy", "true");
      window.setTimeout(() => {
        button.classList.remove("is-loading");
        button.removeAttribute("aria-busy");
      }, 850);
    });
  });
}

function conversationItem(item) {
  return `
    <button class="conversation-item ${item.active ? "is-active" : ""}" type="button">
      <img src="${imageBase}${item.image}" alt="" />
      <span>
        <strong>${item.name}</strong>
        <small>${item.preview}</small>
      </span>
      <time>${item.time}</time>
      ${item.unread ? `<b>${item.unread}</b>` : ""}
    </button>
  `;
}

function messageActionBar() {
  return `
    <div class="message-feedback" aria-label="Message feedback">
      <button class="message-feedback-button" type="button" data-feedback="pin" aria-label="Pin message"><img src="images/ICON/pin-fill.svg" alt="" /></button>
      <button class="message-feedback-button" type="button" data-feedback="like" aria-label="Like message">${icon("thumb-up")}</button>
      <button class="message-feedback-button" type="button" data-feedback="dislike" aria-label="Dislike message">${icon("thumb-down")}</button>
    </div>
  `;
}

function messageVoiceBlock(item, index) {
  const duration = item.duration || "0:12";
  const audio = item.audio || voicePreviews[index % voicePreviews.length];
  const transcript = item.transcript || item.text || "Voice message";
  return `
    <div class="message-voice-block">
      <div class="message-voice" data-audio="${audioBase}${audio}" style="--audio-progress: 0%">
        <button class="chat-voice-play" type="button" aria-label="Play voice message">${icon("play")}</button>
        <div class="wave" aria-hidden="true">${audioBars()}</div>
        <span class="chat-voice-duration">0:00 / ${duration}</span>
        <button class="chat-voice-transfer" type="button" aria-label="Convert voice to text">
          <img src="${imageBase}transfer.svg" alt="" />
        </button>
      </div>
      <p class="chat-voice-transcript" hidden>${transcript}</p>
    </div>
  `;
}

function messageRow(item, index = 0) {
  if (item.day) return `<div class="message-day"><span>${item.day}</span></div>`;
  const isUser = item.sender === "user";
  const avatar = isUser ? portraits[6] : portraits[8];
  const isUnread = !isUser && item.type !== "media" && item.read !== true;
  const mediaIndex = item.type === "media"
    ? chatMessages.filter((message) => message.type === "media").findIndex((message) => message === item)
    : -1;
  const media = item.type === "media"
    ? `<img class="message-media" src="${imageBase}${item.image}" alt="" data-lightbox-index="${mediaIndex}" />${item.text ? `<p>${item.text}</p>` : ""}`
    : "";
  const voice = item.type === "voice"
    ? messageVoiceBlock(item, index)
    : "";
  const companionTextVoice = !isUser && item.type === "text" ? messageVoiceBlock(item, index) : "";
  return `
    <article class="message-row ${isUser ? "is-user" : "is-companion"}">
      ${isUser ? "" : `<img class="message-avatar" src="${imageBase}${avatar}" alt="" />`}
      <div class="message-content">
        <div class="message-bubble">
          ${media || voice || companionTextVoice || `<p>${item.text}</p>`}
          <time>${item.time}</time>
          ${isUnread ? `<span class="message-unread-dot" aria-label="Unread voice message"></span>` : ""}
        </div>
        ${isUser ? "" : messageActionBar()}
      </div>
      ${isUser ? `<img class="message-avatar" src="${imageBase}${avatar}" alt="" />` : ""}
    </article>
  `;
}

function profileAttribute(item) {
  const body = item.tags
    ? `<div class="profile-tag-list">${item.values.map((value) => `<span>${value}</span>`).join("")}</div>`
    : `<p>${item.value}</p>`;
  return `
    <article class="profile-attribute ${item.wide ? "is-wide" : ""}">
      <span class="attribute-icon">${icon(item.icon)}</span>
      <span class="attribute-copy">
        <strong>${item.label}</strong>
        ${body}
      </span>
    </article>
  `;
}

function diaryItem(item) {
  return `
    <article class="timeline-item">
      <span class="timeline-dot"><svg class="icon"><use href="#icon-heart"></use></svg></span>
      <span>
        <strong>${item.title}</strong>
        <small>${item.date}</small>
      </span>
    </article>
  `;
}

function getIntimacyBottleLevel(value) {
  const percent = Number.isFinite(Number(value)) ? Math.max(0, Math.min(100, Number(value))) : 0;
  return intimacyBottleLevels.reduce((closest, level) => (
    Math.abs(level - percent) < Math.abs(closest - percent) ? level : closest
  ), intimacyBottleLevels[0]);
}

function setIntimacyBottle(value, options = {}) {
  const timeline = document.querySelector(".message-panel");
  const bottle = document.querySelector(".intimacy-bottle");
  const image = bottle?.querySelector("img");
  if (!timeline || !bottle || !image) return;

  const level = getIntimacyBottleLevel(value);
  const nextSrc = `images/heart-bottle-lv1-${level}.png`;
  const currentLevel = Number(timeline.dataset.intimacy || 0);

  timeline.dataset.intimacy = String(level);
  bottle.setAttribute("aria-label", `Intimacy level ${level} percent`);

  if (image.getAttribute("src") === nextSrc && !options.force) return;

  bottle.classList.remove("is-changing", "is-sparkling");
  void bottle.offsetWidth;
  bottle.classList.add("is-changing");

  window.setTimeout(() => {
    image.src = nextSrc;
    if (level > currentLevel || options.force) bottle.classList.add("is-sparkling");
  }, 90);

  window.setTimeout(() => {
    bottle.classList.remove("is-changing", "is-sparkling");
  }, 900);
}

function initIntimacyBottle() {
  const timeline = document.querySelector(".message-panel");
  const bottle = document.querySelector(".intimacy-bottle");
  if (!timeline || !bottle) return;

  setIntimacyBottle(timeline.dataset.intimacy || 0, { force: true });
  bottle.addEventListener("click", () => {
    const currentLevel = getIntimacyBottleLevel(timeline.dataset.intimacy || 0);
    const currentIndex = intimacyBottleLevels.indexOf(currentLevel);
    const nextLevel = intimacyBottleLevels[(currentIndex + 1) % intimacyBottleLevels.length];
    setIntimacyBottle(nextLevel, { force: nextLevel === 0 });
  });

  window.setIntimacyBottle = setIntimacyBottle;
}

const featuredGrid = document.querySelector(".featured-grid");
if (featuredGrid) featuredGrid.innerHTML = featured.map(featuredCard).join("");

const characterGrid = document.querySelector(".character-grid");
if (characterGrid) characterGrid.innerHTML = characters.map(characterCard).join("");

const traitList = document.querySelector(".trait-list");
if (traitList) {
  traitList.innerHTML = traits
    .map((trait, index) => `<button class="trait-button ${index === 0 ? "is-active" : ""}" type="button">${trait}</button>`)
    .join("");
}

const chatPreviewList = document.querySelector(".chat-preview-list");
if (chatPreviewList) chatPreviewList.innerHTML = chats.map(chatPreview).join("") + `<a class="chat-preview view-all" href="chat.html">View All</a>`;

const storyGrid = document.querySelector(".story-grid");
if (storyGrid) storyGrid.innerHTML = Array.from({ length: 4 }, storyCard).join("");

const conversationList = document.querySelector(".conversation-list");
if (conversationList) conversationList.innerHTML = chatConversations.map(conversationItem).join("");

const messageScroll = document.querySelector(".message-scroll");
if (messageScroll) messageScroll.innerHTML = chatMessages.map(messageRow).join("");

const chatMediaItems = chatMessages
  .filter((item) => item.type === "media")
  .map((item) => ({
    src: `${imageBase}${item.image}`,
    caption: item.text || "",
  }));

const mediaLightbox = document.querySelector(".media-lightbox");
const mediaLightboxImage = document.querySelector(".media-lightbox-image");
const mediaLightboxCaption = document.querySelector(".media-lightbox-caption");
let activeMediaIndex = 0;

function renderMediaLightbox() {
  const item = chatMediaItems[activeMediaIndex];
  if (!item || !mediaLightboxImage || !mediaLightboxCaption) return;
  mediaLightboxImage.src = item.src;
  mediaLightboxCaption.textContent = item.caption;
}

function openMediaLightbox(index) {
  if (!mediaLightbox || !chatMediaItems.length) return;
  activeMediaIndex = index;
  renderMediaLightbox();
  mediaLightbox.hidden = false;
  document.body.classList.add("is-lightbox-open");
}

function closeMediaLightbox() {
  if (!mediaLightbox) return;
  mediaLightbox.hidden = true;
  document.body.classList.remove("is-lightbox-open");
}

function stepMediaLightbox(direction) {
  activeMediaIndex = (activeMediaIndex + direction + chatMediaItems.length) % chatMediaItems.length;
  renderMediaLightbox();
}

document.querySelectorAll(".message-media").forEach((image) => {
  image.addEventListener("click", () => {
    openMediaLightbox(Number(image.dataset.lightboxIndex || 0));
  });
});

document.querySelector(".media-lightbox-close")?.addEventListener("click", closeMediaLightbox);

document.querySelectorAll(".media-lightbox-nav").forEach((button) => {
  button.addEventListener("click", () => {
    stepMediaLightbox(Number(button.dataset.lightboxDirection || 1));
  });
});

mediaLightbox?.addEventListener("click", (event) => {
  if (event.target === mediaLightbox) closeMediaLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePremiumModal();
  if (!mediaLightbox || mediaLightbox.hidden) return;
  if (event.key === "Escape") closeMediaLightbox();
  if (event.key === "ArrowLeft") stepMediaLightbox(-1);
  if (event.key === "ArrowRight") stepMediaLightbox(1);
});

const profileAttributesNode = document.querySelector(".profile-attributes");
if (profileAttributesNode) profileAttributesNode.innerHTML = profileAttributes.map(profileAttribute).join("");

const profilePanel = document.querySelector(".profile-panel");
const profileCollapseToggle = document.querySelector(".profile-collapse-toggle");

profileCollapseToggle?.addEventListener("click", () => {
  const isCollapsed = profilePanel?.classList.toggle("is-profile-collapsed") || false;
  profileCollapseToggle.setAttribute("aria-expanded", String(!isCollapsed));
  profileCollapseToggle.setAttribute("aria-label", isCollapsed ? "Expand profile details" : "Collapse profile details");
});

const timelineList = document.querySelector(".timeline-list");
if (timelineList) timelineList.innerHTML = diaryItems.map(diaryItem).join("");

initIntimacyBottle();
initPremiumModal();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function playPreview(card) {
  if (reduceMotion) return;
  const video = card.querySelector(".media-video");
  if (!video) return;
  video.currentTime = video.currentTime || 0;
  card.classList.add("is-previewing");
  const promise = video.play();
  if (promise) promise.catch(() => card.classList.remove("is-previewing"));
}

function stopPreview(card) {
  const video = card.querySelector(".media-video");
  if (!video) return;
  card.classList.remove("is-previewing");
  video.pause();
  video.currentTime = 0;
}

document.querySelectorAll(".featured-card, .character-card").forEach((card) => {
  card.addEventListener("pointerenter", () => playPreview(card));
  card.addEventListener("pointerleave", () => stopPreview(card));
  card.addEventListener("focusin", () => playPreview(card));
  card.addEventListener("focusout", () => stopPreview(card));
});

const voiceAudio = new Audio();
let activeVoiceCard = null;
const chatVoiceAudio = new Audio();
chatVoiceAudio.preload = "metadata";
let activeChatVoice = null;

function resetVoiceCard(card) {
  if (!card) return;
  card.classList.remove("is-audio-playing");
  card.querySelector(".voice-preview")?.style.setProperty("--audio-progress", "0%");
  const button = card.querySelector(".audio-play");
  if (button) {
    button.setAttribute("aria-label", `Play voice preview for ${card.querySelector("h3")?.textContent || "companion"}`);
    button.innerHTML = icon("play");
  }
}

function setVoiceCardPlaying(card) {
  card.classList.add("is-audio-playing");
  const button = card.querySelector(".audio-play");
  if (button) {
    button.setAttribute("aria-label", "Pause voice preview");
    button.innerHTML = `<span class="pause-icon" aria-hidden="true"></span>`;
  }
}

document.querySelectorAll(".audio-play").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = button.closest(".featured-card");
    if (!card) return;
    const src = card.dataset.audio;

    if (activeVoiceCard === card && !voiceAudio.paused) {
      voiceAudio.pause();
      resetVoiceCard(card);
      activeVoiceCard = null;
      return;
    }

    resetVoiceCard(activeVoiceCard);
    activeVoiceCard = card;
    voiceAudio.src = src;
    voiceAudio.currentTime = 0;
    setVoiceCardPlaying(card);
    voiceAudio.play().catch(() => {
      resetVoiceCard(card);
      activeVoiceCard = null;
    });
  });
});

voiceAudio.addEventListener("timeupdate", () => {
  if (!activeVoiceCard || !voiceAudio.duration) return;
  const progress = Math.min(100, (voiceAudio.currentTime / voiceAudio.duration) * 100);
  activeVoiceCard.querySelector(".voice-preview")?.style.setProperty("--audio-progress", `${progress}%`);
});

voiceAudio.addEventListener("ended", () => {
  resetVoiceCard(activeVoiceCard);
  activeVoiceCard = null;
});

function updateChatVoiceTime(voice, audio = chatVoiceAudio) {
  if (!voice) return;
  const durationNode = voice.querySelector(".chat-voice-duration");
  const fallbackDuration = durationNode?.dataset.duration || "0:00";
  const current = formatAudioTime(audio.currentTime);
  const total = audio.duration ? formatAudioTime(audio.duration) : fallbackDuration;
  if (durationNode) {
    if (audio.duration) durationNode.dataset.duration = total;
    durationNode.textContent = `${current} / ${total}`;
  }
}

function resetChatVoice(voice, resetProgress = true) {
  if (!voice) return;
  voice.classList.remove("is-audio-playing");
  if (resetProgress) voice.style.setProperty("--audio-progress", "0%");
  const durationNode = voice.querySelector(".chat-voice-duration");
  if (durationNode && resetProgress) durationNode.textContent = `0:00 / ${durationNode.dataset.duration || "0:00"}`;
  const button = voice.querySelector(".chat-voice-play");
  if (button) {
    button.setAttribute("aria-label", "Play voice message");
    button.innerHTML = icon("play");
  }
}

function setChatVoicePlaying(voice) {
  voice.classList.add("is-audio-playing");
  const button = voice.querySelector(".chat-voice-play");
  if (button) {
    button.setAttribute("aria-label", "Pause voice message");
    button.innerHTML = `<span class="pause-icon" aria-hidden="true"></span>`;
  }
}

document.querySelectorAll(".message-voice").forEach((voice) => {
  const durationNode = voice.querySelector(".chat-voice-duration");
  if (durationNode) durationNode.dataset.duration = durationNode.textContent.split("/").pop().trim();

  voice.querySelector(".chat-voice-play")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const src = voice.dataset.audio;
    if (!src) return;
    voice.closest(".message-bubble")?.querySelector(".message-unread-dot")?.remove();

    if (activeChatVoice === voice && !chatVoiceAudio.paused) {
      chatVoiceAudio.pause();
      resetChatVoice(voice, false);
      return;
    }

    if (activeChatVoice === voice && chatVoiceAudio.paused && chatVoiceAudio.currentTime > 0) {
      setChatVoicePlaying(voice);
      chatVoiceAudio.play().catch((error) => {
        console.warn("Chat voice playback failed", error);
        resetChatVoice(voice);
        activeChatVoice = null;
      });
      return;
    }

    if (!voiceAudio.paused) {
      voiceAudio.pause();
      resetVoiceCard(activeVoiceCard);
      activeVoiceCard = null;
    }

    resetChatVoice(activeChatVoice);
    activeChatVoice = voice;
    chatVoiceAudio.src = src;
    chatVoiceAudio.currentTime = 0;
    setChatVoicePlaying(voice);
    updateChatVoiceTime(voice);
    chatVoiceAudio.play().catch((error) => {
      console.warn("Chat voice playback failed", error);
      resetChatVoice(voice);
      activeChatVoice = null;
    });
  });
});

document.querySelectorAll(".chat-voice-transfer").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const block = button.closest(".message-voice-block");
    const transcript = block?.querySelector(".chat-voice-transcript");
    if (!transcript) return;
    const isHidden = transcript.hidden;
    transcript.hidden = !isHidden;
    button.classList.toggle("is-active", isHidden);
    button.setAttribute("aria-expanded", String(isHidden));
  });
});

chatVoiceAudio.addEventListener("loadedmetadata", () => {
  updateChatVoiceTime(activeChatVoice);
});

chatVoiceAudio.addEventListener("timeupdate", () => {
  if (!activeChatVoice || !chatVoiceAudio.duration) return;
  const progress = Math.min(100, (chatVoiceAudio.currentTime / chatVoiceAudio.duration) * 100);
  activeChatVoice.style.setProperty("--audio-progress", `${progress}%`);
  updateChatVoiceTime(activeChatVoice);
});

chatVoiceAudio.addEventListener("ended", () => {
  resetChatVoice(activeChatVoice);
  activeChatVoice = null;
});

document.querySelectorAll(".primary-button, .chat-action").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("is-loading")) return;
    button.classList.add("is-loading");
    button.setAttribute("aria-busy", "true");
    window.setTimeout(() => {
      button.classList.remove("is-loading");
      button.removeAttribute("aria-busy");
    }, 850);
  });
});

document.querySelectorAll(".trait-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".trait-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

document.querySelectorAll(".conversation-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".conversation-item").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

const chatWorkspace = document.querySelector(".chat-workspace");
const conversationCollapseToggle = document.querySelector(".conversation-collapse-toggle");

conversationCollapseToggle?.addEventListener("click", () => {
  const isCollapsed = chatWorkspace?.classList.toggle("is-conversations-collapsed") || false;
  conversationCollapseToggle.setAttribute("aria-expanded", String(!isCollapsed));
  conversationCollapseToggle.setAttribute("aria-label", isCollapsed ? "Expand message list" : "Collapse message list");
});

document.querySelectorAll(".message-feedback-button").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".message-feedback");
    const feedback = button.dataset.feedback;
    const isActive = button.classList.contains("is-active");

    if (feedback === "like" || feedback === "dislike") {
      group?.querySelectorAll('[data-feedback="like"], [data-feedback="dislike"]').forEach((item) => {
        if (item !== button) item.classList.remove("is-active");
      });
    }

    button.classList.toggle("is-active", !isActive);
  });
});

const profileHero = document.querySelector(".profile-hero");
const profileThumbTrack = document.querySelector(".profile-thumbs");

document.querySelectorAll(".profile-thumbs button").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image || !profileHero) return;
    profileHero.src = image.src;
    document.querySelectorAll(".profile-thumbs button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    if (profileThumbTrack) {
      const trackRect = profileThumbTrack.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const leftOverflow = buttonRect.left - trackRect.left;
      const rightOverflow = buttonRect.right - trackRect.right;

      if (leftOverflow < 0 || rightOverflow > 0) {
        profileThumbTrack.scrollBy({
          left: leftOverflow < 0 ? leftOverflow : rightOverflow,
          behavior: "smooth",
        });
      }
    }
  });
});

document.querySelectorAll(".profile-gallery-nav").forEach((button) => {
  button.addEventListener("click", () => {
    if (!profileThumbTrack) return;
    const direction = Number(button.dataset.galleryDirection || 1);
    const firstThumb = profileThumbTrack.querySelector("button");
    const gap = Number.parseFloat(getComputedStyle(profileThumbTrack).columnGap || "0");
    const step = firstThumb ? firstThumb.getBoundingClientRect().width + gap : 74;
    profileThumbTrack.scrollBy({ left: direction * step, behavior: "smooth" });
  });
});

document.querySelector(".message-composer")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  if (!input || !input.value.trim()) return;
  input.value = "";
});

document.querySelectorAll(".bottom-nav a").forEach((item) => {
  item.addEventListener("click", (event) => {
    const href = item.getAttribute("href");
    if (href && href !== "#") return;
    event.preventDefault();
    document.querySelectorAll(".bottom-nav a").forEach((link) => link.classList.remove("is-active"));
    item.classList.add("is-active");
  });
});
