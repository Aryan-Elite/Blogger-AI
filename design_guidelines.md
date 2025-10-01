# Blogger AI Dashboard - Design Guidelines

## Design Approach
**Design System:** Clean dashboard aesthetic inspired by Linear, Notion, and modern SaaS applications. Utility-focused with emphasis on clarity, functionality, and professional polish.

## Core Design Principles
- **Simplicity First:** Clean, uncluttered interfaces with clear information hierarchy
- **Functional Excellence:** Every element serves a purpose; no decorative complexity
- **Solid Foundation:** Consistent solid colors throughout; no gradients or shaded backgrounds
- **Responsive Feedback:** Smooth animations and clear user feedback on all interactions

## Color Palette

### Light Mode
- **Background Primary:** 0 0% 100% (white)
- **Background Secondary:** 0 0% 98% (subtle off-white for cards/sidebar)
- **Background Tertiary:** 0 0% 96% (hover states, disabled inputs)
- **Primary Brand:** 221 83% 53% (professional blue for CTAs, active states)
- **Primary Hover:** 221 83% 45% (darker blue for hover)
- **Text Primary:** 222 47% 11% (near-black for headings)
- **Text Secondary:** 215 16% 47% (muted gray for descriptions)
- **Border:** 214 32% 91% (light gray borders)
- **Success:** 142 71% 45% (green for published status)
- **Warning:** 38 92% 50% (orange for scheduled status)
- **Muted:** 210 40% 96% (draft/inactive backgrounds)

### Dark Mode
- **Background Primary:** 222 47% 11% (dark charcoal)
- **Background Secondary:** 217 33% 17% (lighter charcoal for cards/sidebar)
- **Background Tertiary:** 215 28% 22% (hover states)
- **Primary Brand:** 217 91% 60% (bright blue)
- **Text Primary:** 210 40% 98% (near-white)
- **Text Secondary:** 215 20% 65% (muted light gray)
- **Border:** 217 33% 21% (subtle borders)

**Logout Button:** Text color should be 0 84% 60% (bright red) for clear visual distinction

## Typography
- **Font Family:** Inter for all text (Google Fonts)
- **Headings:** 
  - H1: text-3xl font-bold (30px)
  - H2: text-2xl font-semibold (24px)
  - H3: text-xl font-semibold (20px)
- **Body:** text-base (16px) for primary content, text-sm (14px) for secondary
- **Labels:** text-sm font-medium (14px, medium weight)

## Layout System
- **Spacing Units:** Use Tailwind spacing: 4, 6, 8, 12, 16, 24 (p-4, gap-6, mt-8, etc.)
- **Container Max-Width:** max-w-7xl for main content areas
- **Sidebar Width:** w-64 (256px) on desktop, collapsible on mobile
- **Content Padding:** p-6 for cards, p-8 for main content areas
- **Grid Gaps:** gap-6 for card grids, gap-4 for form elements

## Component Library

### Navigation
- **Sidebar:** Fixed left sidebar with logo at top, navigation items with icons, logout at bottom
- **Nav Items:** Rounded-md px-3 py-2, hover background transition, active state with primary background
- **Icons:** Use Lucide React icons throughout (Home, Calendar, FileText, FilePlus, LogOut)

### Cards & Containers
- **Blog Cards:** Solid background, rounded-lg, border, p-6, hover:shadow-md transition
- **Status Badges:** Rounded-full px-3 py-1 text-xs font-medium with color-coded backgrounds
- **Dashboard Stats:** Large numbers (text-3xl) with labels, grid layout on Overview

### Forms & Inputs
- **Input Fields:** Solid background, rounded-md border, px-3 py-2, focus:ring-2 focus:ring-primary
- **Buttons Primary:** bg-primary text-white rounded-md px-4 py-2, hover:bg-primary-hover transition
- **Buttons Secondary:** border border-gray-300 rounded-md px-4 py-2, hover:bg-gray-50 transition
- **Google Sign-In:** White button with Google logo, border, hover:shadow-md

### Loading States
- **Progress Loader:** Multi-step progress display with:
  - Checkmarks (✅) for completed steps
  - Hourglass (⏳) for current step  
  - Pause icon (⏸️) for pending steps
  - Progress bars showing 0-100% completion
  - Animated pulse on current step
  - Estimated time display at bottom

### Data Display
- **Tables:** Solid header background, alternating row backgrounds (subtle), hover:bg-tertiary
- **Filters:** Button group with solid backgrounds, active state highlighted with primary color
- **Empty States:** Centered icon, heading, description, and CTA button

## Animations & Interactions
- **Transitions:** Use transition-all duration-200 for hover states
- **Button Feedback:** Scale on click (active:scale-95), loading spinners for async actions
- **Page Transitions:** Fade in content on route change (opacity-0 to opacity-100)
- **Toast Notifications:** Slide in from top-right for success/error feedback
- **Skeleton Loaders:** Animate pulse on data fetch states

## Dashboard Layout Structure
- **Login Page:** Centered card (max-w-md) with form, divider, Google button
- **Dashboard Layout:** Sidebar + main content area (flex layout)
- **Overview:** 4-column stat grid, recent blogs list, quick actions
- **Schedule:** Calendar interface + time picker, blog selection list
- **View All:** Filter tabs at top, blog cards grid below (3 columns on desktop)
- **Drafts:** List view with edit/delete actions, creation date sorting

## Accessibility & Quality
- **Focus States:** Visible focus rings on all interactive elements
- **Button States:** Disabled state with reduced opacity and cursor-not-allowed
- **Color Contrast:** Maintain WCAG AA standards for all text
- **Keyboard Navigation:** Tab order follows logical flow, Enter to submit forms
- **Loading Indicators:** Always show feedback during async operations

## Images
**Dashboard:** No hero images needed - this is a utility dashboard. Use:
- Icon illustrations for empty states (file icons, calendar icons)
- Generated blog thumbnails in blog cards (placeholder images from Unsplash API)
- User avatar in sidebar/header (circular, 40px)