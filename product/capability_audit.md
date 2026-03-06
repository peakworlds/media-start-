# Capability & Margin Audit

**Company:** Peak Haven Australia
**Founder Status:** Ghost / Decentralized Ops
**Date:** 2026-03-06

---

## 1. Operational Reality
The Peak Haven model relies entirely on a "12-Hour Cold Chain Dispatch" promise. Because lyophilized peptides degrade at room temperature—and completely denature in an Australian mailbox in summer—the logistics chain is the singular operational bottleneck. 

## 2. Capacity Assessment

### 2.1 The Time Debt (Per Order)
| Task | Estimated Time | Complexity |
|------|----------------|------------|
| Order Verification & Crypto/Stripe reconciliation | 2 mins | Low |
| Vials extracted from -20°C freezer | 1 min | Low |
| Thermal packaging & dry-ice prep | 7 mins | High |
| Courier manifesting & labeling | 2 mins | Low |
| **Total Time Per Order** | **12 mins** | |

### 2.2 Maximum Concurrency
If a single operator processes orders for 4 hours a day to meet the 12-hour dispatch cutoff:
*   **Max Daily Orders:** 20 orders per operator.
*   **Monthly Capacity:** ~600 orders/month (approx. $150k MRR assuming $250 AOV).

**The Breakdown Point:** At 20+ orders per day, the solo-founder/operator model fails. Thermal packaging cannot be rushed without jeopardizing the entire value proposition (Purity/Temperature).

## 3. Margin Audit

### 3.1 Unit Economics (Example: BPC-157 5mg)
*   Top-Tier Wholesale Cost (Raw powder from synthesis lab): ~$14.00
*   Janoshik Batch Testing Cost (Distributed per vial): ~$2.00
*   Vial, Labeling, Boxing: ~$3.50
*   Thermal Mailer + Ice/Foil: ~$5.00
*   Express Shipping (AusPost/Toll): ~$14.00
*   **Total COGS (Delivered):** ~$38.50
*   **Retail Price:** $145.00
*   **Gross Margin:** 73%

**The Profit Killer:** The thermal mailer and express shipping are fixed costs (~$19). Selling single vials at $75 destroys margin. The AOV (Average Order Value) *must* be pushed above $200 via the "Phase Protocols" to absorb the heavy logistics overhead.

## 4. Hiring Triggers & Tech Stack

| Phase | Trigger Metric | Key Software / Infrastructure | Key Automation | The Next Hire |
|-------|----------------|-------------------------------|----------------|---------------|
| **0. The Scramble** ($0k - $20k MRR) | Founder packs boxes in a dedicated deep freezer. | Shopify, GTM, Stripe | ShipStation rules for express-only. | N/A |
| **1. The System** ($20k - $50k MRR) | 10+ orders/day consistently. | Move to a dedicated climate-controlled dispatch node (WA / East Coast). | Klaviyo post-purchase Telegram invites. | Part-time Fulfillment Tech (3 hours/day) |
| **2. The Machine** ($50k - $150k MRR) | Daily volume exceeds 20 arrays. | Inventory financing, headless commerce if Shopify flags TOS. | Automated stock alerts for Janoshik re-testing cycles. | Full-time Dispatch Manager (Node 1) |

## 5. Summary Verdict
The business prints cash at scale (73% margins), but the fulfillment is highly manual and temperature-sensitive. The founder must never compete on price—they must compete on *integrity* and use the high AOV to fund a flawless, unimpeachable cold-chain logistics process.
