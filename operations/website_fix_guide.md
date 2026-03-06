# Peak Haven Australia
# Website Fix & MCP Setup Guide

**Generated:** 2026-03-06
**Audit Source:** `audits/website_conversion_audit.md`
**Website:** peakhaven.com.au
**Prepared by:** The Website Doctor (Phase 3F)

> This document translates every finding from the Website Conversion & Trust Audit into exact, actionable fix instructions — prioritized by impact. Share this with your developer or use it as your implementation checklist.

---

## Overall Website Health Score: 38/80 — 🔴 CRITICAL SURGERY REQUIRED

| Dimension | Score | Status |
|-----------|-------|--------|
| Convertibility | 4/10 | 🔴 Critical |
| Brand Authority | 6/10 | ⚠️ Needs Work |
| Accessibility | 5/10 | ⚠️ Needs Work |
| SEO Health | 4/10 | 🔴 Critical |
| Funnel Integration | 5/10 | ⚠️ Needs Work |
| Trust Signals | 3/10 | 🔴 Critical |
| UX & Performance | 6/10 | ⚠️ Needs Work |
| Content Authority | 5/10 | ⚠️ Needs Work |

*Emoji key: ✅ Strong (8–10) | ⚠️ Needs Work (5–7) | 🔴 Critical (0–4)*

---

## Section 1: Critical Fixes — Do These First

> These are conversion killers and trust destroyers. Every day they exist, you are losing business.

---

### Fix 1.1 — Embed HPLC Testing Directly in Product Galleries

**Issue:** Currently, the site treats "Verification" as just another tab. High-anxiety buyers will not search for your lab tests; they assume you don't have them unless they are forced to see them.
**Why It Matters:** In the grey market, pure trust is the only currency. If you make them click away from the "Buy" button to verify purity, you lose the sale.
**Estimated Impact:** +35% add-to-cart rate.

**How to Fix — Step by Step:**
1. Download the latest Janoshik mass spectrometry PDF for each compound.
2. Convert the PDF into a high-resolution WebP image.
3. Upload this image as the *second* product image in your Shopify/WooCommerce gallery for every single SKU.
4. Add a text overlay to the corner of the primary product thumbnail: "HPLC Verified [Date]".

**Tool/Plugin Recommendation:** Adobe Acrobat (to export PDF to Image), Squoosh.app (for WebP compression)
**Time to Implement:** 2 Hours
**Who Does This:** Website Administrator

---

### Fix 1.2 — The "No Returns" Checkout Reframing

**Issue:** The "No Returns" policy causes massive drop-off at checkout because it sounds like a scam evasion tactic.
**Why It Matters:** You cannot accept returns due to cold-chain degradation, but the customer interprets it as poor service.
**Estimated Impact:** +15% conversion rate at the final checkout step.

**How to Fix — Step by Step:**
1. Navigate to your checkout settings (e.g., Shopify Settings > Checkout > Checkout language).
2. Locate the Return Policy text block displayed below the "Pay Now" button.
3. Replace the generic "No Returns Accepted" text with the exact copy below.

**Exact Copy:** *"Due to our uncompromising -20°C cold-chain logistics, we cannot accept returns. We refuse to restock vials once they leave our facility's temperature controls. This absolute strictness guarantees you never receive a degraded product."*

**Tool/Plugin Recommendation:** Native Shopify Checkout Editor
**Time to Implement:** 15 mins
**Who Does This:** Owner

---

### Fix 1.3 — The Legal Firewall & Language Scrub

**Issue:** A dangerous mix of B2B ("laboratory use only") and B2C ("Summer Shred") creates a confused and legally perilous narrative that invites TGA scrutiny.
**Why It Matters:** TGA Schedule 4 classification means marketing "Summer Shred" is advertising prescription medicine to the public. It will get your Stripe account banned and your inventory seized.
**Estimated Impact:** Business Survival (Prevents 100% loss).

**How to Fix — Step by Step:**
1. Export your entire product catalog to CSV.
2. Run a find-and-replace for the following terms: "Shred", "Beach", "Shredded", "Swole", "Muscle", "Fat Loss", "Heal", "Cure", "Human", "Injection".
3. Replace all "Stacks" with the term "Phase Protocols" (e.g., change "Summer Shred Stack" to "Phase II Metabolic Agonist Array").
4. Re-upload the sanitized CSV catalog.

**Tool/Plugin Recommendation:** Microsoft Excel / Google Sheets
**Time to Implement:** 3 Hours
**Who Does This:** Owner / Copywriter

---

## Section 2: Conversion Fixes

### 2.1 Headline & Above-the-Fold Rewrite

