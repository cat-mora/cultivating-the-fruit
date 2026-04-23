# Next Steps: Web Platform Development

**Current Status:** ✅ Web app loads successfully!
- All technical blockers resolved (import.meta, worklets, routing)
- Expo Router working for all platforms
- Basic CSS loaded
- **Issue:** Styling needs improvement

---

## Our New Approach: Universal Components

Since we're using **Expo Router for all platforms**, we're NOT building separate web components. Instead:

✅ **One codebase** for web + native
✅ **Same screens** work everywhere
✅ **Platform.OS checks** for platform-specific UI
✅ **CSS for web**, NativeWind for native

---

## Immediate Tasks (Next 2-3 Hours)

### Task 1: Fix Onboarding Screen Styling ⏭️ CURRENT
**Goal:** Make onboarding look good on web

**What to fix:**
- [ ] Stream selection cards need proper layout
- [ ] Translation picker needs styling
- [ ] "Start My Journey" button needs proper appearance
- [ ] Emoji cluster needs centering
- [ ] Headers need proper typography
- [ ] Overall layout needs centering and max-width

**Files to modify:**
- `app/onboarding/index.tsx` - Add Platform.OS checks if needed
- `global.web.css` - Add more specific selectors
- Test in browser and iterate

---

### Task 2: Test Full Onboarding Flow
**Goal:** Ensure onboarding works end-to-end on web

**Test:**
- [ ] Select stream (Strengthen/Repair/Family)
- [ ] Select translation (NIV/ESV/KJV/NLT/NKJV)
- [ ] Click "Start My Journey"
- [ ] Should navigate to dashboard (tabs)
- [ ] Verify user preferences saved

---

### Task 3: Fix Dashboard Tab Styling
**Goal:** Make dashboard readable and usable

**What to fix:**
- [ ] Scripture card layout
- [ ] Activity cards layout
- [ ] Time tier selector
- [ ] "Mark Complete" button
- [ ] Tab bar navigation at bottom

**Files:**
- `app/(tabs)/index.tsx` - Dashboard
- `global.web.css` - Add dashboard styles

---

### Task 4: Fix Other Tabs (Progress, Journal, Settings)
**Goal:** Make all screens work on web

**Files:**
- `app/(tabs)/progress.tsx`
- `app/(tabs)/journal.tsx`
- `app/(tabs)/settings.tsx`

---

## Medium-Term Tasks (Next Week)

### Web-Specific Authentication
- Add email/password sign-in option for web
- Keep biometric for native
- Share same Supabase backend

### Responsive Design
- Test on mobile (375px)
- Test on tablet (768px)
- Test on desktop (1280px+)
- Adjust layouts as needed

### Cross-Platform Testing
- Verify data sync works (web → native, native → web)
- Test partner linking across platforms
- Ensure journal encryption works

---

## What NOT to Do

❌ Don't build separate web screens
❌ Don't use React Router (we removed it)
❌ Don't break native apps while fixing web
❌ Don't over-engineer - keep it simple

---

## Current File Structure

```
app/
├── _layout.tsx                 → Exports from _layout.native
├── _layout.native.tsx          → Main layout (web + native)
├── (tabs)/                     → Shared screens (work on all platforms)
│   ├── index.tsx               → Dashboard
│   ├── progress.tsx            → Progress
│   ├── journal.tsx             → Journal
│   └── settings.tsx            → Settings
├── onboarding/
│   └── index.tsx               → Onboarding (web + native)
├── global.css                  → NativeWind/Tailwind (native)
└── global.web.css              → CSS (web only)
```

---

## Platform-Specific Code Pattern

When you need different UI for web vs native:

```typescript
import { Platform } from 'react-native';

export default function MyScreen() {
  return (
    <View>
      {Platform.OS === 'web' ? (
        <WebSpecificComponent />
      ) : (
        <NativeSpecificComponent />
      )}
    </View>
  );
}
```

---

## Success Criteria

**Phase 5 Complete When:**
- ✅ Onboarding works and looks good on web
- ✅ Dashboard displays content properly
- ✅ Progress screen shows streaks and fruit map
- ✅ All navigation works smoothly
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ No console errors
- ✅ Native apps still work perfectly

---

## Let's Start! 🚀

**First priority:** Fix the onboarding screen styling so it looks presentable.

**Files to edit:**
1. Check `app/onboarding/index.tsx` to see current structure
2. Add targeted CSS to `global.web.css`
3. Test and iterate

Ready to dive in?
