/**
 * JWT UTILITIES - UNIT TESTS (TDD)
 */

import { generateToken, verifyToken, generateRefreshToken } from '../../utils/jwt.utils.js';

describe('JWT Utilities', () => {
  const mockPayload = {
    userId: 'test-user-123',
    email: 'test@example.com',
    role: 'STUDENT'
  };

  describe('generateToken', () => {
    test('should generate a valid JWT token', () => {
      const token = generateToken(mockPayload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT format: header.payload.signature
    });

    test('should include payload data in token', () => {
      const token = generateToken(mockPayload);
      const decoded = verifyToken(token);
      
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });

    test('should throw error for empty payload', () => {
      expect(() => generateToken(null)).toThrow();
      expect(() => generateToken(undefined)).toThrow();
    });
  });

  describe('verifyToken', () => {
    test('should verify and decode valid token', () => {
      const token = generateToken(mockPayload);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(mockPayload.userId);
    });

    test('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => verifyToken(invalidToken)).toThrow();
    });

    test('should throw error for expired token', () => {
      // Token with 1ms expiry
      const shortToken = generateToken(mockPayload, '1ms');
      
      // Wait for expiry
      return new Promise(resolve => setTimeout(resolve, 10))
        .then(() => {
          expect(() => verifyToken(shortToken)).toThrow();
        });
    });
  });

  describe('generateRefreshToken', () => {
    test('should generate a refresh token', () => {
      const refreshToken = generateRefreshToken(mockPayload);
      
      expect(refreshToken).toBeDefined();
      expect(typeof refreshToken).toBe('string');
    });

    test('should generate different token than access token', () => {
      const accessToken = generateToken(mockPayload);
      const refreshToken = generateRefreshToken(mockPayload);
      
      expect(accessToken).not.toBe(refreshToken);
    });
  });
});
