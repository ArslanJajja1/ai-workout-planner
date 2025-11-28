# AI Workout Plan Builder

This project demonstrates an AI-assisted training workflow built with the Next.js App Router. Users describe their goals in natural language, the backend generates a multi-week plan through OpenAI’s Responses API, and the resulting program is rendered in a responsive, editable dashboard.

## Highlights
- **Prompt intelligence** – client-side validation detects vague briefs, provides inline feedback, and surfaces UX messaging while the AI call and redirect are in progress.
- **Structured AI output** – the `/api/generate-plan` route wraps `generateObject` with Zod schemas, retry logic, consistent error envelopes, and a shared system prompt.
- **Persistent workout view** – `useWorkoutPlan` hydrates from `localStorage`, exposes mutation helpers, and keeps week state in sync with shadcn tabs.
- **Responsive plan board** – day cards mirror the provided Figma, adapt to smaller screens with horizontal scroll, and align columns through grid layouts with separators.
- **Componentized UI** – prompt banner, form card, workout tabs, and exercise rows live in `components/` for easy reuse and review.

## Tech Stack
- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS + shadcn-inspired primitives
- OpenAI Responses API via `@ai-sdk/openai`
- Zod for schema enforcement
- Axios for client → API communication

## Prerequisites
- Node.js 18+
- npm 10+
- OpenAI API key with access to `gpt-4o` or compatible models

## Environment Variables
Copy `env.example` to `.env.local` (or `.env`) and set your key:

```bash
cp env.example .env.local
```

```
OPENAI_API_KEY=sk-your-key
```

## Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

## Key Flows
1. **Prompt intake** (`src/app/page.tsx`)
   - `usePromptForm` validates input length/word count, surfaces `PromptStatusBanner` messaging, and blocks duplicate submissions.
   - On submit, the form posts to `/api/generate-plan`, streams UX copy (“Crafting a personalized plan…”, “Loading your workout plan…”), persists the payload in `localStorage`, then redirects.
2. **Plan generation** (`src/app/api/generate-plan/route.ts`)
   - Parses the request via Zod, builds a strict user/system prompt, calls OpenAI with retries, and re-validates the object before responding.
   - Errors return typed `{ error: string }` payloads so the client can surface contextual alerts.
3. **Workout experience** (`src/app/workout-plan/page.tsx`)
   - `useWorkoutPlan` hydrates from storage, exposes week navigation, and mutations for reordering or deleting exercises.
   - `WeekTabs`, `DayCard`, and `ExerciseRow` render the responsive layout with aligned columns, separators, and the Maxed branding header.

## Deployment
1. Provision a project on Vercel (or similar).
2. Add `OPENAI_API_KEY` to the environment.
3. `npm run build` locally to confirm compilation.
4. Deploy via `vercel`, Git integration, or your preferred workflow.

## Project Structure
```
src/
  app/
    page.tsx                  # Prompt experience
    workout-plan/page.tsx     # Workout dashboard
    api/generate-plan/route.ts# AI proxy route
components/
  prompt/                     # Prompt UI (header, form, status)
  workout/                    # Tabs, day cards, exercise rows
  ui/                         # shadcn-style primitives
constants/                    # ai.ts, runtime, errors, plan generation
hooks/                        # usePromptForm, useWorkoutPlan
lib/                          # axios client, AI client, API helpers
types/                        # API + workout schemas
```

## Future Enhancements
- Persist plans in a real datastore and add auth so athletes can revisit history.
- Replace manual reordering with a drag-and-drop provider.
- Stream AI progress to the client (Server Actions / SSE) for even richer UX feedback.
