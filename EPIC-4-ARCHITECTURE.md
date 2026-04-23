# Epic 4: Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   Settings Screen              Partner Linking Screen               │
│   ├─ Journey Stream            ├─ Generate Code Tab                 │
│   ├─ Translation               │  ├─ InviteCodeDisplay              │
│   ├─ Partner Connection        │  │  └─ Generate Button             │
│   │  └─ Link                   │  └─ Share Button                   │
│   └─ About                     │                                     │
│                                ├─ Join Partner Tab                  │
│                                │  ├─ JoinPartnerForm                │
│                                │  ├─ Code Input                     │
│                                │  └─ Validation                     │
│                                │                                     │
│                                └─ Info Card                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     STATE MANAGEMENT LAYER                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │ usePartnerLinking Hook                                      │   │
│   ├────────────────────────────────────────────────────────────┤   │
│   │ • generateInviteCode(userId)                               │   │
│   │   └─ Creates 6-char code, stores in DB, returns code       │   │
│   │                                                              │   │
│   │ • joinPartnerByCode(userId, code)                          │   │
│   │   └─ Validates code, creates partnership, marks as used    │   │
│   │                                                              │   │
│   │ • fetchLinkedPartners(userId)                              │   │
│   │   └─ Returns array of linked partners                      │   │
│   │                                                              │   │
│   │ Manages: isLoading state, error handling                   │   │
│   └────────────────────────────────────────────────────────────┘   │
│                                                                       │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │ usePartnerStore (Zustand)                                   │   │
│   ├────────────────────────────────────────────────────────────┤   │
│   │ • linkedPartners: PartnerLink[]                            │   │
│   │ • currentInviteCode: string | null                         │   │
│   │ • inviteCodeExpiry: string | null                          │   │
│   │                                                              │   │
│   │ Methods:                                                     │   │
│   │ • addPartner(partner)                                       │   │
│   │ • removePartner(partnerId)                                  │   │
│   │ • setInviteCode(code, expiry)                              │   │
│   │ • clearInviteCode()                                         │   │
│   │ • getLinkedPartners()                                       │   │
│   │                                                              │   │
│   │ Persisted to AsyncStorage                                   │   │
│   └────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      API INTEGRATION LAYER                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │ Supabase Client (lib/supabase-client.ts)                   │   │
│   ├────────────────────────────────────────────────────────────┤   │
│   │ Methods called:                                             │   │
│   │                                                              │   │
│   │ CREATE INVITATION:                                          │   │
│   │ supabase.from('partner_invitations').insert({              │   │
│   │   code, created_by_user_id, expires_at, is_used            │   │
│   │ })                                                           │   │
│   │                                                              │   │
│   │ VALIDATE & USE CODE:                                        │   │
│   │ supabase.from('partner_invitations')                        │   │
│   │   .select('*')                                              │   │
│   │   .eq('code', CODE)                                         │   │
│   │   .eq('is_used', false)                                     │   │
│   │   .single()                                                 │   │
│   │                                                              │   │
│   │ CREATE PARTNERSHIPS:                                        │   │
│   │ supabase.from('user_partnerships').insert([                │   │
│   │   { user_id: A, partner_id: B },                           │   │
│   │   { user_id: B, partner_id: A }  // Bidirectional         │   │
│   │ ])                                                           │   │
│   │                                                              │   │
│   │ FETCH PARTNERS:                                             │   │
│   │ supabase.from('user_partnerships')                         │   │
│   │   .select('*')                                              │   │
│   │   .eq('user_id', userId)                                    │   │
│   │                                                              │   │
│   │ Error handling: Returns { data, error }                     │   │
│   └────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        DATABASE LAYER                                │
├─────────────────────────────────────────────────────────────────────┤
│                        (Supabase PostgreSQL)                         │
│                                                                       │
│   ┌──────────────────────────────┐   ┌──────────────────────────┐  │
│   │  partner_invitations         │   │  user_partnerships      │  │
│   ├──────────────────────────────┤   ├──────────────────────────┤  │
│   │ id: UUID (PK)                │   │ id: UUID (PK)            │  │
│   │ code: VARCHAR(8) (UNIQUE)    │   │ user_id: UUID (FK)       │  │
│   │ created_by_user_id: UUID (FK)│   │ partner_id: UUID (FK)    │  │
│   │ expires_at: TIMESTAMP        │   │ linked_at: TIMESTAMP     │  │
│   │ is_used: BOOLEAN             │   │ created_at: TIMESTAMP    │  │
│   │ accepted_by_user_id: UUID    │   │                          │  │
│   │ created_at: TIMESTAMP        │   │ Constraints:             │  │
│   │ updated_at: TIMESTAMP        │   │ • UNIQUE(user_id,        │  │
│   │                              │   │   partner_id)            │  │
│   │ Indexes:                      │   │ • CHECK user ≠ partner   │  │
│   │ • idx_code                    │   │                          │  │
│   │ • idx_created_by              │   │ RLS Policies:            │  │
│   │ • idx_expires_at              │   │ • View own partnerships  │  │
│   │                              │   │ • See related data       │  │
│   │ RLS Policies:                 │   │                          │  │
│   │ • View own invitations        │   │                          │  │
│   │ • Create own invitations      │   │                          │  │
│   │ • Update own invitations      │   │                          │  │
│   │                              │   │                          │  │
│   └──────────────────────────────┘   └──────────────────────────┘  │
│                                                                       │
│   auth.users (Supabase Default)                                     │
│   ├─ id: UUID                                                        │
│   ├─ email: VARCHAR                                                  │
│   └─ ... (other auth fields)                                        │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Flow 1: Generate Invitation Code