**Current Headline:** `Australia's Best Peptides for Summer Shreds`
**Problem:** Illegal under TGA guidelines, commoditizes the brand, repels high-net-worth longevity buyers.
**New Headline (Recommended):** `Biological Scaffolds for Extreme Research`
**New Subheadline:** `≥99% Janoshik-verified purity. Dispatched across Australia in 12 hours via unbroken cold-chain logistics. Strictly for in-vitro analytical application.`
**New CTA Button Text:** `Access the Vault`

**Implementation Notes:**
- Change the background behind the hero text to pure Onyx Black (`#0B0C10`).
- Ensure the CTA button is Neon Cyan (`#66FCF1`).

**Where to make change:** Shopify Theme Editor -> Homepage Hero Banner

---

### 2.2 CTA Optimization

**Anti-Patterns Found and Replacements:**

| Current CTA (Bad) | Location | Replacement CTA (Good) | Reason |
|-------------------|----------|------------------------|--------|
| `Buy Now` | Product Page | `Acquire for Research` | Legal compliance + premium framing. |
| `Get Shredded` | Homepage | `View Phase Protocols` | Avoids fitness-bro aesthetic and TGA triggers. |
| `Join Newsletter` | Footer | `Request Inner Haven Access` | Creates exclusivity and drives Telegram funnel. |

---

### 2.3 Lead Capture Setup

**What's Missing:** The site relies on immediate single-vial purchases and has no mechanism to capture high-intent users who aren't ready to buy $300 biologicals instantly.

**Recommended Setup:**

**Step 1 — Add a Lead Magnet**
- Create a free resource: *The Uncensored 2026 Reconstitution Math Protocol (PDF)*
- Host it on: Hidden Shopify PDF Asset link
- Promote it with: Exit-intent popup on the `/collections/all` page.

**Step 2 — Build the Opt-In Form**
- Tool: Klaviyo
- Form fields: Email only.
- Place on: Blog sidebar, Exit intent popup.

**Step 3 — Create a Thank You Page**
- URL: `/thank-you-protocol`
- Content: "The PDF is in your inbox. Next step: Secure your encrypted access to the Inner Haven syndicate." -> Link to Telegram.

---

### 2.4 Booking / Conversion Flow

**Current Flow:** Product Page -> Cart -> Checkout -> Abandonment due to lack of BAC water.
**Target Flow:** Product Page -> Mandatory Add-on Pop-up (Reconstitution Kit) -> Cart -> Checkout
**Current Clicks to Convert:** 4

**Steps to Reduce Friction:**
1. Install an "In-Cart Upsell" application.
2. Trigger a modal when any raw lyophilized peptide is added to cart: "Does your research facility require sterile BAC water and 31g apparatus?"
3. Allow one-click addition of the Reconstitution Kit to cart.

**Recommended Booking Tool:** Rebuy Engine (Shopify) or native WooCommerce Upsells.

---

## Section 3: Brand Authority Fixes

### 3.1 Social Proof Implementation Plan

| Proof Type | Fix | Where to Add | Template/Instructions |
|-----------|-----|-------------|----------------------|
| **Trustpilot** | Embed TrustBox carousel | Below Hero & Checkout | Filter to show only 5-star reviews mentioning "Janoshik" and "Fast Shipping". |
| **Review Count**| Add "Based on [X] Verified Protocols" | Underneath Hero H1 | Hardcode the text if app integration is too slow. |
| **Integrity Checks**| Add "0 Returns" badge | Product Page | Reframe 0 returns as a badge of cold-chain honor. |

### 3.2 Authority Content Quick Wins

1. **Stats Bar** — Add a "By the Numbers" section: 12-Hour Dispatch, -20°C Thermal Transit, ≥99% Minimum Allowed Purity. Place just below the hero.
2. **The Janoshik Standard Page** — Create a dedicated page explaining exactly *how* mass spectrometry works and why 90% of the market sells bunk, under-dosed products.

---

## Section 4: Accessibility Fixes

### 4.1 Priority Accessibility Fixes

| Fix | How to Do It | Tool | Time |
|-----|-------------|------|------|
| **Fix Color Contrast** | Ensure the Neon Cyan text on Onyx Black passes minimum 4.5:1 ratio. | WebAIM Contrast Checker | 30 mins |
| **Alt Text on Lab Replicas**| Describe the HPLC charts for screen readers so even blind technical audits pass. | CMS Media Library | 1 hour |

---

## Section 5: SEO Fixes

### 5.1 Title Tag & Meta Description Rewrites

**Formula:**
```
Title Tag: [Chemical Name] | HPLC Verified | Peak Haven Australia
Meta Description: [Location/Dispatch claim]. [Purity Claim]. Acquire for research.
```

**Recommended Rewrites:**

