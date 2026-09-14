# Digentic Tech — User Dashboard Prompt

## Project Context
- Framework: Next.js 15 App Router
- Stack: React 19, TypeScript, Tailwind CSS, Shadcn UI, Lucide React
- Theme: Dark-first/white sec, AI & programming blog platform
- Brand: Digentic Tech — "The DNA of AI Technology"

---

## Color Palette (Apply Everywhere)

```
Dark Theme:
  BG:          #0a0a0a   → main page background
  Surface:     #111111   → sidebar, cards, topbar
  Border:      #1f1f1f   → all borders, dividers
  Hover:       #1a1a1a   → hover overlay on nav items

Text:
  Primary:     #f1f5f9   → headings, labels, nav text
  Muted:       #94a3b8   → secondary text, meta, icons default

Orange Accents:
  Primary:     #ff8c00   → icons active, links, borders active, values
  Secondary:   #ff6b35   → hover states, gradient end, progress fill end
  Tertiary:    #ff5733   → active states, notification dot
  Orange 10%:  rgba(255,140,0,0.10) → active nav bg, chip bg
  Orange 20%:  rgba(255,140,0,0.20) → avatar bg, subtle overlays
```

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                     TOPBAR (48px)                   │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   SIDEBAR    │         MAIN CONTENT                 │
│   (172px)    │         (flex: 1)                    │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

---

## 1. Topbar

### Specs
- Height: 48px
- Background: #111111
- Border bottom: 1px solid #1f1f1f

### Left Side — Brand
- Brand mark: 28×28px, border-radius 6px, background #ff8c00
- Brand mark text: "DT", font-size 12px, font-weight 700, color #0a0a0a
- Brand name: "Digentic Tech", font-size 13px, font-weight 600, color #f1f5f9
- Brand subtitle: "My dashboard", font-size 10px, color #94a3b8

