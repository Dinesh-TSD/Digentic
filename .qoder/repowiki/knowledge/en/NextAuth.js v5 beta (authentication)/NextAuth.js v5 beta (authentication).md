---
kind: external_dependency
name: NextAuth.js v5 beta (authentication)
slug: next-auth
category: external_dependency
category_hints:
    - vendor_identity
    - auth_protocol
scope:
    - '**'
---

- Authentication framework powering sign-in/sign-up/reset-password flows under `app/api/auth/` and `app/auth/` pages.
- Social providers: Google and GitHub, configured via `GOOGLE_CLIENT_ID/SECRET` and `GITHUB_CLIENT_ID/SECRET` environment variables; `allowDangerousEmailAccountLinking` is enabled so provider emails can link existing accounts.
- Session/JWT carries custom claims: `role` (default `'user'`, elevated to `'admin'` when the email matches `TEMP_ADMIN_EMAIL`), `enrolledCourses`, and `purchasedDigital` — these are what gate admin routes and course/purchase access.
- Sign-in page is mounted at `/auth/login` via the `pages.signIn` config.