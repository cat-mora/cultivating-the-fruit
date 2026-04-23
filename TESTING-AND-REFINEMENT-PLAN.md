# Testing & Refinement Plan - All 5 Epics

**Goal:** Identify and fix bugs, refine UX, ensure quality before Epic 6

**Status:** Starting comprehensive review

---

## Phase 1: Code Review & Issue Detection

### Epic 1: Foundation & Onboarding ✅

**Files to Review:**
- `app/onboarding.tsx`
- `store/user-store.ts`
- `app/_layout.tsx`

**Potential Issues:**
- [ ] Check if user redirected to onboarding before first stream selection
- [ ] Verify stream persists across app restarts
- [ ] Verify translation persists across app restarts
- [ ] Check onboarding flow completeness
- [ ] Verify hasOnboarded flag works correctly

**Test Cases:**
1. First launch → Onboarding screen shown
2. Select stream → Verified in store
3. Select translation → Verified in store
4. Complete onboarding → Navigate to dashboard
5. Close app → Reopen → Should be on dashboard (not onboarding)
6. Go to Settings → Change stream/translation → Persists

---

### Epic 2: Daily Journey Engine ✅

**Files to Review:**
- `app/(tabs)/index.tsx`
- `features/content/hooks/use-daily-content.ts`
- `features/content/data/journey-content.ts`

**Potential Issues:**
- [ ] Check if content loads properly
- [ ] Verify daily content changes based on day
- [ ] Verify stream selection affects content
- [ ] Verify Sacred Selection Bar works smoothly
- [ ] Check if activity descriptions are readable
- [ ] Verify time tier selection persists during session

**Test Cases:**
1. Load dashboard → Content displays
2. Scripture text readable → Not cut off
3. Select different time tiers → Activity changes
4. Switch streams in settings → Content reflects new stream
5. Restart app → Same day shows same content
6. Check day number progression → Correct numbering

**Known Issues to Check:**
- Sacred Selection Bar sticks to bottom correctly
- Activity area doesn't overlap with selection bar
- Long descriptions fit within container

---

### Epic 3: Secure Journaling ✅

**Files to Review:**
- `app/(tabs)/journal.tsx`
- `features/security/hooks/use-biometrics.ts`
- `features/security/utils/encryption.ts`
- `store/journal-store.ts`

**Potential Issues:**
- [ ] Biometric gate triggers on journal access
- [ ] Fallback to PIN if biometric unavailable
- [ ] Journal entries encrypt properly
- [ ] Decryption works when accessing entries
- [ ] Search functionality works
- [ ] Auto-save after 5 seconds works
- [ ] Rich text formatting preserved

**Test Cases:**
1. Access journal → Biometric gate appears
2. Approve biometric → Journal loads
3. Type entry → Auto-save indicator
4. Wait 5 seconds → Entry saved
5. Close and reopen → Entry persists
6. Search by date → Finds entries
7. Search by fruit theme → Finds entries
8. Edit entry → Updates properly
9. Delete entry → Confirmation appears

**Known Issues to Check:**
- PIN backup works if biometric fails
- Encryption doesn't slow down app
- Search is case-insensitive
- Date picker accessible and functional

---

### Epic 4: Partner Linking 🆕

**Files to Review:**
- `store/partner-store.ts`
- `features/partner/hooks/use-partner-linking.ts`
- `features/partner/components/invite-code-display.tsx`
- `features/partner/components/join-partner-form.tsx`
- `app/(tabs)/settings.tsx`

**Potential Issues:**
- [ ] Environment variables properly set (once Supabase configured)
- [ ] Generate code button works
- [ ] Code is 6 characters, alphanumeric
- [ ] Share sheet opens correctly
- [ ] Join partner form validates input
- [ ] Error messages are clear
- [ ] Settings shows partner count correctly
- [ ] Navigation to partner-linking works

**Test Cases (Pre-Supabase):**
1. Navigate to Settings
2. See "Partner Connection" section
3. Tap "Relational Handshake" → Routes to partner-linking screen
4. See two tabs: "Generate Code" and "Join Partner"
5. (Post-Supabase) Generate code → 6 char code appears
6. (Post-Supabase) Share code → Native sheet appears
7. (Post-Supabase) Enter code → Join flow works
8. Settings updates → Shows linked partners

**Known Issues to Check:**
- Button disabled states work correctly
- Error states display properly
- Loading states show during async operations
- Back navigation works from partner-linking screen

---

### Epic 5: Milestones & Progress 🆕

**Files to Review:**
- `store/progress-store.ts`
- `features/progress/hooks/use-streak.ts`
- `features/progress/components/streak-counter.tsx`
- `features/progress/components/fruit-map.tsx`
- `features/progress/components/progress-screen.tsx`
- `app/(tabs)/progress.tsx`
- `app/(tabs)/_layout.tsx` (tabs navigation)
- `app/(tabs)/index.tsx` (completion integration)

