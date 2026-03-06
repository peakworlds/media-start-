# Stripe & Payments Access Guide

**Company:** Peak Haven Australia
**Date:** 2026-03-06

---

## 1. Stripe Dashboard Integration

We do NOT want access to your bank details. We do NOT want access to issue refunds. As the Integrator, our entire goal is to build automated reporting logic that flags when `Phase Arrays` are sold vs `Diagnostic Vials`.

We achieve this via Restricted API Keys, not user logins.

### How to Create a Restricted API Key:
1. Log in to your Stripe Account as the `Owner`.
2. Ensure you are in **Live Mode** (Toggle top right).
3. Navigate to `Developers` > `API keys`.
4. Scroll down to `Restricted keys` and click `+ Create restricted key`.
5. Key Name: `PeakHaven_OpsMetrics`
6. Look for `Charges` and change the permission from "None" to **"Read".**
7. Look for `Customers` and change the permission from "None" to **"Read".**
8. Leave EVERY OTHER setting as `None`.
9. Click `Create key`.
10. Send the `rk_live_...` key via Signal/Telegram to the Integrator using an encrypted disappearing message (set to 5 minutes).

### What this accomplishes:
This key allows us to pull gross volume and AOV metrics directly into a Google Data Studio dashboard without giving us any physical access to your Stripe UI. Even if the key is compromised, it is literally impossible for a hacker to steal funds or issue a refund with a `Read` key.

## 2. Crypto Rails (Coinbase Commerce / DePay)

If Peak Haven integrates non-fiat checkout rails to circumvent banking risk:
1. Do not share wallet seed phrases under any circumstances.
2. The Integrator will generate a raw API Webhook Secret from the crypto payment processor.
3. You will paste that Webhook Secret into the Shopify payment gateway during a supervised Signal screen-share session.
