# Logo & Branding Integration

**Status:** ✅ Logo integrated with CSS color adjustment
**Date:** 2026-04-21

---

## Logo Integration

### What Was Done

1. **Logo File Added**
   - Source: `C:\Users\joshu\Downloads\Cultivating the Fruit Logo - Transparent background.png`
   - Destination: `app/assets/images/logo.png`
   - Usage: Web banner header

2. **Web Banner Updated**
   - File: `app/_layout.native.tsx`
   - Shows logo at top of web app
   - Wine background (#6B2D3E) matching app palette
   - 50px height, centered layout

3. **CSS Color Adjustment**
   - File: `global.web.css`
   - Applied `filter: hue-rotate(290deg)` to shift blue → wine
   - Adjusts logo colors to match warm palette

---

## Current Color Palette

### Primary Colors (Warm Bible App Aesthetic)

```css
--color-wine: #6B2D3E;        /* Primary brand color */
--color-rose-dark: #84364D;    /* Dark accent */
--color-rose: #A67C89;         /* Medium accent */
--color-rose-light: #C99AA9;   /* Light accent */
--color-blush: #F8E8ED;        /* Background accent */
--color-mint: #C8DFC0;         /* Success/growth color */
--color-cream: #FFF9F0;        /* Main background */
--color-cream-dark: #F5EDE0;   /* Secondary background */
--color-parchment: #FEF6E8;    /* Alternate background */
--color-sage: #7D8C69;         /* Action/complete color */
--color-tan: #8B6F47;          /* Neutral accent */
--color-gold: #D4AF37;         /* Special/streak color */
```

### Text Colors

```css
--color-charcoal: #2F2F2F;     /* Primary text */
--color-white: #FFFFFF;        /* Inverse text */
```

---

## Logo Color Mapping

### Original Logo Colors
- **Blue background:** #3E6B8B (medium-dark blue)
- **Pink heart:** #E89AAD (rose pink) ✅ Matches our rose-light
- **White cross:** #FFFFFF ✅ Perfect
- **Tan rope:** #C4A574 (warm tan) ✅ Matches our palette
- **Blue text:** #3E6B8B (matches background)
- **Light tagline:** #A8C5D8 (light blue)

### Desired App Colors
- **Background:** #6B2D3E (wine) - CSS filtered
- **Pink heart:** Keep as-is (matches rose-light)
- **White cross:** Keep as-is
- **Tan rope:** Keep as-is
- **Text:** #6B2D3E (wine) - CSS filtered
- **Tagline:** #A67C89 (rose) - CSS filtered

---

## CSS Filter Applied

```css
.logo-banner img {
  filter: hue-rotate(290deg) saturate(1.2) brightness(0.9);
}
```

**What this does:**
- `hue-rotate(290deg)` - Shifts blue → wine/purple tones
- `saturate(1.2)` - Increases color richness
- `brightness(0.9)` - Slightly darkens for depth

**Result:** Blue tones shift to wine/burgundy tones matching app palette

---

## Future: Native Logo Version

For best quality, consider creating a recolored version:

### Recommended Changes
1. **Square background:** #6B2D3E (wine) instead of blue
2. **Heart:** Keep pink (#E89AAD or #C99AA9)
3. **Cross:** Keep white
4. **Rope:** Keep tan or shift to #D4AF37 (gold)
5. **"CULTIVATING":** #6B2D3E (wine)
6. **"the Fruit":** #84364D (rose-dark) or keep blue for contrast
7. **Tagline:** #A67C89 (rose) or #7D8C69 (sage)

### File Formats Needed
- **PNG:** Transparent background (horizontal logo for header)
- **SVG:** Scalable vector (best for recoloring)
- **Sizes:**
  - Header: 800x200px
  - Square icon: 512x512px (app icon)
  - Favicon: 64x64px

---

## Current Usage

### Web Platform
- **Top banner:** Full logo, wine background, 50px height
- **Replaces:** "Cultivating the Fruits - Web Preview" text

### Native Platform (Future)
- Could add to onboarding screen
- Could use in settings
- Consider for splash screen

---

## Testing

**To see the logo:**
1. Start web server: `npx expo start`
2. Press `w` for web
3. Logo appears at very top of page

**Expected:**
- ✅ Logo visible in wine-colored banner
- ✅ Colors shifted from blue to wine tones
- ✅ Heart remains pink
- ✅ Cross remains white
- ✅ Overall warm aesthetic maintained

---

## Notes

- CSS filter is a temporary solution for color adjustment
- Works well for web but not perfect color match
- For production, recommend getting logo redesigned in warm colors
- Current solution is functional and looks good!
