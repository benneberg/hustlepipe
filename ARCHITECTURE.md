# HustlePipe Architecture & Technical Specification

## 1. System Overview & Core Philosophy

**HustlePipe** (SideForge Engine v2.0) is a client-first, zero-runtime-dependency e-commerce operations engine engineered specifically for Scandinavian (Sweden, Norway, Denmark, Finland) and European Direct-to-Consumer (DTC) operators. 

Traditional dropshipping ecosystems suffer from:
1. **Recurring SaaS Bloat:** Requiring $150–$300/month in separate Shopify apps for reviews, upsells, currency converters, and page builders.
2. **Missing Localization:** Lacking native Swedish 25% MOMS (VAT) breakdown calculators, Konsumentverket-compliant 14-day *ångerrätt* clauses, and Swish/Klarna payment flows.
3. **Data Lock-in:** Forcing closed proprietary formats rather than portable static HTML and standardized Shopify/WooCommerce CSV exports.

HustlePipe solves these challenges through an event-driven Single-Page Application (SPA) architecture utilizing local-first persistence (`localStorage`), zero-backend Bring-Your-Own-Key (BYOK) AI execution, and a modular canvas block engine.

---

## 2. High-Level Architectural Diagram

```
+---------------------------------------------------------------------------------+
|                                 Client Browser                                  |
|                                                                                 |
|  +---------------------------------------------------------------------------+  |
|  |                       Presentation & Interaction Layer                    |  |
|  |   - Plus Jakarta Sans + Tailwind CSS (Clean Minimalism Theme)             |  |
|  |   - Interactive Onboarding Stepper Guide (Persisted Tour)                 |  |
|  |   - 8 Core Views: Pipeline, Scraper, Composer, Calc & Orders, Marketing,  |  |
|  |                   Compliance, BYOK & Settings, About & Manual             |  |
|  |   - Contextual AI Specialist Floating Drawer (Persona Modulated)          |  |
|  |   - Live Standalone Nordic Storefront Simulation Modal                    |  |
|  +-------------------------------------+-------------------------------------+  |
|                                        |                                        |
|                                        v                                        |
|  +---------------------------------------------------------------------------+  |
|  |                          HustlePipe Core Controller                       |  |
|  |   - View Router & Event Delegation Hub                                    |  |
|  |   - Experience Complexity Router (Rookie | Standard | Expert CLI)         |  |
|  |   - Financial Engine (25% MOMS Swedish VAT & Breakeven ROAS)              |  |
|  +-------------------------------------+-------------------------------------+  |
|                                        |                                        |
|                    +-------------------+-------------------+                    |
|                    v                                       v                    |
|  +-----------------------------------+   +-----------------------------------+  |
|  |      StateEngine (Pub/Sub)        |   |       AIAgentService (BYOK)       |  |
|  |  - Centralized Reactive Store     |   |  - Zero-Transit Client Calls      |  |
|  |  - Immutable State Updaters       |   |  - Groq (Llama 3.3 70B, Mixtral)  |  |
|  |  - LocalStorage Serializer        |   |  - OpenRouter (DeepSeek, Claude)  |  |
|  |  - Versioned Hydration Migration  |   |  - Smart Fallback Nordic Engine   |  |
|  +-----------------+-----------------+   +-----------------+-----------------+  |
|                    |                                       |                    |
+--------------------|---------------------------------------|--------------------+
                     v                                       v
      +------------------------------+       +------------------------------+
      |  Encrypted LocalStorage      |       |  External AI Providers       |
      |  (hustlepipe_state_v2)       |       |  (api.groq.com / openrouter) |
      +------------------------------+       +------------------------------+
```

---

## 3. Core Modules & Subsystems

### 3.1. StateEngine & Reactive Event Bus
The `StateEngine` class acts as the single source of truth for the entire application. It implements an observable Publish/Subscribe pattern:
* **Storage Key:** `hustlepipe_state_v2`
* **Lifecycle:** 
  1. Hydrates initial state from `localStorage`.
  2. Merges with schema defaults (`getDefaultState()`) to gracefully handle field migrations.
  3. Emits `STATE_CHANGED` events on every mutation via `update(updaterFn)`.
  4. Automatically debounces writes to prevent storage thrashing.

