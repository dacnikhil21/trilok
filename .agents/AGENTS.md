# Workspace Rules & B2C Application Workflow Guidelines

## Core Business Model & Terminology Rule
- **NO B2B**: There is **no B2B** in this application. The business model is exclusively **B2C: (Shops/Business)** and **C2C (Individuals)**.
- **Official Module Name**: Always label and present the business option as **`B2C: (Shops/Business)`**.

---

## Entire Application Flow (1:1 with Official 5-Step Process Reference)

The entire application flow for **B2C: (Shops/Business)** and **C2C (Individuals)** follows this exact 5-step sequence:

1. **1. Business Registration** (Store Icon): Business verifies with Aadhaar & PAN (or GSTIN / Udyam) and completes one-time eSign setup.
2. **2. Verified Business Tag** (Verified Shield Badge Icon): Business gets Verified Tag and lifetime access to dashboard.
3. **3. Create Agreement** (Document Icon): Enter customer details and agreement information.
4. **4. Customer eSign** (Pencil Icon): Only customer eSigns the agreement every time via digital link / WhatsApp invitation.
5. **5. Agreement Completed** (Green Shield Check Icon): Agreement is generated, secured and stored with audit trail.

---

## Design System & UI Principles
- **Progress Stepper**: The progress stepper at the top of registration & onboarding screens MUST use **square-shaped icon nodes** (`rounded-[12px]` / `rounded-[14px]`) representing the 5 steps instead of numbered circles.
- **Frictionless Navigation**: In developer mode / testing, the "Continue" action button advances directly to the next step on click.
