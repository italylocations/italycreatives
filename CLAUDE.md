# ItalyCreatives

## Overview
Creative crew agency representing makeup artists, hair stylists,
fashion stylists and filmmakers for international editorial and
fashion productions in Italy. Rome-based. English only.

## Sites
- italycreatives.com — Main agency site (indexed)
- apply.italycreatives.com — Application portal (NOT indexed)

## Tech Stack
- Next.js 16 App Router + TypeScript + Tailwind CSS v4
- Hosting: Vercel (autodeploy from GitHub)
- Storage: Cloudflare R2
- Email: Resend
- Database: Google Sheets (via googleapis)
- Analytics: Google Analytics 4

## Routing
Hostname-based routing via middleware.ts:
- apply.* → serves app/(apply)/ routes
- everything else → serves app/(main)/ routes

## Design
- Light editorial aesthetic
- Background: #F8F5F0 (warm ivory)
- Accent: #8B0000 (deep carmine red)
- Fonts: Cormorant Garamond (headings) + DM Sans (body)
- English only — no language switcher

## Key Rules
- Custom CSS inside @layer base (Tailwind v4)
- All images on Cloudflare R2, never Vercel filesystem
- apply subdomain: robots.txt Disallow: /
- main site: robots.txt Allow: /
- Never commit .env.local
- Never expose API keys in frontend

## Ecosystem
Part of: nreal.it + italylocations.com + italycreatives.com
