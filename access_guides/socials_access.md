# Social Media & Meta/Telegram Access Guide

**Company:** Peak Haven Australia
**Date:** 2026-03-06

---

## 1. Instagram Access (The Top-of-Funnel Brand)

Because Peak Haven cannot run Paid Ads (Facebook or Google) due to the Schedule 4 API terms of service, we rely solely on organic reels ("The Raw Material Shoot"). 

However, we need `Editor` access to upload these Reels natively to business accounts.

### How to Grant Instagram Access via Meta Business Suite:
1. Ensure your Instagram is linked to a Facebook Page (We do not post on the Facebook Page, but Meta requires it for permissions management).
2. Go to `business.facebook.com`.
3. In the bottom-left settings cog, select `People` under `Users`.
4. Click `Add People`.
5. Enter the Integrator's email.
6. Look for "Assets" (Select the Peak Haven Instagram and Facebook pages).
7. Under "Tasks," toggle `Create Ads` off, and toggle `Content` and `Community Activity` to **ON**. 
8. Do NOT grant **Full Control**. We don't want the legal liability if the account is suspended by Meta.

## 2. Telegram Integration (The True Asset)

The "Inner Haven" Telegram channel is the core lifetime value engine of the business. The Integrator will build two bots:
- `VerifyBot`: Automatically messages new joins and asks for the Shopify Order Number.
- `OracleBot`: Pushes the "10x Guarantee" shipping logs into the main channel when a batch lands.

### How to Configure Telegram Admin Status:
1. Open the Telegram app (Ensure you are the Creator of the Group).
2. Go to Group Info > `Administrators`.
3. Tap `Add Admin`.
4. Search for the Integrator's exact Telegram Handle.
5. Tap to add.
6. Toggle exactly the following permissions:
   - `Add New Admins`: **OFF**
   - `Ban Users`: **ON**
   - `Pin Messages`: **ON**
   - `Manage Voice Chats`: **OFF**
7. We will inject the API Bot into the group under these permissions. Do not alter them once the Bot drops in.

## 3. Disavowal
If any of our configurations result in a platform ban due to TGA algorithm sweeps, having segmented access limits the blast radius. We always aim to keep `Node Prime` entirely sanitized from direct advertising exposure.
