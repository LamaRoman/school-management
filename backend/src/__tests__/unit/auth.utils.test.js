/**
 * AUTH UTILITIES - UNIT TESTS (TDD)
 * Write test FIRST, then implement
 */

import { hashPassword, comparePassword } from '../../utils/auth.utils.js';

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    test('should hash a password successfully', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(50);
    });

    test('should generate different hashes for same password', async () => {
      const password = 'TestPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });

    test('should throw error for empty password', async () => {
      await expect(hashPassword('')).rejects.toThrow();
    });
  });

  describe('comparePassword', () => {
    test('should return true for correct password', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      const result = await comparePassword(password, hashed);
      
      expect(result).toBe(true);
    });

    test('should return false for incorrect password', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      const result = await comparePassword('WrongPassword!', hashed);
      
      expect(result).toBe(false);
    });
  });
});
