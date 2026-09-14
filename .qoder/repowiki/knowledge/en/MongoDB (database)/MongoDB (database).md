---
kind: external_dependency
name: MongoDB (database)
slug: mongodb
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
---

- Primary data store for the Digentic platform: user accounts, posts, courses, digital products, and session data.
- Wired via two drivers: a raw `mongodb` client (`lib/mongodb.ts`) used by Mongoose models under `models/`, and the NextAuth MongoDB adapter (`@auth/mongodb-adapter`) configured in `auth.config.ts` to persist sessions.
- The admin role is granted at login time by matching the signed-in email against `TEMP_ADMIN_EMAIL` (default `admin@digentic.tech`) — this is the durable way admin privileges are injected into the JWT/session.