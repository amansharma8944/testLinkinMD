# Asymmetri AI Assistant

A modern AI-powered web application built with **Next.js (App Router)**, **Tailwind CSS**, **NextAuth**, **Drizzle ORM**, and **Google AI SDK**.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS
- **Auth**: NextAuth.js
- **Database**: PostgreSQL + Drizzle ORM
- **AI**: Google AI SDK (`@ai-sdk/google`)
- **Icons**: Lucide React

---

## Prerequisites

Make sure the following are installed:

- Node.js **18+**
- npm **9+**
- PostgreSQL (for database features)

Check versions:
```bash
node

-v
npm -v


.env file :

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

DATABASE_URL=postgres://user:password@localhost:5432/dbname

GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
