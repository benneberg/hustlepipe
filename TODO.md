# HustlePipe (SideForge Engine v2.0) — Implementation Roadmap & TODO

This document tracks implemented features and all pending roadmap specifications according to `PRD.md` and `ARCHITECTURE.md`.

---

## 📊 Summary of Implementation Status

* **Architecture:** Client-first, zero-runtime-dependency Single-Page Application (SPA)
* **Design System:** Clean Minimalism (Plus Jakarta Sans, `#F8F9FA` canvas, `#FFFFFF` cards, `#E5E7EB` borders, `#2563EB` primary accent, dark mode `#0F172A` / `#1E293B`)
* **Security Layer:** IndexedDB Web Crypto AES-GCM (256-bit) + PBKDF2 device entropy + memory XOR obfuscation
* **AI Engine:** Bring-Your-Own-Key (BYOK) with real Groq Fast Inference and OpenRouter API gateways

---

## 1. BYOK AI Inference & Cryptographic Vault

- [x] **IndexedDB Cryptographic Storage:** Store API keys in browser IndexedDB (`hustlepipe_secure_vault_v2`) using Web Crypto AES-GCM 256-bit encryption.
- [x] **Zero-Knowledge Hardware-Seeded Salt:** Derive PBKDF2 keys using device/browser entropy without hardcoded shared secrets.
- [x] **Memory-Level XOR Obfuscation:** Secondary byte masking to thwart browser memory inspection.
- [x] **Direct Client-Side Inference:** Dispatch requests directly to `api.groq.com/openai/v1/chat/completions` and `openrouter.ai/api/v1/chat/completions` with zero middleman server transit.
- [x] **Curated Free LLM Registry:** Curated list of high-speed free models (Meta Llama 3.3 70B, Llama 3.1 8B Instant, DeepSeek R1, Mixtral 8x7B, Gemma 2 9B, Qwen 2.5 Coder, Gemini 2.0 Flash Exp).
- [x] **Live Model Catalog Fetching:** Dynamic API model discovery from Groq (`/openai/v1/models`) and OpenRouter (`/api/v1/models`) endpoints.
- [x] **Connection & Latency Tester:** Real ping test measuring HTTP round-trip latency, model response, and credential validity.
- [x] **Vault Key Masking & Management:** View masked keys (`gsk_••••••••••••1a2b`), clear keys from the vault, and toggle key input visibility.
- [x] **Contextual Persona Injection:** 8-tab persona modulation (Mentor, Product Researcher, CRO Designer, Financial Advisor, TikTok Scriptwriter, Legal Advisor).
- [ ] **Streaming Inference (SSE):** Implement Server-Sent Events / readable stream chunks in `AIAgentService` for typewriter-style token streaming.
- [ ] **Conversation History Persistence:** Export and import multi-turn AI consultation logs.
- [ ] **Custom System Prompt Overrides:** Allow expert users to edit the base system prompts per tab.

---

## 2. Onboarding Stepper Guide & Information System

- [x] **5-Step Onboarding Stepper:** Multi-step modal introducing the pipeline, scraper, composer, Swedish MOMS tax engine, and BYOK AI.
- [x] **Full-Viewport Modal Protection:** Mobile-responsive modal container with `max-h-[92vh]`, `overflow-y-auto`, and `min-h-0` scrolling.
- [x] **Navigation Controls:** `Previous`, `Next`, `Skip Tour`, `Finish / Get Started`, and direct step indicator buttons.
- [x] **State Persistence & Reset:** Persist completion in state; replay tour anytime from Header, Settings, or About page.
- [x] **About / Information View (3 Sub-Tabs):**
  - [x] **Overview:** Executive summary, problem statement, target personas, interaction model, and value proposition.
  - [x] **Detailed Manual:** 15-minute launch workflow, margin auditing, PostNord logistics, and power user tips.
  - [x] **Interactive FAQ Accordion:** Expandable/collapsible FAQ categorized into Getting Started, Swedish Taxes, Payments & Shipping, and Store Building.
- [ ] **Interactive Onboarding Tooltip Anchors:** Step-by-step element highlight overlays pointing directly to active dashboard components.
- [ ] **Nordic Dropshipping Video Walkthrough Embeds:** Contextual modal video tutorials for beginners.

---

## 3. Product Discovery & Scraper Queue

- [x] **URL Scraper Queue:** Interface to accept supplier product links and enqueue candidate products.
- [x] **Nordic Margin Estimation:** Automatic calculation of suggested SEK retail price, gross margins, and estimated shipping costs.
- [x] **One-Click Promotion:** Move discovered products directly from Scraper queue into the active store catalog.
- [ ] **Automated Headless Web Scraper Worker:** Real-time extraction of images, variants, descriptions, and supplier pricing from AliExpress, CJ Dropshipping, and Amazon URLs.
- [ ] **Bulk CSV Import:** Upload multi-row supplier product links for automated batch analysis.
- [ ] **Live Currency Conversion API:** Real-time exchange rate updates (EUR/USD to SEK/NOK/DKK) via European Central Bank / Frankfurter API.
- [ ] **Supplier Risk & Reliability Scoring:** Algorithmic calculation of estimated delivery days, dispute rates, and packaging quality indicators.

