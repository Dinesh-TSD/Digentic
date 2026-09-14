---
kind: error_handling
name: Next.js Route-Level Error Handling with User-Friendly JSON Responses and Client-Side Toasts
category: error_handling
scope:
    - '**'
source_files:
    - app/api/auth/register/route.ts
    - app/api/auth/me/route.ts
    - app/api/auth/forgot-password/route.ts
    - components/auth/AuthCard.tsx
    - hooks/use-toast.ts
    - app/contact/page.tsx
---

## System Overview

This Next.js App Router application uses a simple, route-level error handling pattern without a centralized error class hierarchy or middleware. Errors are handled inline in each API route via try/catch blocks, returning structured JSON responses through `NextResponse.json` with explicit HTTP status codes. Client-side errors are surfaced to users via React state (`errorMessage`) and a custom toast system.

## API Route Error Pattern

Every API route under `app/api/auth/` follows the same shape:
- Input validation returns `NextResponse.json({ error: '...' }, { status: 400 })` for malformed requests (e.g., missing name, invalid email regex, password too short).
- Business-rule violations return specific statuses: `401` for unauthorized access (`/api/auth/me`), `404` for not found, `409` for duplicate email registration.
- A single `catch (error: any)` block wraps the entire handler body, logs via `console.error`, and returns a generic `{ error: '...' }` response with `status: 500`. The message falls back to `error?.message || 'Something went wrong...'` so internal stack traces never leak to clients.
- Success paths consistently return `{ success: true, ...payload }` with appropriate 2xx codes (e.g., 201 for registration).

Key files demonstrating this pattern:
- `app/api/auth/register/route.ts` — validates input, checks duplicates, hashes passwords, catches DB errors.
- `app/api/auth/me/route.ts` — guards session, queries user, strips password field, returns 401/404 on failure.
- `app/api/auth/forgot-password/route.ts` — protects against account enumeration by always returning a success-like response even when the email is unknown; deletes stale reset tokens before issuing new ones.

## Client-Side Error Handling

The `components/auth/AuthCard.tsx` component handles authentication errors at the UI layer:
- A `getAuthErrorMessage(error)` switch maps NextAuth error codes (`CredentialsSignin`, `OAuthSignin`, `Callback`, `SessionRequired`, etc.) to friendly user-facing strings.
- Form submissions use try/catch around `signIn()` and `fetch('/api/auth/register')`, setting `errorMessage` state on failure and clearing it before each attempt.
- Registration performs client-side validation (email regex, password length ≥ 8, confirm match) before calling the server, providing immediate feedback.
- Social sign-in flows catch errors per provider and set a descriptive message.

Page-level forms (e.g., `app/contact/page.tsx`) render inline field-level errors from a local `errors` object using small red text paragraphs.

## Toast Notifications

A custom `hooks/use-toast.ts` provides a lightweight, in-memory toast system inspired by `react-hot-toast`. It defines a reducer-based state machine with actions `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST`, a global `toast()` function, and a `useToast()` hook. It supports `variant: 'default' | 'destructive'` for styling positive vs. negative messages, an action slot, and auto-dismiss after a long timeout. This is the only dedicated notification/error-display utility in the codebase.

## Conventions Observed

- **No custom error classes**: There is no `errors/` directory, no sentinel errors, and no shared error type definitions. Each route constructs its own error objects inline.
- **No global error boundary or middleware**: Error handling lives inside individual route handlers and components; there is no `error.ts` root layout, no `not-found.tsx`, and no Express-style error middleware.
- **Consistent JSON envelope**: Successful responses include `{ success: true }`; error responses include `{ error: string }` plus an HTTP status code.
- **Safe error logging**: Server-side `console.error` is used for unexpected exceptions, but the caught branch never forwards raw exception details to the client — it falls back to a safe default message.
- **Client-side validation precedes network calls**: Forms validate locally before invoking APIs, reducing unnecessary round-trips and enabling instant feedback.
- **User-friendly messaging**: All user-visible error strings are plain English messages rather than technical codes or stack traces.

## Constraints and Gaps

- Validation logic is duplicated between client and server (e.g., email regex, password length) because there is no shared schema library like Zod.
- There is no centralized place to add new error codes or map them to messages beyond ad-hoc switch statements in `AuthCard.tsx`.
- No global unhandled promise rejection handler or window-level error listener was found.
- Database connection failures, Mongoose validation errors, and bcrypt/network errors all collapse into the same generic 500 response.