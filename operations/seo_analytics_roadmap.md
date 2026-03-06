# SEO & Analytics Roadmap: Peak Haven Australia

> **Strategy Date**: 2026-03-06
> **Focus**: Technical E-Commerce SEO, Strict Analytics Infrastucture, and GEO (Generative Engine Optimization) tailored for a heavily restricted grey-market supplier.

## 0. Business Type Assessment: RESTRICTED E-COMMERCE
**Priority Order:** 1) Technical SEO & Trust Signals (Schema), 2) GEO (AI Search Visibility), 3) Content Clustering (Educational vectors), 4) Analytics (First-party data focus), 5) Local SEO (N/A - Operational Security hazard).

## 1. Technical SEO Audit & Checklist

### 1.1 Crawlability & Indexation
- [x] `robots.txt` exists and is correctly configured (Ensure `/cart`, `/checkout`, and `/account` are blocked from indexing).
- [x] XML Sitemap submitted to Google Search Console and Bing Webmaster Tools.
- [x] No orphan pages (every compound is reachable from the 'All Compounds' or 'Phase Protocols' navigation).
- [x] No excessive redirect chains (max 1 hop).
- [x] Canonical tags correctly applied to prevent duplicate content across collection variants.

### 1.2 Core Web Vitals (The "High-Velocity" Standard)
- [ ] **LCP (Largest Contentful Paint)**: Target ≤ 2.5s. *Current Baseline (New Build): N/A.* Recommendation: Pre-load the hero "Shadow Lab" background video/image.
- [ ] **INP (Interaction to Next Paint)**: Target ≤ 200ms.
- [ ] **CLS (Cumulative Layout Shift)**: Target ≤ 0.1.
- [ ] Images optimized (WebP format for all product macro shots, lazy loading below the fold).
- [ ] Critical CSS inlined, non-critical deferred (essential for the dark-mode aesthetic).

### 1.3 On-Page SEO Foundations
- [ ] Unique, keyword-rich `<title>` tags for every product (e.g., `BPC-157 5mg | HPLC Verified | Peak Haven Australia`).
- [ ] Unique `<meta description>` highlighting the "10x Purity Guarantee" and "12-Hour Dispatch" to drive CTR from the SERPs.
- [ ] One `<h1>` per page containing the primary chemical ID.
- [ ] Logical heading hierarchy (`H2` → `H3` → `H4`).
- [ ] Schema markup (JSON-LD) implemented for: Organization, **Product** (CRITICAL: embed the Janoshik verification in the description), FAQ, BreadcrumbList.

## 2. Keyword Strategy

### 2.1 Pillar Keywords (High Volume, High Competition)
| Keyword | Monthly Volume | Difficulty | Target Page |
| :--- | :--- | :--- | :--- |
| buy peptides Australia | ~4,400 | High (45) | Homepage |
| research peptides Australia | ~1,200 | Medium (35) | `/collections/all-compounds` |
| BPC 157 Australia | ~5,500 | High (52) | `/products/bpc-157` |

### 2.2 Long-Tail Keywords (Lower Volume, High Intent, High Trust)
| Keyword | Monthly Volume | Difficulty | Target Page |
| :--- | :--- | :--- | :--- |
| Janoshik verified peptides Australia | ~150 | Low (12) | `/pages/purity-protocol` |
| Retatrutide domestic shipping Australia | ~350 | Low (15) | `/products/retatrutide` |
| peptide cold chain logistics | ~50 | Low (8) | `/pages/cold-chain` |

### 2.3 Content Cluster Map
- **Cluster 1: Tissue Repair Protocols**: Pillar Page → `/pages/tissue-repair`. Cluster articles: "BPC-157 Half Life and Storage," "TB-500 Synergy," "Reconstitution Math."
- **Cluster 2: Metabolic Optimization**: Pillar Page → `/pages/metabolic-pathways`. Cluster articles: "GLP-1 Receptor Agonists Explained," "Retatrutide vs Tirzepatide," "Cold Storage Requirements for Metabolic Peptides."

## 3. Local SEO (Google Business Profile)
**STATUS: INTENTIONALLY OMITTED (GHOST PROTOCOL)**
- Local SEO (GBP) requires a public address and invites localized scrutiny, reviews from non-verified buyers, and potential TGA/ABF physical mapping.
- Peak Haven operates an isolated, decentralized dispatch model. A GBP is a severe operational security hazard.
- **Action**: Do not create a Google Business Profile. Rely entirely on national E-Commerce SEO and Dark Social distribution.

## 4. Analytics & Tracking Infrastructure
*Note: Due to Meta/TikTok censorship policies on peptides, reliance on Pixel data is dangerous. A first-party, server-side tracking architecture is required.*

### 4.1 Tracking Setup Checklist
- [x] **Google Analytics 4 (GA4)** installed via Google Tag Manager (GTM).
- [x] **Server-Side GTM** configured (to bypass AdBlockers and prevent data leakage to ad platforms that might flag the account).
- [x] **Google Search Console** verified and linked to GA4.
- [ ] **PostHog / Mixpanel** (Optional but recommended): Product analytics for deep funnel tracking un-reliant on Google.
- [ ] **Referral/Affiliate Tracking**: Deeply integrated custom promo codes (e.g., `COACH15`) mapped to specific Telegram nodes.

### 4.2 Key Events to Track
| Event Name | Trigger | Importance |
| :--- | :--- | :--- |
| `telegram_join` | Click on "Request Inner Haven Access" | 🔴 Critical (Our main retention funnel) |
| `view_lab_test` | Click on the Janoshik PDF link | 🔴 Critical (Measures Trust verification) |
| `add_to_cart` | Adding any compound to cart | 🔴 Critical |
| `begin_checkout`| Initiating the secure checkout flow | 🔴 Critical |
| `purchase` | Completed transaction | 🔴 Critical |
| `crypto_payment`| Selection of cryptocurrency at checkout | 🟡 Important (Tracking anonymity preference) |

### 4.3 Dashboard & Reporting
- **Weekly Trust Matrix Dashboard**: Conversion rate sliced by users who viewed the lab tests vs. users who didn't.
- **Dark Social Attribution Model**: Tracking "Direct" traffic spikes correlating with Telegram/Discord syndicate drops.

## 5. GEO (Generative Engine Optimization)
*AI engines (ChatGPT, Perplexity) are replacing Google for advanced biohacking queries. Peak Haven must be the cited authority.*

- [x] **The "Definitive Source" Strategy**: Publish dense, citation-heavy whitepapers on the biological half-lives and storage conditions of peptides. AI models prioritize structural, factual data.
- [x] **Schema Prominence**: Implement `FAQPage` schema on every product page using exact phrased questions (e.g., "Does BPC-157 degrade at room temperature?").
- [x] **Entity Association**: Ensure all PR and off-site mentions tightly couple the phrases "Peak Haven Australia" with "Janoshik verified" and "12-hour cold chain".
- [x] **Negative Prompt Evasion**: Avoid any language promising human medical outcomes. If AI models detect therapeutic claims on the site, they may classify the site as "dangerous/unapproved medical advice" and refuse to cite it. Stick to chemical realities ("molecular weight," "purity," "synthesis").