```
User A (Settings)
    ↓
    Taps "Relational Handshake"
    ↓
    Navigates to partner-linking route
    ↓
    PartnerLinkingScreen renders
    ↓
    Clicks "Generate Code" tab
    ↓
    InviteCodeDisplay shown
    ↓
    Taps "Generate Code" button
    ↓
    usePartnerLinking.generateInviteCode(userId) called
    ↓
    ┌─ Supabase: Create partner_invitations row
    │  └─ code: "ABC123" (random)
    │  └─ created_by_user_id: User A ID
    │  └─ expires_at: now + 24 hours
    │  └─ is_used: false
    ↓
    usePartnerStore.setInviteCode("ABC123", expires_at)
    ↓
    Code displayed to User A
    ↓
    User A taps "Share Code"
    ↓
    Native Share Sheet opens
    ↓
    "Join me on Cultivating the Fruits! Code: ABC123"
    ↓
    User A shares with User B (SMS, email, etc.)
```

### Flow 2: Join Partner by Code

```
User B (receives code "ABC123")
    ↓
    Opens app
    ↓
    Goes to Settings → Relational Handshake
    ↓
    Clicks "Join Partner" tab
    ↓
    JoinPartnerForm rendered
    ↓
    Types "ABC123" in code input
    ↓
    Taps "Link Partner" button
    ↓
    usePartnerLinking.joinPartnerByCode(userId, "ABC123") called
    ↓
    ┌─ Validate invitation
    │  └─ Query: SELECT * FROM partner_invitations
    │     WHERE code = 'ABC123' AND is_used = false
    │     └─ Found: User A created it
    ↓
    ┌─ Check expiry
    │  └─ expires_at > now()? YES ✓
    ↓
    ┌─ Create partnerships (bidirectional)
    │  └─ INSERT INTO user_partnerships VALUES
    │     (User B ID, User A ID, now)
    │  └─ INSERT INTO user_partnerships VALUES
    │     (User A ID, User B ID, now)
    ↓
    ┌─ Mark code as used
    │  └─ UPDATE partner_invitations
    │     SET is_used = true
    │     WHERE id = invitation.id
    ↓
    usePartnerStore.addPartner({
      id: User A ID,
      partnerId: User A ID,
      partnerEmail: User A email,
      linkedAt: now
    })
    ↓
    Success alert shown
    ↓
    Settings now shows "1 partner(s) linked"
```

