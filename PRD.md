# HustlePipe Product Requirements Document (PRD)

## 1. Document Metadata
* **Product Name:** HustlePipe (SideForge Engine v2.0)
* **Status:** Production / Active
* **Target Audience:** Solo DTC Founders, Side Hustlers, E-Commerce Agencies operating in Sweden & the Nordic Region (SE, NO, DK, FI).
* **Core Value Proposition:** A clean, mobile-first dropshipping and e-commerce pipeline with modular product research, visual store composition, automated Swedish 25% MOMS calculations, and contextual BYOK AI assistance.

---

## 2. Problem Statement & Market Opportunity

E-commerce entrepreneurs targeting the affluent Nordic market face significant barriers:
1. **Disproportionate SaaS Costs:** Standard Shopify stores require $29–$79/month plus $100+/month in third-party plugins just to support Swish, currency switches, reviews, and basic funnels.
2. **Complex Swedish Tax & Legal Landscape:** Swedish consumer laws require statutory compliance with Skatteverket 25% MOMS (invoices must show gross, net, and VAT components), Bolagsverket business registration, and the mandatory 14-day *Lag om distansavtal* (right of withdrawal). Standard US-centric tools fail to calculate or display these requirements correctly.
3. **Nordic Payment Friction:** 80%+ of Swedish mobile consumers prefer **Swish** or **Klarna**. Generic credit-card-only checkouts suffer from 50%+ abandoned checkout rates in Sweden.
4. **Ad Creative Inefficiency:** Beginners struggle to craft culturally relevant Scandinavian hooks for TikTok and Instagram Reels.

**The Solution:** HustlePipe offers an integrated, zero-subscription tool that guides the user from product discovery to a fully compliant, high-converting Nordic storefront with built-in financial models and AI-assisted marketing copy.

---

## 3. User Personas & Experience Levels

| Persona | Background | Primary Goals | HustlePipe Experience Mode |
| :--- | :--- | :--- | :--- |
| **Linnea (The Rookie)** | University student in Stockholm launching her first side hustle. | Wants clear step-by-step guidance, needs acronyms explained (MOMS, ROAS, CPA), afraid of Skatteverket tax mistakes. | **Rookie Mode:** Simplified tabs, guided onboarding tour, encouraging AI mentor tone. |
| **Erik (The Standard Operator)** | Full-time professional managing 1-2 profitable DTC brands. | Needs fast margin analysis, automated breakeven ROAS formulas, and quick TikTok hooks. | **Standard Mode:** Balanced dashboard with access to all calculators and marketing tools. |
| **Jonas (The Power User / Agency)** | Veteran dropshipper running multiple Nordic funnels. | Wants lightning-fast workflows, CLI shortcuts, raw HTML exports, and custom CSS overrides. | **Expert Mode:** CLI shortcut bar (`/scrape`, `/moms`, `/roas`), custom CSS injection, and code bundle generation. |

---

## 4. Core Functional Requirements

### 4.1. Onboarding Stepper Guide
* **Requirement 4.1.1:** A multi-step interactive modal must greet first-time users or trigger on demand from the navigation bar, settings, or About page.
* **Requirement 4.1.2:** Step-by-step visual indicators (Step 1 to 5) with progress tracking and step badges.
* **Requirement 4.1.3:** Each step must detail:
  * Title and concise value explanation.
  * Meaningful visual iconography.
  * Direct action cue / feature pointer.
* **Requirement 4.1.4:** Standard navigation controls (`Previous`, `Next`, `Skip Tour`, `Finish / Get Started`).
* **Requirement 4.1.5:** Persistence in state and `localStorage` (`onboardingCompleted: true`). Reset option must be accessible in Settings and the About page.

### 4.2. About & Information System
* **Requirement 4.2.1:** Dedicated "About & Manual" tab accessible from the main navigation.
* **Requirement 4.2.2:** Multi-tab layout containing:
  * **Tab 1: Overview:** Executive summary, problem definition, target personas, interaction model, and unique value proposition.
  * **Tab 2: Detailed Manual:** In-depth user manual covering core concepts, step-by-step workflows (15-minute launch, margin auditing, platform exporting), best practices (Swish vs Klarna, PostNord logistics), and power user tips.
  * **Tab 3: FAQ Accordion:** Expandable/collapsible FAQ with smooth CSS transitions, divided into logical categories (Getting Started, Swedish Taxes & Compliance, Payments & Shipping, Store Building & BYOK AI).

### 4.3. Product Discovery & Scraper Queue
* **Requirement 4.3.1:** URL-based product scraper parsing supplier links (AliExpress, CJ Dropshipping, Amazon).
* **Requirement 4.3.2:** Automatic calculation of suggested Swedish retail price in SEK, estimated gross margin percentage, and estimated PostNord shipping cost.
* **Requirement 4.3.3:** One-click promotion from scraper queue into active store catalog.

### 4.4. Visual Store Composer
* **Requirement 4.4.1:** Block-based layout builder supporting reordering (`Move Up`, `Move Down`) and custom content editing.
* **Requirement 4.4.2:** Supported blocks: Hero, Problem/Solution, Product Showcase, Trust Badges, Swedish Legal Terms.
* **Requirement 4.4.3:** Live preview modal simulating responsive mobile/desktop viewport with interactive Swish purchase modal.
* **Requirement 4.4.4:** Export capabilities: Single-file standalone HTML bundle and Shopify CSV product export.

### 4.5. Swedish Tax & Financial Operations Engine
* **Requirement 4.5.1:** 25% Swedish MOMS VAT model calculating Gross Retail Price, Net Sales Price, and MOMS portion in real time.
* **Requirement 4.5.2:** Breakeven ROAS Calculator incorporating supplier COGS, PostNord freight, and target marketing CPA.
* **Requirement 4.5.3:** Order management board tracking customer city, payment method (Swish/Klarna/Stripe), tracking number, and delivery status.

### 4.6. Marketing & Viral UGC Generator
* **Requirement 4.6.1:** Dynamic TikTok / Instagram Reels hook script generator crafted for Scandinavian cultural appeal.
* **Requirement 4.6.2:** Instant copy-to-clipboard for viral hook patterns (Curiosity Gap, Swedish Guarantee, Direct Comparison).

### 4.7. Contextual BYOK AI Specialist
* **Requirement 4.7.1:** Floating drawer accessible across all screens.
* **Requirement 4.7.2:** Tab-aware persona switching (Mentor, Product Researcher, CRO Designer, Scriptwriter, Swedish Tax Advisor).
* **Requirement 4.7.3:** Zero-server BYOK storage supporting Groq Cloud (Llama 3.3 70B) and OpenRouter with built-in offline fallback.

---

## 5. Non-Functional & Design Requirements

1. **Design System:** Follow Clean Minimalism (Plus Jakarta Sans, `#F8F9FA` background, `#FFFFFF` cards with `#E5E7EB` borders, `#2563EB` primary accent, dark mode `#0F172A` / `#1E293B`).
2. **Touch Targets:** Minimum 44px on all touchable elements for mobile ergonomics.
3. **Accessibility:** WCAG AA color contrast compliance, keyboard navigable dialogs and accordions.
4. **Performance:** Instantaneous tab transitions (<16ms frame target), zero blocking network calls, full offline capability.