**Potential Issues - CRITICAL REVIEW NEEDED:**
- [ ] Streak logic correctly handles consecutive days
- [ ] Streak resets properly when day is skipped
- [ ] Fruit map updates when activity completed
- [ ] Emoji states transition smoothly
- [ ] Progress percentage calculates correctly
- [ ] Data persists across app restarts
- [ ] Progress tab appears in navigation
- [ ] Streak badge appears on dashboard
- [ ] "Mark Complete" button state changes properly
- [ ] Completion alert shows correct streak number

**Test Cases:**
1. Complete activity Day 1 → Streak = 1
2. Complete activity Day 2 → Streak = 2
3. Skip day, complete Day 4 → Streak = 1 (reset)
4. Complete multiple days → Longest streak tracked
5. Reopen app → Streak persists
6. View Progress tab → See streak display
7. View fruit map → Completed fruits show checkmarks
8. Check progress % → Math is correct
9. Motivation text → Changes based on streak length
10. Button disabled → After completion, can't click again today

**KNOWN ISSUES TO FIX:**
1. **Fruit theme name issue** - Need to handle `self-control` vs `self_control`
2. **Date comparison logic** - Needs verification for day-skipped scenarios
3. **Emoji transitions** - Might need to add animation (not just state change)
4. **Button state** - Make sure disabled state is clear to users
5. **Progress calculations** - Verify fruit completion threshold (10 days?)

---

## Phase 2: Visual/UX Review

### Dashboard (Epic 2)
- [ ] Scripture text is readable and well-formatted
- [ ] Time tier buttons are accessible
- [ ] "Mark Complete" button is prominent
- [ ] Spacing and padding consistent
- [ ] No text cutoff on different screen sizes
- [ ] Sacred Selection Bar doesn't overlap content

### Progress Tab (Epic 5)
- [ ] Streak card is visually prominent
- [ ] Fruit grid is responsive on different sizes
- [ ] Emojis render properly
- [ ] Progress bar shows correctly
- [ ] Text is readable and well-spaced
- [ ] Tips section is helpful

### Settings (Epics 1 & 4)
- [ ] Partner Connection section is clear
- [ ] All options are clickable
- [ ] Layout is organized logically
- [ ] Section headers are clear

### Journal (Epic 3)
- [ ] Entry form is accessible
- [ ] Biometric gate is user-friendly
- [ ] Search is intuitive
- [ ] Entries are organized well

---

## Phase 3: Integration Testing

### Cross-Epic Flows

**Flow 1: Complete Daily Ritual**
```
1. Dashboard (Epic 2) → View daily content
2. Mark Complete button (Epic 5) → Record completion
3. Streak updated (Epic 5) → Store updated
4. Journal tab (Epic 3) → Can write reflection
5. Settings (Epic 1) → Can see partner if linked (Epic 4)
6. Progress tab (Epic 5) → See updated streak/fruit
```

**Flow 2: Multi-User Experience (Epics 2 & 4)**
```
1. User A and User B link via Partner codes (Epic 4)
2. User A completes activity (Epic 2)
3. Streak increments (Epic 5)
4. User B can see User A's activity (if integrated - NOT YET)
5. Both see partner in Settings
```

**Flow 3: Settings Management (Epics 1 & 4)**
```
1. Change stream → Content updates (Epic 2) ✅
2. Change translation → Content updates (Epic 2) ✅
3. Access journal → Biometric gate (Epic 3) ✅
4. View partners → Show linked count (Epic 4) ✅
5. Link partner → Navigate to Epic 4 screen ✅
```

---

## Phase 4: Bug Hunting

### Critical Bugs to Find

**Category: State Management**
- [ ] User store persists correctly (Epic 1)
- [ ] Partner store persists correctly (Epic 4)
- [ ] Progress store persists correctly (Epic 5)
- [ ] Journal store persists correctly (Epic 3)
- [ ] No state conflicts between stores

**Category: Navigation**
- [ ] All tab navigation works
- [ ] Back buttons work correctly
- [ ] Deep linking works (if applicable)
- [ ] Route guards prevent unauthorized access

**Category: Data Integrity**
- [ ] No duplicate entries
- [ ] No data loss on app restart
- [ ] Dates are consistent (YYYY-MM-DD format)
- [ ] All calculations are correct

**Category: Performance**
- [ ] No lag when scrolling
- [ ] Tabs switch quickly
- [ ] Progress calculations are instant
- [ ] No memory leaks

**Category: Edge Cases**
- [ ] User completes at 11:59 PM → Day boundary handling
- [ ] User skips multiple days → Streak reset works
- [ ] User uninstalls and reinstalls → Fresh start vs persisted data
- [ ] Network unavailable → App works offline
- [ ] Device low memory → App doesn't crash