### Right Side — Actions (left to right)
1. Search icon button (ti-search / Lucide Search)
2. Bell icon button (ti-bell / Lucide Bell) — red dot badge (#ff5733) top-right
3. Settings icon button (ti-settings / Lucide Settings)
4. Profile avatar circle — initials "DK", 28×28px, border-radius 50%, bg rgba(255,140,0,0.20), border 1.5px solid #ff8c00, text color #ff8c00, font-size 11px, font-weight 600

### Icon Button Style
- Size: 32×32px, border-radius 8px
- Default: background transparent, color #94a3b8, no border
- Hover: background #1a1a1a, color #ff8c00

---

## 2. Sidebar

### Specs
- Width: 172px
- Background: #111111
- Border right: 1px solid #1f1f1f
- Padding: 10px 8px

### Section Label Style
- Font-size: 10px
- Color: #94a3b8
- Padding: 8px 10px 3px
- Letter-spacing: 0.06em
- Text-transform: uppercase

### Nav Item Style — Default
- Display: flex, align-items center, gap 9px
- Padding: 7px 10px
- Border-radius: 8px
- Background: transparent
- Icon color: #94a3b8, font-size 16px
- Label color: #94a3b8, font-size 12px
- Hover: background #1a1a1a

### Nav Item Style — Active
- Background: rgba(255,140,0,0.10)
- Border-left: 3px solid #ff8c00
- Border-radius: 0 8px 8px 0
- Padding-left: 7px (compensate for border)
- Icon color: #ff8c00
- Label color: #ff8c00

### Divider
- Height: 1px, background #1f1f1f, margin 6px 10px

### Badge — Solid Orange (count)
- Background: #ff8c00, color #0a0a0a
- Font-size: 10px, font-weight 600
- Padding: 1px 6px, border-radius 6px

---

## 3. Sidebar Pages

```
SECTION: LEARN
  ├── My courses        (ti-book)            [default active]
  └── Purchases         (ti-shopping-bag)    [solid orange badge: 1]

SECTION: LIBRARY
  └── Saved posts       (ti-bookmark)        [solid orange badge: 18]

─── divider ───

  ├── Profile           (ti-user-circle)
  └── Settings          (ti-adjustments)
```

---

## 4. My Courses Page (Default Active)

### Page Header
- Padding: 12px 16px
- Border-bottom: 1px solid #1f1f1f
- Background: #0a0a0a
- Left: Page title "My courses" (13px, 600, #f1f5f9) + subtitle date (11px, #94a3b8)
- Right: Role chip "User" — bg rgba(255,140,0,0.10), border 1px solid #ff8c00, color #ff8c00, font-size 10px, padding 3px 10px, border-radius 20px

### Stat Cards Grid
- Grid: 4 columns, gap 8px, padding 12px 16px
- Each card: bg #111111, border 1px solid #1f1f1f, border-radius 10px, padding 11px 13px
- Card hover: border-color #ff8c00
- Value: font-size 20px, font-weight 600, color #ff8c00
- Label: font-size 10px, color #94a3b8, margin-top 3px

Cards:
  1. Enrolled     → value: 4
  2. Avg progress → value: 62%
  3. Saved posts  → value: 18
  4. Purchased    → value: 1

### Course Cards (Continue Learning)
- Section label: "Continue learning", font-size 11px, color #94a3b8
- Card: bg #111111, border 1px solid #1f1f1f, border-radius 10px, padding 10px 13px, margin-bottom 6px
- Card hover: border-color #ff8c00
- Top row: course title (flex 1, font-size 12px, font-weight 500, color #f1f5f9) + percentage (font-size 11px, font-weight 600, color #ff8c00)
- Progress bar bg: height 4px, bg #1f1f1f, border-radius 2px
- Progress bar fill: height 4px, bg linear-gradient(90deg, #ff8c00, #ff6b35), border-radius 2px, width = percentage
- Next lesson text: font-size 10px, color #94a3b8, margin-top 5px

Courses:
  1. "MERN stack bootcamp" — 72% — "Next: MongoDB aggregation pipelines"
  2. "AI APIs with Next.js 15" — 45% — "Next: Streaming responses with Vercel AI SDK"
  3. "TypeScript mastery" — 18% — "Next: Generics and utility types"

### Saved Posts Preview
- Section label: "Saved posts", font-size 11px, color #94a3b8
- Each row: flex, gap 9px, padding 6px 0, border-bottom 1px solid #1f1f1f
- Tag pill: bg #1f1f1f, color #ff8c00, border 1px solid #ff8c00, font-size 10px, padding 1px 7px, border-radius 6px
- Post title: font-size 11.5px, color #f1f5f9, flex 1
- Date: font-size 10px, color #94a3b8

Saved posts:
  1. [AI] "Claude API prompt engineering guide" — 3d ago
  2. [MERN] "Building auth with JWT and Node.js" — 5d ago
  3. [Next.js] "App Router vs Pages Router in 2026" — 1w ago

---

## 5. Purchases Page

### Page Header
- Title: "Purchases", subtitle: "1 paid item"

### Purchase Card
- Card: bg #111111, border 1px solid #1f1f1f, border-radius 10px, padding 12px 14px
- Hover: border-color #ff8c00
- Left icon: shopping bag, color #ff8c00
- Course/asset title: #f1f5f9, font-size 13px, font-weight 500
- Purchase date: #94a3b8
- Amount: #ff8c00, font-weight 600
- "Download invoice" link: color #ff8c00, underline on hover
- "Go to course" button: bg transparent, border 1px solid #ff8c00, color #ff8c00, hover bg rgba(255,140,0,0.10), border-radius 6px

---

## 6. Saved Posts Page

### Page Header
- Title: "Saved posts", subtitle: "18 articles saved"

### Filter Bar
- "All" "AI" "MERN" "Next.js" "TypeScript" "Node.js" filter chips
- Default chip: bg #1f1f1f, color #94a3b8, border #1f1f1f, font-size 10px, padding 3px 10px, border-radius 20px
- Active chip: bg rgba(255,140,0,0.10), color #ff8c00, border 1px solid #ff8c00

### Post Card
- Card: bg #111111, border 1px solid #1f1f1f, border-radius 10px, padding 11px 14px
- Hover: border-color #ff8c00
- Tag pill: bg #1f1f1f, color #ff8c00, border 1px solid #ff8c00
- Post title: #f1f5f9, font-size 13px, font-weight 500
- Excerpt: #94a3b8, font-size 11px, margin-top 4px
- Bottom row: date (#94a3b8) + "Read" button (color #ff8c00) + bookmark icon (filled orange = saved)

---

## 7. Profile Page

### Page Header
- Title: "Profile"

### Profile Card (centered, max-width 480px)
- Card: bg #111111, border 1px solid #1f1f1f, border-radius 12px, padding 24px
- Avatar: 64×64px, border-radius 50%, bg rgba(255,140,0,0.20), border 2px solid #ff8c00, initials font-size 22px, color #ff8c00
- Name: font-size 16px, font-weight 600, color #f1f5f9, margin-top 12px
- Email: font-size 12px, color #94a3b8
- Bio textarea: bg #0a0a0a, border #1f1f1f, focus border #ff8c00, color #f1f5f9, placeholder #94a3b8
- Social links input row: icon (color #ff8c00) + input same style
- "Save changes" button: bg #ff8c00, color #0a0a0a, font-weight 600, hover bg #ff6b35, border-radius 8px

---

## 8. Settings Page

### Page Header
- Title: "Settings"

### Settings Tabs
- "Account" "Notifications" "Password" "Appearance"
- Tab default: color #94a3b8, border-bottom 2px solid transparent
- Tab active: color #ff8c00, border-bottom 2px solid #ff8c00

### Account Tab
- Field label: font-size 11px, color #94a3b8
- Input: bg #111111, border 1px solid #1f1f1f, focus border #ff8c00, focus ring rgba(255,140,0,0.10), color #f1f5f9, border-radius 8px
- "Save" button: bg #ff8c00, color #0a0a0a, font-weight 600, hover bg #ff6b35

### Notifications Tab
- Toggle row: label (#f1f5f9) + toggle switch (on: #ff8c00, off: #1f1f1f)
- Description: #94a3b8, font-size 11px

### Password Tab
- Current password + new password + confirm inputs (same input style)
- "Update password" button: same primary button style

### Appearance Tab
- Theme select (Dark / Light / System): card-style radio buttons
  - Selected card: border #ff8c00, bg rgba(255,140,0,0.10)
  - Unselected: border #1f1f1f, bg #111111
  - Label: #f1f5f9

---

## Tailwind Config Extension (tailwind.config.ts)

```typescript
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dt: {
          bg:       '#0a0a0a',
          surface:  '#111111',
          border:   '#1f1f1f',
          hover:    '#1a1a1a',
          text:     '#f1f5f9',
          muted:    '#94a3b8',
          orange:   '#ff8c00',
          orange2:  '#ff6b35',
          orange3:  '#ff5733',
        },
      },
    },
  },
}
```

---

## File Structure

```
app/
  dashboard/
    layout.tsx              ← UserLayout (topbar + sidebar)
    page.tsx                ← redirect to /dashboard/courses
    courses/page.tsx        ← My courses (default)
    purchases/page.tsx      ← Purchases
    saved/page.tsx          ← Saved posts
    profile/page.tsx        ← Profile
    settings/page.tsx       ← Settings (tabbed)
components/
  user/
    UserTopbar.tsx
    UserSidebar.tsx
    StatCard.tsx
    CourseCard.tsx
    SavedPostRow.tsx
    ProgressBar.tsx
```

---

## Shared Component — Progress Bar

```tsx
// components/ui/ProgressBar.tsx
interface ProgressBarProps {
  value: number  // 0-100
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div style={{ height: 4, background: '#1f1f1f', borderRadius: 2 }}>
      <div style={{
        height: 4,
        width: `${value}%`,
        background: 'linear-gradient(90deg, #ff8c00, #ff6b35)',
        borderRadius: 2,
        transition: 'width 0.3s ease'
      }} />
    </div>
  )
}
```

---

## Shared Component — Stat Card

```tsx
// components/ui/StatCard.tsx
interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div style={{
      background: '#111111',
      border: '1px solid #1f1f1f',
      borderRadius: 10,
      padding: '11px 13px',
      cursor: 'default',
      transition: 'border-color 0.2s'
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = '#ff8c00')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1f1f1f')}
    >
      <div style={{ fontSize: 20, fontWeight: 600, color: '#ff8c00' }}>{value}</div>
      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>{label}</div>
    </div>
  )
}
```

---

*Digentic Tech — User Dashboard Prompt*
*Color Palette by Dinesh T — "The DNA of AI Technology"*
