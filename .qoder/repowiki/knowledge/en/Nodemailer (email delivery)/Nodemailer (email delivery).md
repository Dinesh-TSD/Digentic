---
kind: external_dependency
name: Nodemailer (email delivery)
slug: nodemailer
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
---

- Email transport used for password-reset and other transactional emails sent from API routes (`forgot-password`, `reset-password`).
- SMTP credentials are expected via environment variables (standard Nodemailer configuration); the module abstracts the transport behind `lib/email.ts`.