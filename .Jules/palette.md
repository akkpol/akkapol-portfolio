## 2025-05-14 - [Accessibility & Interaction Enhancement]
**Learning:** Icon-only buttons without labels and containers for dynamic content without ARIA live regions hinder accessibility for screen reader users and provide poor feedback for all users.
**Action:** Always include `aria-label` on icon-only buttons, use `role="log"` and `aria-live="polite"` for message containers, and provide clear visual feedback (like spinners) during asynchronous operations.
