# AI Workout Plan Builder

Full-stack AI assistant that collects a natural-language workout brief, generates a multi-week strength program with OpenAI, and renders it in a responsive dashboard with editable circuits.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + shadcn-inspired primitives
- OpenAI Chat Completions (Responses API) invoked from a Next.js route
- Zod for schema validation
- Axios for client ↔ API communication

## Prerequisites
- Node.js 18+
- npm 10+
- An OpenAI API key with access to `gpt-4o-mini` (or compatible) models

## Environment Variables
Copy `env.example` to `.env.local` (or `.env`) and provide your key:

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

### Testing the Flow
1. Open the prompt screen (`/`), describe the desired program, and click the arrow button.
2. The client posts to `/api/generate-plan`; the server calls OpenAI and validates the result with Zod.
3. On success, the plan is cached in `localStorage` and you’re redirected to `/workout-plan`.
4. Inspect the generated plan, switch weeks via tabs, and reorder or delete exercises per day—the state persists locally, so refresh to confirm.

If `OPENAI_API_KEY` is missing or an upstream error occurs, the API responds with a descriptive 500 error.

## Deployment
1. Create the environment on your hosting provider (Vercel recommended).
2. Set `OPENAI_API_KEY` in the project settings.
3. Run `npm run build` locally to verify a production bundle.
4. Deploy (`vercel`, `npm run deploy`, or git-based deployment).

## Project Structure
```
src/
  app/
    page.tsx                 # Prompt view (client component)
    workout-plan/page.tsx    # Plan dashboard + tabs
    api/generate-plan/route  # OpenAI proxy route
components/
  ui/                        # shadcn-style primitives
  workout/                   # Domain-specific plan components
constants/ai.ts              # Shared AI prompt text
hooks/useWorkoutPlan.ts      # LocalStorage + mutation logic
lib/axios.ts                 # Preconfigured Axios instance
types/workout.ts             # Shared Zod schema + TS types
```

## Future Enhancements
- Persist plans in a database instead of `localStorage`.
- Add authentication so users can revisit historical plans.
- Improve drag-and-drop interactions with a dedicated DnD provider.
