# Meal Subscription API Contract & Workflow

This document outlines the shared expectations between the **Frontend (UI Developer)** and **Backend (Database Developer)** to ensure AI agents (and human developers) stay perfectly synced.

## 1. Monorepo Workflow (CRITICAL)
- **Frontend** lives in `/mobile_app` (Flutter) and `/admin_panel` (React Web).
- **Backend** lives entirely in `/backend` (Supabase config, SQL migrations, Edge Functions).
- Do not manually share code. Push all your changes to GitHub, and pull when returning to work.

## 2. Supabase Shared TypeScript Types
Whenever the Database Developer alters a table (adds a column, creates a new table), they **MUST** run the Supabase types generator and save it into the repository:

```bash
# Example command for backend developer
supabase gen types typescript --project-id YOUR_PROJECT_REF > backend/supabase.types.ts
```
*Why? The UI AI (Antigravity) will read `supabase.types.ts` and instantly know exactly how to fetch and display the data on the mobile app or admin dashboard without breaking.*

## 3. Expected Core Database Relationships
The UI will assume the database tables map out something like this:
- `users`: Accounts for Parents (Phone OTP, Email)
- `schools`: Configured by Super Admins.
- `children`: Managed by Parents. Linked via `parent_id` and `school_id`. Holds `meal_balance` and `subscription_plan`.
- `menus`: Managed by Admin. Holds date and `food_image_url` (Served from Supabase Storage).
- `transactions`: Payment history linking to standard gateways (Razorpay/Stripe).

## 4. Custom Edge Functions (APIs)
If custom server logic is needed (e.g., Stripe webhooks, pushing WhatsApp messages), place them in Supabase Edge functions and document the endpoints here:

*   `[POST] /process-payment` - Expects amount, child_id. Triggers Razorpay payment success.
*   `[POST] /send-whatsapp` - Triggered automatically on low meal balances.