### 3.2. BYOK (Bring-Your-Own-Key) AI Engine
To ensure complete privacy and zero hosting overhead, HustlePipe does not proxy API keys through a middleman server:
* Keys are stored exclusively in the browser's local encrypted storage.
* Network requests are dispatched directly to OpenAI-compatible endpoints (`api.groq.com` or `openrouter.ai/api`).
* **Contextual Persona Injection:** The AI prompt adjusts dynamically depending on the user's active tab (e.g., Product Researcher on `/scraper`, CRO Designer on `/composer`, Swedish Tax Advisor on `/compliance`, Viral TikTok Scriptwriter on `/marketing`).
* **Adaptive Complexity Modulator:** Prompts are tailored to the user's experience level (`rookie` receives foundational explanations; `expert` receives raw JSON and direct copy).

### 3.3. Swedish Tax & Financial Calculation Engine
Swedish consumer protection laws require all B2C prices to clearly display 25% MOMS (Value-Added Tax). HustlePipe enforces the statutory Swedish Skatteverket formulas:
$$\text{Net Sales Price} = \frac{\text{Gross Retail Price (SEK)}}{1 + 0.25} = \frac{\text{Gross}}{1.25}$$
$$\text{MOMS (25\% VAT)} = \text{Gross Retail Price} - \text{Net Sales Price}$$
$$\text{Net Margin} = \text{Net Sales Price} - \text{COGS} - \text{PostNord Shipping} - \text{Ad CPA}$$
$$\text{Breakeven ROAS} = \frac{\text{Gross Price}}{\text{Gross Price} - \text{COGS} - \text{PostNord Shipping}}$$

### 3.4. Visual Store Composer & Block Engine
The Composer utilizes a declarative block schema enabling users to customize Swedish DTC storefronts:
* **Supported Blocks:**
  * `hero`: Nordic headline, value proposition, PostNord delivery promise badge, primary CTA.
  * `problem_solution`: Scandinavian winter/lifestyle contrast and ergonomic relief statements.
  * `product_showcase`: Dynamic SKU selector, high-resolution imagery, and pricing breakdown.
  * `trust_badges`: Swish Fast Pay, Klarna 30 Days, PostNord Tracking, 14-Day Free *Ångerrätt*.
  * `swedish_terms`: Skatteverket VAT details and *Lag (2005:59) om distansavtal och avtal utanför affärslokaler*.
* **Export Options:**
  * **Zero-Dependency Standalone HTML:** Self-contained single-file HTML bundle with embedded CSS and Swish payment modal.
  * **Shopify / WooCommerce CSV:** Standardized product schema compatible with Shopify Import Engine and WP All Import.

---

## 4. Component Hierarchy & UX Flow

```
Application Root (#app)
 ├── Top Navigation & Header
 │    ├── Brand Identity & Version Tag
 │    ├── Experience Level Switcher (Rookie / Standard / Expert)
 │    ├── Onboarding Tour Re-Launch Trigger
 │    ├── Segmented Light/Dark Theme Switcher
 │    └── BYOK Security Indicator
 ├── Expert CLI Shortcut Bar (Conditional on Expert mode)
 ├── Main Tab Navigation (8 Modules)
 ├── Viewports
 │    ├── PipelineView (Gamified Stepper & Milestones)
 │    ├── ScraperView (Product Discovery & Margin Analysis)
 │    ├── ComposerView (Block Layout, Swedish Switches, DNS Hub)
 │    ├── OperationsView (MOMS VAT Calc, Breakeven ROAS, Order Board)
 │    ├── MarketingView (TikTok Hook Generator, Copyable Angles)
 │    ├── ComplianceView (Swedish Legal Guides & Checklists)
 │    ├── SettingsView (BYOK Credentials, Model Aliases, Data Reset)
 │    └── AboutView (3 Tabs: Overview, Detailed Manual, FAQ Accordion)
 ├── Floating Contextual AI Specialist Drawer
 ├── Guided Onboarding Stepper Modal (Multi-step with progress bar)
 └── Standalone Nordic Storefront Simulation Modal
```

---

## 5. Security & Privacy Guarantees

1. **Client-Side Isolation:** No proprietary user product research, sales metrics, or customer PII are sent to any external server.
2. **Zero-Knowledge Architecture:** API keys (Groq / OpenRouter) never pass through third-party relays.
3. **GDPR / Swedish Datainspektionen Compliance:** All mock and live customer order records reside strictly inside local browser sandbox storage.