### Flow 3: View Linked Partners

```
User A opens Settings
    ↓
    usePartnerStore.getLinkedPartners() called
    ↓
    Returns: [{ partnerId: "User B", email: "b@example.com", ... }]
    ↓
    Settings shows: "1 partner(s) linked"
    ↓
    Both User A and User B are now linked
    ↓
    Ready for Epic 5: Partner progress integration
```

## Component Relationships

```
app/(tabs)/settings.tsx
    ↓
    [Router] → /partner-linking
    ↓
app/partner-linking.tsx
    ↓
    [useAuth] → Get current userId
    ↓
features/partner/components/partner-linking-screen.tsx
    ├─ Tab 1: "Generate Code"
    │  └─ InviteCodeDisplay.tsx
    │     └─ usePartnerLinking.generateInviteCode()
    │        └─ supabase.from('partner_invitations').insert()
    │
    └─ Tab 2: "Join Partner"
       └─ JoinPartnerForm.tsx
          └─ usePartnerLinking.joinPartnerByCode()
             └─ supabase.from('partner_invitations').select()
             └─ supabase.from('user_partnerships').insert()
             └─ usePartnerStore.addPartner()
```

## State Flow

```
Initial State (usePartnerStore)
├─ linkedPartners: []
├─ currentInviteCode: null
├─ inviteCodeExpiry: null

After Generate Code
├─ currentInviteCode: "ABC123"
├─ inviteCodeExpiry: "2026-03-31T13:17:00Z"

After Join Partner
├─ linkedPartners: [{ id: "uuid", partnerId: "uuid", ... }]
├─ currentInviteCode: null (cleared after use)

Data Persisted to AsyncStorage
└─ 'partner-storage' key
```

## Security Model

### Row Level Security (RLS)

```
partner_invitations:
├─ SELECT: Only created_by_user_id can view
├─ INSERT: Only authenticated users can create
├─ UPDATE: Only created_by_user_id can update
└─ DELETE: Only created_by_user_id can delete

user_partnerships:
├─ SELECT: Only if user_id = auth.uid() OR partner_id = auth.uid()
├─ INSERT: Only if user_id = auth.uid() OR partner_id = auth.uid()
└─ DELETE: Only if user_id = auth.uid() OR partner_id = auth.uid()
```

### Code Security

```
Code Generation:
├─ 6 characters: ~48-bit entropy
├─ Alphanumeric: 36^6 = ~2.2 billion combinations
├─ Expiry: 24 hours
└─ One-time: Marked used immediately after join

Code Validation:
├─ Check not expired
├─ Check not already used
├─ Check user exists
└─ Return error if any validation fails
```

## Integration Points

### With Other Epics

```
Epic 4 ←→ Epic 5
    ↓
    [Partnership Links]
    ↓
Epic 5 Uses:
├─ linkedPartners list
├─ partnerId to fetch partner data
└─ Shows partner's daily progress

Epic 5 Shares Back:
├─ Update partner progress on activities
├─ Show shared streaks
└─ Real-time updates via Supabase Realtime

Epic 6 Uses:
├─ Partnerships for group features
├─ Filter partners for church mode
└─ Export guides to linked partners
```

## Error Handling

```
generateInviteCode()
├─ Success: { data: { inviteCode, expiresAt }, error: null }
└─ Failure: { data: null, error: "Failed to generate..." }

joinPartnerByCode()
├─ Success: { data: { partnerId, partnerEmail, linkedAt }, error: null }
└─ Failure Cases:
   ├─ { error: "Invalid invitation code" }
   ├─ { error: "Invitation code has expired" }
   └─ { error: "Failed to link partner" }

UI Handling:
├─ Alert dialog on error
├─ isLoading state prevents duplicate submissions
├─ Error messages displayed to user
└─ Graceful recovery
```

---

This architecture ensures:
✅ Type safety (TypeScript)
✅ Security (RLS + validation)
✅ Scalability (Supabase managed)
✅ Maintainability (Clear separation of concerns)
✅ Extensibility (Easy to integrate with other epics)
