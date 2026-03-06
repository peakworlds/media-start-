# System Delegation Decision Guide

**Company:** Peak Haven Australia
**Role:** Systems Integrator (Node Admin)
**Date:** 2026-03-06

---

## 1. The Zero-Trust Architecture

Peak Haven operates in the grey market. Operational security (OpSec) is not a feature; it is the entire foundation. If a contractor, marketing agency, or dispatch technician compromises a master password, the business is exposed to catastrophic regulatory and financial risk.

**The Golden Rule:** You will NEVER email a password. You will NEVER SMS a password. You will only grant Role-Based Access Control (RBAC) via official administrative menus.

## 2. Why We Need Access
To execute the Scaling & Risk Management Playbook, we must configure:
1. **Server-Side Tracking:** To bypass Meta bans and anonymize traffic.
2. **Cold-Chain Upsells:** To modify the Shopify cart logic.
3. **Crypto Integration:** To configure non-fiat checkout rails.

## 3. The 4 Golden Rules of Delegation

1. **Rule of Least Privilege:** If an operator only needs to fulfill orders, they do not get access to the Stripe payout dashboard. They get "Order Fulfillment Only" permissions.
2. **The 14-Day Revocation:** Any developer or contractor granted "Admin" access to build a system will have their access automatically revoked on Day 14. 
3. **Mandatory 2FA:** We mandate physical YubiKey or Authenticator App MFA for all accounts. SMS 2FA is banned due to SIM-swapping risks.
4. **No Financial Mutation:** External contractors are never granted the permission to issue refunds, alter banking details, or transfer funds out of Stripe/Crypto wallets.

## 4. Required Integrations for Phase 1
Follow the specific `access_guides` in this folder to grant us access to the following 4 pillars:
- **Domains & DNS:** For deploying Server-Side GTM.
- **Shopify/Klaviyo (CRM):** To build the in-cart upsells and post-purchase Telegram flows.
- **Stripe:** Restricted API keys only for checkout visualization.
- **Socials/Telegram:** To configure the API bot for the Inner Haven syndicate.

Proceed to the specialized guides to begin delegation.