| Page | Current Title | New Title | Current Meta | New Meta |
|------|-------------|-----------|--------------|----------|
| Homepage | `Best Peptides Australia` | `Peak Haven | Verified Biological Scaffolds Australia` | `Buy the best peptides for bodybuilding and fat loss in Aus.` | `Dispatched in 12 hours from our Australian cold-chain facility. ≥99% Janoshik verified purity. Acquire uncompromising tools for in-vitro research.` |
| BPC-157 | `Buy BPC 157` | `BPC-157 5mg | HPLC Verified | Peak Haven Australia` | `BPC 157 for healing injuries.` | `5mg BPC-157 Lyophilized Peptide. Independently verified via mass spectrometry. Strict cold-chain transit. Research use only.` |

### 5.2 Schema Markup to Add

**Product Schema (add to every product page via liquid/PHP modification):**
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "BPC-157 5mg",
  "description": "5mg BPC-157 Lyophilized compound for in-vitro research. Includes independent Janoshik HPLC verification.",
  "brand": {
    "@type": "Brand",
    "name": "Peak Haven Australia"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://peakhaven.com.au/products/bpc-157",
    "priceCurrency": "AUD",
    "price": "145.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  }
}
```

---

## Section 6: Funnel & Integration Fixes

### 6.1 Tracking Pixel Installation

**WARNING ON PIXELS:**
Do not hardcode the standard Meta Pixel. Meta aggressively bans domains associated with peptide sales. 
**Solution:** Use Server-Side tracking via Google Tag Manager (GTM) to anonymize the traffic sources and prevent ad networks from scraping the URL paths.

**Step-by-Step: Installing Server-Side GTM Analytics 4**
1. Set up a tagging server (e.g., Stape.io or Google Cloud).
2. Create a Server container in GTM.
3. Route your web GTM container data to the Server container.
4. From the server, forward `purchase` and `view_item` events to GA4.

### 6.2 Key Conversion Events to Track

| Event | How to Set Up |
|-------|--------------|
| **Telegram Click** | GTM → Trigger: Click URL contains `t.me` → Tag: GA4 Event `telegram_join` |
| **Viewed Lab Test**| GTM → Trigger: Click URL contains `.pdf` → Tag: GA4 Event `view_lab_test` |

---

## Section 7: Trust & Legal Fixes

### 7.1 Required Legal Pages

| Page | Template Source | Where to Create | Priority |
|------|----------------|-----------------|----------|
| **Terms of Service** | Must clearly define "Research Use Only" parameters | `/terms` | 🔴 Critical |
| **Privacy Policy** | [TermsFeed.com](https://www.termsfeed.com) | `/privacy-policy` | 🟡 High |
| **Cold-Chain Policy**| Custom: Explain why no returns are accepted. | `/cold-chain` | 🔴 Critical |

---

## Section 8: UX & Performance Fixes

### 8.1 Page Speed Quick Wins

| Fix | How | Tool | Impact |
|-----|-----|------|--------|
| **Preload Hero Image** | Add `<link rel="preload" as="image" href="hero.webp">` to `<head>` | Theme Code | High |
| **Remove Heavy JS** | Strip out generic "Spin the Wheel" or pop-up apps that slow down TTFB. | Shopify Apps | Medium |

---

## Section 9: MCP Reference Guide

> How to use your Brand Brain notebook for ongoing website guidance.

**Your Brand Brain Notebook ID:** `[TO BE ADDED AFTER PHASE 5]`

### Recommended Queries for Website Work

**For Legal Copywriting Help:**
```
Review my product description below and sanitize it of any language that might trigger TGA or Stripe warnings. Use the clinical brand voice from the brand book: [paste your current copy]
```

**For Conversion Optimization:**
```
What is the most secure, high-converting way to frame a price increase for the Phase II Metabolic Array based on our Cold-Chain logic?
```

---

## Section 10: Implementation Roadmap

### Week 1 — Stop the Bleeding (Critical Trust & Legal Fixes)
| Day | Task | Owner | Done? |
|-----|------|-------|-------|
| Mon | Execute the complete Legal Firewall & Language Scrub | Copywriter | [ ] |
| Tue | Adjust "No Returns" checkout text to Cold-Chain Guarantee | Owner | [ ] |
| Wed | Gather all Janoshik PDFs and convert to WebP images | Admin | [ ] |
| Thu | Embed HPLC images into all product galleries | Admin | [ ] |
| Fri | Push live updated Terms of Service & Disclaimer footer | Developer | [ ] |

### Month 1 — Build the Foundation (High Priority Fixes)
- Week 2: Overhaul aesthetics to the "Shadow Lab" Onyx / Cyan colorway.
- Week 3: Install Server-Side GTM architecture and implement Telegram tracking.
- Week 4: Build and launch the "Reconstitution Bump" in-cart upsell modal.

### Quarter 1 — Optimise & Scale (Nice-to-Have Fixes)
- Month 2: Deploy the Exit-Intent Lead Magnet ("Reconstitution Math Protocol").
- Month 3: Replace standard lifestyle/gym imagery with high-end macro vial photography.
