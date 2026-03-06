# Domains & DNS Access Guide

**Company:** Peak Haven Australia
**Date:** 2026-03-06

---

## 1. Domain Registrar (GoDaddy/Namecheap/Cloudflare)

To deploy the Server-Side Google Tag Manager (GTM) architecture—our primary defense against Meta/Stripe surveillance analytics—we require the highest level of Trust. We need to point DNS records directly to the encrypted tagging server.

### The Standard Procedure: Delegate Access (Not Passwords)

1. Log in to your Domain Registrar.
2. Navigate to Account Settings > Delegate Access.
3. Select `Invite to Access`.
4. Enter the Integrator's provided email.
5. Select `Manage Products` only. Do not select `Purchase Products`.

### The Fallback Procedure (If Delegation isn't supported)
If you use a registrar that does not support secure delegation:
1. Do not send us the password.
2. Open a Signal/Telegram voice or screen-share call with the Integrator.
3. They will dictate the EXACT TXT and CNAME records required for the Stape.io server.
   * `CNAME | sg.peakhaven.com.au | [Server Address here]`
   * `TXT | peakhaven.com.au | [Auth Code here]`
4. You will input these manually while they watch.

## 2. Server-Side Execution
Once DNS propagates, the Integrator will deploy the server container. The server intercepts all incoming traffic to `peakhaven.com.au`, scrubs any PII or identifiers that flag Facebook/Google algorithms, and forwards clean conversion metrics to GA4. 
