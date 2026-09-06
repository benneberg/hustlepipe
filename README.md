# HustlePipe (SideForge Engine v2.0)

> A modern, mobile-first Scandinavian & European dropshipping and e-commerce pipeline featuring automated product discovery, visual storefront composition, Skatteverket-compliant 25% MOMS calculations, and a privacy-first BYOK AI specialist.

---

## Key Highlights

* **Nordic-First Localization:** Built specifically for the Swedish (SEK) and wider Scandinavian markets. Includes automated 25% MOMS calculations, *Lag om distansavtal* (14-day return right) guarantees, and Swish & Klarna payment options.
* **Interactive Guided Onboarding:** Multi-step onboarding stepper guide with progress tracking, contextual explanations, and persistent completion state.
* **Comprehensive About & Manual Hub:** Includes an executive overview, detailed step-by-step user manual with real-world workflows, and an expandable FAQ accordion.
* **Zero-SaaS Cost Architecture:** No monthly app subscriptions or recurring vendor lock-in. Standalone HTML/CSS/JS export or Shopify/WooCommerce CSV exports.
* **Privacy-First BYOK AI Engine:** Connect your own API key (Groq Cloud for ultra-fast Llama 3.3 70B or OpenRouter for DeepSeek/Claude). Keys stay 100% in your local browser storage.
* **Adaptive Complexity Modes:** Toggle effortlessly between **Rookie**, **Standard**, and **Expert CLI** modes to match your operational proficiency.

---

## Project Structure

```
.
├── ARCHITECTURE.md          # Complete architectural specification & data flow
├── PRD.md                   # Product Requirements Document & feature matrices
├── README.md                # Project documentation & quick start guide
├── metadata.json            # Application metadata & configuration
├── package.json             # NPM dependencies and development scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite server & Tailwind configuration
├── index.html               # Main application container & single-page engine
├── src/
│   ├── main.tsx             # React / TypeScript entry point
│   ├── App.tsx              # Root component interface
│   └── index.css            # Tailwind global CSS imports
└── public/                  # Static assets & public resources
```

---

## Quick Start & Local Development

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm, yarn, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hustlepipe.git
   cd hustlepipe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. Build for production:
   ```bash
   npm run build
   ```

---

## Core Features & Modules

| Module | Primary Functionality |
| :--- | :--- |
| **Launch Pipeline** | 6-stage linear milestone tracker from zero to automated Scandinavian DTC revenue. |
| **Product Scraper** | URL-based product scraper with automated Swedish profit margin & COGS calculation. |
| **Storefront Builder** | Visual block composer (Hero, Problem/Solution, Product Showcase, Trust Badges, Legal Footer). |
| **Calculators & Orders** | Real-time 25% Swedish MOMS VAT calculator, Breakeven ROAS engine, and mobile order cards. |
| **Marketing Hooks** | Viral TikTok & UGC script generator tailored to Nordic consumer psychology. |
| **Swedish/EU Tax** | Checklists and guides for Skatteverket F-skatt, Bolagsverket, and EU consumer rights. |
| **BYOK & Settings** | Client-side API key configuration for Groq and OpenRouter with offline simulation fallback. |
| **About & Manual** | 3-tab knowledge base: Overview, comprehensive user guide, and expandable FAQ accordion. |

---

## Swedish Tax Formulas

Swedish consumer regulations require all displayed retail prices to be inclusive of 25% MOMS. HustlePipe implements these exact Skatteverket formulas:

* **Net Sales Price:** `Retail Price (SEK) / 1.25`
* **MOMS Amount (25%):** `Retail Price (SEK) - Net Sales Price`
* **Net Profit:** `Net Sales Price - Supplier COGS - PostNord Shipping - Ad CPA`
* **Breakeven ROAS:** `Retail Price / (Retail Price - Supplier COGS - PostNord Shipping)`

---

## License

Apache-2.0 License. Built with clean code principles for high-velocity DTC operations.
