# Phase 2: Visual/UX Review - Testing Plan
**Status:** Starting Now
**Objective:** Verify visual consistency, readability, responsive design, and user experience across all app tabs
**Scope:** Days 1-10, all three streams (strengthen, repair, family), all five translations

---

## Testing Environment Setup

### Prerequisites
```bash
cd app
npm start
# Select platform:
# i = iOS simulator
# a = Android emulator
# w = Web (browser)
```

### Test Device Recommendations
- **Primary:** iOS simulator or physical iPhone (SE size ~5.8" - typical mobile)
- **Secondary:** Android emulator (Pixel 4a ~5.8")
- **Bonus:** Web browser (responsive design mode at 375px width)

### Test Data Setup
1. Fresh app install or clear AsyncStorage
2. Complete onboarding:
   - Select one stream (rotate through all 3)
   - Select one translation (rotate through all 5)
3. Verify Day 1 loads correctly
4. (Optional) Simulate future days using device date adjustment

---

## Testing Checklist

### Tab 1: Dashboard (Daily Content)

**Content Display**
- [ ] Scripture text is fully visible (no cutoff)
- [ ] Bible reference is clear and readable
- [ ] Fruit theme emoji displays correctly (all 9 fruits)
- [ ] Daily tone label displays (Gentle/Encouraging/Challenging)
- [ ] Activity descriptions are readable in all tiers

**Sacred Selection Bar** (Bottom sticky bar)
- [ ] Five time buttons visible (5m, 15m, 30m, 60m, 2h)
- [ ] Active button has clear visual distinction (color/highlight)
- [ ] Buttons are easily tappable (sufficient size)
- [ ] Bar stays visible when scrolling content up
- [ ] No overlap with content above

**Mark Complete Button**
- [ ] Visible and prominent (sage background, gold text)
- [ ] Text is readable
- [ ] Clear state transitions:
  - [ ] Before completion: "Mark Complete"
  - [ ] After completion: "✓ Completed Today" (grayed out)
  - [ ] Disabled state is visually distinct

**Typography & Readability**
- [ ] Title font size is appropriate (not too large/small)
- [ ] Scripture text is readable (font size 14-16px optimal)
- [ ] Line spacing adequate (not cramped)
- [ ] Color contrast meets WCAG AA standards
  - [ ] Sage text on white background
  - [ ] Charcoal text on light backgrounds
  - [ ] Gold accents visible on sage/charcoal

**Colors & Design System**
- [ ] Sage (#7D8C69) used consistently for primary elements
- [ ] Gold (#D4AF37) used for accents/CTAs
- [ ] Charcoal (#2C2C2C) for text
- [ ] Sand (#F5F2E8) for backgrounds/cards
- [ ] No jarring color inconsistencies

**Responsive Design**
- [ ] Content fits 375px width (smallest phones)
- [ ] No horizontal scrolling required
- [ ] Padding looks intentional (not too tight/loose)
- [ ] Spacing between elements is consistent
- [ ] Safe area respected (notches, home indicators)

**Stream Variations** (Test each: strengthen, repair, family)
- [ ] Content appropriate to stream
- [ ] Tone matches stream (repair = Gentle, others = Encouraging)
- [ ] Activities suit stream's focus
- [ ] No stream-specific rendering bugs

**Translation Variations** (Test 2-3 translations: NIV, ESV, one other)
- [ ] All 5 translations display correctly
- [ ] No text cutoff with longer translations (KJV, ESV)
- [ ] Translation label is clear (if shown)
- [ ] Scripture text renders properly with special characters

---

### Tab 2: Progress (Streak & Fruit Map)

**Streak Counter**
- [ ] Streak number displays correctly
- [ ] Shows "Day X" or just number (clarify design)
- [ ] Number is large and prominent
- [ ] Updates after completing activity on dashboard

**Fruit Progress Overview**
- [ ] "X/9 fruits completed" displays clearly
- [ ] Progress bar shows percentage correctly
- [ ] Progress bar visually fills left-to-right
- [ ] Percentage text is readable

**Fruit Map Grid**
- [ ] All 9 fruits visible in grid layout
- [ ] Fruit emojis display correctly:
  - [ ] ❤️ Love
  - [ ] 😊 Joy
  - [ ] ☮️ Peace
  - [ ] ⏳ Patience
  - [ ] 🤝 Kindness
  - [ ] ✨ Goodness
  - [ ] 🙏 Faithfulness
  - [ ] 🕊️ Gentleness
  - [ ] 🧘 Self-Control
- [ ] Fruit labels are readable
- [ ] No "undefined" emoji bugs
- [ ] Completed fruits show checkmark (✓)
- [ ] Completed fruits glow/highlight
- [ ] Uncompleted fruits are grayed out
- [ ] Grid spacing is consistent

**Progress Colors**
- [ ] Completed fruits show their theme color
  - [ ] Love: red/pink
  - [ ] Joy: yellow
  - [ ] Peace: blue
  - [ ] Patience: purple
  - [ ] Kindness: pink
  - [ ] Goodness: green
  - [ ] Faithfulness: orange
  - [ ] Gentleness: cyan
  - [ ] Self-Control: indigo
- [ ] Uncompleted fruits are muted (charcoal/10)
- [ ] Color contrast is clear

**Journey Overview Section**
- [ ] Descriptive text displays (changes based on progress)
- [ ] Text matches progress state:
  - [ ] 0 fruits: encouraging setup message
  - [ ] 1-4 fruits: motivational message
  - [ ] 5-8 fruits: celebration message
  - [ ] 9 fruits: completion message
- [ ] Text is readable and inspiring

**Completion Timeline**
- [ ] Shows all 9 fruits with progress bars
- [ ] Fruit names are readable
- [ ] Progress bar shows 100% for completed fruit
- [ ] Progress bar shows 0% for incomplete fruit
- [ ] Day count visible (number of days completed)
- [ ] Layout is clean and organized

**Responsive Design**
- [ ] All elements visible on 375px width
- [ ] Grid layout adapts (likely 3-column)
- [ ] No horizontal scrolling
- [ ] Text doesn't overlap
- [ ] Spacing is consistent

---

### Tab 3: Journal (Secure Journaling)

**Initial State - Locked**
- [ ] Biometric gate screen displays
- [ ] "Unlock with Biometrics" button visible and tappable
- [ ] Lock icon displays
- [ ] Message is clear and reassuring
- [ ] Safe Harbor vector art visible (if implemented)

**Biometric Unlock Flow**
- [ ] Tap "Unlock with Biometrics" works
- [ ] Biometric prompt appears (Face ID/Touch ID)
- [ ] After successful auth, journal entry screen loads
- [ ] Smooth transition (no jarring flashes)

**Journal Entry Screen**
- [ ] Text input field visible and focused
- [ ] Placeholder text provides context ("Write your reflection...")
- [ ] Keyboard appears without covering input
- [ ] Text is readable as you type
- [ ] Word wrapping works correctly

**Journal Entry Persistence**
- [ ] Typed content stays after tapping away
- [ ] Content displays correctly when returning to journal
- [ ] No encryption artifacts visible (no garbled text)
- [ ] Multi-line entries format correctly

**Lock/Unlock Controls**
- [ ] Lock button visible when unlocked
- [ ] Tapping lock button re-locks journal
- [ ] Locked state is immediately clear
- [ ] Smooth state transition

**Typography & Readability**
- [ ] Input text is readable (font size 14-16px)
- [ ] Placeholder text is visible but muted
- [ ] Cursor is visible
- [ ] No text cutoff at edges

**Colors & Design**
- [ ] Biometric gate background uses sage/calm colors
- [ ] Input field background is light sand
- [ ] Text is charcoal on light backgrounds
- [ ] Lock button is clear and prominent

**Responsive Design**
- [ ] Input field uses full width (with padding)
- [ ] No horizontal scrolling
- [ ] Keyboard doesn't cover essential UI
- [ ] Safe area respected
- [ ] Works in portrait and landscape

---

### Tab 4: Settings

**Layout & Navigation**
- [ ] All sections visible without excessive scrolling
- [ ] Section headers are clear (Partner Connection, Preferences)
- [ ] Back button works
- [ ] Navigation flow is intuitive

**Stream Selection**
- [ ] Three options visible (Strengthen, Repair, Family)
- [ ] Current selection is visually distinguished
- [ ] Tapping different stream updates immediately
- [ ] No visual glitches on selection change

**Translation Selection**
- [ ] All five options visible (NIV, ESV, KJV, NLT, NKJV)
- [ ] Current selection is marked
- [ ] Tapping different translation updates dashboard
- [ ] Changes persist after app restart

**Partner Connection Section**
- [ ] "Relational Handshake" button visible
- [ ] Button design matches other CTAs (sage, gold)
- [ ] Tapping navigates to partner screen (or shows form)
- [ ] Back navigation works

**Typography & Colors**
- [ ] Section headers are prominent
- [ ] Setting labels are readable
- [ ] Values/selections are clear
- [ ] Color scheme matches design system

**Responsive Design**
- [ ] All options fit 375px width
- [ ] No horizontal scrolling
- [ ] Padding is consistent
- [ ] Touch targets are adequate (44px minimum)

---

## Cross-Tab Consistency

**Visual Elements**
- [ ] Button styling consistent across all tabs
- [ ] Typography consistent (fonts, sizes, weights)
- [ ] Color palette consistent
- [ ] Spacing/padding consistent
- [ ] Icon styling consistent

**Navigation**
- [ ] Tab bar clearly shows active tab
- [ ] All four tabs accessible from any screen
- [ ] No navigation dead-ends
- [ ] Back buttons work consistently

**Theme Application**
- [ ] Sage, gold, charcoal, sand used consistently
- [ ] No random colors outside palette
- [ ] Accessibility contrast maintained
- [ ] Dark elements readable on light backgrounds

---

## Day-to-Day Progression

**Test across multiple days** (simulate with device date if needed):
- [ ] Day 1 content displays correctly
- [ ] Day 2 content displays correctly
- [ ] Different fruit themes show for different days
- [ ] Activities change appropriately
- [ ] Bible references are unique per day
- [ ] Tone variations are visible
- [ ] No content duplication or gaps

**Test each stream** for Days 1-3:
- [ ] Strengthen: Activities focus on strengthening
- [ ] Repair: Activities focus on healing/restoration
- [ ] Family: Activities focus on unity/togetherness

---

## Issues Found

### Template for Each Issue

**Issue #[number]: [Title]**
- **Tab:** Dashboard / Progress / Journal / Settings
- **Severity:** 🔴 Critical / 🟡 High / 🟢 Medium / 🔵 Low
- **Description:** [What's wrong]
- **Expected:** [What should happen]
- **Actual:** [What actually happens]
- **Reproduction:** [Steps to reproduce]
- **Screenshot/Notes:** [Any visual details]
- **Assigned To:** [Dev/Designer notes]

---

## Testing Notes

### Optional Advanced Scenarios
- [ ] Test on landscape mode (if supported)
- [ ] Test with accessibility features on (larger text, high contrast)
- [ ] Test rapid tab switching
- [ ] Test completing activity, returning to journal, back to dashboard
- [ ] Test with phone in low-light mode
- [ ] Test with system dark mode on (if app has dark mode)

### Performance Observations
- [ ] Dashboard loads in < 2 seconds
- [ ] Progress tab loads instantly
- [ ] Fruit map renders smoothly (no stutter)
- [ ] No lag when typing in journal
- [ ] Tab switching is smooth

---

## Sign-Off

**Phase 2 Tester:** [Your Name]
**Date Started:** 2026-03-30
**Date Completed:** ___________
**Total Time Spent:** ___________
**Issues Found:** ___ (Critical), ___ (High), ___ (Medium), ___ (Low)
**Overall Assessment:** 🟢 Ready / 🟡 Minor Issues / 🔴 Blocking Issues

**Recommendation for Next Phase:**
- [ ] Proceed to Phase 3 (Integration Testing)
- [ ] Fix issues first, then retest
- [ ] Additional testing needed

---

## Quick Reference: What to Look For

### ✅ Good UX Signs
- Text is always readable
- Buttons are easy to tap
- State changes are clear
- No unexpected behavior
- Color scheme is cohesive
- Layout adapts to screen size
- Transitions are smooth
- No overlapping elements

### ❌ Red Flags
- Text is cut off or overflowing
- Colors don't match design system
- Button states are unclear
- Layout breaks on smaller screens
- Transitions are jarring
- Elements overlap
- Inconsistent spacing
- Confusing navigation

---

**Start Testing Now:** Open the app and begin with Tab 1 (Dashboard). Work through each tab, testing the checklists above. Document any issues found in the "Issues Found" section and take screenshots when needed.