---

## Phase 5: Refinements Needed

### High Priority (Must Fix Before Production)

1. **Fruit theme naming consistency**
   - Status: ⚠️ NEEDS FIX
   - Issue: `self-control` vs `self_control` in different places
   - Location: `fruit-map.tsx`, `progress-store.ts`
   - Fix: Use consistent snake_case throughout

2. **Streak reset logic**
   - Status: ⚠️ NEEDS VERIFICATION
   - Issue: Need to verify correct day count calculations
   - Location: `progress-store.ts` → `incrementStreak()`
   - Fix: Test with actual dates, not just logic

3. **Mark Complete button state**
   - Status: ⚠️ NEEDS UX IMPROVEMENT
   - Issue: Should be clearer when already completed
   - Location: `app/(tabs)/index.tsx`
   - Suggested Fix: Better visual feedback, maybe progress animation

4. **Error handling for partner linking**
   - Status: ⚠️ NEEDS TESTING
   - Issue: Need to test all error scenarios
   - Location: `features/partner/hooks/use-partner-linking.ts`
   - Fix: Add better error messages

5. **Biometric fallback**
   - Status: ⚠️ NEEDS IMPLEMENTATION
   - Issue: PIN backup not fully implemented
   - Location: `features/security/hooks/use-biometrics.ts`
   - Fix: Complete PIN fallback flow

### Medium Priority (Nice to Have)

1. **Animation for fruit completion**
   - Add transition animation when fruit completes
   - Location: `fruit-map.tsx`

2. **Haptic feedback on completion**
   - Vibration on successful activity completion
   - Location: `app/(tabs)/index.tsx`

3. **Loading indicators**
   - Add loading state for async operations
   - Location: All components with async calls

4. **Empty states**
   - Journal empty state
   - No entries message
   - Location: `app/(tabs)/journal.tsx`

5. **Confirmation dialogs**
   - Confirm before deleting journal entries
   - Confirm before removing partners
   - Location: Various components

### Low Priority (Polish)

1. **Animations & transitions**
   - Smooth page transitions
   - Button press feedback

2. **Dark mode**
   - Support system dark mode preference

3. **Accessibility improvements**
   - Screen reader support
   - Larger touch targets on mobile

4. **Localization**
   - Support multiple languages

---

## Phase 6: Testing Procedure

### How to Test

**Step 1: Environment Setup**
```bash
cd app
npm install  # If not already done
npm start    # Start Expo
```

**Step 2: Manual Testing**
- [ ] Test each epic's main flow
- [ ] Test edge cases
- [ ] Check visual alignment
- [ ] Verify persistence

**Step 3: Cross-Epic Testing**
- [ ] Test flows that span multiple epics
- [ ] Verify no conflicts between features

**Step 4: Performance Testing**
- [ ] Open DevTools (if web version)
- [ ] Check for lag/slowness
- [ ] Monitor memory usage

**Step 5: Data Persistence Testing**
```
1. Complete some actions
2. Close app completely
3. Reopen app
4. Verify data is still there
5. Repeat with different data
```

---

## Phase 7: Refinement Checklist

### Before Moving to Epic 6

- [ ] All 5 epics can be navigated
- [ ] No critical bugs found
- [ ] Data persists across restarts
- [ ] UI looks professional
- [ ] All buttons/inputs responsive
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Error messages are helpful
- [ ] Accessibility is reasonable
- [ ] Code is clean and maintainable

### Optional Before Epic 6

- [ ] Add animations
- [ ] Add haptic feedback
- [ ] Implement PIN backup
- [ ] Add empty states
- [ ] Add confirmation dialogs

---

## Known Limitations (Acceptable for Now)

- ⚠️ No Supabase integration yet (Epic 4 waiting)
- ⚠️ No partner progress sharing yet (needs Epic 5 + 4 integration)
- ⚠️ No notifications
- ⚠️ No dark mode
- ⚠️ No multi-language support

---

## Testing Progress

- [ ] Epic 1 tested
- [ ] Epic 2 tested
- [ ] Epic 3 tested
- [ ] Epic 4 tested (pre-Supabase)
- [ ] Epic 5 tested
- [ ] Cross-epic flows tested
- [ ] All bugs fixed
- [ ] Refinements implemented
- [ ] Ready for Epic 6

---

## Issues Found During Testing

*To be filled as we discover issues*

### Issue #1: [To be identified]
- **Severity:** High/Medium/Low
- **Location:** File/Component
- **Description:** What's wrong
- **Steps to Reproduce:** How to see it
- **Fix:** What needs to change

---

## Notes for Refinement

*Add notes as we review code*

- Note 1
- Note 2
- Note 3

---

**Let's Begin Testing!** 🧪

---
