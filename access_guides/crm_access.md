# E-Commerce & CRM Access Guide

**Company:** Peak Haven Australia
**Date:** 2026-03-06

---

## 1. Shopify (E-Commerce Backbone)

We require exactly two levels of access depending on the contractor function:
1. **Developer Access (Temporary):** To inject the "In-Cart Upsell" application logic and deploy the "Shadow Lab" CSS.
2. **Dispatch Access (Permanent):** For Node Operators fulfilling orders manually in the warehouse.

### How to Grant Safe Shopify Access:
1. Log in to your Shopify Admin Panel (as the Store Owner).
2. Go to `Settings` > `Users and permissions`.
3. Click `Add staff`.
4. Enter the explicit name and email address provided by the Integrator.
5. **For Developer Access:**
   - Select `Apps and channels`, `Themes`, `Navigation`, and `Settings`.
   - **CRITICAL:** Do NOT check `Orders/Customer data` or `Financials`. We build the cart logic; we do not access actual sales data or customer names.
6. **For Dispatch Access (Node Operator):**
   - Select ONLY `Orders` and `Fulfillment`. They map physical inventory to digital manifests. They get nothing else.
7. Click `Send invite`.

## 2. Klaviyo (Email Marketing CRM)

We use Klaviyo strictly to push confirmed purchasers into the encrypted Telegram channel. We need access to build these operational flows.

### How to Grant Klaviyo Access:
1. Log in to your Klaviyo Dashboard.
2. Click your Account name in the bottom left corner > `Settings`.
3. Go to `Users` > `Add New User`.
4. Enter our email address.
5. Set Role to **Manager**.
   - **Why this role:** It allows us to build flows and edit email templates without the ability to export the entire customer database or delete the account.
6. Click `Send Invite`.

---

## 3. The Security Verification
If a contractor asks for `Owner` access to either of these platforms, immediately block their Signal/Telegram ID and report them to Node Prime.
