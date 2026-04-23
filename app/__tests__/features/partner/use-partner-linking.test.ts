import { renderHook, act } from '@testing-library/react-native';
import { usePartnerLinking } from '../../../features/partner/hooks/use-partner-linking';
import { supabase } from '../../../lib/supabase/config';
import { usePartnerStore } from '../../../store/partner-store';

// Mock Supabase client
jest.mock('../../../lib/supabase/config', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(),
      select: jest.fn(),
      eq: jest.fn(),
      update: jest.fn(),
      single: jest.fn(),
    })),
  },
  isSupabaseEnabled: true,
}));

// Mock usePartnerStore
const mockSetInviteCode = jest.fn();
const mockAddPartner = jest.fn();

jest.mock('../../../store/partner-store', () => ({
  usePartnerStore: jest.fn(() => ({
    setInviteCode: mockSetInviteCode,
    addPartner: mockAddPartner,
    linkedPartners: [],
    currentInviteCode: null,
    inviteCodeExpiry: null,
  })),
}));

describe('usePartnerLinking', () => {
  const MOCK_USER_ID = 'user-123';
  const MOCK_INVITE_CODE = 'ABCDEF';
  const MOCK_EXPIRES_AT = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours from now
  const MOCK_PARTNER_ID = 'partner-id-456';
  const MOCK_PARTNER_EMAIL = 'partner@example.com';

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Reset mock implementation for Supabase methods
    (supabase.from as jest.Mock).mockImplementation((tableName) => {
      return {
        insert: jest.fn(() => ({ select: jest.fn(() => ({ single: jest.fn() })) })),
        select: jest.fn(() => ({ eq: jest.fn(() => ({ single: jest.fn() })) })),
        eq: jest.fn(() => ({ single: jest.fn() })),
        update: jest.fn().mockReturnThis(), // Returns itself for chaining
        single: jest.fn(),
        then: jest.fn((cb) => cb({ data: null, error: null })), // For update after eq
      };
    });

    // Reset mock implementation for usePartnerStore actions
    mockSetInviteCode.mockClear();
    mockAddPartner.mockClear();
  });

  // Test generateInviteCode
  describe('generateInviteCode', () => {
    it('should generate an invite code and update store on success', async () => {
      const mockSupabaseInsert = jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: { code: MOCK_INVITE_CODE, expires_at: MOCK_EXPIRES_AT }, error: null })),
        })),
      }));
      (supabase.from as jest.Mock).mockReturnValue({
        insert: mockSupabaseInsert,
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.generateInviteCode(MOCK_USER_ID);
      });

      expect(response?.error).toBeNull();
      expect(response?.data?.inviteCode).toBeDefined();
      expect(response?.data?.expiresAt).toBeDefined();
      expect(mockSupabaseInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          created_by_user_id: MOCK_USER_ID,
          is_used: false,
        })
      );
      expect(mockSetInviteCode).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
      expect(result.current.isLoading).toBe(false);
    });

    it('should return an error if Supabase insertion fails', async () => {
      const mockErrorMessage = 'Supabase insert error';
      const mockSupabaseInsert = jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: { message: mockErrorMessage } })),
        })),
      }));
      (supabase.from as jest.Mock).mockReturnValue({
        insert: mockSupabaseInsert,
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.generateInviteCode(MOCK_USER_ID);
      });

      expect(response?.data).toBeNull();
      expect(response?.error).toBe(mockErrorMessage);
      expect(mockSetInviteCode).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });
  });

  // Test joinPartnerByCode
  describe('joinPartnerByCode', () => {
    it('should join partner and update store on success', async () => {
      const mockInvitationData = {
        id: 'invite-id-123',
        code: MOCK_INVITE_CODE,
        expires_at: MOCK_EXPIRES_AT,
        created_by_user_id: MOCK_PARTNER_ID,
        creator: { id: MOCK_PARTNER_ID, email: MOCK_PARTNER_EMAIL },
        is_used: false,
      };

      // Mock select to return invitation
      (supabase.from as jest.Mock).mockImplementation((tableName) => {
        if (tableName === 'partner_invitations') {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() => Promise.resolve({ data: mockInvitationData, error: null })),
                })),
              })),
            })),
          };
        }
        if (tableName === 'user_partnerships') {
          return {
            insert: jest.fn(() => Promise.resolve({ error: null })),
          };
        }
        return {
          update: jest.fn().mockReturnThis(),
          eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
        };
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.joinPartnerByCode(MOCK_USER_ID, MOCK_INVITE_CODE);
      });

      expect(response?.error).toBeNull();
      expect(response?.data?.partnerId).toBe(MOCK_PARTNER_ID);
      expect(response?.data?.partnerEmail).toBe(MOCK_PARTNER_EMAIL);
      expect(mockAddPartner).toHaveBeenCalledWith(
        expect.objectContaining({
          partnerId: MOCK_PARTNER_ID,
          partnerEmail: MOCK_PARTNER_EMAIL,
        })
      );
      expect(result.current.isLoading).toBe(false);
    });

    it('should return error for invalid invitation code', async () => {
      // Mock select to return no invitation
      (supabase.from as jest.Mock).mockImplementation((tableName) => {
        if (tableName === 'partner_invitations') {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() => Promise.resolve({ data: null, error: { message: 'Invite not found' } })),
                })),
              })),
            })),
          };
        }
        return {};
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.joinPartnerByCode(MOCK_USER_ID, 'INVALIDCODE');
      });

      expect(response?.data).toBeNull();
      expect(response?.error).toBe('Invalid invitation code');
      expect(mockAddPartner).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });

    it('should return error for expired invitation code', async () => {
      const mockExpiredInvitationData = {
        id: 'invite-id-123',
        code: MOCK_INVITE_CODE,
        expires_at: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
        created_by_user_id: MOCK_PARTNER_ID,
        creator: { id: MOCK_PARTNER_ID, email: MOCK_PARTNER_EMAIL },
        is_used: false,
      };

      // Mock select to return expired invitation
      (supabase.from as jest.Mock).mockImplementation((tableName) => {
        if (tableName === 'partner_invitations') {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() => Promise.resolve({ data: mockExpiredInvitationData, error: null })),
                })),
              })),
            })),
          };
        }
        return {};
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.joinPartnerByCode(MOCK_USER_ID, MOCK_INVITE_CODE);
      });

      expect(response?.data).toBeNull();
      expect(response?.error).toBe('Invitation code has expired');
      expect(mockAddPartner).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });

    it('should return an error if partnership creation fails', async () => {
      const mockInvitationData = {
        id: 'invite-id-123',
        code: MOCK_INVITE_CODE,
        expires_at: MOCK_EXPIRES_AT,
        created_by_user_id: MOCK_PARTNER_ID,
        creator: { id: MOCK_PARTNER_ID, email: MOCK_PARTNER_EMAIL },
        is_used: false,
      };
      const mockPartnershipError = 'Partnership creation failed';

      // Mock select to return invitation, and insert to return error
      (supabase.from as jest.Mock).mockImplementation((tableName) => {
        if (tableName === 'partner_invitations') {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() => Promise.resolve({ data: mockInvitationData, error: null })),
                })),
              })),
            })),
          };
        }
        if (tableName === 'user_partnerships') {
          return {
            insert: jest.fn(() => Promise.resolve({ error: { message: mockPartnershipError } })),
          };
        }
        return {
          update: jest.fn().mockReturnThis(),
          eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
        };
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.joinPartnerByCode(MOCK_USER_ID, MOCK_INVITE_CODE);
      });

      expect(response?.data).toBeNull();
      expect(response?.error).toBe(mockPartnershipError);
      expect(mockAddPartner).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });
  });

  // Test fetchLinkedPartners
  describe('fetchLinkedPartners', () => {
    it('should fetch linked partners on success', async () => {
      const mockPartnersData = [{ id: 'link-1', partner: { id: 'p1', email: 'p1@e.com' } }];
      const mockSelect = jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: mockPartnersData, error: null })),
      }));
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.fetchLinkedPartners(MOCK_USER_ID);
      });

      expect(response?.error).toBeNull();
      expect(response?.data).toEqual(mockPartnersData);
      expect(mockSelect).toHaveBeenCalledWith('*, partner:partner_id(id, email)');
      expect(result.current.isLoading).toBe(false); // isLoading is not directly set by fetchLinkedPartners, so it should remain false
    });

    it('should return an error if Supabase fetch fails', async () => {
      const mockErrorMessage = 'Fetch partners error';
      const mockSelect = jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: null, error: { message: mockErrorMessage } })),
      }));
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const { result } = renderHook(() => usePartnerLinking());

      let response;
      await act(async () => {
        response = await result.current.fetchLinkedPartners(MOCK_USER_ID);
      });

      expect(response?.data).toBeNull();
      expect(response?.error).toBe(mockErrorMessage);
      expect(result.current.isLoading).toBe(false);
    });
  });

  // Test isLoading state
  it('should set isLoading to true during async operations', async () => {
    const mockSupabaseInsert = jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() => new Promise((resolve) => setTimeout(() => resolve({ data: {}, error: null }), 100))), // Simulate async
      })),
    }));
    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockSupabaseInsert,
    });

    const { result } = renderHook(() => usePartnerLinking());

    let promise;
    act(() => {
      promise = result.current.generateInviteCode(MOCK_USER_ID);
    });

    expect(result.current.isLoading).toBe(true);
    await act(() => promise); // Wait for the promise to resolve

    expect(result.current.isLoading).toBe(false);
  });
});