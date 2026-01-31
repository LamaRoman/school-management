/**
 * ═══════════════════════════════════════════════════════════════
 * SANITY TEST
 * ═══════════════════════════════════════════════════════════════
 * 
 * Verifies Jest is working correctly with ES modules
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { config } from '../config/env.config.js';
describe('Jest Setup', () => {
  test('Jest is working', () => {
    expect(true).toBe(true);
  });

  test('Environment is set to test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
  test('JWT_SECRET is set from .env.test', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_SECRET).toContain('test-secret');
  });

  test('Config loads correctly', () => {
    expect(config.env).toBe('test');
    expect(config.jwt.secret).toBeDefined();
    expect(config.database.url).toContain('school_management');
  });
  test('JWT_SECRET is set from .env.test', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_SECRET).toContain('test-secret');
  });

  test('Config loads correctly', () => {
    expect(config.env).toBe('test');
    expect(config.jwt.secret).toBeDefined();
    expect(config.database.url).toContain('school_management');
  });
  test('JWT_SECRET is set from .env.test', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_SECRET).toContain('test-secret');
  });

  test('Config loads correctly', () => {
    expect(config.env).toBe('test');
    expect(config.jwt.secret).toBeDefined();
    expect(config.database.url).toContain('school_management');
  });
  test('JWT_SECRET is set from .env.test', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_SECRET).toContain('test-secret');
  });

  test('Config loads correctly', () => {
    expect(config.env).toBe('test');
    expect(config.jwt.secret).toBeDefined();
    expect(config.database.url).toContain('school_management');
  });
});