---

## 4. Visual Store Composer & Block Engine

- [x] **Declarative Block Builder:** Modular section layout (`Hero`, `Problem/Solution`, `Product Showcase`, `Trust Badges`, `Swedish Legal Terms`).
- [x] **Block Reordering & Customization:** Move Up / Move Down controls and inline content editing.
- [x] **Live Storefront Simulation:** Responsive modal simulating mobile and desktop views with functional Swish payment simulation.
- [x] **Zero-Dependency Standalone HTML Export:** Download complete, self-contained single-file HTML store bundle with embedded styling and checkout modals.
- [x] **Shopify CSV Export:** Standard product export format for importing into Shopify.
- [ ] **Drag-and-Drop Block Reordering:** HTML5 Drag & Drop or touch-based canvas reordering.
- [ ] **Extended Block Types:**
  - [ ] Customer Reviews Carousel (with verified Nordic buyer badges).
  - [ ] Scandinavian FAQ Section block.
  - [ ] Countdown Urgency Timer block (Swedish: *Begränsat lager*).
  - [ ] Before & After Comparison Slider block.
- [ ] **Custom CSS Injector:** Real-time CSS code editor with live syntax checking for Expert Mode.
- [ ] **WooCommerce CSV Export:** WP All Import / WooCommerce compatible product schema.
- [ ] **Multi-Currency Storefront Switcher:** Dynamic SEK / NOK / DKK / EUR selector in exported standalone stores.

---

## 5. Swedish Tax, Compliance & Operations Engine

- [x] **Statutory 25% MOMS VAT Calculator:** Real-time calculation of Gross Retail Price, Net Sales Price, and Skatteverket 25% MOMS breakdown.
- [x] **Breakeven ROAS Calculator:** COGS, shipping freight, and ad CPA profitability calculations.
- [x] **Order Management Board:** Order tracking with customer city, payment method (Swish/Klarna/Stripe), tracking numbers, and delivery status.
- [x] **Swedish Compliance Checklists:** F-skatt, Bolagsverket, Skatteverket MOMS registration, and 14-day *ångerrätt* guides.
- [ ] **Downloadable PDF Swedish MOMS Receipts:** Compliant PDF invoices displaying business Org.nr, F-skatt status, Gross price, Net price, and 25% MOMS breakdown.
- [ ] **PostNord API & Tracking Integration:** Deep-link delivery tracking integration (`postnord.se/spara-forsandelse?id=...`).
- [ ] **Nordic Regional VAT Support:**
  - [ ] Norwegian MVA (25% VOEC scheme).
  - [ ] Danish Moms (25%).
  - [ ] Finnish ALV (25.5% updated standard rate).
- [ ] **Bookkeeping Export:** One-click CSV export compatible with Swedish accounting software (Visma eEkonomi, Fortnox, Bokio).

---

## 6. Marketing & Creative Pipeline

- [x] **Swedish Viral TikTok / Reels Hook Generator:** Dynamic AI scripts targeting Scandinavian consumer psychology.
- [x] **One-Click Hook Copy:** Clipboard copy for Curiosity Gap, Swedish Guarantee, and Comparison hooks.
- [ ] **Visual Video Storyboard Builder:** Structured timeline visualizer (0-3s Hook, 3-10s Agitation, 10-18s Product Showcase, 18-25s Swish CTA).
- [ ] **Campaign ROAS & Budget Calculator:** Daily spend pacing and target CPA simulator for Meta and TikTok Ads.
- [ ] **UGC Creator Outreach Generator:** Exportable briefs for Scandinavian micro-influencers and creators.

---

## 7. Platform Architecture & Experience Routing

- [x] **Experience Complexity Router:** Adaptive UI tabs, prompts, and controls for Rookie, Standard, and Expert CLI modes.
- [x] **Expert CLI Bar (`Cmd+K` / `Ctrl+K`):** Fast command palette for power users (`/scrape`, `/moms`, `/roas`, `/store`, `/export`).
- [x] **Theme Switcher:** Clean Minimalism light/dark theme toggle synchronized across all views.
- [ ] **PWA Offline Installation:** Service worker and Web App Manifest (`manifest.json`) for installability on desktop, iPad, and mobile.
- [ ] **Encrypted State Backup & Restore:** Export complete encrypted workspace backup to a password-protected JSON file.
- [ ] **Automated E2E Testing Suite:** Playwright tests verifying state persistence, calculation correctness, and AI gateway fallbacks.
