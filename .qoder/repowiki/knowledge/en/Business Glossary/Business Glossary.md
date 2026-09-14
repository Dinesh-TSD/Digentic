---
kind: business_term
name: Business Glossary
category: business_term
scope:
    - '**'
---

### Digentic Tech
- Definition：The product/platform being built — an educational and digital-content site offering courses, blog posts, projects, and digital assets, with dual dashboards for administrators and end users.
- Aliases：Digentic

### Admin dashboard
- Definition：The `/admin` section of the application providing content management (posts, drafts, assets, projects, courses), analytics, likes overview, and settings — accessible only to users whose role is elevated to `admin` via the `TEMP_ADMIN_EMAIL` mechanism.
- Aliases：admin panel

### User dashboard
- Definition：The `/dashboard` section for enrolled users to view purchased courses with progress, purchase history/invoices, saved posts, profile, and account/notification/password/appearance settings.
- Aliases：my dashboard

### Digital assets
- Definition：Sellable downloadable products listed under the `/digital` route group, tracked per-user via the `purchasedDigital` claim on the session/JWT.
- Aliases：digital products

### Drafts
- Definition：Unpublished posts managed through `/admin/posts/drafts` that can be edited, published, or deleted by admins.

### Enrolled courses
- Definition：Courses a user has access to, stored as the `enrolledCourses` claim on the session/JWT; the special value `'all'` grants every course (used for the temp admin).
